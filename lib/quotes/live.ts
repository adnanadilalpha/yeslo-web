import "server-only";
import { getServiceClient } from "@/lib/supabase";
import { formatStamp } from "./money";
import { clientIp, resolveQuotePhase } from "./state";
import type {
  DecisionRecord,
  Mode,
  PublicQuote,
  QuoteKind,
  QuoteLine,
  QuotePhase,
  QuoteStatus,
  QuoteView,
} from "./types";

type LineRow = {
  id: string;
  position: number;
  name: string;
  description: string | null;
  quantity: number | string;
  unit: string;
  unit_price_cents: number;
};

type PartyRow = {
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  company?: string | null;
  mode?: Mode;
};

type QuoteRow = {
  id: string;
  number: string;
  title: string;
  kind: QuoteKind;
  status: QuoteStatus;
  currency: string;
  tax_rate: number | string;
  notes: string | null;
  valid_until: string | null;
  signer_name: string | null;
  decision_comment: string | null;
  decided_at: string | null;
  businesses: PartyRow | PartyRow[] | null;
  clients: PartyRow | PartyRow[] | null;
  quote_lines: LineRow[] | null;
};

type TokenRow = {
  id: string;
  token: string;
  expires_at: string | null;
  revoked_at: string | null;
  quotes: QuoteRow | QuoteRow[] | null;
};

function one<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function num(value: number | string | null | undefined) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export type LoadedQuote = {
  publicQuote: PublicQuote;
  quoteId: string;
  shareTokenId: string;
};

export async function loadLiveQuote(token: string, now: Date): Promise<LoadedQuote | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;
  if (!/^[A-Za-z0-9_-]{8,80}$/.test(token)) return null;

  const { data, error } = await supabase
    .from("share_tokens")
    .select(
      `id, token, expires_at, revoked_at,
       quotes (
         id, number, title, kind, status, currency, tax_rate, notes, valid_until,
         signer_name, decision_comment, decided_at,
         businesses ( name, email, phone, address, mode ),
         clients ( name, email, company ),
         quote_lines ( id, position, name, description, quantity, unit, unit_price_cents )
       )`,
    )
    .eq("token", token)
    .maybeSingle();

  if (error) {
    console.error("loadLiveQuote", error.message);
    return null;
  }
  if (!data) return null;

  const tokenRow = data as unknown as TokenRow;
  const quoteRow = one(tokenRow.quotes);
  if (!quoteRow) return null;
  const business = one(quoteRow.businesses);
  const client = one(quoteRow.clients);
  const lines = [...(quoteRow.quote_lines ?? [])].sort((a, b) => a.position - b.position);

  const quote: QuoteView = {
    number: quoteRow.number,
    title: quoteRow.title,
    kind: quoteRow.kind,
    mode: business?.mode === "trades" ? "trades" : "freelancer",
    currency: quoteRow.currency || "USD",
    taxRate: num(quoteRow.tax_rate),
    notes: quoteRow.notes ?? "",
    validUntil: quoteRow.valid_until,
    business: {
      name: business?.name ?? "Yeslo business",
      email: business?.email ?? undefined,
      phone: business?.phone ?? undefined,
      address: business?.address ?? undefined,
    },
    client: {
      name: client?.name ?? "Client",
      email: client?.email ?? undefined,
      company: client?.company ?? undefined,
    },
    lines: lines.map(toLine),
    status: quoteRow.status,
  };

  const phase = resolveQuotePhase({
    status: quote.status,
    expiresAt: tokenRow.expires_at,
    revokedAt: tokenRow.revoked_at,
    validUntil: quote.validUntil,
    now,
  });

  let decision: DecisionRecord | null = null;
  if (phase === "approved" || phase === "changes_requested" || phase === "invoiced" || phase === "paid") {
    decision = await latestDecision(quoteRow, supabase);
  }

  return {
    quoteId: quoteRow.id,
    shareTokenId: tokenRow.id,
    publicQuote: {
      token,
      source: "live",
      phase,
      quote,
      decision,
      showSamples: false,
    },
  };
}

function toLine(row: LineRow): QuoteLine {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    quantity: num(row.quantity),
    unit: row.unit,
    unitPriceCents: row.unit_price_cents,
  };
}

