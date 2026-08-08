"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const SCENE_URL = "https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode";

/** Below this width the runtime download costs more than the scene is worth. */
const MIN_WIDTH = 1024;

/** Fades the lattice out at all four edges so it never ends on a hard line. */
const BASE_MASK = [
  "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
  "linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%)",
].join(", ");

type SplineBackgroundProps = {
  scene?: string;
  className?: string;
};

/**
 * Decorative 3D layer behind the hero.
 *
 * The Spline runtime is ~2MB of JS plus the scene payload, and the hero is the
 * LCP element, so nothing here is allowed to run on the critical path:
 *
 * - `next/dynamic` with `ssr: false` keeps it out of the server payload.
 * - The chunk is only requested after the first idle callback, so the headline
 *   and CTAs paint first.
 * - Narrow viewports and `prefers-reduced-motion` never mount it at all; they
 *   keep the static gradient underneath, which is the same composition minus
 *   the motion.
 *
 * Pointer events stay live on the canvas so the scene reacts to the cursor. The
 * hero content above it is `pointer-events-none` except for its links, which is
 * what lets both layers share the same screen space.
 */
export function SplineBackground({
  scene = SCENE_URL,
  className,
}: SplineBackgroundProps) {
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches;
    if (reduce || !wide) return;

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);
    const cancel =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback
        : window.clearTimeout;

    const handle = schedule(() => setEnabled(true));
    return () => cancel(handle as number);
  }, []);

  return (
    <div aria-hidden className={className}>
      {enabled ? (
        <Spline
          scene={scene}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 size-full transition-opacity duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      ) : null}

      {/* Everything below sits ABOVE the canvas on purpose. Underneath, each
          layer would be covered the moment the scene painted, and a glow that
          vanishes mid-load reads as a flash. Above, the composition is
          identical before and after — only the scene fades in behind it.

          The lattice is also what carries the hero on its own while the runtime
          is still downloading, and what ties an imported scene back to the rest
          of the site. */}
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-50"
        style={{
          maskImage: BASE_MASK,
          WebkitMaskImage: BASE_MASK,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_0%,var(--accent-soft),transparent_65%)]" />

      {/* Edge falloff: keeps the scene from fighting the headline and hands the
          bottom edge back to the page background. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "linear-gradient(to right, var(--bg) 0%, transparent 28%, transparent 72%, var(--bg) 100%)",
            "linear-gradient(to bottom, transparent 45%, color-mix(in srgb, var(--bg) 92%, transparent) 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
