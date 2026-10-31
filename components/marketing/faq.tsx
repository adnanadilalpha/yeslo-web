import { Reveal } from "@/components/marketing/reveal";
import { Shell } from "@/components/layout/shell";
import { faqs } from "@/lib/content";

export function Faq({ items = faqs }: { items?: readonly { q: string; a: string }[] }) {
  return (
    <section className="py-24 lg:py-28">
      <Shell className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <p className="text-sm font-semibold text-yes">Questions</p>
          <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.045em]">
            Before you write the quote.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="divide-y divide-border/80 border-y border-border/80">
            {items.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium tracking-tight">
                  {item.q}
                  <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-yes/10 font-mono text-yes transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="faq-panel">
                  <div>
                    <p className="pb-7 pr-10 text-muted-foreground leading-7">{item.a}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
