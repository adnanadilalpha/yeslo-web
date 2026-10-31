import { PageIntro } from "@/components/marketing/page-intro";
import { Studio } from "@/components/marketing/studio";
import { Shell } from "@/components/layout/shell";
import { storySteps } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description: "Build a quote from your item library, send a link from the iOS share sheet, and let the client approve with their name. Then invoice and mark it paid.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowPage() {
  return (
    <>
      <PageIntro eyebrow="How it works" title="Four beats, and then the money is your business.">
        Yeslo stops at the record. You still write the quote, you still send it, and you still get paid somewhere else. The app keeps the thread from the first line item to the paid invoice.
      </PageIntro>
      <Shell className="grid gap-10 pb-8 md:grid-cols-2">
        {storySteps.map((step) => (
          <article key={step.title} className="border-t border-border pt-6">
            <p className="font-mono text-xs text-yes">{step.index}</p>
            <h2 className="mt-3 text-3xl tracking-[-0.04em]">{step.title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{step.body}</p>
          </article>
        ))}
      </Shell>
      <Shell className="pb-4">
        <div className="rounded-[28px] bg-mint px-6 py-8 text-ink sm:px-10">
          <h2 className="text-3xl tracking-[-0.04em]">What the push actually means</h2>
          <p className="mt-4 max-w-2xl leading-7">
            When a client decides, the iOS app gets a push. The quote shows approved or changes requested, with their name and note. You can listen for that change in the app because the event is stored for your account. The website does not send the push. The phone does, from that record.
          </p>
          <Link href="/q/demo" className={cn(buttonVariants({ variant: "ink", size: "lg" }), "mt-6")}>
            Try the client page
          </Link>
        </div>
      </Shell>
      <Studio />
    </>
  );
}
