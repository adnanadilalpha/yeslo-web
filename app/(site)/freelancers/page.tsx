import { PageIntro } from "@/components/marketing/page-intro";
import { WaitlistForm } from "@/components/marketing/waitlist";
import { QuoteDocument } from "@/components/quote/document";
import { Shell } from "@/components/layout/shell";
import { sampleQuote } from "@/lib/quotes/samples";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For freelancers",
  description: "Yeslo proposals for designers, writers, consultants, and anyone who bills for a scope of work. Your client approves a link. No portal password.",
  alternates: { canonical: "/freelancers" },
};

const points = [
  {
    title: "The library is your rate card",
    body: "Discovery, design, writing days, photo days, revision hours. Save them once. A new proposal starts from the items you actually sell.",
  },
  {
    title: "Duplicate, then change two lines",
    body: "Last month’s retainer is this month’s draft. Duplicate keeps the client, the tax, and the notes. It does not count as a send until you tap Send.",
  },
  {
    title: "The yes is the invoice",
    body: "When they approve, you export a PDF of that same quote. Mark it paid when the transfer lands. Yeslo does not sit in the middle of the money.",
  },
];

export default function FreelancersPage() {
  return (
    <>
      <PageIntro eyebrow="Freelancers" title="Proposals that get a yes, not a login.">
        A PDF goes quiet. A portal asks your client to invent a password for a $2,400 project. Yeslo sends the proposal as a link. They type their name. You get the push.
      </PageIntro>
      <Shell className="grid items-start gap-12 pb-20 lg:grid-cols-2">
        <div className="space-y-8">
          {points.map((point) => (
            <article key={point.title}>
              <h2 className="text-2xl tracking-[-0.04em]">{point.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{point.body}</p>
            </article>
          ))}
        </div>
        <QuoteDocument quote={sampleQuote("freelancer")} />
      </Shell>
      <section id="join" className="bg-ink py-16 text-paper">
        <Shell className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl tracking-[-0.04em]">Bring a proposal into the beta.</h2>
            <p className="mt-4 text-mist leading-7">TestFlight first. The App Store listing follows. Tell us you do freelance work and we’ll send the invite.</p>
          </div>
          <WaitlistForm defaultRoute="freelancer" source="freelancers" />
        </Shell>
      </section>
    </>
  );
}
