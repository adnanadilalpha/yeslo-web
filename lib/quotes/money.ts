import type { QuoteLine } from "./types";

export function lineTotalCents(line: Pick<QuoteLine, "quantity" | "unitPriceCents">) {
  if (!Number.isFinite(line.quantity) || !Number.isFinite(line.unitPriceCents)) return 0;
  return Math.round(line.quantity * line.unitPriceCents);
}

export function summarize(lines: Pick<QuoteLine, "quantity" | "unitPriceCents">[], taxRate: number) {
  const subtotalCents = lines.reduce((sum, line) => sum + lineTotalCents(line), 0);
  const rate = Number.isFinite(taxRate) ? Math.min(Math.max(taxRate, 0), 1) : 0;
  const taxCents = Math.round(subtotalCents * rate);
  return {
    subtotalCents,
    taxCents,
    totalCents: subtotalCents + taxCents,
    taxRate: rate,
  };
}

export function formatMoney(cents: number, currency = "USD") {
  const safe = Number.isFinite(cents) ? cents : 0;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
    }).format(safe / 100);
  } catch {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(safe / 100);
  }
}

export function formatQty(value: number) {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

export function formatDay(isoDate: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(date);
}

export function formatStamp(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
  return `${formatted} UTC`;
}

export function addDays(from: Date, days: number) {
  const next = new Date(from.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function dollarsToCents(value: number) {
  return Math.round(value * 100);
}
