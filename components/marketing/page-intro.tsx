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
    <section className={ink ? "bg-[#0a1210] text-white" : "bg-[#f7f4ee] pt-8 dark:bg-background"}>
      <Shell className="py-24 lg:py-32">
        <p className={`text-sm font-semibold ${ink ? "text-[#7dffa8]" : "text-yes"}`}>{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] font-bold tracking-[-0.045em]">
          {title}
        </h1>
        <div className={`mt-6 max-w-2xl text-lg leading-8 ${ink ? "text-white/65" : "text-[#3a4842] dark:text-muted-foreground"}`}>{children}</div>
      </Shell>
    </section>
  );
}
