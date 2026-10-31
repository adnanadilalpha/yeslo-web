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
    <div className={cn("phone w-[270px]", className)} aria-label={label}>
      <div className="phone-bezel">
        <div className="phone-screen">
          <div className="phone-status relative">
            <span>9:41</span>
            <span className="phone-island absolute top-2 left-1/2 -translate-x-1/2" />
            <span>5G</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AppQuoteScreen({ revealed = 3 }: { revealed?: number }) {
  const lines = [
    ["Discovery workshop", "$1,800"],
    ["Art direction", "$2,400"],
    ["Marketing site", "$4,800"],
  ];
  return (
    <div className="flex h-full flex-col bg-[#F7F7F4] px-4 pb-4 text-[#111426]">
      <div className="flex items-center justify-between pt-1">
        <LogoMark className="h-6" />
        <span className="font-mono text-[10px] tracking-wide text-[#5B6172]">Q-1048</span>
      </div>
      <p className="mt-4 text-[15px] font-semibold tracking-[-0.03em]">Spring line</p>
      <p className="text-[11px] text-[#5B6172]">Harbor Studio · Proposal</p>
      <ul className="mt-4 space-y-2">
        {lines.slice(0, revealed).map(([name, price]) => (
          <li key={name} className="q-line flex items-center justify-between rounded-xl bg-white px-3 py-2 text-[12px] shadow-[0_8px_20px_-16px_rgba(17,20,38,0.8)]">
            <span>{name}</span>
            <span className="tabular-nums font-medium">{price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between border-t border-[#111426]/10 pt-3">
        <span className="text-[11px] text-[#5B6172]">Total</span>
        <span className="text-lg font-semibold tabular-nums">$9,000</span>
      </div>
    </div>
  );
}

export function ClientBrowser({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("client-browser", className)}>
      <div className="flex items-center gap-2 border-b border-[#111426]/10 px-3 py-2">
        <span className="size-2 rounded-full bg-[#111426]/15" />
        <span className="size-2 rounded-full bg-[#111426]/15" />
        <span className="size-2 rounded-full bg-[#111426]/15" />
        <span className="ml-2 truncate rounded-full bg-[#F7F7F4] px-3 py-1 font-mono text-[10px] text-[#5B6172]">
          getyeslo.com/q/harbor
        </span>
      </div>
      <div className="relative min-h-0 flex-1 bg-white">{children}</div>
    </div>
  );
}
