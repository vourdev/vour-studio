"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type ServiceIndexItem = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  isSoon: boolean;
};

/**
 * The service ledger. Each entry opens with its own hairline; a single accent
 * line travels between them on hover, the same shared-element indicator the
 * desktop nav uses for its pill (`desktop-nav-indicator`), so the two surfaces
 * behave alike.
 */
export function ServiceIndex({ items }: { items: ServiceIndexItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const indicatorTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.7 };

  return (
    <div
      className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {items.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        const number = String(idx + 1).padStart(2, "0");

        // Both states share the box so the hairlines stay on the grid and every
        // entry's last line keeps the same baseline across a row.
        const box =
          "relative flex h-full flex-col border-t border-border pt-5 pb-6";

        const body = (
          <>
            {isHovered && !item.isSoon && (
              <motion.span
                layoutId="service-index-indicator"
                aria-hidden
                className="absolute inset-x-0 -top-px h-px bg-accent"
                transition={indicatorTransition}
              />
            )}

            <span className="flex items-center justify-between font-mono text-xs tabular-nums text-text-faint">
              {number}
              {item.isSoon ? (
                <span className="uppercase tracking-[0.16em]">Segera Hadir</span>
              ) : (
                <ArrowUpRightIcon
                  weight="bold"
                  aria-hidden
                  className="size-4 text-text-faint opacity-0 transition-[opacity,color,translate] duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-text group-hover:opacity-100"
                />
              )}
            </span>

            <h3
              className={cn(
                "mt-6 text-2xl font-medium leading-tight tracking-tight text-balance transition-colors duration-200 ease-out",
                item.isSoon
                  ? "text-text-muted"
                  : "text-text group-hover:text-accent-text",
              )}
            >
              {item.title}
            </h3>

            <p
              className={cn(
                "mt-auto pt-10 text-sm leading-relaxed text-pretty",
                item.isSoon ? "text-text-faint" : "text-text-muted",
              )}
            >
              {item.summary}
            </p>
          </>
        );

        return (
          <Reveal key={item.slug} index={idx} className="h-full">
            {item.isSoon ? (
              <div className={box}>{body}</div>
            ) : (
              <Link
                href={item.href}
                className={cn(box, "group")}
                onMouseEnter={() => setHoveredIdx(idx)}
                onFocus={() => setHoveredIdx(idx)}
                onBlur={() => setHoveredIdx(null)}
              >
                {body}
              </Link>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

export default ServiceIndex;
