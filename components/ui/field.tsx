import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Label above, control, helper text, then error below. Placeholders are never
 * used as labels, and every colour here clears WCAG AA against `--bg`.
 */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <LabelPrimitive.Root
        htmlFor={htmlFor}
        className="text-sm font-medium text-text"
      >
        {label}
        {required ? (
          <span className="ml-1 text-accent-text" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-text-faint">opsional</span>
        )}
      </LabelPrimitive.Root>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-text-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlStyles =
  "w-full rounded-control border border-border bg-bg-subtle px-4 text-text placeholder:text-text-faint transition-colors focus:border-accent focus:outline-none focus-visible:outline-none disabled:opacity-60";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlStyles, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn(controlStyles, "min-h-32 resize-y py-3", className)} {...props} />
  );
}
