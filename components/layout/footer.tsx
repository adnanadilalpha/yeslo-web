import { LogoLockup } from "@/components/brand/marks";
import { Shell } from "@/components/layout/shell";
import { footerCompany, footerProduct, site } from "@/lib/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0a1210] text-white">
      <Shell className="pt-20 pb-10">
        <p className="max-w-3xl font-heading text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.92] font-bold tracking-tighter">
          Send a quote. Get a <span className="ital-yes">yes</span>.
        </p>
        <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <LogoLockup tone="dark" className="h-10" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
              One iOS app, two modes. Freelancers send proposals. Trades send estimates. The client opens a link and types their name.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#7dffa8]">Product</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerProduct.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition-colors hover:text-[#7dffa8]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#7dffa8]">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition-colors hover:text-[#7dffa8]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a className="text-white/80 transition-colors hover:text-[#7dffa8]" href={`mailto:${site.supportEmail}`}>
                  {site.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Yeslo. A record of agreement, not legal advice.</p>
          <p>
            {site.bundleId} · No payments in v1 · {site.futureDomain} when the name is live
          </p>
        </div>
      </Shell>
    </footer>
  );
}
