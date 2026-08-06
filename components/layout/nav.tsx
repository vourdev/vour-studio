"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mainNav, PRIMARY_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Navigating anywhere closes the panel, including via the browser back button.
  // Adjusted during render rather than in an effect, so there is no extra commit
  // where the panel is still open on the new route.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-xl">
      {/* h-16 desktop keeps the bar at 64px, comfortably under the 80px cap. */}
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={`${"VOUR"} beranda`}>
          <Logo />
        </Link>

        {/* Six items plus a CTA fit on one line from lg up; below that it is a panel. */}
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm transition-colors hover:text-text",
                      active ? "text-text" : "text-text-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">{PRIMARY_CTA}</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-9 items-center justify-center rounded-control border border-border text-text lg:hidden"
          >
            {open ? (
              <XIcon weight="light" className="size-4" aria-hidden />
            ) : (
              <ListIcon weight="light" className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-bg lg:hidden">
          <Container className="flex flex-col py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-3.5 text-base text-text-muted last:border-b-0 hover:text-text"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-4 sm:hidden">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
