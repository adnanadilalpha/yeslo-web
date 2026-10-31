import { addDays, toIsoDate } from "./money";
import { linesFrom, samples } from "./samples";
import { resolveQuotePhase } from "./state";
import type { DecisionRecord, PublicQuote, QuoteView } from "./types";

const DEMO_TOKENS = new Set(["demo", "demo-expired", "demo-closed", "demo-approved", "demo-changes"]);

export function isDemoToken(token: string) {
  return DEMO_TOKENS.has(token);
}

export function demoQuote(now: Date): QuoteView {
  const sample = samples.freelancer;
  return {
    number: sample.number,
    title: sample.title,
    kind: "proposal",
    mode: "freelancer",
    currency: "USD",
    taxRate: 0,
    notes: sample.notes,
    validUntil: toIsoDate(addDays(now, 45)),
    business: sample.business,
    client: sample.client,
    lines: linesFrom(sample.items),
    status: "sent",
  };
}

const approvedDecision: DecisionRecord = {
  intent: "approved",
  signerName: "Jordan Hale",
  comment: "",
  decidedAt: "2026-10-28T15:04:00.000Z",
  ip: "203.0.113.24",
  userAgent: "Sample browser",
};

const changesDecision: DecisionRecord = {
  intent: "changes_requested",
  signerName: "Jordan Hale",
  comment: "Can the marketing site stay at five pages if we drop the journal?",
  decidedAt: "2026-10-28T18:41:00.000Z",
  ip: "203.0.113.24",
  userAgent: "Sample browser",
};

export function fixtureQuote(token: string, now: Date, demoDecision: DecisionRecord | null): PublicQuote | null {
  if (!isDemoToken(token)) return null;
  const quote = demoQuote(now);

  if (token === "demo-expired") {
    const yesterday = toIsoDate(addDays(now, -2));
    quote.validUntil = yesterday;
    quote.status = "sent";
    return pack(token, quote, null, now, addDays(now, -1).toISOString(), null);
  }

  if (token === "demo-closed") {
    quote.status = "closed";
    return pack(token, quote, null, now, null, now.toISOString());
  }

  if (token === "demo-approved") {
    quote.status = "approved";
    return pack(token, quote, approvedDecision, now, null, null);
  }

  if (token === "demo-changes") {
    quote.status = "changes_requested";
    return pack(token, quote, changesDecision, now, null, null);
  }

  if (demoDecision) {
    quote.status = demoDecision.intent === "approved" ? "approved" : "changes_requested";
    return pack(token, quote, demoDecision, now, null, null);
  }

  return pack(token, quote, null, now, addDays(now, 45).toISOString(), null);
}

function pack(
  token: string,
  quote: QuoteView,
  decision: DecisionRecord | null,
  now: Date,
  expiresAt: string | null,
  revokedAt: string | null,
): PublicQuote {
  return {
    token,
    source: token === "demo" ? "demo" : "fixture",
    phase: resolveQuotePhase({
      status: quote.status,
      expiresAt,
      revokedAt,
      validUntil: quote.validUntil,
      now,
    }),
    quote,
    decision,
    showSamples: true,
  };
}

export function parseDecisionCookie(raw: string | undefined | null): DecisionRecord | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<DecisionRecord>;
    if (data.intent !== "approved" && data.intent !== "changes_requested") return null;
    if (typeof data.signerName !== "string" || typeof data.decidedAt !== "string") return null;
    if (Number.isNaN(new Date(data.decidedAt).getTime())) return null;
    return {
      intent: data.intent,
      signerName: data.signerName.slice(0, 80),
      comment: typeof data.comment === "string" ? data.comment.slice(0, 2000) : "",
      decidedAt: data.decidedAt,
      ip: typeof data.ip === "string" ? data.ip.slice(0, 64) : null,
      userAgent: typeof data.userAgent === "string" ? data.userAgent.slice(0, 400) : "",
    };
  } catch {
    return null;
  }
}
