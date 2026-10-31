import { formatDay, formatMoney, formatQty, summarize } from "@/lib/quotes/money";
import type { QuotePhase, QuoteView } from "@/lib/quotes/types";
import { cn } from "cn";

export function QuoteDocument({
  quote,
  phase,
  signerName,
  compact = false,
}: {
  quote: QuoteView;
  phase?: QuotePhase | null;
  signerName?: string | null;
  compact?: boolean;
}) {
  const totals = summarize(quote.lines, quote.taxRate);
  const kind = quote.kind === "estimate" ? "Estimate" : "Proposal";
  const accent = quote.mode === "trades" ? "bg-amber" : "bg-yes";
  const stamp =
    phase === "paid" ? "Paid" : phase === "invoiced" ? "Invoiced" : phase === "approved" ? "Approved" : phase === "changes_requested" ? "Changes" : null;

  return (
    <article className={cn("relative overflow-hidden rounded-[28px] bg-paper text-ink shadow-[0_30px_80px_-40px_rgba(17,20,38,0.55)]", compact && "rounded-3xl")}>
      <div className={cn("h-1.5", accent)} />
      <div className={cn("px-5 py-6 sm:px-7", compact ? "sm:py-6" : "sm:py-8", stamp && "pb-28")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-slate">{kind}</p>
            <p className="mt-2 font-medium tracking-tight">{quote.business.name}</p>
            {quote.business.address ? <p className="text-sm text-slate">{quote.business.address}</p> : null}
          </div>
          <p className="font-mono text-xs text-slate">{quote.number}</p>
        </div>
        <h2 className={cn("mt-6 tracking-[-0.04em]", compact ? "text-2xl" : "text-3xl")}>{quote.title}</h2>
        <p className="mt-3 text-sm text-slate">
          Prepared for {quote.client.name}
          {quote.client.company ? `, ${quote.client.company}` : ""}
        </p>
        <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {quote.lines.map((line) => (
            <div key={line.id} className="grid grid-cols-[1fr_auto] gap-4 py-3">
              <div>
                <p className="font-medium">{line.name}</p>
                {line.description ? <p className="mt-1 text-sm leading-5 text-slate">{line.description}</p> : null}
                <p className="mt-1 font-mono text-[11px] tracking-wide text-slate">
                  {formatQty(line.quantity)} {line.unit} · {formatMoney(line.unitPriceCents, quote.currency)}
                </p>
              </div>
              <p className="font-medium tabular-nums">{formatMoney(Math.round(line.quantity * line.unitPriceCents), quote.currency)}</p>
            </div>
          ))}
        </div>
        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate">Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(totals.subtotalCents, quote.currency)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate">Tax {quote.taxRate ? `${(quote.taxRate * 100).toFixed(quote.taxRate * 100 % 1 === 0 ? 0 : 1)}%` : "0%"}</dt>
            <dd className="tabular-nums">{formatMoney(totals.taxCents, quote.currency)}</dd>
          </div>
          <div className="flex justify-between pt-2 text-base font-medium">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(totals.totalCents, quote.currency)}</dd>
          </div>
        </dl>
        {quote.notes ? <p className="mt-5 text-sm leading-6 text-slate">{quote.notes}</p> : null}
        <p className="mt-4 font-mono text-[11px] tracking-wide text-slate">
          {quote.validityLabel ?? (quote.validUntil ? `Valid through ${formatDay(quote.validUntil)}` : "No expiry date")}
        </p>
        {stamp ? (
          <div
            className={cn(
              "stamp stamp-in absolute right-6 bottom-6",
              phase === "approved" || phase === "paid" ? "text-yes" : phase === "changes_requested" ? "text-ink" : "text-ink",
              phase === "changes_requested" && "border-amber",
            )}
          >
            {stamp}
          </div>
        ) : null}
        {signerName && phase && phase !== "open" && phase !== "expired" && phase !== "closed" ? (
          <p className="mt-6 border-t border-ink/10 pt-4 font-mono text-xs tracking-wide text-slate">Signed {signerName}</p>
        ) : null}
      </div>
    </article>
  );
}
