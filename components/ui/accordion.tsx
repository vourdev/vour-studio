"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-medium transition-colors hover:text-accent-text md:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <PlusIcon
          weight="light"
          className="size-5 shrink-0 text-text-faint transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-45"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_240ms_var(--ease-out-expo)] data-[state=open]:animate-[accordion-down_240ms_var(--ease-out-expo)]"
      {...props}
    >
      <div className={cn("max-w-[65ch] pb-6 text-text-muted", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
