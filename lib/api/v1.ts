import "server-only";
import { apiError, asOptionalString, asString, isUuid, json } from "@/lib/api/http";
import { ownedBusiness, type BusinessRow, type OwnerContext } from "@/lib/api/owner";
import { dollarsToCents } from "@/lib/quotes/money";
import { quoteUrl } from "@/lib/site";
import type { QuoteKind } from "@/lib/quotes/types";

const CURRENCIES = new Set(["USD", "CAD", "GBP", "EUR", "AUD"]);

type LineInput = {
  name: string;
  description: string | null;
  quantity: number;
  unit: string;
  unitPriceCents: number;
};

export async function upsertBusiness(owner: OwnerContext, body: Record<string, unknown>) {
  const name = asString(body.name, 120);
  if (!name) return apiError("invalid", "Add the business name.", 400);
  const mode = body.mode === "trades" ? "trades" : body.mode === "freelancer" ? "freelancer" : null;
  if (!mode) return apiError("invalid", "Mode must be freelancer or trades.", 400);
  const email = asOptionalString(body.email, 200);
  const phone = asOptionalString(body.phone, 40);
  const address = asOptionalString(body.address, 240);
  const existing = await ownedBusiness(owner);
  if (existing.error) return existing.error;

  if (existing.business) {
    const { data, error } = await owner.client
      .from("businesses")
      .update({ name, mode, email, phone, address })
      .eq("id", existing.business.id)
      .select("id, owner_user_id, name, email, phone, address, mode")
      .single();
    if (error) {
      console.error("update business", error.message);
      return apiError("save_failed", "We couldn't save the business.", 500);
    }
    return json({ business: data });
  }

  const { data, error } = await owner.client
    .from("businesses")
    .insert({ owner_user_id: owner.user.id, name, mode, email, phone, address })
    .select("id, owner_user_id, name, email, phone, address, mode")
    .single();
  if (error) {
    console.error("insert business", error.message);
    return apiError("save_failed", "We couldn't save the business.", 500);
  }
  return json({ business: data }, 201);
}

export async function getBusiness(owner: OwnerContext) {
  const existing = await ownedBusiness(owner);
  if (existing.error) return existing.error;
  if (!existing.business) return apiError("business_required", "Save a business before loading quotes.", 404);
  return json({ business: existing.business });
}

async function requireBusiness(owner: OwnerContext) {
  const existing = await ownedBusiness(owner);
  if (existing.error) return existing;
  if (!existing.business) {
    return { error: apiError("business_required", "Save a business before creating quotes.", 409) };
  }
  return existing;
}

export async function listClients(owner: OwnerContext) {
  const existing = await requireBusiness(owner);
  if (existing.error || !existing.business) return existing.error!;
  const { data, error } = await owner.client
    .from("clients")
    .select("id, name, email, company, created_at")
    .eq("business_id", existing.business.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("list clients", error.message);
    return apiError("save_failed", "We couldn't load clients.", 500);
  }
  return json({ clients: data ?? [] });
}

export async function createClient(owner: OwnerContext, body: Record<string, unknown>) {
  const existing = await requireBusiness(owner);
  if (existing.error || !existing.business) return existing.error!;
  const parsed = parseClient(body);
  if ("error" in parsed) return parsed.error;
  const { data, error } = await owner.client
    .from("clients")
    .insert({ business_id: existing.business.id, ...parsed.client })
    .select("id, name, email, company, created_at")
    .single();
  if (error) {
    console.error("create client", error.message);
    return apiError("save_failed", "We couldn't save that client.", 500);
  }
  return json({ client: data }, 201);
}

function parseClient(body: Record<string, unknown>) {
  const name = asString(body.name, 120);
  if (!name) return { error: apiError("invalid", "Add the client name.", 400) };
  return {
    client: {
      name,
      email: asOptionalString(body.email, 200),
      company: asOptionalString(body.company, 160),
    },
  };
}

