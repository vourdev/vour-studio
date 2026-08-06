import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The one marquee on the site. CSS keyframes rather than JS, so it costs nothing
 * on the main thread and stops dead under prefers-reduced-motion (see globals.css).
 *
 * The track is rendered twice; the keyframe shifts by exactly -50%, so the seam
 * lands where the two copies meet and the loop is invisible.
 */
export function Marquee({
  children,
  durationSeconds = 40,
  className,
}: {
  children: ReactNode;
  durationSeconds?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee-host relative flex overflow-hidden",
        // Fade the edges so items enter and leave rather than being sliced off.
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div
        className="animate-marquee flex w-max shrink-0 items-center"
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
