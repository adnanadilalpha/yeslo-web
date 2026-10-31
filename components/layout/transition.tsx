"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: "power2.out", clearProps: "opacity,visibility" },
      );
    },
    { dependencies: [pathname], scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
