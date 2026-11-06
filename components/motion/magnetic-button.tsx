"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Primary CTA only. Pointer position lives in motion values, never React state. */
export function MagneticButton({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const scale = useTransform([x, y], ([dx, dy]: number[]) =>
    1 + Math.min(Math.hypot(dx, dy) / 260, 0.035),
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, scale }}
      onPointerMove={(event) => {
        // Skip on coarse pointers: a target that moves under the thumb is hostile.
        if (event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        my.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
