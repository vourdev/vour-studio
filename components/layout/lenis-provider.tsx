"use client";

import { useEffect } from "react";

/**
 * Smooth scroll, plus the GSAP handshake.
 *
 * Lenis moves the page on its own schedule. ScrollTrigger reads scroll position
 * on GSAP's ticker. Without wiring the two together, any scrubbed animation
 * lags behind the actual scroll position by a frame or more and looks broken.
 * So: Lenis reports every scroll to ScrollTrigger, and GSAP's ticker drives
 * Lenis' RAF loop instead of Lenis running its own.
 *
 * GSAP is imported inside the effect so it stays out of the initial bundle.
 */
export function LenisProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      // GSAP's ticker reports seconds; Lenis expects milliseconds.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        lenis.off("scroll", onScroll);
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
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