async function latestDecision(
  quoteRow: QuoteRow,
  supabase: NonNullable<ReturnType<typeof getServiceClient>>,
): Promise<DecisionRecord | null> {
  const { data } = await supabase
    .from("quote_events")
    .select("event_type, signer_name, comment, ip, user_agent, created_at")
    .eq("quote_id", quoteRow.id)
    .in("event_type", ["approved", "changes_requested"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const event = data as {
    event_type: "approved" | "changes_requested";
    signer_name: string | null;
    comment: string | null;
    ip: string | null;
    user_agent: string | null;
    created_at: string;
  } | null;

  const signerName = event?.signer_name || quoteRow.signer_name;
  const decidedAt = event?.created_at || quoteRow.decided_at;
  if (!signerName || !decidedAt) return null;

  const intent = event?.event_type ?? (quoteRow.status === "changes_requested" ? "changes_requested" : "approved");
  return {
    intent: intent === "changes_requested" ? "changes_requested" : "approved",
    signerName,
    comment: event?.comment ?? quoteRow.decision_comment ?? "",
    decidedAt,
    ip: event?.ip ?? null,
    userAgent: event?.user_agent ?? "",
  };
}

export async function recordView(loaded: LoadedQuote, headerList: Headers) {
  const supabase = getServiceClient();
  if (!supabase) return;
  const ip = clientIp(headerList);
  const userAgent = (headerList.get("user-agent") ?? "").slice(0, 400);
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  let query = supabase
    .from("quote_events")
    .select("id")
    .eq("quote_id", loaded.quoteId)
    .eq("event_type", "viewed")
    .gte("created_at", since)
    .limit(1);

  if (ip) query = query.eq("ip", ip);
  const { data } = await query;
  if (data && data.length > 0) return;

  const { error } = await supabase.from("quote_events").insert({
    quote_id: loaded.quoteId,
    share_token_id: loaded.shareTokenId,
    event_type: "viewed",
    ip,
    user_agent: userAgent || null,
  });
  if (error) console.error("recordView", error.message);
}

export async function recordLiveDecision(input: {
  token: string;
  intent: "approve" | "changes";
  signerName: string;
  comment: string;
  ip: string | null;
  userAgent: string;
  now: Date;
}): Promise<
  | { ok: true; decision: DecisionRecord; phase: QuotePhase }
  | { ok: false; status: number; code: string; message: string }
> {
  const supabase = getServiceClient();
  if (!supabase) {
    return { ok: false, status: 404, code: "not_found", message: "This link doesn't match a Yeslo quote." };
  }

  const loaded = await loadLiveQuote(input.token, input.now);
  if (!loaded) {
    return { ok: false, status: 404, code: "not_found", message: "This link doesn't match a Yeslo quote." };
  }
  if (loaded.publicQuote.phase !== "open") {
    return {
      ok: false,
      status: 409,
      code: "closed",
      message: closedMessage(loaded.publicQuote.phase),
    };
  }

  const status = input.intent === "approve" ? "approved" : "changes_requested";
  const decidedAt = input.now.toISOString();
  const { data: updated, error: updateError } = await supabase
    .from("quotes")
    .update({
      status,
      signer_name: input.signerName,
      decision_comment: input.comment || null,
      decided_at: decidedAt,
    })
    .eq("id", loaded.quoteId)
    .in("status", ["sent", "draft"])
    .select("id")
    .maybeSingle();

  if (updateError) {
    console.error("recordLiveDecision", updateError.message);
    return { ok: false, status: 500, code: "save_failed", message: "We couldn't record that. Try again." };
  }
  if (!updated) {
    return {
      ok: false,
      status: 409,
      code: "closed",
      message: "This quote already has a decision.",
    };
  }

  const { error: eventError } = await supabase.from("quote_events").insert({
    quote_id: loaded.quoteId,
    share_token_id: loaded.shareTokenId,
    event_type: status,
    signer_name: input.signerName,
    comment: input.comment || null,
    ip: input.ip,
    user_agent: input.userAgent || null,
  });
  if (eventError) console.error("recordLiveDecision event", eventError.message);

  const decision: DecisionRecord = {
    intent: status,
    signerName: input.signerName,
    comment: input.comment,
    decidedAt,
    ip: input.ip,
    userAgent: input.userAgent,
  };
  return { ok: true, decision, phase: status === "approved" ? "approved" : "changes_requested" };
}

function closedMessage(phase: QuotePhase) {
  if (phase === "expired") return "This quote has expired. Ask the sender for a new link.";
  if (phase === "closed") return "This quote is closed. No further response can be recorded.";
  if (phase === "changes_requested") return "Changes were already requested on this quote.";
  return "This quote already has a decision.";
}

export function decisionPayload(decision: DecisionRecord, phase: QuotePhase) {
  return {
    phase,
    decision: {
      ...decision,
      decidedAtLabel: formatStamp(decision.decidedAt),
    },
  };
}
