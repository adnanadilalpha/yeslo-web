import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Flourish, Wordmark } from "@/components/brand/marks";
import { Shell } from "@/components/layout/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <Suspense fallback={<div className="h-16 border-b border-border" />}>
        <Header />
      </Suspense>
      <main id="content" className="flex-1">
        <Shell className="py-24">
          <Wordmark />
          <p className="eyebrow mt-10 text-yes">404</p>
          <h1 className="display-sm mt-4 max-w-3xl">No page at this address.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            A client quote only exists on the link someone sent you. The rest of Yeslo is the marketing site.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={cn(buttonVariants({ variant: "yes", size: "xl" }))}>
              Home
            </Link>
            <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "xl" }))}>
              Pricing
            </Link>
            <Link href="/q/demo" className={cn(buttonVariants({ variant: "outline", size: "xl" }))}>
              Sample quote
            </Link>
          </div>
          <Flourish className="mt-12 w-48" draw />
        </Shell>
      </main>
      <Footer />
    </div>
  );
}
