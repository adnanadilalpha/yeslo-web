import { TradesLockup } from "@/components/brand/marks";
import { IPhone, QuoteScreen } from "@/components/marketing/devices";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";

export function Routes() {
  return (
    <section>
      <Shell className="grid items-center gap-16 py-28 lg:grid-cols-2 lg:py-36">
        <div>
          <p className="eyebrow">Freelancers</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.045em]">Proposals that don’t ask for a password.</h2>
          <p className="mt-5 max-w-md text-[17px] leading-7 text-muted-foreground">
            Designers, writers, consultants, photographers, developers. Scope the work, price the lines, and send a link your client can answer from the email they already have open.
          </p>
          <Link href="/freelancers" className={cn(buttonVariants({ variant: "yes", size: "lg" }), "mt-8")}>
            For freelancers
          </Link>
        </div>
        <IPhone className="phone-full mx-auto">
          <QuoteScreen />
        </IPhone>
      </Shell>
      <div className="bg-ink text-paper">
        <Shell className="grid items-center gap-16 py-28 lg:grid-cols-2 lg:py-36">
          <IPhone className="phone-full mx-auto lg:order-2">
            <QuoteScreen mode="trades" />
          </IPhone>
          <div>
            <TradesLockup tone="dark" className="h-9" />
            <h2 className="mt-6 text-5xl font-semibold tracking-[-0.045em]">Estimates from the driveway.</h2>
            <p className="mt-5 max-w-md text-[17px] leading-7 text-mist">
              Painters, electricians, landscapers, remodelers. Materials and labor on one estimate. The homeowner approves from the text you already send.
            </p>
            <Link href="/trades" className={cn(buttonVariants({ variant: "amber", size: "lg" }), "mt-8")}>
              For trades
            </Link>
          </div>
        </Shell>
      </div>
    </section>
  );
}
