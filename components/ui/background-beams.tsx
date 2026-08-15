"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-bg/50",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Dynamic light glows */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-10"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#beams-blur)">
          <motion.circle
            cx="250"
            cy="120"
            r="160"
            fill="var(--accent)"
            initial={{ opacity: 0.1, scale: 0.8 }}
            animate={{
              opacity: [0.1, 0.22, 0.1],
              scale: [0.8, 1.25, 0.8],
              x: [0, 80, 0],
              y: [0, 40, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="1100"
            cy="240"
            r="200"
            fill="var(--accent)"
            initial={{ opacity: 0.08, scale: 0.9 }}
            animate={{
              opacity: [0.08, 0.18, 0.08],
              scale: [0.9, 1.3, 0.9],
              x: [0, -100, 0],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </g>
        <defs>
          <filter
            id="beams-blur"
            x="-200"
            y="-200"
            width="1840"
            height="1300"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>
    </div>
  );
});
BackgroundBeams.displayName = "BackgroundBeams";
export default BackgroundBeams;
