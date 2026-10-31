"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    document.documentElement.classList.add("has-cursor");
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.18, ease: "power3.out" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.18, ease: "power3.out" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });

    const move = (event: PointerEvent) => {
      xDot(event.clientX);
      yDot(event.clientY);
      xRing(event.clientX);
      yRing(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      const typing = Boolean(target?.closest("input, textarea, select, [contenteditable='true']"));
      gsap.to([dot.current, ring.current], { autoAlpha: typing ? 0 : 1, duration: 0.15, overwrite: "auto" });
    };

    window.addEventListener("pointermove", move);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={ring} className="cursor-ring">
        <span className="size-9 border border-ink/40 dark:border-paper/50" />
      </div>
      <div ref={dot} className="cursor-dot">
        <span className="size-1.5 bg-yes" />
      </div>
    </div>
  );
}
