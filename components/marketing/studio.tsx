"use client";

import { QuoteDocument } from "@/components/quote/document";
import { Shell } from "@/components/layout/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatMoney, summarize } from "@/lib/quotes/money";
import { linesFrom, samples, type LibraryItem } from "@/lib/quotes/samples";
import type { Mode, QuoteLine, QuotePhase, QuoteView } from "@/lib/quotes/types";
import { cn } from "cn";
import Link from "next/link";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

export function Studio() {
  const [mode, setMode] = useState<Mode>("freelancer");
  const sample = samples[mode];
  const [lines, setLines] = useState<QuoteLine[]>(() => linesFrom(samples.freelancer.items.slice(0, 2)));
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState(samples.freelancer.notes);
  const [phase, setPhase] = useState<QuotePhase>("open");
  const [signer, setSigner] = useState(samples.freelancer.client.name);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  function switchMode(next: Mode) {
    const nextSample = samples[next];
    setMode(next);
    setLines(linesFrom(nextSample.items.slice(0, 2)));
    setNotes(nextSample.notes);
    setSigner(nextSample.client.name);
    setPhase("open");
    setComment("");
    setTaxRate(next === "trades" ? 0.085 : 0);
  }

  function add(item: LibraryItem) {
    setLines((current) => {
      const found = current.find((line) => line.name === item.name);
      if (found) {
        return current.map((line) => (line.name === item.name ? { ...line, quantity: line.quantity + (item.quantity > 1 ? 1 : item.quantity) } : line));
      }
      return [...current, { ...item, id: `add-${item.name}-${current.length}` }];
    });
    setPhase("open");
  }

  const quote: QuoteView = useMemo(
    () => ({
      number: sample.number,
      title: sample.title,
      kind: sample.kind,
      mode,
      currency: "USD",
      taxRate,
      notes,
      validUntil: null,
      validityLabel: "Valid for 30 days",
      business: sample.business,
      client: sample.client,
      lines,
      status: phase === "open" ? "sent" : phase === "changes_requested" ? "changes_requested" : "approved",
    }),
    [sample, mode, taxRate, notes, lines, phase],
  );

  const total = summarize(lines, taxRate).totalCents;

  return (
    <section id="studio" className="py-20 lg:py-28">
      <Shell>
        <p className="eyebrow text-yes">A live preview</p>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="display-sm max-w-3xl">Write a quote. Watch the client view move.</h2>
          <div role="radiogroup" aria-label="Sample mode" className="flex rounded-full border border-border p-1">
            {(["freelancer", "trades"] as const).map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={mode === option}
                onClick={() => switchMode(option)}
                className={cn(
                  "h-10 rounded-full px-4 text-sm",
                  mode === option ? (option === "trades" ? "bg-amber text-ink" : "bg-ink text-paper") : "text-muted-foreground",
                )}
              >
                {option === "freelancer" ? "Freelancer" : "Trades"}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Nothing here is saved. Add a line, change a price, then pretend you are the client. The recorded version is the{" "}
          <Link href="/q/demo" className="text-yes">
            sample client page
          </Link>
          .
        </p>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="order-2 lg:order-1">
            <div className="sticky top-20 z-20 mb-4 flex items-center justify-between rounded-full border border-border bg-background/90 px-4 py-2 backdrop-blur lg:static">
              <span className="text-sm">Client total</span>
              <span className="font-medium tabular-nums">{formatMoney(total)}</span>
            </div>
            <p className="eyebrow">Item library</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {sample.items.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => add(item)}
                    className="rounded-full border border-border px-3 py-2 text-left text-sm hover:border-yes hover:text-yes"
                  >
                    {item.name}
                    <span className="ml-2 font-mono text-[11px] text-muted-foreground">{formatMoney(item.unitPriceCents)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="grid gap-3 rounded-2xl border border-border p-4 sm:grid-cols-[1fr_120px_140px_auto]">
                  <div>
                    <p className="font-medium">{line.name}</p>
                    <p className="text-sm text-muted-foreground">{line.description}</p>
                  </div>
                  <label className="text-xs text-muted-foreground">
                    Qty
                    <Input
                      className="mt-1 h-11"
                      type="number"
                      min={0}
                      step="1"
                      aria-label={`Quantity for ${line.name}`}
                      value={line.quantity}
                      onChange={(event) => updateLine(setLines, line.id, { quantity: Math.max(0, Number(event.target.value) || 0) })}
                    />
                  </label>
                  <label className="text-xs text-muted-foreground">
                    Price
                    <Input
                      className="mt-1 h-11"
                      type="number"
                      min={0}
                      step="0.01"
                      aria-label={`Price for ${line.name}`}
                      value={(line.unitPriceCents / 100).toString()}
                      onChange={(event) =>
                        updateLine(setLines, line.id, {
                          unitPriceCents: Math.max(0, Math.round((Number(event.target.value) || 0) * 100)),
                        })
                      }
                    />
                  </label>
                  <button type="button" className="self-end text-sm text-muted-foreground hover:text-foreground" onClick={() => setLines((current) => current.filter((item) => item.id !== line.id))}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="tax-rate">Tax</Label>
                <select
                  id="tax-rate"
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-transparent px-3"
                  value={String(taxRate)}
                  onChange={(event) => setTaxRate(Number(event.target.value))}
                >
                  <option value="0">No tax</option>
                  <option value="0.085">8.5%</option>
                  <option value="0.1">10%</option>
                </select>
              </div>
              <div>
                <Label htmlFor="studio-note">Note</Label>
                <Textarea id="studio-note" className="mt-2 min-h-24" value={notes} onChange={(event) => setNotes(event.target.value)} />
              </div>
            </div>
          </div>
          <div className="order-1 lg:sticky lg:top-24 lg:order-2">
            <div id="client-view">
              <QuoteDocument quote={quote} phase={phase} signerName={phase === "open" ? null : signer} />
            </div>
            <p className="sr-only" aria-live="polite">
              Client total {formatMoney(total)}
            </p>
            {phase === "open" ? (
              <form
                className="mt-4 rounded-3xl border border-border p-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const submitter = (event.nativeEvent as SubmitEvent).submitter;
                  const next = submitter instanceof HTMLButtonElement && submitter.value === "changes" ? "changes_requested" : "approved";
                  if (signer.trim().split(/\s+/).length < 2) {
                    setFormError("Enter a first and last name.");
                    return;
                  }
                  if (next === "changes_requested" && comment.trim().length < 2) {
                    setFormError("Add a short note about the change.");
                    return;
                  }
                  setFormError(null);
                  setPhase(next);
                }}
              >
                <p className="text-sm text-muted-foreground">Pretend you are {sample.client.name}.</p>
                <Label htmlFor="studio-signer" className="mt-3">
                  Full name
                </Label>
                <Input id="studio-signer" className="mt-2 h-11" value={signer} onChange={(event) => setSigner(event.target.value)} />
                <Label htmlFor="studio-comment" className="mt-3">
                  Change note
                </Label>
                <Textarea id="studio-comment" className="mt-2" value={comment} onChange={(event) => setComment(event.target.value)} />
                {formError ? (
                  <p role="alert" className="mt-3 text-sm text-destructive">
                    {formError}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-col gap-2">
                  <Button type="submit" value="approve" variant="yes" size="lg">
                    Approve in the preview
                  </Button>
                  <Button type="submit" value="changes" variant={mode === "trades" ? "amber" : "outline"} size="lg">
                    Request a change
                  </Button>
                </div>
              </form>
            ) : (
              <Button type="button" variant="outline" className="mt-4 h-11 rounded-full" onClick={() => setPhase("open")}>
                Edit the quote again
              </Button>
            )}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function updateLine(setLines: Dispatch<SetStateAction<QuoteLine[]>>, id: string, patch: Partial<QuoteLine>) {
  setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
}
