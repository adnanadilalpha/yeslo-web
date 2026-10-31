export type Mode = "freelancer" | "trades";
export type QuoteKind = "proposal" | "estimate";
export type QuoteStatus =
  | "draft"
  | "sent"
  | "approved"
  | "changes_requested"
  | "invoiced"
  | "paid"
  | "expired"
  | "closed";

export type QuotePhase =
  | "open"
  | "approved"
  | "changes_requested"
  | "invoiced"
  | "paid"
  | "expired"
  | "closed";

export type QuoteLine = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  unitPriceCents: number;
};

export type QuoteParty = {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
};

export type QuoteView = {
  number: string;
  title: string;
  kind: QuoteKind;
  mode: Mode;
  currency: string;
  taxRate: number;
  notes: string;
  validUntil: string | null;
  validityLabel?: string;
  business: QuoteParty;
  client: QuoteParty;
  lines: QuoteLine[];
  status: QuoteStatus;
};

export type DecisionIntent = "approved" | "changes_requested";

export type DecisionRecord = {
  intent: DecisionIntent;
  signerName: string;
  comment: string;
  decidedAt: string;
  ip: string | null;
  userAgent: string;
};

export type PublicQuote = {
  token: string;
  source: "demo" | "fixture" | "live";
  phase: QuotePhase;
  quote: QuoteView;
  decision: DecisionRecord | null;
  showSamples: boolean;
};
