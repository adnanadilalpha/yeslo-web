import { Faq } from "@/components/marketing/faq";
import { PageIntro } from "@/components/marketing/page-intro";
import { PricingPanel } from "@/components/marketing/pricing-panel";
import { WaitlistForm } from "@/components/marketing/waitlist";
import { Shell } from "@/components/layout/shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Yeslo is free for 3 sent quotes a month. Pro is $9.99 a month or $79 a year when it reaches the App Store. The TestFlight beta is free.",
  alternates: { canonical: "/pricing" },
};

const pricingFaqs = [
  {
    q: "What counts as a sent quote?",
    a: "Tapping Send and creating the share link. Drafts, edits, and duplicates do not count. The free plan renews monthly at 3 sends.",
  },
  {
    q: "Can I pay on this website?",
    a: "No. There is no checkout here. Pro will be an App Store subscription. During TestFlight, access is free.",
  },
  {
    q: "Does Pro change the client page?",
    a: "No. Clients never see a paywall. Pro removes the monthly cap on how many quotes you send.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageIntro eyebrow="Pricing" title="Free for three. Pro when the work piles up.">
        $9.99 a month, or $79 a year. That’s about four months free if you pay yearly. No payment is processed by this site, and none is processed inside Yeslo in v1.
      </PageIntro>
      <Shell className="pb-8">
        <PricingPanel />
      </Shell>
      <Faq items={pricingFaqs} />
      <section id="join" className="bg-ink py-16 text-paper">
        <Shell className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl tracking-[-0.04em]">Start on TestFlight.</h2>
            <p className="mt-4 text-mist leading-7">The beta is free, including the room to try more than three sends while we tune the cap. We’ll email when a seat is ready.</p>
          </div>
          <WaitlistForm source="pricing" />
        </Shell>
      </section>
    </>
  );
}
