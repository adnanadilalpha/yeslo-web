import { Comparison } from "@/components/marketing/comparison";
import { Facts } from "@/components/marketing/facts";
import { Faq } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PricingPanel } from "@/components/marketing/pricing-panel";
import { Routes } from "@/components/marketing/routes";
import { Story } from "@/components/marketing/story";
import { Studio } from "@/components/marketing/studio";
import { WaitlistForm } from "@/components/marketing/waitlist";
import { Shell } from "@/components/layout/shell";
import { site, siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Yeslo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS",
  description: site.description,
  url: siteUrl(),
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free. 3 sent quotes a month." },
    { "@type": "Offer", price: "9.99", priceCurrency: "USD", description: "Pro monthly, when it ships on the App Store." },
    { "@type": "Offer", price: "79", priceCurrency: "USD", description: "Pro yearly, when it ships on the App Store." },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Facts />
      <Story />
      <Routes />
      <Studio />
      <Comparison />
      <section className="pb-8">
        <Shell>
          <p className="eyebrow text-yes">Pricing</p>
          <h2 className="display-sm mt-4 max-w-3xl">Three sends free. Then $9.99.</h2>
          <div className="mt-10">
            <PricingPanel />
          </div>
        </Shell>
      </section>
      <Faq />
      <section id="join" className="bg-ink py-20 text-paper">
        <Shell className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-mint">TestFlight</p>
            <h2 className="display-sm mt-4">Coming soon to the App Store.</h2>
            <p className="mt-5 max-w-md text-mist leading-7">
              The beta is the way in. Leave an email and we’ll send a TestFlight invite when a seat is open. No fake store button.
            </p>
          </div>
          <WaitlistForm source="home" />
        </Shell>
      </section>
    </>
  );
}
