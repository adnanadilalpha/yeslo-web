"use client";

import { LogoLockup, LogoMark } from "@/components/brand/marks";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { nav } from "@/lib/site";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const join = pathname === "/" ? "/#join" : "/pricing#join";

  if (pathname !== openPath) {
    setOpenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex max-w-295 items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
          scrolled || open
            ? "border border-black/8 bg-white/85 shadow-[0_18px_40px_-24px_rgb(7_17_14/35%)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0f1c18]/90"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label="Yeslo, home" className="flex items-center rounded-full pl-1">
          <LogoMark tone="green" className="h-8 w-auto sm:hidden" />
          <LogoLockup tone="light" className="hidden h-7 dark:hidden sm:block" />
          <LogoLockup tone="dark" alt="" className="hidden h-8 dark:sm:block" />
        </Link>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium tracking-tight transition-colors",
                  active ? "text-yes" : "text-[#3a4842] hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5 md:ml-1">
          <ThemeToggle />
          <Link href={join} className={cn(buttonVariants({ variant: "ink", size: "lg" }), "hidden bg-[#0a1210] text-white hover:bg-[#1a2420] sm:inline-flex")}>
            Join the beta
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 text-[11px] font-semibold tracking-[0.08em] uppercase md:hidden dark:border-white/15"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "×" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          className="pointer-events-auto mx-auto mt-2 max-w-295 overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/95 shadow-xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#0f1c18]/95"
        >
          <div className="flex flex-col gap-1 p-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-lg tracking-tight">
                {item.label}
              </Link>
            ))}
            <Link href="/support" className="rounded-2xl px-4 py-3 text-lg tracking-tight">
              Support
            </Link>
            <Link href={join} className={cn(buttonVariants({ variant: "ink", size: "xl" }), "mt-1 bg-[#0a1210] text-white")}>
              Join the beta
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
