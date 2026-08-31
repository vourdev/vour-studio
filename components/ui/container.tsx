import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

export function Container<T extends ElementType = "div">({
  className,
  as,
  ...props
}: {
  as?: T;
} & Omit<ComponentProps<T>, "as">) {
  const Tag = (as || "div") as ElementType;
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)} {...props} />
  );
}

/**
 * Vertical rhythm for every top-level section on the site.
 *
 * `spacing` exists so a page header and the block that continues it do not each
 * pay full section padding -- stacking `header` on top of `default` leaves a gap
 * roughly twice the intended one, which is what the variants below prevent.
 */
const SECTION_SPACING = {
  /** A band of its own, usually separated by a border or a background change. */
  default: "py-20 md:py-28",
  /** First section on a page: clears the fixed nav, then a header-sized gap. */
  header: "pt-32 pb-12 md:pt-36 md:pb-14",
  /** Continues the section directly above it; the two read as one block. */
  continued: "pt-0 pb-20 md:pb-28",
  /** Caller owns the padding entirely. */
  none: "",
} as const;

export type SectionSpacing = keyof typeof SECTION_SPACING;

export function Section<T extends ElementType = "section">({
  className,
  as,
  spacing = "default",
  ...props
}: {
  as?: T;
  spacing?: SectionSpacing;
} & Omit<ComponentProps<T>, "as">) {
  const Tag = (as || "section") as ElementType;
  return (
    <Tag className={cn(SECTION_SPACING[spacing], className)} {...props} />
  );
}
