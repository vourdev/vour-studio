import { cn } from "@/lib/utils";

/**
 * Wordmark, not an illustration: the brand name set in the display face with a
 * single accent element. TODO(VOUR): replace with the real logo asset once one exists.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.1em] font-mono text-lg font-semibold tracking-tight",
        className,
      )}
    >
      VOUR
      <span className="size-[0.3em] translate-y-[-0.05em] rounded-full bg-accent" aria-hidden />
    </span>
  );
}
