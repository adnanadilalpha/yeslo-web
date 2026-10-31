"use client";

import { ApprovalScreen, IPhone, InvoiceScreen, MarkPaidScreen, QuoteScreen } from "@/components/marketing/devices";
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
        const bar = root.querySelector(".story-progress");
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            refreshPriority: 1,
            onUpdate: (self) => {
              if (bar) gsap.set(bar, { scaleY: self.progress });
              const index = Math.min(3, Math.floor(self.progress * 0.999 * 4));
              steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
            },
          },
        });
        tl.addLabel("quote", 0);
        tl.addLabel("link", 0.45);
        tl.fromTo(".share-pill", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 160, duration: 0.4, ease: "power3.inOut" }, "link");
        tl.addLabel("yes", 1);
        tl.to(".share-pill", { autoAlpha: 0, duration: 0.15 }, "yes");
        tl.to(".layer-wait", { autoAlpha: 0, duration: 0.2 }, "yes");
        tl.fromTo(".layer-yes", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, "yes+=0.2");
        tl.from(".typed-name", { clipPath: "inset(0 100% 0 0)", duration: 0.3 }, "yes+=0.28");
        tl.fromTo(".yes-mark", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.4 }, "yes+=0.35");
        tl.addLabel("invoice", 1.65);
        tl.to(".layer-yes", { autoAlpha: 0, duration: 0.18 }, "invoice");
        tl.fromTo(".layer-invoice", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22 }, "invoice+=0.18");
        tl.to(".phone-quote", { autoAlpha: 0, duration: 0.18 }, "invoice");
        tl.fromTo(".phone-paid", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22 }, "invoice+=0.18");
        tl.fromTo(
          ".paid-stamp",
          { scale: 1.28, autoAlpha: 0, rotation: -16 },
          { scale: 1, autoAlpha: 1, rotation: -8, duration: 0.28, ease: "back.out(1.6)" },
          "invoice+=0.32",
        );
        tl.fromTo(".mark-paid", { scale: 1 }, { scale: 0.97, duration: 0.12, yoyo: true, repeat: 1 }, "invoice+=0.4");
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="story" className="bg-ink text-paper">
      <div className="story-stack">
        <Shell className="space-y-16 py-20">
          <h2 className="display-sm max-w-3xl">Quote. Link. Yes. Invoice.</h2>
          {storySteps.map((step, index) => (
            <article key={step.title}>
              <p className="font-mono text-sm text-[#3FC79A]">{step.index}</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{step.title}</h3>
              <p className="mt-2 max-w-md leading-7 text-mist">{step.body}</p>
              <div className="mt-6 flex justify-center">
                <IPhone className="phone-full story-device">
                  {index === 0 || index === 1 ? <QuoteScreen /> : null}
                  {index === 2 ? <ApprovalScreen /> : null}
                  {index === 3 ? <MarkPaidScreen /> : null}
                </IPhone>
              </div>
            </article>
          ))}
        </Shell>
      </div>
      <div ref={pinRef} className="story-pin">
        <div className="flex h-[100dvh] items-center">
          <Shell className="grid w-full items-center gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="relative z-10 bg-ink pl-7">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-white/25" aria-hidden="true">
                <div className="story-progress absolute inset-0 origin-top bg-[#3FC79A]" />
              </div>
              <ol className="space-y-6">
                {storySteps.map((step, index) => (
                  <li key={step.title} data-step={index} className={index === 0 ? "is-active" : undefined}>
                    <p className="font-mono text-xs text-[#3FC79A]">{step.index}</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                    <p className="mt-1 max-w-xs text-sm leading-6 text-[#E6E9F2]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="story-fit">
            <div className="story-stage">
              <IPhone className="story-phone">
                <div className="phone-quote absolute inset-0">
                  <QuoteScreen />
                </div>
                <div className="phone-paid absolute inset-0">
                  <MarkPaidScreen />
                </div>
              </IPhone>
              <div className="share-pill">getyeslo.com/q/n0rth</div>
              <article className="client-slab relative z-[1] w-[280px] overflow-hidden rounded-[28px] bg-[#F7F7F4] p-3.5 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.45)]">
                <p className="px-1 pb-2 font-mono text-[10px] tracking-[0.12em] text-[#5B6172]">CLIENT · getyeslo.com/q/n0rth</p>
                <div className="relative h-[560px] overflow-hidden rounded-2xl">
                  <div className="layer-wait h-full bg-[#F7F7F4] p-4">
                    <p className="font-mono text-[10px] tracking-[0.14em] text-[#5B6172]">Q-0142 · SENT</p>
                    <p className="mt-2 text-lg font-semibold text-[#111426]">Awaiting Sarah</p>
                    <p className="mt-1 text-sm text-[#3E4558]">Brand identity sprint</p>
                    <div className="mt-4 space-y-2 border-t border-[#111426]/10 pt-3 text-sm text-[#111426]">
                      <p className="flex justify-between"><span>Workshop</span><span className="tabular-nums">$1,200</span></p>
                      <p className="flex justify-between"><span>Identity system</span><span className="tabular-nums">$2,400</span></p>
                      <p className="flex justify-between"><span>Art direction</span><span className="tabular-nums">$1,200</span></p>
                      <p className="flex justify-between"><span>Guidelines</span><span className="tabular-nums">$800</span></p>
                    </div>
                    <p className="mt-3 flex justify-between border-t border-[#111426]/10 pt-3 text-sm"><span>Tax 10%</span><span className="tabular-nums">$560.00</span></p>
                    <p className="mt-1 flex justify-between text-base font-semibold"><span>Total</span><span className="tabular-nums">$6,160.00</span></p>
                  </div>
                  <div className="layer-yes absolute inset-0 bg-[#F7F7F4]">
                    <ApprovalScreen />
                  </div>
                  <div className="layer-invoice absolute inset-0 bg-[#F7F7F4]">
                    <InvoiceScreen />
                  </div>
                </div>
              </article>
            </div>
            </div>
          </Shell>
        </div>
      </div>
    </section>
  );
}
