import { QuoteExperience } from "@/components/quote/experience";
import { QuoteMissing, QuoteSkeleton } from "@/components/quote/states";
import { fixtureQuote, parseDecisionCookie } from "@/lib/quotes/fixtures";
import { loadLiveQuote, recordView } from "@/lib/quotes/live";
import { connection } from "next/server";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";

export default function QuotePage({ params }: PageProps<"/q/[token]">) {
  return (
    <Suspense fallback={<QuoteSkeleton />}>
      <QuoteLoader params={params} />
    </Suspense>
  );
}

async function QuoteLoader({ params }: { params: Promise<{ token: string }> }) {
  await connection();
  const { token } = await params;
  const now = new Date();
  const jar = await cookies();
  const fixture = fixtureQuote(token, now, token === "demo" ? parseDecisionCookie(jar.get("yeslo_demo_decision")?.value) : null);
  if (fixture) return <QuoteExperience model={fixture} />;

  const live = await loadLiveQuote(decodeURIComponent(token), now);
  if (!live) return <QuoteMissing />;
  if (live.publicQuote.phase === "open") {
    await recordView(live, await headers());
  }
  return <QuoteExperience model={live.publicQuote} />;
}
