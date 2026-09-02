"use client";

import {
  ArrowUpIcon,
  ChatCircleDotsIcon,
  WhatsappLogoIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const GREETING =
  "Halo. Saya asisten vour.dev. Silakan tanya soal layanan, paket, atau cara mulai project.";

const FALLBACK =
  "Maaf, asisten sedang tidak tersedia. Silakan hubungi kami lewat WhatsApp.";

const STARTERS = [
  "Apa itu vour.dev?",
  "Berapa harga landing page?",
  "Bagaimana cara mulai project?",
];

type Message = { role: "user" | "assistant"; content: string };

/**
 * Reads the gateway's SSE body. Two shapes matter: the normal
 * `choices[].delta.content` chunk, and an `error` object that arrives inside an
 * otherwise-successful stream. Treating the latter as text would print a JSON
 * blob into the conversation, so it throws instead.
 */
async function* readStream(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;

      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      let chunk: {
        error?: unknown;
        choices?: { delta?: { content?: string } }[];
      };
      try {
        chunk = JSON.parse(payload);
      } catch {
        continue;
      }

      if (chunk.error) throw new Error("gateway error in stream");

      const text = chunk.choices?.[0]?.delta?.content;
      if (text) yield text;
    }
  }
}

export function ChatWidget() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, pending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    // The reply streams into the last slot, so it is created empty up front.
    const history: Message[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setPending(true);

    const write = (content: string) =>
      setMessages((current) => {
        const next = [...current];
        next[next.length - 1] = { role: "assistant", content };
        return next;
      });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is ours, not the model's, and the route caps history at 10.
        body: JSON.stringify({ messages: history.slice(1).slice(-10) }),
      });

      if (!response.ok || !response.body) throw new Error(String(response.status));

      let answer = "";
      for await (const delta of readStream(response.body)) {
        answer += delta;
        write(answer);
      }

      if (!answer.trim()) write(FALLBACK);
    } catch {
      write(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  const lastFailed = messages.at(-1)?.content === FALLBACK;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Tutup asisten" : "Buka asisten"}
        aria-expanded={open}
        className="fixed right-5 bottom-5 z-50 flex size-13 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg transition-[transform,background-color] duration-200 ease-out-expo hover:bg-accent-hover active:scale-95 md:right-8 md:bottom-8"
      >
        {open ? (
          <XIcon weight="bold" className="size-5" />
        ) : (
          <ChatCircleDotsIcon weight="fill" className="size-6" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
            role="dialog"
            aria-label="Asisten vour.dev"
            className="fixed right-4 bottom-22 left-4 z-50 flex max-h-[min(32rem,70dvh)] flex-col overflow-hidden rounded-surface border border-border bg-surface-solid shadow-2xl md:right-8 md:bottom-26 md:left-auto md:w-96"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-xs tracking-[0.16em] text-text-faint uppercase">
                Asisten vour.dev
              </span>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[85%] rounded-surface px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    message.role === "user"
                      ? "ml-auto bg-accent-soft text-text"
                      : "bg-surface text-text-muted",
                  )}
                >
                  {message.content ||
                    (pending && index === messages.length - 1 ? "..." : "")}
                </div>
              ))}

              {lastFailed && (
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-text transition-colors duration-200 ease-out hover:border-accent hover:text-accent-text"
                >
                  <WhatsappLogoIcon weight="fill" className="size-4" />
                  Hubungi via WhatsApp
                </a>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => send(starter)}
                      className="cursor-pointer rounded-control border border-border px-3 py-1.5 text-xs text-text-muted transition-colors duration-200 ease-out hover:border-accent hover:text-accent-text"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                placeholder="Tulis pertanyaan..."
                aria-label="Pertanyaan"
                className="h-10 min-w-0 flex-1 rounded-control bg-transparent px-3 text-sm text-text outline-none placeholder:text-text-faint"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Kirim"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-control bg-accent text-accent-fg transition-[background-color,opacity] duration-200 ease-out hover:bg-accent-hover disabled:cursor-default disabled:opacity-40"
              >
                <ArrowUpIcon weight="bold" className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
