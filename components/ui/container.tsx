import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

export function Container<T extends ElementType = "div">({
  className,
  as,
  ...props
}: {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">) {
  const Tag = (as || "div") as ElementType;
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)} {...props} />
  );
}

/** Consistent vertical rhythm for every top-level section on the site. */
export function Section<T extends ElementType = "section">({
  className,
  as,
  ...props
}: {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">) {
  const Tag = (as || "section") as ElementType;
  return <Tag className={cn("py-20 md:py-28", className)} {...props} />;
}
