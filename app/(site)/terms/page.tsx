import { PageIntro } from "@/components/marketing/page-intro";
import { Shell } from "@/components/layout/shell";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Plain-language terms for Yeslo. The app records a client’s response to a quote. It is not legal advice, and it does not take payments in v1.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Terms" title="The rules for a small quoting app.">
        Last updated October 31, 2026. This is a template for the owner to review before anyone relies on it.
      </PageIntro>
      <Shell className="max-w-3xl pb-20">
        <p className="mb-8 rounded-2xl border border-amber bg-amber/20 px-4 py-3 text-sm leading-6 text-ink">
          Template for owner review. Have a lawyer read it before you treat it as your terms. It is written for an app that does not move money.
        </p>
        <div className="space-y-4 leading-7 [&_a]:text-yes [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:tracking-[-0.04em] [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <h2>The service</h2>
          <p>
            Yeslo lets you write a proposal or an estimate, send a link, and keep a record when a client approves or asks for a change. You can turn that quote into an invoice PDF and mark it paid. The iOS bundle id is {site.bundleId}.
          </p>
          <h2>Not a law firm</h2>
          <p>
            A recorded approval is a note of what the client did in the app: their name, the time, and the quote they were looking at. It is not legal advice. It may not be a contract in your city, state, or country. You are responsible for the words in the quote, the tax, the license your trade requires, and whether you need a signature that a court would recognize.
          </p>
          <h2>Your content</h2>
          <p>You own the quotes you write. You give us permission to store them and to show a quote to the person who has its link. Don’t put anything in a quote you don’t have the right to share.</p>
          <h2>Acceptable use</h2>
          <ul>
            <li>Don’t use Yeslo to impersonate someone or to forge a decision.</li>
            <li>Don’t probe, scrape, or attack the service or another person’s quotes.</li>
            <li>Don’t send illegal content, or quotes for work you are not allowed to do.</li>
          </ul>
          <h2>Plans</h2>
          <p>
            Free covers 3 sent quotes in a month. Pro is intended to be $9.99 a month or $79 a year, billed by Apple when the App Store version exists. During the TestFlight beta, access is free. This website does not sell subscriptions. If Apple’s terms apply to a later purchase, those terms apply to the billing.
          </p>
          <h2>No payments in v1</h2>
          <p>Yeslo does not process customer payments. An invoice PDF is a document. Getting paid is between you and your client, outside the app.</p>
          <h2>The beta</h2>
          <p>TestFlight builds can break, change, or disappear. Don’t use a beta as the only copy of a quote you cannot afford to lose.</p>
          <h2>Disclaimer</h2>
          <p>The app and this site are provided as available. We don’t promise that a push will arrive, that a link will be open forever, or that a recorded yes will win a dispute.</p>
          <h2>Liability</h2>
          <p>
            To the extent the law allows, Yeslo’s liability for a claim about the service is limited to the amount you paid us for it in the 12 months before the claim. During a free beta, that amount may be zero. This limit does not apply where the law forbids it.
          </p>
          <h2>Ending it</h2>
          <p>You can stop using Yeslo at any time and ask us to delete the account. We can suspend access if you break these terms.</p>
          <h2>Contact</h2>
          <p>
            <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>
          </p>
        </div>
      </Shell>
    </>
  );
}
