"use client";

import {
  ArrowUpIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { findAnswer } from "@/lib/chat/match";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Principle: icon swaps cross-fade with scale and blur, never a hard cut. */
const ICON_SPRING = { type: "spring" as const, duration: 0.3, bounce: 0 };

const GREETING =
  "Halo. Saya asisten vour.dev. Silakan tanya soal layanan, paket, atau cara mulai project.";

const FALLBACK =
  "Pertanyaan itu belum ada di daftar jawaban saya. Tim kami bisa menjawabnya langsung lewat WhatsApp.";

/** A lookup returns instantly. Without a beat the reply lands in the same
    frame as the question and reads as a glitch rather than an answer. */
const THINKING_MS = 260;

const STARTERS = [
  "Apa itu vour.dev?",
  "Berapa harga landing page?",
  "Bagaimana cara mulai project?",
];

type Message = { role: "user" | "assistant"; content: string };

/**
 * The launcher mark, built from CSS boxes rather than an icon-set glyph.
 *
 * A stock chat bubble makes the assistant look like a bolted-on plugin. This
 * one borrows the wordmark's motif: the dots are punched out in the accent so
 * they read as holes in the bubble, the way the dot sits inside `vour.dev`.
 * On hover they lift in sequence, which is the only motion here and the only
 * one that earns its place: it answers the press before the panel opens.
 */
function ChatMark() {
  return (
    <span aria-hidden className="relative block size-6">
      <span className="absolute inset-x-0 top-0 h-[17px] rounded-[7px] bg-current" />
      <span className="absolute top-[11px] left-[5px] size-[8px] rotate-45 rounded-[2px] bg-current" />

      <span className="absolute top-[7px] left-1/2 flex -translate-x-1/2 gap-[3px]">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            style={{ transitionDelay: `${index * 60}ms` }}
            className="size-[3px] rounded-full bg-accent transition-transform duration-300 ease-out-expo motion-safe:group-hover:-translate-y-[2px]"
          />
        ))}
      </span>
    </span>
  );
}

/** Paired with ChatMark so both launcher states come from the same hand. */
function CloseMark() {
  return (
    <span aria-hidden className="relative block size-6">
      {[45, -45].map((angle) => (
        <span
          key={angle}
          style={{ transform: `rotate(${angle}deg)` }}
          className="absolute top-1/2 left-1/2 h-[2px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
        />
      ))}
    </span>
  );
}

