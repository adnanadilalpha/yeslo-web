import { cn } from "cn";
import type { ReactNode } from "react";

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-295 px-5 sm:px-8", className)}>{children}</div>;
}
