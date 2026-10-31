import { PageIntro } from "@/components/marketing/page-intro";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "cn";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description: "Write to Yeslo. We read every note and reply within two business days. The TestFlight beta is the way into the iOS app.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  const mail = `mailto:${site.supportEmail}?subject=${encodeURIComponent("Yeslo support")}`;
  return (
    <>
      <PageIntro eyebrow="Support" title="Write to a person. We reply within two business days.">
        There is no chatbot on this page. If the beta misbehaves, or a client link looks wrong, send the quote number and what you expected to happen.
      </PageIntro>
      <Shell className="grid gap-6 pb-20 md:grid-cols-3">
        <a href={mail} className="rounded-[28px] bg-ink p-6 text-paper">
          <p className="eyebrow text-mint">Email</p>
          <p className="mt-4 text-2xl tracking-[-0.04em]">{site.supportEmail}</p>
          <p className="mt-3 text-sm leading-6 text-mist">Product questions, a broken link, or a TestFlight seat.</p>
        </a>
        <a href={`mailto:${site.privacyEmail}?subject=${encodeURIComponent("Yeslo privacy")}`} className="rounded-[28px] border border-border p-6">
          <p className="eyebrow text-yes">Privacy</p>
          <p className="mt-4 text-2xl tracking-[-0.04em]">Delete or export</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Ask for a copy of your account, or for it to be deleted.</p>
        </a>
        <Link href="/pricing#join" className="rounded-[28px] border border-border p-6">
          <p className="eyebrow text-yes">Beta</p>
          <p className="mt-4 text-2xl tracking-[-0.04em]">TestFlight</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Coming soon to the App Store. The list is how you get the build.</p>
        </Link>
      </Shell>
      <Shell className="pb-20">
        <a href={mail} className={cn(buttonVariants({ variant: "yes", size: "xl" }))}>
          Email {site.supportEmail}
        </a>
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground">
          Yeslo does not bill you in v1, so there is no receipt to look up. If you are writing about a client decision, include the quote number from the top of the link.
        </p>
      </Shell>
    </>
  );
}
