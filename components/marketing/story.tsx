"use client";

import { Shell } from "@/components/layout/shell";
import { storySteps } from "@/lib/content";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export function Story() {
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = pinRef.current;
      if (!root) return;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!desktop || reduce) return;

      gsap.registerPlugin(ScrollTrigger);
      const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
      const progress = root.querySelector(".story-progress");

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          refreshPriority: 1,
          snap: {
            snapTo: "labels",
            duration: { min: 0.15, max: 0.35 },
            delay: 0.06,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleY: self.progress });
            const index = Math.min(3, Math.floor(self.progress * 0.999 * 4));
            steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
          },
        },
      });

      tl.addLabel("quote", 0);
      tl.addLabel("link", 0.45);
      tl.to('[data-layer="quote"]', { autoAlpha: 0, y: -24, duration: 0.28 }, "link");
      tl.fromTo('[data-layer="link"]', { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.32 }, "link");
      tl.from(".link-stroke", { strokeDashoffset: 1, duration: 0.4, ease: "none" }, "link");
      tl.addLabel("yes", 0.95);
      tl.to('[data-layer="link"]', { autoAlpha: 0, y: -20, duration: 0.25 }, "yes");
      tl.fromTo('[data-layer="yes"]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.32 }, "yes");
      tl.from(".sign-stroke", { strokeDashoffset: 1, duration: 0.35, ease: "power1.out" }, "yes+=0.08");
      tl.addLabel("invoice", 1.45);
      tl.to('[data-layer="yes"]', { autoAlpha: 0, duration: 0.24 }, "invoice");
      tl.fromTo('[data-layer="invoice"]', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.32 }, "invoice");
      tl.from(".paid-stamp", { scale: 0.7, autoAlpha: 0, rotation: -14, duration: 0.3, ease: "back.out(1.7)" }, "invoice+=0.1");
    },
    { scope: pinRef },
  );

  return (
    <section id="story" className="bg-ink text-paper">
      <div className="story-stack">
        <Shell className="py-20">
          <p className="eyebrow text-mint">Quote, link, yes, invoice</p>
          <h2 className="display-sm mt-4 max-w-3xl">The whole product is one gesture.</h2>
          <div className="mt-14 space-y-16">
            {storySteps.map((step, index) => (
              <article key={step.title} className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <p className="font-mono text-sm text-mint">{step.index}</p>
                  <h3 className="mt-3 text-4xl tracking-[-0.04em]">{step.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-mist">{step.body}</p>
                </div>
                <StoryCard step={index} />
              </article>
            ))}
          </div>
        </Shell>
      </div>
      <div ref={pinRef} className="story-pin">
        <div className="flex h-[100dvh] items-center">
          <Shell className="grid w-full items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-white/15" aria-hidden="true">
                <div className="story-progress absolute inset-0 bg-mint" />
              </div>
              <p className="eyebrow pl-8 text-mint">Scroll the story</p>
              <ol className="mt-8 space-y-6 pl-8">
                {storySteps.map((step, index) => (
                  <li key={step.title} data-step={index} className={index === 0 ? "is-active" : undefined}>
                    <p className="font-mono text-xs text-mint">{step.index}</p>
                    <h3 className="mt-1 text-3xl tracking-[-0.04em]">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-mist">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative h-[540px]">
              <div className="story-layer" data-layer="quote">
                <StoryCard step={0} />
              </div>
              <div className="story-layer" data-layer="link">
                <StoryCard step={1} />
              </div>
              <div className="story-layer" data-layer="yes">
                <StoryCard step={2} />
              </div>
              <div className="story-layer" data-layer="invoice">
                <StoryCard step={3} />
              </div>
            </div>
          </Shell>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ step }: { step: number }) {
  return (
    <div className="flex h-[520px] flex-col justify-between rounded-[28px] bg-paper p-6 text-ink shadow-[0_30px_80px_-36px_rgba(0,0,0,0.45)]">
      {step === 0 ? <QuoteBeat /> : null}
      {step === 1 ? <LinkBeat /> : null}
      {step === 2 ? <YesBeat /> : null}
      {step === 3 ? <InvoiceBeat /> : null}
    </div>
  );
}

function QuoteBeat() {
  const lines = [
    ["Discovery workshop", "$1,800"],
    ["Art direction", "$2,400"],
    ["Marketing site", "$4,800"],
  ];
  return (
    <>
      <div>
        <p className="eyebrow text-slate">Proposal · Q-1048</p>
        <p className="mt-4 text-2xl tracking-[-0.04em]">Harbor Studio</p>
        <p className="mt-1 text-sm text-slate">Brand and website for the spring line</p>
        <ul className="quote-line mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {lines.map(([name, price]) => (
            <li key={name} className="flex justify-between py-3 text-sm">
              <span>{name}</span>
              <span className="tabular-nums">{price}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-right text-lg font-medium tabular-nums">$9,000</p>
    </>
  );
}

function LinkBeat() {
  return (
    <>
      <div>
        <p className="eyebrow text-yes">Share sheet</p>
        <p className="mt-4 text-3xl tracking-[-0.04em]">Sent.</p>
        <svg viewBox="0 0 320 48" className="mt-4 w-full text-yes" aria-hidden="true">
          <path className="link-stroke" pathLength={1} d="M4 32C40 32 48 10 96 14C150 18 150 40 220 24C260 16 280 20 316 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="mt-2 font-mono text-xs text-slate">getyeslo.com/q/harbor</p>
      </div>
      <ul className="grid grid-cols-3 gap-2 text-center text-sm">
        {["Messages", "Mail", "Copy"].map((item) => (
          <li key={item} className="rounded-2xl bg-mint py-4 text-ink">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function YesBeat() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-mint/60 p-2">
      <div className="p-3">
        <p className="eyebrow text-yes">Client view</p>
        <p className="mt-4 text-3xl tracking-[-0.04em]">Approved</p>
        <p className="mt-3 text-sm leading-6 text-slate">Jordan Hale read the spring line proposal and typed their name.</p>
      </div>
      <svg viewBox="0 0 320 70" className="text-yes" aria-hidden="true">
        <path className="sign-stroke" pathLength={1} d="M16 40C40 18 58 22 78 40C96 56 110 20 140 28C176 38 190 58 230 36C258 22 280 30 304 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function InvoiceBeat() {
  return (
    <>
      <div>
        <p className="eyebrow text-slate">Invoice · from Q-1048</p>
        <p className="mt-4 text-3xl tracking-[-0.04em]">Harbor Studio</p>
        <p className="mt-2 text-sm text-slate">Same lines. Same total. No retyping.</p>
        <p className="mt-8 text-4xl tracking-[-0.04em] tabular-nums">$9,000</p>
      </div>
      <div className="paid-stamp stamp self-end text-yes">Paid</div>
    </>
  );
}
