import { IPhone, QuoteScreen } from "@/components/marketing/devices";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-stage relative overflow-hidden">
      <Shell className="grid items-center gap-10 pt-16 pb-24 lg:grid-cols-12 lg:pt-20 lg:pb-28">
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
        <div className="relative mx-auto hidden h-[840px] w-full max-w-[680px] lg:col-span-7 lg:block">
          <div className="pointer-events-none absolute inset-[10%_8%] rounded-full bg-[radial-gradient(circle,rgb(199_240_222/75%),transparent_64%)]" aria-hidden="true" />
          <article className="absolute top-10 right-0 z-0 w-[230px] rotate-[4deg] rounded-[22px] bg-white p-4 shadow-[0_18px_40px_-18px_rgb(17_20_38/28%)]">
            <p className="font-mono text-[10px] tracking-[0.14em] text-[#5B6172]">getyeslo.com/q/n0rth</p>
            <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[#111426]">Awaiting Sarah</p>
            <p className="mt-1 text-sm text-[#3E4558]">Northwind Studio · $6,160.00</p>
            <div className="mt-4 rounded-full bg-[#12805C] py-2 text-center text-sm font-medium text-white">Approve</div>
          </article>
          <IPhone className="hero-tilt absolute top-[4.5rem] left-6 z-[1]">
            <QuoteScreen />
          </IPhone>
          <div className="absolute top-0 left-6 z-[2] flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-[#111426] shadow-[0_16px_40px_-18px_rgb(17_20_38/30%)]">
            <span className="size-2 rounded-full bg-[#12805C]" />
            <span>
              <strong className="block text-sm">Sarah approved</strong>
              <em className="block text-xs text-[#3E4558] not-italic">Q-0142 · 2m ago</em>
            </span>
          </div>
          <div className="absolute top-[42%] right-0 z-[2] rounded-full bg-white px-3 py-2 font-mono text-xs text-[#111426] shadow-[0_16px_40px_-18px_rgb(17_20_38/30%)]">
            getyeslo.com/q/n0rth
          </div>
          <div className="absolute right-0 bottom-6 z-[2] flex justify-between gap-6 rounded-2xl bg-white px-4 py-3 text-[15px] text-[#111426] shadow-[0_16px_40px_-18px_rgb(17_20_38/30%)]">
            <span>Identity system</span>
            <b className="tabular-nums">$2,400</b>
          </div>
        </div>
        <div className="lg:hidden">
          <IPhone className="mx-auto">
            <QuoteScreen />
          </IPhone>
        </div>
      </Shell>
    </section>
  );
}
