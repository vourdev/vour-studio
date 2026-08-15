"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { defaultSiteSettings, PRIMARY_CTA, whatsappLink, type SiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav({ settings = defaultSiteSettings }: { settings?: SiteSettings }) {
  const navLinks = settings.navLinks;
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
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-xl">
      {/* h-16 desktop keeps the bar at 64px, comfortably under the 80px cap. */}
      {/* relative container allows absolute centering of navigation on desktop. */}
      <Container className="relative flex h-16 items-center justify-between gap-6">
        <div className="flex items-center shrink-0">
          <Link href="/" aria-label="Vour beranda">
            <Logo />
          </Link>
        </div>

        {/* Six items plus a CTA fit on one line from lg up; centered absolutely in middle */}
        <nav
          aria-label="Navigasi utama"
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
        >
          <ul className="flex items-center gap-1.5">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-control px-3.5 py-1 text-sm font-medium transition-all duration-200 border",
                      active
                        ? "bg-accent-soft text-accent-text border-accent/15"
                        : "text-text-muted hover:bg-surface-solid/65 hover:text-text border-transparent"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">{PRIMARY_CTA}</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-9 items-center justify-center rounded-control border border-border text-text lg:hidden transition-colors hover:bg-surface-solid"
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
        <div
          id="mobile-nav"
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 top-16 z-55 flex flex-col bg-bg/95 backdrop-blur-2xl border-t border-border animate-in fade-in slide-in-from-top-6 duration-300 ease-out overscroll-contain overflow-y-auto lg:hidden"
        >
          <Container className="flex-1 flex flex-col justify-between py-6 min-h-[calc(100dvh-4rem)]">
            <nav aria-label="Navigasi seluler" className="flex flex-col gap-1.5">
              {navLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-control px-4 py-3.5 text-base font-medium transition-colors border-b border-border/40 last:border-b-0",
                      active ? "text-accent-text" : "text-text-muted hover:text-text"
                    )}
                  >
                    <span>{item.label}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-border/50 pt-8 pb-4 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex flex-col gap-1 rounded-control border border-border bg-surface-solid/40 p-4 hover:border-border-strong hover:bg-surface-solid transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-faint">Email</span>
                  <span className="text-xs font-mono text-text truncate">{settings.contactEmail}</span>
                </a>
                <a
                  href={whatsappLink(undefined, settings.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 rounded-control border border-accent/20 bg-accent-soft/10 p-4 hover:border-accent/40 hover:bg-accent-soft/20 transition-colors"
                >
                  <span className="text-[10px] font-mono tracking-wider text-accent-text uppercase">WhatsApp</span>
                  <span className="text-xs font-mono text-accent-text truncate">Chat Prioritas</span>
                </a>
              </div>

              <Button asChild className="w-full justify-center sm:hidden active:scale-95 transition-transform duration-100">
                <Link href="/contact">{PRIMARY_CTA}</Link>
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
