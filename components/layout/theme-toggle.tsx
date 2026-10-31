"use client";

import { Button } from "@/components/ui/button";
import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function snapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ onInk = false }: { onInk?: boolean }) {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "light");

  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("yeslo-theme", next);
  }

  const dark = theme === "dark";
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggle}
      aria-label={dark ? "Switch to light appearance" : "Switch to dark appearance"}
      className={`h-10 rounded-full px-3 font-mono text-[11px] tracking-[0.14em] uppercase ${onInk ? "text-paper hover:bg-white/10 hover:text-paper" : ""}`}
    >
      {dark ? "Light" : "Dark"}
    </Button>
  );
}
