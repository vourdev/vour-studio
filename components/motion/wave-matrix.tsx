"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's one "wow moment": a lattice of code blocks lit by waves.
 *
 * Two wave kinds:
 * - `sweep`. A horizontal front travelling top to bottom across the hero. This
 *   is the opening animation, and it repeats on a slow timer so the field keeps
 *   breathing. The front is bent slightly by a sine of x, so it reads as a wave
 *   rather than a ruler-straight line.
 * - `point`. A small radial pulse dropped by the pointer as it moves, so the
 *   lattice reacts to the cursor and shows the direction it travelled.
 *
 * Why it does not look like a uniform grid: every cell carries a fixed
 * pseudo-random weight. That weight scales both size and alpha, so at any wave
 * peak some blocks are large and bright while their neighbours stay small and
 * dim. Without it the field reads as a solid rectangle of identical squares.
 *
 * Cost control: one pass over the grid per frame times a handful of live waves,
 * with expired waves dropped. Pointer position lives in a ref; in React state it
 * would re-render the tree on every mousemove.
 *
 * Single hue. Depth comes from alpha and size, never a second colour, so the
 * page keeps exactly one accent.
 */

const PITCH = 22; // distance between cell centres, px
const CELL_MIN = 1.5; // block size at rest, px
const CELL_MAX = 9; // block size at a wave peak, px

// Radial sweep (the opening animation - 3 circular waves).
const SWEEP_SPEED = 520; // px per second
const SWEEP_BAND = 32; // base thickness of the front, px
const SWEEP_LIFE = 2.8; // seconds before the front has decayed

// Pointer pulse (trail/tail).
const POINT_RADIUS = 40; // px
const POINT_LIFE = 0.45; // seconds
const POINT_CELL_MAX = 8.0; // pointer blocks stay slightly larger and uniform, px

/** Ceiling on block alpha. The field sits behind the headline and must never
    compete with it for contrast. */
const MAX_ALPHA = 0.58;

type Wave =
  | { kind: "sweep"; start: number; strength: number }
  | { kind: "point"; start: number; strength: number; x: number; y: number };

