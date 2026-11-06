"use client";

import { useEffect } from "react";

export const LENIS_SCROLL_EVENT = "lenis:scroll";

/** Null when smooth scroll is off. Jump to in-page targets via `scrollToElement`:
 * native smooth `scrollIntoView` fights Lenis and lands short. */
let lenisInstance: { scrollTo: (target: HTMLElement, options?: object) => void } | null =
  null;

export function scrollToElement(el: HTMLElement, { instant = false } = {}) {
  if (lenisInstance && !instant) {
    lenisInstance.scrollTo(el, { offset: -scrollMarginTop(el) });
    return;
  }
  el.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
}

/** Lenis does not read `scroll-margin-top`, so resolve it and pass it as an offset. */
function scrollMarginTop(el: HTMLElement) {
  const value = getComputedStyle(el).scrollMarginTop;
  return Number.parseFloat(value) || 0;
}

/** Keep GSAP out of here: scroll-driven components listen for the `lenis:scroll` window event. */
export function LenisProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const { default: Lenis } = await import("lenis");

      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        autoResize: true,
      });

      const onScroll = () => {
        window.dispatchEvent(new CustomEvent(LENIS_SCROLL_EVENT));
      };
      lenis.on("scroll", onScroll);
      lenisInstance = lenis;

      let rafId = 0;
      const tick = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      cleanup = () => {
        lenisInstance = null;
        lenis.off("scroll", onScroll);
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}