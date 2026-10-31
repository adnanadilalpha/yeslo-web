"use client";

import { Flourish } from "@/components/brand/marks";
import { QuoteDocument } from "@/components/quote/document";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatStamp } from "@/lib/quotes/money";
import type { DecisionRecord, PublicQuote, QuotePhase } from "@/lib/quotes/types";
import { cn } from "cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const samples = [
  { href: "/q/demo", label: "Open sample" },
  { href: "/q/demo-approved", label: "Recorded yes" },
  { href: "/q/demo-changes", label: "Changes" },
  { href: "/q/demo-expired", label: "Expired" },
  { href: "/q/demo-closed", label: "Closed" },
];

export function QuoteExperience({ model }: { model: PublicQuote }) {
  const router = useRouter();
  const [override, setOverride] = useState<{ phase: QuotePhase; decision: DecisionRecord } | null>(null);
  const [cleared, setCleared] = useState(false);
  const phase = cleared ? "open" : (override?.phase ?? model.phase);
  const decision = cleared ? null : (override?.decision ?? model.decision);
  const open = phase === "open" && !decision;
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<"approve" | "changes" | "reset" | null>(null);

  async function submit(intent: "approve" | "changes") {
    setError(null);
    if (!agreed) {
      setError("Tick the box to record your decision.");
      return;
    }
    if (name.trim().split(/\s+/).length < 2) {
      setError("Enter your first and last name.");
      return;
    }
    if (intent === "changes" && comment.trim().length < 2) {
      setError("Tell them what you want changed.");
      return;
    }
    setPending(intent);
    try {
      const response = await fetch(`/api/q/${encodeURIComponent(model.token)}/decision`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intent, signerName: name, comment, agreed: true }),
      });
      const payload = (await response.json()) as {
        phase?: QuotePhase;
        decision?: DecisionRecord;
        error?: { message?: string };
      };
      if (payload.decision && payload.phase) {
        setCleared(false);
        setOverride({ phase: payload.phase, decision: payload.decision });
        if (!response.ok) setError(payload.error?.message ?? null);
        router.refresh();
        return;
      }
      setError(payload.error?.message ?? "We couldn't record that. Try again.");
    } catch {
      setError("We couldn't record that. Check the connection and try again.");
    } finally {
      setPending(null);
    }
  }

  async function resetDemo() {
    setPending("reset");
    setError(null);
    try {
      const response = await fetch("/api/q/demo/decision", { method: "DELETE" });
      if (!response.ok) {
        setError("The sample didn't reset. Reload and try again.");
        return;
      }
      setCleared(true);
      setOverride(null);
      setName("");
      setComment("");
      setAgreed(false);
      router.refresh();
    } catch {
      setError("The sample didn't reset. Reload and try again.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-16">
      <div>
        {model.showSamples ? (
          <p className="mb-6 max-w-xl text-sm leading-6 text-muted-foreground">
            This is a sample stored in your browser, so you can try the real approval flow with no account and no database.{" "}
            <Link href="/" className="text-yes">
              Back to Yeslo
            </Link>
          </p>
        ) : null}
        <StatusBanner phase={phase} decision={decision} business={model.quote.business.name} />
        <QuoteDocument quote={model.quote} phase={phase} signerName={decision?.signerName} />
      </div>
      <aside className="lg:pt-16">
        {open ? (
          <form
            className="rounded-[28px] border border-border bg-card p-5"
            onSubmit={(event) => {
              event.preventDefault();
              const submitter = (event.nativeEvent as SubmitEvent).submitter;
              const intent = submitter instanceof HTMLButtonElement && submitter.value === "changes" ? "changes" : "approve";
              void submit(intent);
            }}
          >
            <p className="eyebrow text-yes">Your decision</p>
            <h2 className="mt-3 text-2xl tracking-[-0.04em]">Type your name. That’s the record.</h2>
            <div className="mt-5 space-y-2">
              <Label htmlFor="signer-name">Full name</Label>
              <Input
                id="signer-name"
                name="signerName"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jordan Hale"
                className="h-11 rounded-xl px-3 text-base"
                required
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="change-note">If you want a change</Label>
              <Textarea
                id="change-note"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Ask for a different scope, price, or date."
                className="min-h-28 rounded-xl px-3 text-base"
              />
            </div>
            <Label className="mt-4 items-start gap-3 text-sm leading-5 font-normal text-muted-foreground">
              <Checkbox checked={agreed} onCheckedChange={(checked) => setAgreed(checked)} className="mt-0.5 size-5" />
              <span>
                I read this {model.quote.kind}. Typing my name records my decision for {model.quote.business.name}. This is a record of
                agreement, not legal advice.
              </span>
            </Label>
            {error ? (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <div className="mt-5 flex flex-col gap-2">
              <Button type="submit" name="intent" value="approve" variant="yes" size="xl" disabled={pending !== null}>
                {pending === "approve" ? "Recording…" : "Approve"}
              </Button>
              <Button type="submit" name="intent" value="changes" variant={model.quote.mode === "trades" ? "amber" : "ink"} size="xl" disabled={pending !== null}>
                {pending === "changes" ? "Sending…" : "Request changes"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="rounded-[28px] border border-border bg-card p-5">
            <p className="eyebrow text-yes">{phase === "expired" || phase === "closed" ? "Closed" : "Recorded"}</p>
            <h2 className="mt-3 text-2xl tracking-[-0.04em]">{headline(phase)}</h2>
            {decision ? (
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Name" value={decision.signerName} />
                <Row label="Decision" value={decision.intent === "approved" ? "Approved" : "Changes requested"} />
                <Row label="When" value={formatStamp(decision.decidedAt)} />
                <Row label="IP address" value={decision.ip ?? "Not available"} />
                <Row label="Browser" value={decision.userAgent || "Not available"} />
                {decision.comment ? <Row label="Note" value={decision.comment} /> : null}
              </dl>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{closedCopy(phase, model.quote.business.name)}</p>
            )}
            {phase !== "expired" && phase !== "closed" ? <Flourish className="mt-6 w-32" draw /> : null}
            {model.source === "demo" && !open ? (
              <Button type="button" variant="outline" className="mt-6 h-11 rounded-full px-4" onClick={() => void resetDemo()} disabled={pending !== null}>
                {pending === "reset" ? "Resetting…" : "Reset this sample"}
              </Button>
            ) : null}
            {error ? (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        )}
        {model.showSamples ? (
          <ul className="mt-6 space-y-2 text-sm">
            {samples.map((sample) => (
              <li key={sample.href}>
                <Link href={sample.href} className={cn("text-muted-foreground hover:text-foreground", sample.href === `/q/${model.token}` && "text-yes")} aria-current={sample.href === `/q/${model.token}` ? "page" : undefined}>
                  {sample.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
    </div>
  );
}

function StatusBanner({ phase, decision, business }: { phase: QuotePhase; decision: DecisionRecord | null; business: string }) {
  if (phase === "open") return null;
  const text =
    phase === "expired"
      ? `This quote has expired. Ask ${business} for a new link. You can still read it.`
      : phase === "closed"
        ? "This quote was closed. No further response can be recorded."
        : phase === "changes_requested"
          ? `${decision?.signerName ?? "The client"} requested changes.`
          : phase === "invoiced"
            ? "Approved, then marked as an invoice."
            : phase === "paid"
              ? "Approved, then marked paid."
              : `Approved by ${decision?.signerName ?? "the client"}.`;
  return (
    <p className="mb-4 rounded-2xl border border-border bg-card px-4 py-3 text-sm leading-6" role="status">
      {text}
    </p>
  );
}

function headline(phase: QuotePhase) {
  if (phase === "expired") return "The link is past its date.";
  if (phase === "closed") return "The sender closed this quote.";
  if (phase === "changes_requested") return "The change request is on the record.";
  if (phase === "paid") return "Marked paid.";
  if (phase === "invoiced") return "Turned into an invoice.";
  return "The yes is on the record.";
}

function closedCopy(phase: QuotePhase, business: string) {
  if (phase === "expired") return `${business} can send a fresh link. This page will not take a new decision.`;
  return `${business} closed the link. This page will not take a new decision.`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="mt-1 leading-6 break-words">{value}</dd>
    </div>
  );
}
