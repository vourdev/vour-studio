"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin kode:", err);
    }
  };

  return (
    <div className="relative group my-6 overflow-hidden rounded-surface border border-border bg-[#0d0f12] shadow-sm">
      {/* Header bar with language label & Copy button */}
      <div className="flex items-center justify-between border-b border-border/40 bg-surface/50 px-4 py-2 text-xs font-mono">
        <span className="text-text-muted select-none text-[11px] font-medium tracking-wide uppercase">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Tersalin ke clipboard" : "Salin kode"}
          className="inline-flex items-center gap-1.5 rounded-control bg-bg-subtle/80 hover:bg-bg-subtle px-2.5 py-1 text-[11px] font-medium text-text-muted transition-all duration-150 hover:text-text active:scale-95 cursor-pointer border border-border/50"
        >
          {copied ? (
            <>
              <CheckIcon weight="bold" className="size-3.5 text-accent-text" />
              <span className="text-accent-text font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon weight="bold" className="size-3.5 opacity-80" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="!m-0 !border-0 !rounded-none !bg-transparent p-4 overflow-x-auto font-mono text-sm leading-relaxed text-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
