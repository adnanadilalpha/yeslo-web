"use client";

import { Atmosphere } from "@/components/marketing/atmosphere";
import { ApprovalScreen, IPhone, MarkPaidScreen, QuoteScreen } from "@/components/marketing/devices";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { storySteps } from "@/lib/content";
import { useGSAP } from "@gsap/react";
import { cn } from "cn";
import gsap from "gsap";
import Link from "next/link";
import { useState, useRef, type ReactNode } from "react";

const screens: Record<(typeof storySteps)[number]["title"], ReactNode> = {
  Quote: <QuoteScreen />,
  Link: <QuoteScreen />,
  Yes: <ApprovalScreen />,
  Invoice: <MarkPaidScreen />,
};

const notes: Record<(typeof storySteps)[number]["title"], string> = {
  Quote: "You build the lines on the phone.",
  Link: "You send a link. They open it in a browser — no app, no account.",
  Yes: "They type their name. You get a push.",
  Invoice: "Same lines become the PDF. You mark it paid.",
};

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<(typeof storySteps)[number]["title"]>("Quote");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-hero]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07, ease: "power3.out", clearProps: "transform" },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24">
      <Atmosphere />
      <Shell className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p data-hero className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#3a4842] shadow-[0_8px_30px_-12px_rgb(7_17_14/25%)] dark:bg-card dark:text-muted-foreground">
              <span className="size-2 rounded-full bg-yes" aria-hidden="true" />
              Yeslo for iOS
            </p>
            <h1
              data-hero
              className="mt-8 font-heading text-[clamp(3rem,7vw,5.75rem)] leading-[0.92] font-bold tracking-[-0.055em] text-foreground"
            >
              Send a quote.
              <br />
              Get a <span className="ital-yes">yes</span>.
            </h1>
            <p data-hero className="mt-6 max-w-md text-[18px] leading-8 text-[#3a4842] dark:text-muted-foreground">
              One iOS app, two modes. Write the proposal or the estimate, send a link, and let your client approve by typing their name.
            </p>
            <div data-hero className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/#join" className={cn(buttonVariants({ variant: "ink", size: "xl" }), "bg-[#0a1210] text-white hover:bg-[#1a2420]")}>
                Join the TestFlight beta
              </Link>
              <Link href="/#story" className={cn(buttonVariants({ variant: "outline", size: "xl" }), "border-[#0a1210]/15 bg-white dark:bg-card")}>
                See how it works
              </Link>
            </div>
            <ul data-hero className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[#3a4842] dark:text-muted-foreground">
              <li>Free download</li>
              <li>No client account</li>
              <li>iPhone</li>
            </ul>
          </div>

          <div data-hero className="relative mx-auto w-full max-w-[320px] lg:max-w-85">
            <div className="pointer-events-none absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgb(199_240_222/70%),transparent_68%)] dark:bg-[radial-gradient(circle,rgb(27_184_122/20%),transparent_68%)]" aria-hidden="true" />
            <IPhone className="phone-full relative mx-auto">
              {screens[active]}
            </IPhone>
            <p className="relative mt-5 text-center text-sm leading-6 text-[#3a4842] dark:text-muted-foreground">{notes[active]}</p>
          </div>
        </div>

        <div data-hero className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="How Yeslo works">
          {storySteps.map((step) => {
            const selected = active === step.title;
            return (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(step.title)}
                className={cn(
                  "rounded-[1.5rem] border p-5 text-left transition-all",
                  selected
                    ? "border-transparent bg-[#0a1210] text-white shadow-[0_24px_50px_-24px_rgb(7_17_14/55%)]"
                    : "border-[#0a1210]/08 bg-white text-foreground hover:border-[#0a1210]/18 dark:border-border dark:bg-card",
                )}
              >
                <p className={cn("font-mono text-[11px] tracking-[0.14em]", selected ? "text-[#7dffa8]" : "text-yes")}>{step.index}</p>
                <p className="mt-2 font-heading text-xl font-bold tracking-[-0.03em]">{step.title}</p>
                <p className={cn("mt-2 text-sm leading-6", selected ? "text-white/70" : "text-[#3a4842] dark:text-muted-foreground")}>{step.kicker}</p>
              </button>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
