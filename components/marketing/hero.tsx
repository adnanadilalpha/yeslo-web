import { LogoMark } from "@/components/brand/marks";
import { AppQuoteScreen, ClientBrowser, IPhone } from "@/components/marketing/devices";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-stage relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <Shell className="relative grid items-end gap-12 pt-14 pb-16 lg:grid-cols-12 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="eyebrow text-yes">Yeslo for iOS · Freelancers first</p>
          <h1 className="display mt-5">
            Send a quote.
            <span className="mt-1 flex items-end gap-3">
              Get a <span className="text-yes">yes</span>
              <LogoMark className="mb-2 hidden h-14 sm:block" />
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
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
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
            Coming soon to the App Store. Free for 3 sent quotes a month. Pro is $9.99.
          </p>
        </div>
        <div className="relative lg:col-span-6">
          <div className="hero-stage-art">
            <IPhone className="hero-phone">
              <AppQuoteScreen />
            </IPhone>
            <ClientBrowser className="hero-browser">
              <div className="p-4 text-[#111426]">
                <p className="font-mono text-[10px] tracking-[0.14em] text-[#12805C]">CLIENT VIEW</p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">Awaiting Jordan</p>
                <p className="mt-1 text-xs leading-5 text-[#5B6172]">Harbor Studio · $9,000 · Valid 30 days</p>
                <div className="mt-4 h-9 rounded-full bg-[#12805C] text-center text-sm leading-9 text-white">Approve</div>
              </div>
            </ClientBrowser>
          </div>
        </div>
      </Shell>
    </section>
  );
}
