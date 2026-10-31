import { cn } from "cn";

type MarkProps = {
  className?: string;
  draw?: boolean;
  title?: string;
};

export function SignatureY({ className, draw = false, title }: MarkProps) {
  const stroke = draw ? "sig-draw" : undefined;
  return (
    <svg viewBox="0 0 80 88" className={cn("text-current", className)} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        className={stroke}
        pathLength={1}
        d="M12 14C22 30 30 42 36 54"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        className={cn(stroke, draw && "sig-draw-late")}
        pathLength={1}
        d="M68 12C56 28 46 42 36 54"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        className={cn(stroke, draw && "sig-draw-later")}
        pathLength={1}
        d="M36 54C34 68 28 78 18 86C32 80 48 78 66 86"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Flourish({ className, draw = false }: { className?: string; draw?: boolean }) {
  return (
    <svg viewBox="0 0 220 28" className={cn("text-yes", className)} aria-hidden="true">
      <path
        className={draw ? "sig-draw" : undefined}
        pathLength={1}
        d="M2 18C28 18 26 6 62 8C108 11 96 24 150 14C176 8 190 16 218 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-medium tracking-[-0.04em] text-current", className)}>
      <SignatureY className={cn("h-7 w-7", markClassName)} />
      <span className="text-[1.15rem] leading-none">Yeslo</span>
    </span>
  );
}