export async function createQuote(owner: OwnerContext, body: Record<string, unknown>) {
  const existing = await requireBusiness(owner);
  if (existing.error || !existing.business) return existing.error!;
  const built = await buildQuoteInsert(owner, existing.business, body);
  if (built instanceof Response) return built;

  const { data: quote, error } = await owner.client
    .from("quotes")
    .insert(built.quote)
    .select("id, number, title, kind, status, currency, tax_rate, notes, valid_until, created_at")
    .single();
  if (error || !quote) {
    console.error("create quote", error?.message);
    return apiError("save_failed", "We couldn't save that quote.", 500);
  }

  const lines = built.lines.map((line, position) => ({
    quote_id: quote.id,
    position,
    name: line.name,
    description: line.description,
    quantity: line.quantity,
    unit: line.unit,
    unit_price_cents: line.unitPriceCents,
  }));
  const { error: lineError } = await owner.client.from("quote_lines").insert(lines);
  if (lineError) {
    console.error("create lines", lineError.message);
    await owner.client.from("quotes").delete().eq("id", quote.id);
    return apiError("save_failed", "We couldn't save the line items.", 500);
  }

  return json({ quote: { ...quote, lines } }, 201);
}

export async function getQuote(owner: OwnerContext, id: string) {
  if (!isUuid(id)) return apiError("not_found", "No quote with that id.", 404);
  const existing = await requireBusiness(owner);
  if (existing.error || !existing.business) return existing.error!;
  const quote = await fetchOwnedQuote(owner, existing.business.id, id);
  if (!quote) return apiError("not_found", "No quote with that id on this account.", 404);
  return json({ quote });
}

export async function duplicateQuote(owner: OwnerContext, id: string) {
  if (!isUuid(id)) return apiError("not_found", "No quote with that id.", 404);
  const existing = await requireBusiness(owner);
  if (existing.error || !existing.business) return existing.error!;
  const source = await fetchOwnedQuote(owner, existing.business.id, id);
  if (!source) return apiError("not_found", "No quote with that id on this account.", 404);

  const number = await nextNumber(owner, existing.business.id, source.kind);
  const title = source.title.startsWith("Copy of ") ? source.title : `Copy of ${source.title}`.slice(0, 160);
  const { data: quote, error } = await owner.client
    .from("quotes")
    .insert({
      business_id: existing.business.id,
      client_id: source.client_id,
      number,
      title,
      kind: source.kind,
      status: "draft",
      currency: source.currency,
      tax_rate: source.tax_rate,
      notes: source.notes,
      valid_until: source.valid_until,
    })
    .select("id, number, title, kind, status")
    .single();
  if (error || !quote) {
    console.error("duplicate", error?.message);
    return apiError("save_failed", "We couldn't duplicate that quote.", 500);
  }

  const lines = (source.quote_lines ?? []).map((line: LineRow, position: number) => ({
    quote_id: quote.id,
    position,
    name: line.name,
    description: line.description,
    quantity: line.quantity,
    unit: line.unit,
    unit_price_cents: line.unit_price_cents,
  }));
  if (lines.length) {
    const { error: lineError } = await owner.client.from("quote_lines").insert(lines);
    if (lineError) {
      console.error("duplicate lines", lineError.message);
      return apiError("save_failed", "The copy was created, but the lines did not save.", 500);
    }
  }
  return json({ quote: { ...quote, lines } }, 201);
}

