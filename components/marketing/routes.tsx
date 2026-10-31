import { Flourish } from "@/components/brand/marks";
import { Shell } from "@/components/layout/shell";
import { QuoteDocument } from "@/components/quote/document";
import { buttonVariants } from "@/components/ui/button";
import { sampleQuote } from "@/lib/quotes/samples";
import { cn } from "cn";
import Link from "next/link";

export function Routes() {
  const proposal = sampleQuote("freelancer", { lines: sampleQuote("freelancer").lines.slice(0, 2) });
  const estimate = sampleQuote("trades", { lines: sampleQuote("trades").lines.slice(0, 2) });

  return (
    <section className="py-20 lg:py-28">
      <Shell>
        <p className="eyebrow text-yes">Two ways in</p>
        <h2 className="display-sm mt-4 max-w-3xl">Same yes. Different work.</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <article className="rounded-[32px] border border-border bg-card p-6 sm:p-8 lg:col-span-7">
            <p className="eyebrow text-yes">Freelancers</p>
            <h3 className="mt-4 text-4xl tracking-[-0.045em]">Proposals that don’t ask for a password.</h3>
            <p className="mt-4 max-w-lg text-muted-foreground leading-7">
              Designers, writers, consultants, photographers, developers. Scope the work, price the lines, and send a link your client can answer from the email they already have open.
            </p>
            <div className="mt-8">
              <QuoteDocument quote={proposal} compact />
            </div>
            <Link href="/freelancers" className={cn(buttonVariants({ variant: "yes", size: "lg" }), "mt-6")}>
              For freelancers
            </Link>
          </article>
          <article className="flex flex-col rounded-[32px] bg-ink p-6 text-paper sm:p-8 lg:col-span-5">
            <p className="eyebrow text-amber">Trades</p>
            <h3 className="mt-4 text-4xl tracking-[-0.045em]">Estimates from the driveway.</h3>
            <p className="mt-4 text-mist leading-7">
              Painters, electricians, landscapers, remodelers. Materials and labor on one estimate. The homeowner approves from the text you already send.
            </p>
            <div className="mt-8">
              <QuoteDocument quote={estimate} compact />
            </div>
            <Link href="/trades" className={cn(buttonVariants({ variant: "amber", size: "lg" }), "mt-6")}>
              For trades
            </Link>
            <Flourish className="mt-8 w-32 text-amber" />
          </article>
        </div>
      </Shell>
    </section>
  );
}
