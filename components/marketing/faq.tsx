import { Shell } from "@/components/layout/shell";
import { faqs } from "@/lib/content";

export function Faq({ items = faqs }: { items?: readonly { q: string; a: string }[] }) {
  return (
    <section className="py-20">
      <Shell className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow text-yes">Questions</p>
          <h2 className="display-sm mt-4">Before you write the quote.</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-lg tracking-tight">
                {item.q}
                <span aria-hidden="true" className="font-mono text-yes transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="faq-panel">
                <div>
                  <p className="pb-6 pr-10 text-muted-foreground leading-7">{item.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </Shell>
    </section>
  );
}
