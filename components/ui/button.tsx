import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // `whitespace-nowrap` is deliberate: a CTA label that wraps to two lines is a
  // layout bug, and silently wrapping hides it. Keep labels short instead.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium transition-[transform,background-color,border-color,color] duration-200 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg hover:bg-accent-hover shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]",
        secondary:
          "border border-border-strong bg-transparent text-text hover:border-accent hover:text-accent-text",
        ghost: "bg-transparent text-text-muted hover:text-text hover:bg-surface-solid",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.9375rem]",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
