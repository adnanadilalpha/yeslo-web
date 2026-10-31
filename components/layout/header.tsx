"use client";

import { Wordmark } from "@/components/brand/marks";
import { Shell } from "@/components/layout/shell";
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
  const [onInk, setOnInk] = useState(false);
  const [inkPath, setInkPath] = useState(pathname);
  const join = pathname === "/" ? "/#join" : "/pricing#join";

  if (pathname !== openPath) {
    setOpenPath(pathname);
    setOpen(false);
  }
  if (pathname !== inkPath) {
    setInkPath(pathname);
    setOnInk(false);
  }

  useEffect(() => {
    const story = document.getElementById("story");
    if (!story) return;
    const observer = new IntersectionObserver(([entry]) => setOnInk(entry.isIntersecting), {
      rootMargin: "-64px 0px -55% 0px",
      threshold: 0,
    });
    observer.observe(story);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-colors",
        onInk ? "border-white/10 bg-ink text-paper" : "border-border bg-background text-foreground",
      )}
    >
      <Shell className="flex h-16 items-center gap-6">
        <Link href="/" aria-label="Yeslo, home" className="rounded-full">
          <Wordmark />
        </Link>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm tracking-tight",
                  active ? "text-yes" : onInk ? "text-mist hover:text-paper" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle onInk={onInk} />
          <Link href={join} className={cn(buttonVariants({ variant: "yes", size: "lg" }), "hidden sm:inline-flex")}>
            Join the beta
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full border border-current/15 px-3 font-mono text-[11px] tracking-[0.14em] uppercase md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Shell>
      {open ? (
        <div id="mobile-nav" className="border-t border-current/10 md:hidden">
          <Shell className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-2 py-3 text-lg tracking-tight">
                {item.label}
              </Link>
            ))}
            <Link href="/support" className="rounded-xl px-2 py-3 text-lg tracking-tight">
              Support
            </Link>
            <Link href={join} className={cn(buttonVariants({ variant: "yes", size: "xl" }), "mt-2")}>
              Join the beta
            </Link>
          </Shell>
        </div>
      ) : null}
    </header>
  );
}
