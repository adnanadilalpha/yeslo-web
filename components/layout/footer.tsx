import { LogoLockup } from "@/components/brand/marks";
import { Shell } from "@/components/layout/shell";
import { footerCompany, footerProduct, site } from "@/lib/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <Shell className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <LogoLockup tone="dark" className="h-10" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-mist">
            One iOS app, two modes. Freelancers send proposals. Trades send estimates. The client opens a link and types their name.
          </p>
        </div>
        <div>
          <p className="eyebrow text-mint">Product</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerProduct.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/90 hover:text-mint">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-mint">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerCompany.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/90 hover:text-mint">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a className="text-paper/90 hover:text-mint" href={`mailto:${site.supportEmail}`}>
                {site.supportEmail}
              </a>
            </li>
          </ul>
        </div>
      </Shell>
      <Shell className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Yeslo. A record of agreement, not legal advice.</p>
        <p>
          {site.bundleId} · No payments in v1 · {site.futureDomain} when the name is live
        </p>
      </Shell>
    </footer>
  );
}
