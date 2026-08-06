"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  r: number;
  hue: string;
  /** Angular speeds for the two sine terms that drive the drift. */
  sx: number;
  sy: number;
  px: number;
  py: number;
};

/**
 * The hero's one "wow moment": a slow aurora drift behind the headline.
 *
 * Deliberately a 2D canvas rather than WebGL. It costs a few large composited
 * gradient fills per frame instead of a shader pipeline, needs no external
 * library, and degrades to a single static frame under reduced motion.
 *
 * Nothing here touches React state. The animation lives entirely inside the
 * effect, and it stops when the hero scrolls away or the tab is hidden.
 */
export function AuroraCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Acid lime accent plus two cool neutrals, so the field reads as brand
    // atmosphere rather than a rainbow gradient.
    const blobs: Blob[] = [
      { x: 0.34, y: 0.30, r: 0.44, hue: "198, 242, 78", sx: 0.00021, sy: 0.00017, px: 0, py: 1.7 },
      { x: 0.68, y: 0.52, r: 0.38, hue: "132, 214, 150", sx: 0.00016, sy: 0.00024, px: 2.4, py: 0.6 },
      { x: 0.48, y: 0.78, r: 0.5, hue: "96, 132, 208", sx: 0.00013, sy: 0.00019, px: 4.1, py: 3.2 },
    ];

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap DPR at 2. Beyond that the fill cost doubles for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.sx + b.px) * 0.12) * width;
        const cy = (b.y + Math.cos(t * b.sy + b.py) * 0.14) * height;
        const radius = b.r * Math.max(width, height) * 0.75;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${b.hue}, 0.62)`);
        gradient.addColorStop(0.35, `rgba(${b.hue}, 0.26)`);
        gradient.addColorStop(0.7, `rgba(${b.hue}, 0.07)`);
        gradient.addColorStop(1, `rgba(${b.hue}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "source-over";
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
    draw(0);

    if (reduce) {
      // One frame, then nothing moves for the rest of the session.
      return () => {};
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    resizeObserver.observe(canvas);

    // Stop painting when the hero is off screen, and when the tab is backgrounded.
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
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      // Decorative only. Nothing in the canvas carries information.
      role="presentation"
    />
  );
}
