import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Tag = "div",
  ...props
}: ComponentProps<"div"> & { as?: ElementType }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)} {...props} />
  );
}

/** Consistent vertical rhythm for every top-level section on the site. */
export function Section({
  className,
  as: Tag = "section",
  ...props
}: ComponentProps<"section"> & { as?: ElementType }) {
  return <Tag className={cn("py-20 md:py-28", className)} {...props} />;
}
