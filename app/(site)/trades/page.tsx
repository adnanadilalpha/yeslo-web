import { PageIntro } from "@/components/marketing/page-intro";
import { WaitlistForm } from "@/components/marketing/waitlist";
import { QuoteDocument } from "@/components/quote/document";
import { Shell } from "@/components/layout/shell";
import { sampleQuote } from "@/lib/quotes/samples";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For trades",
  description: "Yeslo estimates for painters, electricians, landscapers, and remodelers. Send the job from the driveway. The client approves without an account.",
  alternates: { canonical: "/trades" },
};

const points = [
  {
    title: "Materials and labor, listed",
    body: "Square feet, gallons, doors, a prep fee. The estimate reads the way you already talk about the job, not like a software invoice.",
  },
  {
    title: "They answer the text you already sent",
    body: "No tablet login for the homeowner. The link opens, they read the scope, and they type their name in the driveway or at the kitchen table.",
  },
  {
    title: "“Can you do the trim in satin?”",
    body: "A change request lands as a push, in their words. You edit the estimate and send again. When the work is done, the same numbers become the invoice PDF.",
  },
];

export default function TradesPage() {
  return (
    <>
      <PageIntro eyebrow="Trades" title="Estimates your client can approve from the driveway." tone="ink">
        Amber is the trades color, and it always sits on ink. The job is the same idea as a proposal: a clear price, a link, and a name on the record.
      </PageIntro>
      <Shell className="grid items-start gap-12 py-16 lg:grid-cols-2">
        <QuoteDocument quote={sampleQuote("trades")} />
        <div className="space-y-8">
          {points.map((point) => (
            <article key={point.title}>
              <h2 className="text-2xl tracking-[-0.04em]">{point.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{point.body}</p>
            </article>
          ))}
        </div>
      </Shell>
      <section id="join" className="bg-ink py-16 text-paper">
        <Shell className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl tracking-[-0.04em]">Put the next estimate in the beta.</h2>
            <p className="mt-4 text-mist leading-7">Join as a trade. We’ll send a TestFlight invite when a seat opens. Coming soon to the App Store.</p>
          </div>
          <WaitlistForm defaultRoute="trades" source="trades" />
        </Shell>
      </section>
    </>
  );
}
