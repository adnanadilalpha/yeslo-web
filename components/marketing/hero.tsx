import { Flourish, SignatureY } from "@/components/brand/marks";
import { Shell } from "@/components/layout/shell";
import { QuoteDocument } from "@/components/quote/document";
import { buttonVariants } from "@/components/ui/button";
import { sampleQuote } from "@/lib/quotes/samples";
import { cn } from "cn";
import Link from "next/link";

const preview = sampleQuote("freelancer");

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <SignatureY draw className="pointer-events-none absolute -right-16 top-6 hidden h-[640px] w-auto text-yes/25 lg:block" />
      <Shell className="grid items-end gap-14 pt-16 pb-20 lg:grid-cols-12 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="eyebrow text-yes">Yeslo for iOS · Freelancers first</p>
          <h1 className="display mt-5">
            Send a quote.
            <span className="mt-2 block">
              Get a <span className="text-yes">yes</span>.
            </span>
          </h1>
          <Flourish draw className="mt-4 w-44 sm:w-56" />
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            One iOS app, two modes. Write the proposal or the estimate from your own items, send a link with the share sheet, and let your client approve by typing their name.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#join" className={cn(buttonVariants({ variant: "yes", size: "xl" }))}>
              Join the TestFlight beta
            </Link>
            <Link href="/q/demo" className={cn(buttonVariants({ variant: "outline", size: "xl" }))}>
              Open a client link
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">Coming soon to the App Store. Free for 3 sent quotes a month. Pro is $9.99.</p>
        </div>
        <div className="lg:col-span-5">
          <QuoteDocument quote={preview} compact />
        </div>
      </Shell>
    </section>
  );
}
