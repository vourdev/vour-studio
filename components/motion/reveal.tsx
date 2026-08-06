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

/**
 * The site-wide scroll entrance. Cheaper than a ScrollTrigger for a plain
 * "appear once when it enters the viewport", and it animates only transform
 * and opacity so the work stays on the compositor.
 */
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
      // Motion writes `opacity:0` into the server-rendered HTML. Without JS the
      // element would stay invisible forever, so a noscript rule in the layout
      // targets this attribute and forces it visible.
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
