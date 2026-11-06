"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  padZero?: number;
};

export function AnimatedNumber({
  value,
  duration = 1.5,
  padZero = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reduce) {
      element.textContent = value.toString().padStart(padZero, "0");
      return;
    }

    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate(latest) {
        element.textContent = Math.round(latest)
          .toString()
          .padStart(padZero, "0");
      },
    });

    return () => controls.stop();
  }, [value, duration, padZero, isInView, reduce]);

  // Show the final value, or a padded "0" to limit layout shift.
  const initialText = (reduce || !isInView)
    ? value.toString().padStart(padZero, "0")
    : "0".padStart(padZero || 1, "0");

  return (
    <span ref={ref} className="font-mono">
      {initialText}
    </span>
  );
}
