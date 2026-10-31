import { IPhone, QuoteScreen } from "@/components/marketing/devices";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-stage relative">
      <Shell className="grid items-center gap-16 pt-16 pb-28 lg:grid-cols-12 lg:pt-24 lg:pb-36">
        <div className="lg:col-span-6">
          <p className="eyebrow">Yeslo for iOS</p>
          <h1 className="display mt-6">
            Send a quote.
            <span className="mt-1 block text-yes">Get a yes.</span>
          </h1>
          <p className="mt-8 max-w-md text-[19px] leading-8 text-muted-foreground">
            One iOS app, two modes. Write the proposal or the estimate, send a link, and let your client approve by typing their name.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#join" className={cn(buttonVariants({ variant: "yes", size: "xl" }))}>
              Join the TestFlight beta
            </Link>
            <Link href="/q/demo" className={cn(buttonVariants({ variant: "outline", size: "xl" }))}>
              Open a client link
            </Link>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <div className="hero-float hero-push">
            <span className="hero-push-mark" />
            <span>
              <strong>Sarah approved</strong>
              <em>Q-0142 · 2m ago</em>
            </span>
          </div>
          <IPhone className="hero-tilt mx-auto">
            <QuoteScreen />
          </IPhone>
          <div className="hero-float hero-chip">getyeslo.com/q/n0rth</div>
          <div className="hero-float hero-line">
            <span>Identity system</span>
            <b>$3,200</b>
          </div>
        </div>
      </Shell>
    </section>
  );
}
