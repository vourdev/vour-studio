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

// Downward sweep (the opening animation).
const SWEEP_SPEED = 520; // px per second
const SWEEP_BAND = 78; // thickness of the front, px
const SWEEP_LIFE = 2.8; // seconds before the front has decayed
const SWEEP_BEND = 26; // how far the front bows, px
const SWEEP_EVERY = 4400; // ms between repeats

// Pointer pulse.
const POINT_RADIUS = 118; // px
const POINT_LIFE = 0.85; // seconds
const POINT_CELL_MAX = 7; // pointer blocks stay smaller than sweep blocks, px

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
      cols = Math.max(1, Math.ceil(width / PITCH) + 1);
      rows = Math.max(1, Math.ceil(height / PITCH) + 1);

      weights = new Float32Array(cols * rows);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) weights[r * cols + c] = cellWeight(c, r);
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = accent;

      wavesRef.current = wavesRef.current.filter((w) => {
        const age = (t - w.start) / 1000;
        return age < (w.kind === "sweep" ? SWEEP_LIFE * 1.6 : POINT_LIFE * 2.4);
      });

      const ox = (width - (cols - 1) * PITCH) / 2;
      const oy = (height - (rows - 1) * PITCH) / 2;

      for (let c = 0; c < cols; c++) {
        const cx = ox + c * PITCH;

        for (let r = 0; r < rows; r++) {
          const cy = oy + r * PITCH;
          // Tracked separately so each kind can drive its own block size. The
          // pointer trail is deliberately finer than the sweep.
          let iSweep = 0;
          let iPoint = 0;

          for (const w of wavesRef.current) {
            const age = (t - w.start) / 1000;
            if (age < 0) continue;

            if (w.kind === "sweep") {
              // Front starts above the top edge and travels down past the bottom.
              const front = -SWEEP_BAND * 2 + age * SWEEP_SPEED;
              const bend = Math.sin(cx / 210) * SWEEP_BEND;
              const band = cy - (front + bend);
              if (Math.abs(band) > SWEEP_BAND * 2.6) continue;
              const ring = Math.exp(-(band * band) / (2 * SWEEP_BAND * SWEEP_BAND));
              iSweep += ring * Math.exp(-age / SWEEP_LIFE) * w.strength;
            } else {
              const dx = cx - w.x;
              const dy = cy - w.y;
              if (Math.abs(dx) > POINT_RADIUS || Math.abs(dy) > POINT_RADIUS) continue;
              const d = Math.hypot(dx, dy);
              if (d > POINT_RADIUS) continue;
              const falloff = 1 - d / POINT_RADIUS;
              const decay = Math.max(0, 1 - age / POINT_LIFE);
              iPoint += falloff * falloff * decay * w.strength;
            }
          }

          const i = iSweep + iPoint;
          if (i < 0.05) continue;

          // Per-cell weight is what breaks up the grid: low-weight cells stay
          // small and faint even at a wave peak.
          const wgt = weights[r * cols + c];
          const e = Math.min(1, i) * (0.25 + 0.75 * wgt);
          if (e < 0.04) continue;

          // Blend the two caps by how much each kind contributed to this cell.
          const share = iPoint / i;
          const cap = CELL_MAX * (1 - share) + POINT_CELL_MAX * share;
          const size = CELL_MIN + (cap - CELL_MIN) * e * e;
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
      return () => {};
    }

    // Opening sweep, then repeats so the hero keeps moving.
    wavesRef.current.push({ kind: "sweep", start: performance.now() + 160, strength: 1.25 });
    const sweepTimer = window.setInterval(() => {
      if (!running) return;
      wavesRef.current.push({ kind: "sweep", start: performance.now(), strength: 1.1 });
    }, SWEEP_EVERY);

    const onPointerMove = (event: PointerEvent) => {
      // Coarse pointers have no hover; a trail that only fires on tap is noise.
      if (event.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastPointerWave < 38) return;
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
      if (sweepTimer) window.clearInterval(sweepTimer);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden role="presentation" />;
}
