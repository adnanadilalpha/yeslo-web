import { cn } from "cn";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

/** Approved lockup. The file is used as-is. */
export function LogoLockup({ tone = "light", className, alt = "Yeslo" }: LogoProps & { alt?: string }) {
  const src = tone === "dark" ? "/brand/yeslo-lockup-dark.svg" : "/brand/yeslo-lockup-light.svg";
  return (
    // Approved SVG lockup, used unchanged.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={tone === "dark" ? 168 : 148} height={56} className={cn("h-8 w-auto", className)} />
  );
}

export function LogoMark({
  tone = "green",
  className,
}: {
  tone?: "green" | "ink" | "white" | "black";
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/brand/yeslo-mark-${tone}.svg`} alt="" width={48} height={54} className={cn("h-10 w-auto", className)} />
  );
}

export function TradesLockup({ tone = "light", className }: LogoProps) {
  const src = tone === "dark" ? "/brand/yeslo-trades-lockup-dark.svg" : "/brand/yeslo-trades-lockup-light.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Yeslo Trades" width={220} height={48} className={cn("h-10 w-auto", className)} />
  );
}
