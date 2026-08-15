"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    
    const handleResize = () => {
      setSvgHeight(contentRef.current?.offsetHeight || 0);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 80]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <div ref={ref} className={cn("relative w-full max-w-6xl mx-auto flex flex-row", className)}>
      <div className="absolute -left-4 md:-left-12 lg:-left-20 top-3 hidden md:block">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          className="relative ml-4 mt-2"
        >
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="block"
            aria-hidden="true"
          >
            <path
              d={`M 1 0 V ${svgHeight}`}
              fill="none"
              stroke="#e4e4e71df"
              strokeOpacity="0.12"
              strokeWidth="1.25"
            />
            <path
              d={`M 1 0 V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.5"
              className="motion-reduce:hidden"
            />
            <defs>
              <linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={svgHeight}
              >
                <stop stopColor="var(--accent)" stopOpacity="0" />
                <stop offset="0.25" stopColor="var(--accent)" stopOpacity="1" />
                <stop offset="0.75" stopColor="var(--accent)" stopOpacity="1" />
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated pointer indicator circle */}
          <motion.div
            style={{
              y: y2,
            }}
            className="absolute left-[-3.5px] top-0 flex size-3 items-center justify-center rounded-full border border-accent bg-bg shadow-sm shadow-accent/20"
          >
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, 0]),
              }}
              className="size-1.5 rounded-full bg-accent-text"
            />
          </motion.div>
        </motion.div>
      </div>
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
export default TracingBeam;
