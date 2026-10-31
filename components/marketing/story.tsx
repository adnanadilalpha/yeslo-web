"use client";

import { ApprovalScreen, IPhone, InvoiceScreen, QuoteScreen } from "@/components/marketing/devices";
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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
        const progress = root.querySelector(".story-progress");
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            refreshPriority: 1,
            onUpdate: (self) => {
              if (progress) gsap.set(progress, { scaleY: self.progress });
              const index = Math.min(3, Math.floor(self.progress * 0.999 * 4));
              steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
            },
          },
        });
        tl.addLabel("quote", 0);
        tl.from(".story-phone .q-line", { y: 14, autoAlpha: 0, stagger: 0.1, duration: 0.28, ease: "back.out(1.5)" }, "quote");
        tl.addLabel("link", 0.5);
        tl.fromTo(".share-pill", { autoAlpha: 0, x: -30, y: 10 }, { autoAlpha: 1, x: 120, y: -30, duration: 0.4, ease: "power3.out" }, "link");
        tl.addLabel("yes", 1.05);
        tl.to(".layer-quote", { autoAlpha: 0, duration: 0.25 }, "yes");
        tl.fromTo(".layer-yes", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, "yes");
        tl.to(".share-pill", { autoAlpha: 0, duration: 0.2 }, "yes");
        tl.from(".typed-name", { clipPath: "inset(0 100% 0 0)", duration: 0.35 }, "yes+=0.08");
        tl.fromTo(".yes-mark", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power2.inOut" }, "yes+=0.15");
        tl.addLabel("invoice", 1.7);
        tl.to(".layer-yes", { autoAlpha: 0, duration: 0.22 }, "invoice");
        tl.fromTo(".layer-invoice", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3 }, "invoice");
        tl.from(".paid-stamp", { scale: 0.7, autoAlpha: 0, rotation: -10, duration: 0.3, ease: "back.out(1.7)" }, "invoice+=0.12");
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="story" className="bg-ink text-paper">
      <div className="story-stack">
        <Shell className="space-y-24 py-24">
          <h2 className="display-sm max-w-3xl">Quote. Link. Yes. Invoice.</h2>
          {storySteps.map((step, index) => (
            <article key={step.title} className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="font-mono text-sm text-[#3FC79A]">{step.index}</p>
                <h3 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">{step.title}</h3>
                <p className="mt-3 max-w-md leading-7 text-mist">{step.body}</p>
              </div>
              <PhoneBeat beat={index} />
            </article>
          ))}
        </Shell>
      </div>
      <div ref={pinRef} className="story-pin">
        <div className="flex h-[100dvh] items-center">
          <Shell className="grid w-full items-center gap-8 lg:grid-cols-2">
            <div className="relative z-10 bg-ink pl-8">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-white/15" aria-hidden="true">
                <div className="story-progress absolute inset-0 origin-top bg-[#3FC79A]" />
              </div>
              <ol className="space-y-8">
                {storySteps.map((step, index) => (
                  <li key={step.title} data-step={index} className={index === 0 ? "is-active" : undefined}>
                    <p className="font-mono text-xs text-[#3FC79A]">{step.index}</p>
                    <h3 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-mist">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="story-stage relative flex justify-center">
              <IPhone className="story-phone">
                <div className="layer-quote absolute inset-0">
                  <QuoteScreen />
                </div>
                <div className="layer-yes absolute inset-0">
                  <ApprovalScreen />
                </div>
                <div className="layer-invoice absolute inset-0">
                  <InvoiceScreen />
                </div>
              </IPhone>
              <div className="share-pill">getyeslo.com/q/n0rth</div>
            </div>
          </Shell>
        </div>
      </div>
    </section>
  );
}

function PhoneBeat({ beat }: { beat: number }) {
  return (
    <div className="flex justify-center">
      <IPhone>
        {beat === 0 ? <QuoteScreen /> : null}
        {beat === 1 ? (
          <div className="relative h-full">
            <QuoteScreen />
            <div className="absolute right-4 bottom-16 rounded-full bg-[#111426] px-3 py-2 font-mono text-[11px] text-[#F7F7F4]">
              getyeslo.com/q/n0rth
            </div>
          </div>
        ) : null}
        {beat === 2 ? <ApprovalScreen /> : null}
        {beat === 3 ? <InvoiceScreen /> : null}
      </IPhone>
    </div>
  );
}
