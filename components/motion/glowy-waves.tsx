"use client";

import { useEffect, useRef } from "react";

/**
 * The hero backdrop: a band of glowing sine waves bent by the pointer.
 *
 * Composition rules it inherits from the rest of the site:
 * - One accent. Every lit line is the accent hue read off `--accent`; depth
 *   comes from alpha, line width and blur, never a second colour. The two
 *   faintest lines drop to white at very low alpha so the band has a cool edge
 *   without introducing a hue.
 * - The band sits below the optical centre, so it passes under the CTAs instead
 *   of through the headline, and the canvas is masked at all four edges so it
 *   never ends on a hard line.
 *
 * Cost control: four paths sampled every 8px, DPR capped at 2, and the loop is
 * suspended whenever the hero scrolls out of view or the tab is hidden. The
 * pointer lives in a ref; in state it would re-render the tree per mousemove.
 *
 * `prefers-reduced-motion` paints one settled frame and never starts the loop.
 */

const SAMPLE_STEP = 8; // px between path samples
const BASELINE = 0.6; // band centre, share of canvas height
const LANE_SPREAD = 0.026; // vertical offset between lines, share of height

const POINTER_REACH = 340; // px, radius of the pointer's pull
const POINTER_LIFT = 46; // px, peak displacement under the pointer
const POINTER_EASE = 0.08; // per-frame approach to the real pointer position

type Wave = {
  offset: number;
  amplitude: number;
  frequency: number;
  alpha: number;
  width: number;
  blur: number;
  /** 0 = accent, 1 = white. Anything between is a tint of the accent. */
  wash: number;
};

const WAVES: Wave[] = [
  { offset: 0, amplitude: 1, frequency: 0.0030, alpha: 0.72, width: 1.9, blur: 26, wash: 0 },
  { offset: Math.PI / 2, amplitude: 1.24, frequency: 0.0024, alpha: 0.44, width: 1.5, blur: 20, wash: 0 },
  { offset: Math.PI, amplitude: 0.82, frequency: 0.0037, alpha: 0.24, width: 1.1, blur: 14, wash: 0.6 },
  { offset: Math.PI * 1.45, amplitude: 1.1, frequency: 0.0021, alpha: 0.14, width: 1, blur: 10, wash: 1 },
];

/** Fades the band out on every edge, matching the lattice mask above it. */
const MASK = [
  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
  "linear-gradient(to bottom, transparent 12%, black 30%, black 84%, transparent 100%)",
].join(", ");

function readAccent(el: Element): [number, number, number] {
  const raw = getComputedStyle(el).getPropertyValue("--accent").trim();
  const hex = raw.replace("#", "");
  if (hex.length === 6) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  const rgb = raw.match(/\d+/g);
  if (rgb && rgb.length >= 3) {
    return [Number(rgb[0]), Number(rgb[1]), Number(rgb[2])];
  }
  return [57, 213, 246];
}

export function GlowyWaves({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;

    const [ar, ag, ab] = readAccent(canvas);
    const strokes = WAVES.map((wave) => {
      const r = Math.round(ar + (255 - ar) * wave.wash);
      const g = Math.round(ag + (255 - ag) * wave.wash);
      const b = Math.round(ab + (255 - ab) * wave.wash);
      return `rgb(${r}, ${g}, ${b})`;
    });

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const recenter = () => {
      target.x = width / 2;
      target.y = height * BASELINE;
      pointer.x = target.x;
      pointer.y = target.y;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      recenter();
    };

    const drawWave = (wave: Wave, index: number, t: number) => {
      // Amplitude follows the viewport: on a laptop the band stays inside the
      // hero, on a tall display it still reads as a wave and not a hairline.
      const amplitude = wave.amplitude * Math.min(Math.max(height * 0.058, 22), 66);
      const lane = height * BASELINE + (index - (WAVES.length - 1) / 2) * height * LANE_SPREAD;

      ctx.beginPath();

      for (let x = 0; x <= width + SAMPLE_STEP; x += SAMPLE_STEP) {
        const base =
          lane +
          Math.sin(x * wave.frequency + t * 0.00042 + wave.offset) * amplitude +
          Math.sin(x * wave.frequency * 0.4 + t * 0.00065) * amplitude * 0.42;

        const dx = x - pointer.x;
        const dy = base - pointer.y;
        const pull = Math.max(0, 1 - Math.hypot(dx, dy) / POINTER_REACH);
        const y =
          base -
          pull * pull * POINTER_LIFT * Math.sin(t * 0.0009 + x * 0.008 + wave.offset);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = strokes[index];
      ctx.globalAlpha = wave.alpha;
      ctx.lineWidth = wave.width;
      ctx.shadowBlur = wave.blur;
      ctx.shadowColor = strokes[index];
      ctx.stroke();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (target.x - pointer.x) * POINTER_EASE;
      pointer.y += (target.y - pointer.y) * POINTER_EASE;
      WAVES.forEach((wave, index) => drawWave(wave, index, t));
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
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
      // A settled frame: the band still reads as a designed element, nothing
      // moves and no listeners stay attached.
      draw(1200);
      const staticResize = new ResizeObserver(() => {
        resize();
        draw(1200);
      });
      staticResize.observe(canvas);
      return () => staticResize.disconnect();
    }

    const onPointerMove = (event: PointerEvent) => {
      // Coarse pointers have no hover; reacting only on tap reads as a glitch.
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
    };

    // The pointer left the window entirely: ease the band back to rest instead
    // of freezing it wherever the cursor happened to exit.
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      target.x = width / 2;
      target.y = height * BASELINE;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);

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
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
      aria-hidden
      role="presentation"
    />
  );
}

/** Fades the lattice out at all four edges so it never ends on a hard line. */
const LATTICE_MASK = [
  "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
  "linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%)",
].join(", ");

/**
 * The whole hero backdrop: lattice, accent glow, the wave band, and the edge
 * falloff that hands the bottom of the section back to the page background.
 *
 * Order matters. The lattice sits under the waves so the lit lines read as the
 * top layer, and the falloff sits over both so neither fights the headline.
 */
export function GlowyWavesBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div
        className="absolute inset-0 dot-grid opacity-50"
        style={{
          maskImage: LATTICE_MASK,
          WebkitMaskImage: LATTICE_MASK,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <GlowyWaves className="absolute inset-0 size-full" />

      <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_0%,var(--accent-soft),transparent_65%)]" />

      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(to right, var(--bg) 0%, transparent 24%, transparent 76%, var(--bg) 100%)",
            "linear-gradient(to bottom, transparent 55%, color-mix(in srgb, var(--bg) 88%, transparent) 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
