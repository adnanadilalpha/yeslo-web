"use client";

import { LogoMark } from "@/components/brand/marks";
import { ClientBrowser, IPhone } from "@/components/marketing/devices";
import { Shell } from "@/components/layout/shell";
import { storySteps } from "@/lib/content";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const lines = [
  ["Discovery workshop", "$1,800"],
  ["Art direction", "$2,400"],
  ["Marketing site", "$4,800"],
];

export function Story() {
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = pinRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
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
            end: "+=2800",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            refreshPriority: 1,
            onUpdate: (self) => {
              if (progress) gsap.set(progress, { scaleY: self.progress });
              const index = Math.min(3, Math.floor(self.progress * 0.999 * 4));
              steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
            },
          },
        });

        gsap.from(".q-line", {
          y: 16,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: root, start: "top 75%", toggleActions: "play none none none" },
        });
        tl.addLabel("quote", 0);
        tl.addLabel("link", 0.45);
        tl.to(".story-phone", { x: -150, duration: 0.4 }, "link");
        tl.fromTo(".share-pill", { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 90, duration: 0.45, ease: "power3.inOut" }, "link");
        tl.fromTo(".story-browser", { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.4 }, "link+=0.12");
        tl.addLabel("yes", 1.15);
        tl.to(".share-pill", { autoAlpha: 0, duration: 0.2 }, "yes");
        tl.from(".typed-name", { clipPath: "inset(0 100% 0 0)", duration: 0.4, ease: "power2.out" }, "yes");
        tl.fromTo(".yes-mark", { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 }, { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power2.inOut" }, "yes+=0.12");
        tl.addLabel("invoice", 1.8);
        tl.to(".client-live", { autoAlpha: 0, duration: 0.25 }, "invoice");
        tl.fromTo(".invoice-sheet", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.35 }, "invoice");
        tl.from(".paid-stamp", { scale: 0.6, autoAlpha: 0, rotation: -12, duration: 0.35, ease: "back.out(1.8)" }, "invoice+=0.15");
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(".q-line, .yes-mark, .invoice-sheet, .share-pill", { clearProps: "all" });
      });

      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="story" className="bg-ink text-paper">
      <div className="story-stack">
        <Shell className="space-y-20 py-20">
          <div>
            <p className="eyebrow text-mint">Quote, link, yes, invoice</p>
            <h2 className="display-sm mt-4 max-w-3xl">The whole product is one gesture.</h2>
          </div>
          {storySteps.map((step, index) => (
            <article key={step.title} className="grid items-center gap-8">
              <div>
                <p className="font-mono text-sm text-mint">{step.index}</p>
                <h3 className="mt-2 text-4xl font-semibold tracking-[-0.045em]">{step.title}</h3>
                <p className="mt-3 max-w-md leading-7 text-mist">{step.body}</p>
              </div>
              <Stage beat={index} />
            </article>
          ))}
        </Shell>
      </div>

      <div ref={pinRef} className="story-pin">
        <div className="flex h-[100dvh] items-center">
          <Shell className="grid w-full items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative z-10 bg-ink">
              <div className="absolute top-2 bottom-2 left-0 w-px bg-white/15" aria-hidden="true">
                <div className="story-progress absolute inset-0 origin-top bg-[#3FC79A]" />
              </div>
              <p className="eyebrow pl-8 text-mint">Scroll</p>
              <ol className="mt-8 space-y-7 pl-8">
                {storySteps.map((step, index) => (
                  <li key={step.title} data-step={index} className={index === 0 ? "is-active" : undefined}>
                    <p className="font-mono text-xs text-mint">{step.index}</p>
                    <h3 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-mist">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="min-w-0">
              <Stage beat="film" />
            </div>
          </Shell>
        </div>
      </div>
    </section>
  );
}

function Stage({ beat }: { beat: number | "film" }) {
  const showQuote = beat === "film" || beat === 0;
  const showLink = beat === "film" || beat === 1;
  const showYes = beat === "film" || beat === 2;
  const showInvoice = beat === "film" || beat === 3;
  return (
    <div className="story-stage relative mx-auto h-[520px] w-full max-w-[640px] sm:h-[560px]" data-beat={beat}>
      {showQuote ? (
        <IPhone className="story-phone absolute top-8 left-0 w-[250px]">
          <div className="flex h-full flex-col bg-[#F7F7F4] px-3.5 pt-1 pb-4 text-[#111426]">
            <div className="flex items-center justify-between">
              <LogoMark className="h-5" />
              <span className="font-mono text-[10px] text-[#5B6172]">Q-1048</span>
            </div>
            <p className="mt-3 text-sm font-semibold">Spring line</p>
            <ul className="mt-3 space-y-2">
              {lines.map(([name, price]) => (
                <li key={name} className="q-line flex justify-between rounded-xl bg-white px-2.5 py-2 text-[11px] shadow-sm">
                  <span>{name}</span>
                  <span className="tabular-nums">{price}</span>
                </li>
              ))}
            </ul>
            <p className="q-total mt-auto text-right text-base font-semibold tabular-nums">$9,000</p>
          </div>
        </IPhone>
      ) : null}

      {showLink ? (
        <div className="share-pill absolute top-28 left-[210px] z-20 rounded-full bg-white px-4 py-2 font-mono text-[11px] text-[#111426] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)]">
          getyeslo.com/q/harbor
        </div>
      ) : null}

      {showYes || showInvoice ? (
        <ClientBrowser className="story-browser absolute top-6 right-0 w-[330px]">
          <div className="client-live relative h-[430px] p-5 text-[#111426]">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#12805C]">PROPOSAL · Q-1048</p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">Brand and website for the spring line</p>
            <p className="mt-2 text-sm text-[#5B6172]">Harbor Studio · $9,000</p>
            <div className="mt-8 flex items-end justify-between gap-4">
              <p className="typed-name min-w-0 flex-1 border-b border-[#111426]/20 pb-2 font-semibold">Jordan Hale</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/yeslo-mark-green.svg" alt="" className="yes-mark h-16 w-auto shrink-0" />
            </div>
          </div>
          <div className="invoice-sheet absolute inset-0 flex flex-col bg-[#F7F7F4] p-5 text-[#111426]">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#5B6172]">INVOICE · Q-1048</p>
            <p className="mt-3 text-xl font-semibold">Harbor Studio</p>
            <p className="mt-6 text-4xl font-semibold tabular-nums tracking-[-0.04em]">$9,000</p>
            <p className="mt-2 text-sm text-[#5B6172]">Same lines. Same total.</p>
            <div className="paid-stamp stamp mt-auto self-end text-[#12805C]">Paid</div>
          </div>
        </ClientBrowser>
      ) : null}
    </div>
  );
}
