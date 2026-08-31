"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { defaultSiteSettings, PRIMARY_CTA, whatsappLink, type SiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav({ settings = defaultSiteSettings }: { settings?: SiteSettings }) {
  const navLinks = settings.navLinks;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const activeIdx = navLinks.findIndex((item) => item.href === pathname);
  const desktopIdx = hoveredIdx ?? (activeIdx >= 0 ? activeIdx : null);
  const indicatorTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.7 };

  const panelVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.05, delayChildren: 0.08 },
    },
    exit: {
      opacity: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
    },
  };

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        },
        exit: { opacity: 0, y: 12, filter: "blur(4px)", transition: { duration: 0.15 } },
      };

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
    <>
      <header
        className={cn(
          "fixed top-4 inset-x-4 max-w-7xl mx-auto z-50 h-14 rounded-full border border-border bg-surface/85 backdrop-blur-xl transition-[border-color,background-color] duration-300 flex items-center justify-between px-6 shadow-sm hover:border-border-strong",
          open && "border-transparent bg-transparent shadow-none backdrop-blur-none"
        )}
      >
        <div className="relative z-10 flex items-center shrink-0">
          <Link href="/" aria-label="vour.dev beranda" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
        </div>

        {/* Six items plus a CTA fit on one line from lg up; centered absolutely in middle */}
        <nav
          aria-label="Navigasi utama"
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
        >
          <ul className="flex items-center gap-1" onMouseLeave={() => setHoveredIdx(null)}>
            {navLinks.map((item, idx) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="relative py-1">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onFocus={() => setHoveredIdx(idx)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 block z-10 font-mono",
                      desktopIdx === idx ? "text-accent-text" : "text-text-muted hover:text-text"
                    )}
                  >
                    {item.label}
                  </Link>
                  {/* Single pill travels between items; rests on the active route */}
                  {desktopIdx === idx && (
                    <motion.div
                      layoutId="desktop-nav-indicator"
                      className="absolute inset-0 rounded-full bg-surface border border-border/60 -z-0"
                      transition={indicatorTransition}
                    />
                  )}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-accent" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2 shrink-0">
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-full px-4">
            <Link href="/contact">{PRIMARY_CTA}</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-text lg:hidden hover:border-border-strong hover:bg-bg-subtle active:scale-90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/15 cursor-pointer"
          >
            <span className={cn("transition-transform duration-300 ease-out flex items-center justify-center", open ? "rotate-90" : "")}>
              {open ? (
                <XIcon weight="light" className="size-5" aria-hidden />
              ) : (
                <ListIcon weight="light" className="size-5" aria-hidden />
              )}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Outside header container for clean stacking and touch interaction) */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav-overlay"
            id="mobile-nav"
            data-lenis-prevent
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col bg-bg/98 backdrop-blur-2xl overscroll-contain overflow-y-auto lg:hidden"
          >
            <div className="flex min-h-full flex-col justify-between px-6 pt-24 pb-10 max-w-lg mx-auto w-full">
              <nav aria-label="Navigasi seluler" className="flex flex-col">
                {navLinks.map((item, idx) => {
                  const active = pathname === item.href;
                  return (
                    <motion.div key={item.href} variants={itemVariants} className="relative">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-baseline gap-4 border-b border-border/40 py-5 transition-colors duration-200",
                          active
                            ? "text-accent-text"
                            : "text-text hover:text-accent-text"
                        )}
                      >
                        <span className="font-mono text-xs tabular-nums text-text-faint group-hover:text-accent-text/70 transition-colors duration-200">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-3xl font-medium tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6">
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4 hover:border-border-strong hover:bg-bg-subtle transition-all duration-200 group"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-faint group-hover:text-text transition-colors">Email</span>
                    <span className="text-xs font-mono text-text truncate">{settings.contactEmail}</span>
                  </a>
                  <a
                    href={whatsappLink(undefined, settings.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-xl border border-accent/30 bg-accent-soft p-4 hover:border-accent hover:bg-accent-soft/70 transition-all duration-200 group"
                  >
                    <span className="text-[10px] font-mono tracking-wider text-accent-text uppercase font-semibold">WhatsApp</span>
                    <span className="text-xs font-mono text-accent-text truncate font-bold">Chat Prioritas</span>
                  </a>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full justify-center rounded-xl"
                  >
                    <Link href="/contact" onClick={() => setOpen(false)}>{PRIMARY_CTA}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
