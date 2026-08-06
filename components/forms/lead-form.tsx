"use client";

import {
  CheckCircleIcon,
  CircleNotchIcon,
  WarningIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import { useActionState, useEffect, useRef, useState } from "react";

import { submitLead, type LeadFormState } from "@/app/actions/lead";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { whatsappLink } from "@/lib/site";

const initialState: LeadFormState = { status: "idle" };

export function LeadForm({ sourcePage = "/contact" }: { sourcePage?: string }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [mountedAt] = useState(() => Date.now());
  const elapsedRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so a screen reader announces the outcome instead of
  // leaving the user on a button whose page silently changed.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        className="rounded-surface border border-border bg-bg-subtle p-8 focus:outline-none"
      >
        <CheckCircleIcon weight="light" className="size-8 text-accent-text" aria-hidden />
        <h2 className="mt-4 text-xl font-medium">Pesan Anda sudah masuk</h2>
        <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-text-muted">
          Kami biasanya membalas dalam satu hari kerja. Kalau butuh lebih cepat,
          chat WhatsApp adalah jalur tercepat.
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-text"
        >
          <WhatsappLogoIcon weight="light" className="size-4" aria-hidden />
          Chat lewat WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={() => {
        if (elapsedRef.current) {
          elapsedRef.current.value = String(Date.now() - mountedAt);
        }
      }}
      className="flex flex-col gap-6"
      noValidate
    >
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input type="hidden" name="elapsedMs" ref={elapsedRef} defaultValue="0" />

      {/* Honeypot. Hidden from sight and from assistive tech; only bots fill it. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company">Perusahaan</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-control border border-red-500/40 bg-red-500/5 p-4 text-sm text-red-600 focus:outline-none dark:text-red-400"
        >
          <WarningIcon weight="light" className="mt-0.5 size-4 shrink-0" aria-hidden />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nama" htmlFor="name" required error={state.fieldErrors?.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
        </Field>

        <Field label="Email" htmlFor="email" required error={state.fieldErrors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <Field
        label="Nomor WhatsApp"
        htmlFor="whatsapp"
        hint="Kalau diisi, kami bisa membalas lebih cepat."
        error={state.fieldErrors?.whatsapp}
      >
        <Input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(state.fieldErrors?.whatsapp)}
          aria-describedby={
            state.fieldErrors?.whatsapp ? "whatsapp-error" : "whatsapp-hint"
          }
        />
      </Field>

      <Field
        label="Ceritakan kebutuhan Anda"
        htmlFor="message"
        required
        hint="Masalah yang ingin diselesaikan, perkiraan waktu, dan anggaran kalau sudah ada."
        error={state.fieldErrors?.message}
      >
        <Textarea
          id="message"
          name="message"
          required
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : "message-hint"
          }
        />
      </Field>

      <Button type="submit" size="lg" disabled={pending} className="self-start">
        {pending ? (
          <>
            <CircleNotchIcon
              weight="bold"
              className="size-4 animate-spin"
              aria-hidden
            />
            Mengirim
          </>
        ) : (
          "Kirim pesan"
        )}
      </Button>
    </form>
  );
}