/** Three dots, offset in time. Reads as "thinking" where a spinner reads as "loading". */
function TypingDots() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className="text-sm text-text-faint">Sedang mengetik</span>;
  }

  return (
    <span className="flex items-center gap-1 py-1" aria-label="Sedang mengetik">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="size-1.5 rounded-full bg-text-faint"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.16,
          }}
        />
      ))}
    </span>
  );
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
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, pending, reduceMotion]);

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

  function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: question },
      { role: "assistant", content: "" },
    ]);
    setInput("");
    setPending(true);

    const result = findAnswer(question);

    timerRef.current = window.setTimeout(() => {
      setMessages((current) => {
        const next = [...current];
        next[next.length - 1] = {
          role: "assistant",
          content: result.kind === "answer" ? result.answer.a : FALLBACK,
        };
        return next;
      });
      setPending(false);
    }, THINKING_MS);
  }

  const lastFailed = messages.at(-1)?.content === FALLBACK;
  const isFresh = messages.length === 1;

  return (
    <>
      {/* Mobile only: the panel covers most of the screen, so it needs to read
          as a layer above the page rather than part of it. */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
            className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Tutup asisten vour.dev" : "Buka asisten vour.dev"}
        aria-expanded={open}
        className="group fixed right-5 bottom-5 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_8px_24px_-6px_rgba(57,213,246,0.5),0_2px_8px_rgba(0,0,0,0.4)] transition-[scale,background-color] duration-200 ease-out-expo hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none active:scale-[0.96] md:right-8 md:bottom-8"
      >
        {/* Both icons stay mounted and cross-fade, so the swap has an exit too. */}
        <span className="relative grid size-6 place-items-center">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={open ? "close" : "open"}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              transition={reduceMotion ? { duration: 0 } : ICON_SPRING}
              className="col-start-1 row-start-1"
            >
              {open ? <CloseMark /> : <ChatMark />}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.26, ease: EASE }}
            style={{ transformOrigin: "bottom right" }}
            role="dialog"
            aria-label="Asisten vour.dev"
            className="fixed right-4 bottom-24 left-4 z-50 flex max-h-[min(34rem,72dvh)] flex-col overflow-hidden rounded-surface border border-border bg-surface-solid shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] md:right-8 md:bottom-28 md:left-auto md:w-[25rem]"
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-border bg-surface-solid px-4 py-3">
              <Image
                src="/images/vourdev-logo.jpeg"
                alt=""
                aria-hidden
                width={72}
                height={72}
                className="size-8 shrink-0 rounded-control object-cover outline outline-white/10 -outline-offset-1"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text">Asisten vour.dev</p>
                <p className="text-xs text-text-faint">
                  Menjawab dari informasi layanan kami
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup jendela asisten"
                className="-mr-2 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-control text-text-faint transition-colors duration-200 ease-out hover:bg-surface hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.96]"
              >
                <span className="scale-[0.7]">
                  <CloseMark />
                </span>
              </button>
            </header>

            <div className="relative flex min-h-0 flex-1 flex-col">
              {/* Content passing under the header fades instead of hard-cutting. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-surface-solid to-transparent"
              />

              <div
                ref={scrollRef}
                aria-live="polite"
                aria-atomic="false"
                /* Lenis owns the page's wheel events; without this opt-out the
                   panel cannot scroll at all. `overscroll-contain` then stops a
                   scroll that reaches the end from moving the page behind it. */
                data-lenis-prevent
                className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
              >
                {messages.map((message, index) => {
                  const isUser = message.role === "user";
                  const isStreaming =
                    pending && index === messages.length - 1 && !message.content;

                  return (
                    <motion.div
                      key={index}
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className={cn(
                        "w-fit max-w-[88%] rounded-control px-3.5 py-2.5 text-sm leading-relaxed text-pretty whitespace-pre-wrap",
                        isUser
                          ? "ml-auto rounded-br-[3px] bg-accent-soft text-text"
                          : "rounded-bl-[3px] bg-surface text-text",
                      )}
                    >
                      {isStreaming ? <TypingDots /> : message.content}
                    </motion.div>
                  );
                })}

                {lastFailed && (
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-control border border-border px-3.5 text-sm text-text transition-colors duration-200 ease-out hover:border-accent hover:text-accent-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.96]"
                  >
                    <WhatsappLogoIcon weight="fill" className="size-4" />
                    Hubungi via WhatsApp
                  </a>
                )}

                {isFresh && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-text-faint">Coba tanya</p>
                    <div className="flex flex-col items-start gap-2">
                      {STARTERS.map((starter, index) => (
                        <motion.button
                          key={starter}
                          type="button"
                          onClick={() => send(starter)}
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.06,
                            ease: EASE,
                          }}
                          className="flex min-h-10 cursor-pointer items-center rounded-control border border-border px-3.5 text-left text-[0.8125rem] text-text-muted transition-[color,border-color,background-color] duration-200 ease-out hover:border-border-strong hover:bg-surface hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.96]"
                        >
                          {starter}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex shrink-0 items-center gap-2 border-t border-border bg-surface-solid p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                placeholder="Tulis pertanyaan..."
                aria-label="Pertanyaan untuk asisten"
                className="h-10 min-w-0 flex-1 rounded-control border border-border bg-bg px-3 text-sm text-text transition-colors duration-200 ease-out outline-none placeholder:text-text-faint focus:border-accent"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Kirim pertanyaan"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-control bg-accent text-accent-fg transition-[background-color,opacity,scale] duration-200 ease-out hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-solid focus-visible:outline-none active:scale-[0.96] disabled:cursor-default disabled:opacity-40"
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
