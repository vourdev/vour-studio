"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
    CheckCircle,
    TrendingUp,
    Video,
    Globe,
} from "lucide-react";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tagline?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    href?: string;
}

interface BentoGridProps {
    items: BentoItem[];
}

const itemsSample: BentoItem[] = [
    {
        title: "Analytics Dashboard",
        meta: "v2.4.1",
        description:
            "Real-time metrics with AI-powered insights and predictive analytics",
        icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
        status: "Live",
        tags: ["Statistics", "Reports", "AI"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Task Manager",
        meta: "84 completed",
        description: "Automated workflow management with priority scheduling",
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        status: "Updated",
        tags: ["Productivity", "Automation"],
    },
    {
        title: "Media Library",
        meta: "12GB used",
        description: "Cloud storage with intelligent content processing",
        icon: <Video className="w-4 h-4 text-purple-500" />,
        tags: ["Storage", "CDN"],
        colSpan: 2,
    },
    {
        title: "Global Network",
        meta: "6 regions",
        description: "Multi-region deployment with edge computing",
        icon: <Globe className="w-4 h-4 text-sky-500" />,
        status: "Beta",
        tags: ["Infrastructure", "Edge"],
    },
];

function BentoGrid({ items = itemsSample }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 max-w-7xl mx-auto">
            {items.map((item, index) => {
                const CardWrapper = (item.href ? Link : "div") as React.ElementType;
                return (
                    <CardWrapper
                        key={index}
                        href={item.href || ""}
                        className={cn(
                            "group relative p-7 rounded-surface overflow-hidden transition-all duration-300 block",
                            "border border-border bg-bg-subtle/50",
                            "hover:border-border-strong",
                            "hover:-translate-y-0.5 will-change-transform",
                            item.colSpan === 3 ? "md:col-span-3 col-span-1" : item.colSpan === 2 ? "md:col-span-2 col-span-1" : "col-span-1",
                            {
                                "border-border-strong -translate-y-0.5":
                                    item.hasPersistentHover,
                            }
                        )}
                    >
                        <div
                            className={`absolute inset-0 ${
                                item.hasPersistentHover
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                            } transition-opacity duration-300`}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:4px_4px]" />
                        </div>

                        <div className="relative flex flex-col h-full space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface border border-border/40 transition-colors duration-300 group-hover:border-border-strong">
                                    {item.icon}
                                </div>
                                <span
                                    className={cn(
                                        "text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-control border border-border/40 text-text-muted bg-surface/50 backdrop-blur-sm"
                                    )}
                                >
                                    {item.status || "Active"}
                                </span>
                            </div>

                            <div className="space-y-1.5 pt-1">
                                {item.tagline && (
                                    <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-accent-text mb-1">
                                        {item.tagline}
                                    </p>
                                )}
                                <h3 className="font-semibold text-text tracking-tight text-base leading-snug">
                                    {item.title}
                                    <span className="ml-2 text-xs text-text-faint font-normal font-mono">
                                        /{item.meta}
                                    </span>
                                </h3>
                                <p className="text-xs text-text-muted leading-relaxed font-[425] pt-0.5">
                                    {item.description}
                                </p>
                            </div>

                            {/* Render outcomes/tags as a clean vertical checklist for maximum legibility */}
                            {item.tags && item.tags.length > 0 && (
                                <ul className="space-y-2.5 text-xs text-text-muted flex-1 pt-2">
                                    {item.tags.map((tag, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-accent/80 transition-colors duration-200" />
                                            <span className="leading-snug">{tag}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Card Footer: clean CTA line */}
                            <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-auto">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-text-faint">Cakupan info</span>
                                <span className="text-xs font-semibold text-accent-text group-hover:translate-x-0.5 transition-transform duration-200">
                                    {item.cta || "Selengkapnya"} →
                                </span>
                            </div>
                        </div>
                    </CardWrapper>
                );
            })}
        </div>
    );
}

export { BentoGrid }
