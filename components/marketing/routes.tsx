import { TradesLockup } from "@/components/brand/marks";
import { Atmosphere } from "@/components/marketing/atmosphere";
import { IPhone, QuoteScreen } from "@/components/marketing/devices";
import { Reveal } from "@/components/marketing/reveal";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";

export function Routes() {
  return (
    <section>
      <Shell className="grid items-center gap-16 py-24 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <div>
            <p className="text-sm font-semibold text-yes">Freelancers</p>
            <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.045em]">
              Proposals that don’t ask for a password.
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-7 text-muted-foreground">
              Designers, writers, consultants, photographers, developers. Scope the work, price the lines, and send a link your client can answer from the email they already have open.
            </p>
            <Link href="/freelancers" className={cn(buttonVariants({ variant: "yes", size: "lg" }), "mt-8")}>
              For freelancers
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <IPhone className="phone-full mx-auto">
            <QuoteScreen />
          </IPhone>
        </Reveal>
      </Shell>
      <div className="relative overflow-hidden bg-ink text-paper">
        <Atmosphere variant="ink" />
        <Shell className="relative grid items-center gap-16 py-24 lg:grid-cols-2 lg:py-32">
          <Reveal delay={0.08}>
            <div>
              <TradesLockup tone="dark" className="h-9" />
              <h2 className="mt-6 font-heading text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.045em]">
                Estimates from the driveway.
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-7 text-mist">
                Painters, electricians, landscapers, remodelers. Materials and labor on one estimate. The homeowner approves from the text you already send.
              </p>
              <Link href="/trades" className={cn(buttonVariants({ variant: "amber", size: "lg" }), "mt-8")}>
                For trades
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <IPhone className="phone-full mx-auto">
              <QuoteScreen mode="trades" />
            </IPhone>
          </Reveal>
        </Shell>
      </div>
    </section>
  );
}
