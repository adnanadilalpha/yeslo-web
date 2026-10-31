import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quote",
  robots: { index: false, follow: false },
  openGraph: { title: "A Yeslo quote", description: "A private quote link. It is not indexed." },
};

export default function QuoteLayout({ children }: LayoutProps<"/q">) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="font-medium tracking-[-0.04em]">
            Yeslo
          </Link>
          <p className="text-sm text-muted-foreground">Client quote</p>
        </div>
      </header>
      <main id="content" className="flex-1">
        {children}
      </main>
      <p className="px-5 py-8 text-center text-sm text-muted-foreground">A record of agreement, not legal advice. No ads.</p>
    </div>
  );
}
