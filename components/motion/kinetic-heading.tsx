"use client";

import { motion, stagger, useReducedMotion } from "motion/react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Hero headline only. Motion v12 replaced `staggerChildren` with `delayChildren: stagger(...)`. */
export function KineticHeading({
  text,
  accentFrom,
  className,
}: {
  text: string;
  /** Index of the first word rendered in the accent colour. */
  accentFrom?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <h1 className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={accentFrom !== undefined && i >= accentFrom ? "text-accent-text" : undefined}
          >
            {word}{" "}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: stagger(0.055) } },
      }}
    >
      {words.map((word, i) => (
        // The space stays a plain text node between wrappers; a baked-in nbsp
        // removes a break opportunity and pushes the headline onto an extra line.
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              data-reveal=""
              className={cn(
                "inline-block",
                accentFrom !== undefined && i >= accentFrom && "text-accent-text",
              )}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: { y: "0%", opacity: 1 },
              }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.h1>
  );
}