export async function sendQuote(owner: OwnerContext, id: string, body: Record<string, unknown>) {
  if (!isUuid(id)) return apiError("not_found", "No quote with that id.", 404);
  const existing = await requireBusiness(owner);
  if (existing.error || !existing.business) return existing.error!;
  const source = await fetchOwnedQuote(owner, existing.business.id, id);
  if (!source) return apiError("not_found", "No quote with that id on this account.", 404);
  if (!["draft", "sent", "changes_requested"].includes(source.status)) {
    return apiError("conflict", "Approved, invoiced, paid, and closed quotes can't be sent again.", 409);
  }
  if (!source.quote_lines?.length) return apiError("invalid", "Add at least one line before sending.", 400);

  const days = typeof body.expiresInDays === "number" ? body.expiresInDays : 45;
  if (!Number.isFinite(days) || days < 1 || days > 365) {
    return apiError("invalid", "expiresInDays must be between 1 and 365.", 400);
  }
  const now = new Date();
  let expires = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  if (source.valid_until && /^\d{4}-\d{2}-\d{2}$/.test(source.valid_until)) {
    const end = new Date(`${source.valid_until}T23:59:59.999Z`);
    if (end.getTime() < expires.getTime()) expires = end;
  }
  if (expires.getTime() <= now.getTime()) {
    return apiError("invalid", "The valid-until date is already past. Move it forward before sending.", 400);
  }

  const token = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  await owner.client
    .from("share_tokens")
    .update({ revoked_at: now.toISOString() })
    .eq("quote_id", id)
    .is("revoked_at", null);

  const { data: share, error: shareError } = await owner.client
    .from("share_tokens")
    .insert({ quote_id: id, token, expires_at: expires.toISOString() })
    .select("id, token, expires_at")
    .single();
  if (shareError || !share) {
    console.error("send token", shareError?.message);
    return apiError("save_failed", "We couldn't create the share link.", 500);
  }

  const { error: quoteError } = await owner.client
    .from("quotes")
    .update({
      status: "sent",
      sent_at: now.toISOString(),
      signer_name: null,
      decision_comment: null,
      decided_at: null,
    })
    .eq("id", id);
  if (quoteError) {
    console.error("send status", quoteError.message);
    return apiError("save_failed", "The link was created, but the quote status did not update.", 500);
  }

  await owner.client.from("quote_events").insert({
    quote_id: id,
    share_token_id: share.id,
    event_type: "sent",
  });

  return json({
    token: share.token,
    url: quoteUrl(share.token),
    expiresAt: share.expires_at,
    quoteId: id,
    status: "sent",
  });
}

const transitions: Record<string, string[]> = {
  draft: ["closed"],
  sent: ["closed"],
  changes_requested: ["closed"],
  approved: ["invoiced", "paid", "closed"],
  invoiced: ["paid", "closed"],
  expired: ["closed"],
  paid: [],
  closed: [],
};

export async function setQuoteStatus(owner: OwnerContext, id: string, body: Record<string, unknown>) {
  if (!isUuid(id)) return apiError("not_found", "No quote with that id.", 404);
  const status = asString(body.status, 32);
  if (!status || !["invoiced", "paid", "closed"].includes(status)) {
    return apiError("invalid", "Status must be invoiced, paid, or closed.", 400);
  }
  const existing = await requireBusiness(owner);
  if (existing.error || !existing.business) return existing.error!;
  const source = await fetchOwnedQuote(owner, existing.business.id, id);
  if (!source) return apiError("not_found", "No quote with that id on this account.", 404);
  const allowed = transitions[source.status] ?? [];
  if (!allowed.includes(status)) {
    return apiError("conflict", `A ${source.status} quote can't move to ${status}.`, 409);
  }
  const { error } = await owner.client.from("quotes").update({ status }).eq("id", id);
  if (error) {
    console.error("status", error.message);
    return apiError("save_failed", "We couldn't update the quote.", 500);
  }
  await owner.client.from("quote_events").insert({ quote_id: id, event_type: status });
  return json({ id, status });
}

async function buildQuoteInsert(owner: OwnerContext, business: BusinessRow, body: Record<string, unknown>) {
  const title = asString(body.title, 160);
  if (!title) return apiError("invalid", "Add a title.", 400);
  const kind: QuoteKind | null = body.kind === "estimate" ? "estimate" : body.kind === "proposal" ? "proposal" : null;
  if (!kind) return apiError("invalid", "Kind must be proposal or estimate.", 400);
  const currency = typeof body.currency === "string" ? body.currency.toUpperCase() : "USD";
  if (!CURRENCIES.has(currency)) return apiError("invalid", "Currency must be USD, CAD, GBP, EUR, or AUD.", 400);
  const taxRate = body.taxRate == null ? 0 : Number(body.taxRate);
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 1) {
    return apiError("invalid", "taxRate is a fraction from 0 to 1, such as 0.085 for 8.5%.", 400);
  }
  const notes = asOptionalString(body.notes, 4000);
  let validUntil: string | null = null;
  if (body.validUntil != null && body.validUntil !== "") {
    if (typeof body.validUntil !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(body.validUntil)) {
      return apiError("invalid", "validUntil must be a YYYY-MM-DD date.", 400);
    }
    validUntil = body.validUntil;
  }
  const lines = parseLines(body.lines);
  if (lines instanceof Response) return lines;
  const clientId = await resolveClientId(owner, business.id, body);
  if (clientId instanceof Response) return clientId;
  const number = await nextNumber(owner, business.id, kind);
  return {
    quote: {
      business_id: business.id,
      client_id: clientId,
      number,
      title,
      kind,
      status: "draft",
      currency,
      tax_rate: taxRate,
      notes,
      valid_until: validUntil,
    },
    lines,
  };
}

