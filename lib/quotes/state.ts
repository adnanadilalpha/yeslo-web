import type { QuotePhase, QuoteStatus } from "./types";

export function resolveQuotePhase(input: {
  status: QuoteStatus;
  expiresAt: string | null;
  revokedAt: string | null;
  validUntil: string | null;
  now: Date;
}): QuotePhase {
  if (input.revokedAt) {
    const revoked = new Date(input.revokedAt);
    if (!Number.isNaN(revoked.getTime()) && revoked.getTime() <= input.now.getTime()) {
      return "closed";
    }
  }

  if (input.status === "closed") return "closed";
  if (input.status === "paid") return "paid";
  if (input.status === "invoiced") return "invoiced";
  if (input.status === "approved") return "approved";
  if (input.status === "changes_requested") return "changes_requested";
  if (isExpired(input)) return "expired";
  return "open";
}

function isExpired(input: {
  status: QuoteStatus;
  expiresAt: string | null;
  validUntil: string | null;
  now: Date;
}) {
  if (input.status === "expired") return true;
  if (input.expiresAt) {
    const expires = new Date(input.expiresAt);
    if (!Number.isNaN(expires.getTime()) && expires.getTime() <= input.now.getTime()) return true;
  }
  if (input.validUntil && /^\d{4}-\d{2}-\d{2}$/.test(input.validUntil)) {
    const end = new Date(`${input.validUntil}T23:59:59.999Z`);
    if (end.getTime() < input.now.getTime()) return true;
  }
  return false;
}

export function parseSignerName(input: unknown) {
  if (typeof input !== "string") return null;
  const name = input.trim().replace(/\s+/g, " ");
  if (name.length < 3 || name.length > 80) return null;
  if (!/^[\p{L}][\p{L}\s.'-]+$/u.test(name)) return null;
  const parts = name.split(" ").filter(Boolean);
  if (parts.length < 2) return null;
  if (parts.some((part) => !/\p{L}/u.test(part))) return null;
  return name;
}

export function parseComment(input: unknown, required: boolean) {
  if (input == null || input === "") return required ? null : "";
  if (typeof input !== "string") return null;
  const comment = input.trim();
  if (required && comment.length < 2) return null;
  if (comment.length > 2000) return null;
  return comment;
}

export function clientIp(headerList: Headers) {
  const forwarded = headerList.get("x-forwarded-for");
  const raw = (forwarded?.split(",")[0] ?? headerList.get("x-real-ip") ?? "").trim().replace(/^::ffff:/, "");
  if (!raw || raw.length > 64) return null;
  const v4 = /^(?:\d{1,3}\.){3}\d{1,3}$/;
  const v6 = /^[0-9a-fA-F:]+$/;
  if (!v4.test(raw) && !v6.test(raw)) return null;
  if (v4.test(raw) && raw.split(".").some((part) => Number(part) > 255)) return null;
  return raw;
}
