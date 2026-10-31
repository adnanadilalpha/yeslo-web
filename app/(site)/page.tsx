import { Comparison } from "@/components/marketing/comparison";
import { Features } from "@/components/marketing/features";
import { Faq } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PricingPanel } from "@/components/marketing/pricing-panel";
import { Reveal } from "@/components/marketing/reveal";
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
      <Features />
      <Story />
      <Routes />
      <Studio />
      <Comparison />
      <section className="bg-[#f7f4ee] py-24 dark:bg-background lg:py-28">
        <Shell>
          <Reveal>
            <p className="text-sm font-semibold text-yes">Pricing</p>
            <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.045em]">
              Three sends free. Then $9.99.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12">
              <PricingPanel />
            </div>
          </Reveal>
        </Shell>
      </section>
      <Faq />
      <section id="join" className="bg-[#0a1210] py-24 text-white lg:py-28">
        <Shell className="grid items-end gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-sm font-semibold text-[#7dffa8]">TestFlight</p>
              <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.045em]">
                Coming soon to the App Store.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-white/65">
                The beta is the way in. Leave an email and we’ll send a TestFlight invite when a seat is open. No fake store button.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <WaitlistForm source="home" />
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
