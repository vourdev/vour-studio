"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";

/**
 * Both icons are always rendered and swapped by the `dark` class that next-themes
 * puts on <html>. That avoids the usual mounted-flag dance: there is no hydration
 * mismatch to guard against, the correct icon is right from first paint, and the
 * control needs no client state at all.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-control border border-border text-text-muted transition-colors hover:border-accent hover:text-accent-text"
      aria-label="Ganti mode terang atau gelap"
    >
      <SunIcon weight="light" className="hidden size-4 dark:block" aria-hidden />
      <MoonIcon weight="light" className="size-4 dark:hidden" aria-hidden />
    </button>
  );
}
