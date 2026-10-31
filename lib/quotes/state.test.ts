import assert from "node:assert/strict";
import test from "node:test";
import { formatMoney, lineTotalCents, summarize } from "./money.ts";
import { clientIp, parseSignerName, resolveQuotePhase } from "./state.ts";

test("line totals round to cents", () => {
  assert.equal(lineTotalCents({ quantity: 420, unitPriceCents: 340 }), 142800);
  assert.equal(lineTotalCents({ quantity: 0.5, unitPriceCents: 15000 }), 7500);
});

test("tax is rounded on the subtotal", () => {
  const summary = summarize(
    [
      { quantity: 1, unitPriceCents: 180000 },
      { quantity: 2, unitPriceCents: 100 },
    ],
    0.085,
  );
  assert.equal(summary.subtotalCents, 180200);
  assert.equal(summary.taxCents, 15317);
  assert.equal(summary.totalCents, 195517);
});

test("money formats USD", () => {
  assert.equal(formatMoney(999, "USD"), "$9.99");
  assert.equal(formatMoney(7900, "USD"), "$79.00");
});

test("full names are required", () => {
  assert.equal(parseSignerName("Jordan Hale"), "Jordan Hale");
  assert.equal(parseSignerName("  ada   lovelace "), "ada lovelace");
  assert.equal(parseSignerName("Madonna"), null);
  assert.equal(parseSignerName("J"), null);
  assert.equal(parseSignerName("Li Na"), "Li Na");
});

test("open quotes expire after the valid day", () => {
  const phase = resolveQuotePhase({
    status: "sent",
    expiresAt: null,
    revokedAt: null,
    validUntil: "2026-10-01",
    now: new Date("2026-10-02T00:00:00.000Z"),
  });
  assert.equal(phase, "expired");
});

test("an approval still shows after the valid day", () => {
  const phase = resolveQuotePhase({
    status: "approved",
    expiresAt: "2020-01-01T00:00:00.000Z",
    revokedAt: null,
    validUntil: "2020-01-01",
    now: new Date("2026-10-31T00:00:00.000Z"),
  });
  assert.equal(phase, "approved");
});

test("a revoked link is closed", () => {
  const phase = resolveQuotePhase({
    status: "sent",
    expiresAt: null,
    revokedAt: "2026-10-01T00:00:00.000Z",
    validUntil: null,
    now: new Date("2026-10-31T00:00:00.000Z"),
  });
  assert.equal(phase, "closed");
});

test("client ip reads the first forwarded address", () => {
  const headers = new Headers({ "x-forwarded-for": "203.0.113.8, 10.0.0.1" });
  assert.equal(clientIp(headers), "203.0.113.8");
  assert.equal(clientIp(new Headers({ "x-forwarded-for": "not-an-ip" })), null);
});
