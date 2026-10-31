import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageTransition } from "@/components/layout/transition";
import { Suspense } from "react";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="site-frame flex min-h-full flex-col">
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <PageTransition>
        <main id="content" className="flex-1 pt-4">
          {children}
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
