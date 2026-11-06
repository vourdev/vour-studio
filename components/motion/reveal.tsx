"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Static map: creating motion components inside render would remount on every pass. */
const ELEMENTS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
  h2: motion.h2,
  p: motion.p,
} as const;

type RevealProps = {
  children: ReactNode;
  /** Stagger position within a group. Each step adds 60ms. */
  index?: number;
  delay?: number;
  y?: number;
  as?: keyof typeof ELEMENTS;
  className?: string;
};

/** Animates only transform and opacity. */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  y = 24,
  as = "div",
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = ELEMENTS[as];

  return (
    <Comp
      className={className}
      // A noscript rule in the layout targets this attribute so the element stays visible without JS.
      data-reveal=""
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: delay + index * 0.06, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
