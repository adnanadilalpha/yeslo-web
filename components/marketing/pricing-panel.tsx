"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";
import { useState } from "react";

const plans = {
  month: { price: "$9.99", cadence: "a month", note: "Cancel any month, once it’s on the App Store." },
  year: { price: "$79", cadence: "a year", note: "About $6.58 a month. Four months free versus paying monthly." },
};

export function PricingPanel() {
  const [cycle, setCycle] = useState<"month" | "year">("year");
  const pro = plans[cycle];

  return (
    <div>
      <div className="inline-flex rounded-full border border-border p-1" role="radiogroup" aria-label="Billing period">
        {(["month", "year"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={cycle === option}
            onClick={() => setCycle(option)}
            className={cn("h-10 rounded-full px-4 text-sm", cycle === option ? "bg-ink text-paper" : "text-muted-foreground")}
          >
            {option === "month" ? "Monthly" : "Yearly"}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="rounded-[2rem] glass-panel p-8">
          <p className="eyebrow text-yes">Free</p>
          <p className="mt-4 font-heading text-5xl font-bold tracking-tighter">$0</p>
          <p className="mt-2 text-muted-foreground">3 sent quotes a month. Both modes.</p>
          <ul className="mt-6 space-y-2 text-sm leading-6">
            <li>Item library on the phone</li>
            <li>Client links, with no account for them</li>
            <li>Invoice PDF and mark paid</li>
            <li>Duplicates that don’t count until you send</li>
          </ul>
          <Link href="/pricing#join" className={cn(buttonVariants({ variant: "outline", size: "xl" }), "mt-8 w-full")}>
            Use it free in the beta
          </Link>
        </article>
        <article className="rounded-[2rem] bg-ink p-8 text-paper shadow-[0_30px_80px_-36px_rgb(7_17_14/55%)]">
          <p className="eyebrow text-mint">Pro</p>
          <p className="mt-4 font-heading text-5xl font-bold tracking-tighter">
            {pro.price}
            <span className="ml-2 text-lg font-medium text-mist">{pro.cadence}</span>
          </p>
          <p className="mt-2 text-mist">{pro.note}</p>
          <ul className="mt-6 space-y-2 text-sm leading-6">
            <li>Unlimited sent quotes</li>
            <li>Everything in Free</li>
            <li>Same approval record, same invoice path</li>
            <li>Billed by Apple when the App Store version ships</li>
          </ul>
          <Link href="/pricing#join" className={cn(buttonVariants({ variant: "yes", size: "xl" }), "mt-8 w-full")}>
            Join the TestFlight beta
          </Link>
        </article>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-6 text-muted-foreground">
        You can’t buy Pro on this website. During TestFlight the beta is free. When Yeslo is on the App Store, Pro is {plans.month.price} a month or {plans.year.price} a year through Apple.
      </p>
    </div>
  );
}
