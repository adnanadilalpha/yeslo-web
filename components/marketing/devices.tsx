import { LogoMark } from "@/components/brand/marks";
import { cn } from "cn";
import type { ReactNode } from "react";

export function IPhone({
  children,
  className,
  label = "Yeslo on iPhone",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("iphone", className)} aria-label={label}>
      <div className="iphone-metal">
        <div className="iphone-screen">
          <div className="ios-status">
            <span>9:41</span>
            <span className="ios-glyphs" aria-hidden="true">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.6" />
                <rect x="4.5" y="5" width="3" height="7" rx="0.6" />
                <rect x="9" y="2.5" width="3" height="9.5" rx="0.6" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.6" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M1 4.5c3.8-3.2 10.2-3.2 14 0" />
                <path d="M3.5 7.2c2.4-2 6.6-2 9 0" />
                <path d="M6.2 9.6c1.1-.8 2.5-.8 3.6 0" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12">
                <rect x="0.6" y="0.6" width="20" height="10.8" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <rect x="2" y="2" width="14" height="8" rx="1.2" fill="currentColor" />
                <rect x="21.4" y="3.6" width="1.6" height="4.8" rx="0.6" fill="currentColor" />
              </svg>
            </span>
          </div>
          <div className="ios-island" aria-hidden="true" />
          <div className="ios-body">{children}</div>
          <div className="ios-home" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

const identity = [
  ["Workshop", "1 day · $1,200", "$1,200"],
  ["Identity system", "1 project", "$2,400"],
  ["Art direction", "8 hr · $150", "$1,200"],
  ["Guidelines", "12 pp", "$800"],
];

const kitchen = [
  ["Labour", "5 days", "£2,400"],
  ["Cabinets", "1", "£1,250"],
  ["Worktop", "3.2 m", "£400"],
];

export function QuoteScreen({ mode = "freelancer" }: { mode?: "freelancer" | "trades" }) {
  const trades = mode === "trades";
  const rows = trades ? kitchen : identity;
  return (
    <div className="ios-app">
      <div className="ios-nav">
        <span className="text-[#12805C]">Quotes</span>
        <LogoMark className="h-5" />
        <span className="text-[#12805C]">Send</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-[11px] font-bold text-ink" aria-hidden="true">{trades ? "PS" : "SO"}</span>
        <span className="min-w-0">
          <strong className="block text-[15px] leading-tight whitespace-nowrap">{trades ? "Priya Shah" : "Sarah Okafor"}</strong>
          <em className="block text-xs text-[#3E4558] not-italic">{trades ? "14 Elm Rd" : "Northwind Studio"}</em>
        </span>
      </div>
      <span className="mt-2 inline-flex w-fit rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-ink">Sent · awaiting yes</span>
      <p className="ios-kicker">{trades ? "Estimate · E-0142" : "Proposal · Q-0142"}</p>
      <h3 className="ios-title">{trades ? "Kitchen refit" : "Brand identity sprint"}</h3>
      <ul className="ios-lines">
        {rows.map(([name, qty, price]) => (
          <li key={name} className="q-line">
            <span>
              <strong>{name}</strong>
              <em>{qty}</em>
            </span>
            <b>{price}</b>
          </li>
        ))}
      </ul>
      <p className="ios-note">{trades ? "Includes labour and listed materials. Colour confirmed on site." : "Two rounds of revisions. Work starts the Monday after approval."}</p>
      <div className="ios-totals">
        <p>
          <span>Subtotal</span>
          <span>{trades ? "£4,050.00" : "$5,600.00"}</span>
        </p>
        <p>
          <span>{trades ? "VAT 20%" : "Tax 10%"}</span>
          <span>{trades ? "£810.00" : "$560.00"}</span>
        </p>
        <p className="ios-grand">
          <span>Total</span>
          <span>{trades ? "£4,860.00" : "$6,160.00"}</span>
        </p>
      </div>
      <div className="mt-3 rounded-2xl bg-[#12805C] py-3 text-center text-[16px] font-semibold text-white">Send link</div>
    </div>
  );
}

export function ApprovalScreen() {
  return (
    <div className="ios-app ios-client">
      <p className="ios-kicker">Q-0142 · 12 Nov 2026</p>
      <h3 className="ios-title">Brand identity sprint</h3>
      <p className="ios-sub">Harbor Studio for Sarah Okafor</p>
      <div className="ios-sign">
        <p className="typed-name">Sarah Okafor</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/yeslo-mark-green.svg" alt="" className="yes-mark" />
      </div>
      <p className="ios-note">Approved. A record of agreement, not legal advice.</p>
    </div>
  );
}

export function MarkPaidScreen() {
  return (
    <div className="ios-app">
      <div className="ios-nav">
        <span className="text-[#12805C]">Invoices</span>
        <LogoMark className="h-5" />
        <span className="text-[#5B6172]">PDF</span>
      </div>
      <p className="ios-kicker">Invoice · Q-0142</p>
      <h3 className="ios-title">Northwind Studio</h3>
      <p className="ios-sub">Sarah Okafor · Due 12 Dec 2026</p>
      <ul className="ios-lines">
        <li><span><strong>Workshop</strong><em>1 day</em></span><b>$1,200</b></li>
        <li><span><strong>Identity system</strong><em>1</em></span><b>$2,400</b></li>
        <li><span><strong>Art direction</strong><em>8 hr</em></span><b>$1,200</b></li>
        <li><span><strong>Guidelines</strong><em>12 pp</em></span><b>$800</b></li>
      </ul>
      <div className="ios-totals">
        <p><span>Subtotal</span><span>$5,600.00</span></p>
        <p><span>Tax 10%</span><span>$560.00</span></p>
        <p className="ios-grand"><span>Total</span><span>$6,160.00</span></p>
      </div>
      <div className="mark-paid mt-3 rounded-2xl bg-[#0C5C42] py-3 text-center text-[16px] font-semibold text-white shadow-[inset_0_3px_0_rgb(0_0_0/28%)]">
        Mark paid
      </div>
    </div>
  );
}

export function InvoiceScreen() {
  return (
    <div className="ios-app relative">
      <div className="paid-stamp stamp absolute top-1 right-1">Paid</div>
      <div className="pr-16">
        <p className="ios-kicker">Invoice · Q-0142</p>
        <h3 className="ios-title">Northwind Studio</h3>
        <p className="ios-sub">Sarah Okafor · Due 12 Dec 2026</p>
      </div>
      <ul className="ios-lines">
        <li><span><strong>Workshop</strong><em>1 day</em></span><b>$1,200</b></li>
        <li><span><strong>Identity system</strong><em>1</em></span><b>$2,400</b></li>
        <li><span><strong>Art direction</strong><em>8 hr</em></span><b>$1,200</b></li>
        <li><span><strong>Guidelines</strong><em>12 pp</em></span><b>$800</b></li>
      </ul>
      <div className="ios-totals">
        <p><span>Subtotal</span><span>$5,600.00</span></p>
        <p><span>Tax 10%</span><span>$560.00</span></p>
        <p className="ios-grand"><span>Total</span><span>$6,160.00</span></p>
      </div>
    </div>
  );
}
