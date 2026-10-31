"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";
import type { Mode } from "@/lib/quotes/types";
import { useState, type FormEvent } from "react";

export function WaitlistForm({ defaultRoute = "freelancer", source = "web" }: { defaultRoute?: Mode | "both"; source?: string }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [route, setRoute] = useState<Mode | "both">(defaultRoute);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "exists" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("pending");
    setMessage(null);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, route, source, website }),
      });
      const payload = (await response.json()) as { status?: string; error?: { message?: string } };
      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error?.message ?? `Email ${site.supportEmail} and we’ll add you.`);
        return;
      }
      setStatus(payload.status === "exists" ? "exists" : "ok");
    } catch {
      setStatus("error");
      setMessage(`Email ${site.supportEmail} and we’ll add you.`);
    }
  }

  if (status === "ok" || status === "exists") {
    return (
      <div className="rounded-[2rem] border border-white/15 bg-white/5 p-7 text-paper backdrop-blur">
        <p className="eyebrow text-mint">You’re on the list</p>
        <p className="mt-3 font-heading text-2xl font-bold tracking-[-0.04em]">
          {status === "exists" ? "That email was already here." : "We’ll write when a TestFlight seat is open."}
        </p>
        <button type="button" className="mt-5 text-sm text-mint" onClick={() => setStatus("idle")}>
          Add someone else
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-white/15 bg-white/5 p-7 backdrop-blur">
      <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${source}-name`} className="text-paper">
            Name
          </Label>
          <Input id={`${source}-name`} value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 border-white/20 bg-transparent text-paper" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor={`${source}-email`} className="text-paper">
            Email
          </Label>
          <Input
            id={`${source}-email`}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-11 border-white/20 bg-transparent text-paper"
            autoComplete="email"
          />
        </div>
      </div>
      <fieldset className="mt-4">
        <legend className="text-sm text-mist">I’m here for</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["freelancer", "Freelance"],
              ["trades", "Trades"],
              ["both", "Both"],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className={`cursor-pointer rounded-full px-3 py-2 text-sm ${route === value ? "bg-mint text-ink" : "bg-white/10 text-paper"}`}>
              <input className="sr-only" type="radio" name={`${source}-route`} value={value} checked={route === value} onChange={() => setRoute(value)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      {message ? (
        <p role="alert" className="mt-4 text-sm text-mint">
          {message}{" "}
          <a className="underline" href={`mailto:${site.supportEmail}?subject=Yeslo%20beta`}>
            {site.supportEmail}
          </a>
        </p>
      ) : null}
      <Button type="submit" variant="yes" size="xl" className="mt-5" disabled={status === "pending"}>
        {status === "pending" ? "Adding you…" : "Join the TestFlight beta"}
      </Button>
      <p className="mt-3 text-xs text-mist">Coming soon to the App Store. No store link until the listing is real.</p>
    </form>
  );
}
