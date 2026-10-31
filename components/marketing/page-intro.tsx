import { Shell } from "@/components/layout/shell";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
  tone = "paper",
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: "paper" | "ink";
}) {
  const ink = tone === "ink";
  return (
    <section className={ink ? "bg-ink text-paper" : undefined}>
      <Shell className="py-16 lg:py-24">
        <p className={`eyebrow ${ink ? "text-amber" : "text-yes"}`}>{eyebrow}</p>
        <h1 className="display-sm mt-4 max-w-4xl">{title}</h1>
        <div className={`mt-6 max-w-2xl text-lg leading-8 ${ink ? "text-mist" : "text-muted-foreground"}`}>{children}</div>
      </Shell>
    </section>
  );
}
