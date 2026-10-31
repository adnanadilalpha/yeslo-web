import { IPhone, QuoteScreen } from "@/components/marketing/devices";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-stage relative overflow-hidden">
      <Shell className="grid items-center gap-8 pt-8 pb-8 lg:grid-cols-12 lg:pt-10 lg:pb-8">
        <div className="lg:col-span-5">
          <p className="eyebrow">Yeslo for iOS</p>
          <h1 className="display mt-5">
            Send a quote.
            <span className="mt-1 block text-yes">Get a yes.</span>
          </h1>
          <p className="mt-6 max-w-md text-[19px] leading-8 text-muted-foreground">
            One iOS app, two modes. Write the proposal or the estimate, send a link, and let your client approve by typing their name.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#join" className={cn(buttonVariants({ variant: "yes", size: "xl" }))}>
              Join the TestFlight beta
            </Link>
            <Link href="/q/demo" className={cn(buttonVariants({ variant: "outline", size: "xl" }))}>
              Open a client link
            </Link>
          </div>
        </div>
        <div className="hero-cluster relative mx-auto hidden lg:col-span-7 lg:block">
          <div className="pointer-events-none absolute top-10 left-6 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgb(199_240_222/70%),transparent_68%)]" aria-hidden="true" />
          <article className="hero-client absolute z-0 rounded-[22px] bg-white pt-7 pr-4 pb-4 pl-8 shadow-[0_18px_40px_-18px_rgb(17_20_38/28%)]">
            <p className="text-lg font-semibold tracking-[-0.03em] text-[#111426]">Awaiting Sarah</p>
            <p className="mt-1 text-sm text-[#3E4558]">Northwind Studio · $6,160.00</p>
            <div className="mt-4 rounded-full bg-[#12805C] py-2 text-center text-sm font-medium text-white">Approve</div>
          </article>
          <div className="hero-phone-slot absolute z-[1]">
            <IPhone className="hero-tilt">
              <QuoteScreen />
            </IPhone>
          </div>
          <p className="hero-link">getyeslo.com/q/n0rth</p>
          <div className="hero-push absolute z-[2] flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-[#111426] shadow-[0_16px_40px_-18px_rgb(17_20_38/30%)]">
            <span className="size-2 rounded-full bg-[#12805C]" />
            <span>
              <strong className="block text-sm">Sarah approved</strong>
              <em className="block text-xs text-[#3E4558] not-italic">Q-0142 · 2m ago</em>
            </span>
          </div>
        </div>
        <div className="lg:hidden">
          <IPhone className="phone-full mx-auto">
            <QuoteScreen />
          </IPhone>
        </div>
      </Shell>
    </section>
  );
}