export function WaveMatrix({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<Wave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let halfCols = 0;
    let halfRows = 0;
    let weights = new Float32Array(0);
    let frame = 0;
    let running = false;
    let lastPointerWave = 0;

    // Read the accent off the element so blocks follow the theme token instead
    // of holding a second copy of the brand colour.
    const accent =
      getComputedStyle(canvas).getPropertyValue("--accent").trim() || "#cde87a";

    /** Stable per-cell weight. Same cell always gets the same value, so the
        texture does not shimmer between frames. */
    const cellWeight = (c: number, r: number) => {
      let h = (c * 374761393 + r * 668265263) | 0;
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Centered grid alignment with CSS dot-grid background
      halfCols = Math.ceil(width / PITCH / 2) + 2;
      halfRows = Math.ceil(height / PITCH / 2) + 2;
      cols = 2 * halfCols + 1;
      rows = 2 * halfRows + 1;

      weights = new Float32Array(cols * rows);
      for (let c = -halfCols; c <= halfCols; c++) {
        const cIdx = c + halfCols;
        for (let r = -halfRows; r <= halfRows; r++) {
          const rIdx = r + halfRows;
          weights[rIdx * cols + cIdx] = cellWeight(c, r);
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = accent;

      wavesRef.current = wavesRef.current.filter((w) => {
        const age = (t - w.start) / 1000;
        return age < (w.kind === "sweep" ? SWEEP_LIFE * 1.6 : POINT_LIFE);
      });

      for (let c = -halfCols; c <= halfCols; c++) {
        const cIdx = c + halfCols;
        const cx = (width / 2) + c * PITCH;

        for (let r = -halfRows; r <= halfRows; r++) {
          const rIdx = r + halfRows;
          const cy = (height / 2) + r * PITCH;
          // Tracked separately so each kind can drive its own block size. The
          // pointer trail is deliberately finer than the sweep.
          let iSweepYellow = 0;
          let iSweepWhite = 0;
          let iPoint = 0;
          let minPointerDistRatio = 1.0;

          for (const w of wavesRef.current) {
            const age = (t - w.start) / 1000;
            if (age < 0) continue;

            if (w.kind === "sweep") {
              // 3 circular waves expanding from the top center downward
              const centerX = width / 2;
              const centerY = -50;
              const distance = Math.hypot(cx - centerX, cy - centerY);

              const speed = SWEEP_SPEED;
              const spacing = 150; // spacing between wave peaks in px
              const decayFactor = Math.exp(-age / SWEEP_LIFE);

              // Wave 1: First circle wave (yellow accent)
              const r1 = age * speed;
              const bw1 = SWEEP_BAND * 0.65;
              const diff1 = distance - r1;
              const s1 = 0.85 * w.strength * decayFactor;
              const ring1 = Math.exp(-(diff1 * diff1) / (2 * bw1 * bw1));
              const contrib1 = ring1 * s1;

              // Wave 2: Second circle wave (dimmer white)
              const r2 = r1 - spacing;
              let contrib2 = 0;
              if (r2 > 0) {
                const bw2 = SWEEP_BAND * 0.8;
                const diff2 = distance - r2;
                const s2 = s1 * 0.32; // dimmer white wave 2
                const ring2 = Math.exp(-(diff2 * diff2) / (2 * bw2 * bw2));
                contrib2 = ring2 * s2;
              }

              // Wave 3: Third circle wave (very dim white)
              const r3 = r2 - spacing;
              let contrib3 = 0;
              if (r3 > 0) {
                const bw3 = SWEEP_BAND * 0.7;
                const diff3 = distance - r3;
                const s3 = s1 * 0.14; // very dim white wave 3
                const ring3 = Math.exp(-(diff3 * diff3) / (2 * bw3 * bw3));
                contrib3 = ring3 * s3;
              }

              iSweepYellow += contrib1;
              iSweepWhite += contrib2 + contrib3;
            } else {
              const dx = cx - w.x;
              const dy = cy - w.y;
              const d = Math.hypot(dx, dy);

              const decay = Math.max(0, 1 - age / POINT_LIFE);
              // Shrinking radius of influence for a tapered tail (lancip)
              const currentRadius = POINT_RADIUS * decay;

              if (d <= currentRadius) {
                const falloff = 1 - d / currentRadius;
                iPoint += falloff * falloff * decay * w.strength;

                const ratio = d / POINT_RADIUS;
                if (ratio < minPointerDistRatio) {
                  minPointerDistRatio = ratio;
                }
              }
            }
          }

          const iSweep = iSweepYellow + iSweepWhite;
          const i = iSweep + iPoint;
          if (i < 0.05) continue;

          const share = iPoint / i;
          const wgt = weights[rIdx * cols + cIdx];
          const activeWgt = (0.25 + 0.75 * wgt) * (1 - share) + 1.0 * share;
          const e = Math.min(1, i) * activeWgt;
          if (e < 0.04) continue;

          // Blend the designs by how much each kind contributed to this cell.
          const sweepSize = CELL_MIN + (CELL_MAX - CELL_MIN) * e * e;
          const pointSize = CELL_MIN + (POINT_CELL_MAX - CELL_MIN) * e;
          const size = sweepSize * (1 - share) + pointSize * share;

          // Color rendering: base color is blended from sweep (yellow vs white waves)
          let h = 75;
          let s = 71;
          let l = 70;

          const sweepTotal = iSweepYellow + iSweepWhite;
          if (sweepTotal > 0) {
            const whiteShare = iSweepWhite / sweepTotal;
            // Wave 1 is yellow (75deg), Wave 2 & 3 are white (0deg sat, 95% lightness)
            h = 75 * (1 - whiteShare);
            s = 71 * (1 - whiteShare);
            l = 70 * (1 - whiteShare) + 95 * whiteShare;
          }

          if (share > 0) {
            const r = minPointerDistRatio;
            let pH, pS, pL;
            if (r <= 0.2) {
              const t = r / 0.2;
              pH = 75 + 60 * t;
              pS = 71 + 4 * t;
              pL = 69 - 14 * t;
            } else if (r <= 0.4) {
              const t = (r - 0.2) / 0.2;
              pH = 135 + 50 * t;
              pS = 75 + 5 * t;
              pL = 55 - 5 * t;
            } else if (r <= 0.6) {
              const t = (r - 0.4) / 0.2;
              pH = 185 + 30 * t;
              pS = 80 + 5 * t;
              pL = 50 + 5 * t;
            } else if (r <= 0.8) {
              const t = (r - 0.6) / 0.2;
              pH = 215 + 35 * t;
              pS = 85 - 5 * t;
              pL = 55 - 5 * t;
            } else {
              const t = Math.min(1, (r - 0.8) / 0.2);
              pH = 250 + 15 * t;
              pS = 80 - 10 * t;
              pL = 50 - 20 * t;
            }
            h = h * (1 - share) + pH * share;
            s = s * (1 - share) + pS * share;
            l = l * (1 - share) + pL * share;
          }

          ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
          ctx.globalAlpha = Math.min(MAX_ALPHA, 0.05 + e * 0.8);
          ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();

    if (reduce) {
      // Static end state: a settled sweep mid-screen, so the lattice still reads
      // as a designed element with nothing in motion.
      wavesRef.current = [
        { kind: "sweep", start: performance.now() - 900, strength: 1.15 },
      ];
      draw(performance.now());
      return () => { };
    }

    // Opening sweep, only once when first opened
    wavesRef.current.push({ kind: "sweep", start: performance.now() + 160, strength: 1.25 });

    const onPointerMove = (event: PointerEvent) => {
      // Coarse pointers have no hover; a trail that only fires on tap is noise.
      if (event.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastPointerWave < 14) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      lastPointerWave = now;
      wavesRef.current.push({ kind: "point", start: now, strength: 1.15, x, y });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (canvas.getBoundingClientRect().bottom > 0) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden role="presentation" />;
}
