import { cn } from "@/lib/utils";

// Always written "vour.dev" (see `siteConfig.name`).
// TODO(vour.dev): replace with the real logo asset once one exists.
export function Logo({ className }: { className?: string }) {
  return (
    <span
      // The dot is aria-hidden, so the wordmark needs its own label or it reads as "vourdev".
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