function parseLines(value: unknown) {
  if (!Array.isArray(value) || value.length === 0 || value.length > 50) {
    return apiError("invalid", "Add between 1 and 50 line items.", 400);
  }
  const lines: LineInput[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") return apiError("invalid", "Each line needs a name, quantity, and price.", 400);
    const row = raw as Record<string, unknown>;
    const name = asString(row.name, 160);
    if (!name) return apiError("invalid", "Each line needs a name.", 400);
    const quantity = Number(row.quantity);
    const unitPrice = Number(row.unitPrice);
    if (!Number.isFinite(quantity) || quantity < 0 || quantity > 100000) {
      return apiError("invalid", `Quantity for ${name} must be between 0 and 100000.`, 400);
    }
    if (!Number.isFinite(unitPrice) || unitPrice < 0 || unitPrice > 1000000) {
      return apiError("invalid", `Price for ${name} must be a dollar amount from 0 to 1000000.`, 400);
    }
    lines.push({
      name,
      description: asOptionalString(row.description, 500),
      quantity,
      unit: asOptionalString(row.unit, 24) ?? "ea",
      unitPriceCents: dollarsToCents(unitPrice),
    });
  }
  return lines;
}

async function resolveClientId(owner: OwnerContext, businessId: string, body: Record<string, unknown>) {
  if (typeof body.clientId === "string" && body.clientId) {
    if (!isUuid(body.clientId)) return apiError("invalid", "clientId must be a UUID.", 400);
    const { data } = await owner.client
      .from("clients")
      .select("id")
      .eq("id", body.clientId)
      .eq("business_id", businessId)
      .maybeSingle();
    if (!data) return apiError("invalid", "That client is not on this business.", 400);
    return body.clientId;
  }
  if (body.client && typeof body.client === "object") {
    const parsed = parseClient(body.client as Record<string, unknown>);
    if ("error" in parsed) return parsed.error;
    const { data, error } = await owner.client
      .from("clients")
      .insert({ business_id: businessId, ...parsed.client })
      .select("id")
      .single();
    if (error || !data) {
      console.error("quote client", error?.message);
      return apiError("save_failed", "We couldn't save the client on this quote.", 500);
    }
    return data.id as string;
  }
  return null;
}

async function nextNumber(owner: OwnerContext, businessId: string, kind: QuoteKind) {
  const { count } = await owner.client
    .from("quotes")
    .select("id", { count: "exact", head: true })
    .eq("business_id", businessId);
  const prefix = kind === "estimate" ? "E" : "Q";
  return `${prefix}-${(count ?? 0) + 1001}`;
}

type LineRow = {
  name: string;
  description: string | null;
  quantity: number;
  unit: string;
  unit_price_cents: number;
  position: number;
};

async function fetchOwnedQuote(owner: OwnerContext, businessId: string, id: string) {
  const { data, error } = await owner.client
    .from("quotes")
    .select(
      `id, business_id, client_id, number, title, kind, status, currency, tax_rate, notes, valid_until, sent_at,
       signer_name, decision_comment, decided_at, created_at,
       clients ( id, name, email, company ),
       quote_lines ( position, name, description, quantity, unit, unit_price_cents ),
       share_tokens ( token, expires_at, revoked_at, created_at )`,
    )
    .eq("id", id)
    .eq("business_id", businessId)
    .maybeSingle();
  if (error) {
    console.error("fetch quote", error.message);
    return null;
  }
  return data as (Record<string, unknown> & {
    kind: QuoteKind;
    status: string;
    title: string;
    currency: string;
    tax_rate: number;
    notes: string | null;
    valid_until: string | null;
    client_id: string | null;
    quote_lines: LineRow[] | null;
  }) | null;
}
