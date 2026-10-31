import { Flourish, Wordmark } from "@/components/brand/marks";
import { Shell } from "@/components/layout/shell";
import Link from "next/link";

export function QuoteSkeleton() {
  return (
    <Shell className="py-16">
      <div className="mx-auto h-[640px] max-w-xl animate-pulse rounded-[28px] bg-card" />
    </Shell>
  );
}

export function QuoteMissing() {
  return (
    <Shell className="py-20">
      <div className="mx-auto max-w-xl">
        <Wordmark />
        <p className="eyebrow mt-10 text-yes">Not found</p>
        <h1 className="display-sm mt-4">This link doesn’t match a quote.</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          It may have been mistyped, or the sender closed it and issued another. Ask them for a fresh link. Nothing else on this page is for sale.
        </p>
        <Link href="/" className="mt-8 inline-flex text-sm font-medium text-yes">
          Back to Yeslo
        </Link>
        <Flourish className="mt-10 w-40" draw />
      </div>
    </Shell>
  );
}
