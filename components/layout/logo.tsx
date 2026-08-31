import { cn } from "@/lib/utils";

/**
 * Wordmark, not an illustration: the brand name set in the display face, with
 * the dot of "vour.dev" carrying the accent. The brand is always written
 * "vour.dev" -- see `siteConfig.name`.
 * TODO(vour.dev): replace with the real logo asset once one exists.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      // The accent dot stands in for the "." and is aria-hidden, so the
      // wordmark needs a label of its own or it announces as "vourdev".
      role="img"
      aria-label="vour.dev"
      className={cn(
        "inline-flex items-baseline gap-[0.1em] font-mono text-lg font-semibold tracking-tight",
        className,
      )}
    >
      vour
      <span className="size-[0.3em] translate-y-[-0.05em] rounded-full bg-accent" aria-hidden />
      dev
    </span>
  );
}
