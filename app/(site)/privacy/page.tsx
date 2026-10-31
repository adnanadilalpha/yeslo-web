import { PageIntro } from "@/components/marketing/page-intro";
import { Shell } from "@/components/layout/shell";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Yeslo handles quotes, client names, approval records, and the TestFlight waitlist. A plain-language template for the owner to review.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Privacy" title="What we keep, and why a client never makes an account.">
        Last updated October 31, 2026. This is a template for the owner to review with a lawyer before it is treated as the live policy.
      </PageIntro>
      <Shell className="max-w-3xl pb-20">
        <TemplateNote />
        <Prose>
          <h2>Who we are</h2>
          <p>
            Yeslo is an iOS app, bundle id {site.bundleId}. The public site will live at {site.futureDomain}. This deployment may still be on a Vercel address. Questions go to{" "}
            <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
          </p>
          <h2>What the app is for</h2>
          <p>
            You build a quote, send a link, and your client approves or requests changes by typing their name. Yeslo does not take payments in v1. We do not collect card numbers, and we do not run ads on quote links.
          </p>
          <h2>Information you give us</h2>
          <ul>
            <li>Account details if you sign in on iOS, including an email address.</li>
            <li>Your business name, contact details, and whether you use Freelancer or Trades mode.</li>
            <li>Clients you add, and the quotes, line items, tax, and notes you write.</li>
            <li>A waitlist name and email if you ask for the TestFlight beta on this site.</li>
          </ul>
          <h2>Information a client creates</h2>
          <p>
            A client does not need an account. If they approve or request changes, we store the name they type, an optional note, the time, their IP address, and their browser’s user agent. That is the record of the decision. We show it back on the quote page so both sides can see what was saved.
          </p>
          <h2>Why the IP address</h2>
          <p>
            It is part of the record of who responded, in the same way a signed paper estimate might note where it was signed. It is not used to advertise, and it is not sold.
          </p>
          <h2>Push notifications</h2>
          <p>
            If you allow notifications, Apple gives the app a device token so we can tell you when a client decides. You can turn notifications off in iOS settings.
          </p>
          <h2>Who can read it</h2>
          <p>
            Your quotes are protected with row level security. The anonymous key used by the public site cannot read the tables. A client link is checked on the server and returns only that quote. We do not sell personal information.
          </p>
          <h2>How long</h2>
          <p>
            We keep account data while the account is open, and waitlist emails until we have written to you or you ask us to delete them. Email {site.privacyEmail} to ask for a copy or a deletion. We may keep a decision record if we need it to show what a client agreed to, unless you ask us to delete the quote.
          </p>
          <h2>Children</h2>
          <p>Yeslo is not directed at anyone under 16. Don’t send us a child’s personal information.</p>
          <h2>Changes</h2>
          <p>If this policy changes in a way that matters, we will update the date at the top and, if you have an account, say so in the app or by email.</p>
        </Prose>
      </Shell>
    </>
  );
}

function TemplateNote() {
  return (
    <p className="mb-8 rounded-2xl border border-amber bg-amber/20 px-4 py-3 text-sm leading-6 text-ink">
      Template for owner review. Plain language for a small app with no payments. It is not legal advice, and it is not a finished privacy policy until you adopt it.
    </p>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-4 leading-7 text-foreground [&_a]:text-yes [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:tracking-[-0.04em] [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{children}</div>;
}
