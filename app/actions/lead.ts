"use server";

import { Resend } from "resend";
import { z } from "zod";

import { getDb, isDbConfigured, schema } from "@/db";
import { renderLeadNotification } from "@/emails/lead-notification";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter.").max(120),
  email: z.email("Format email belum benar.").max(200),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+\-\s()]*$/, "Nomor WhatsApp hanya boleh berisi angka.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Ceritakan sedikit lebih detail, minimal 20 karakter.")
    .max(4000),
  sourcePage: z.string().max(200).default("/contact"),
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  company: z.string().max(0).optional().or(z.literal("")),
  /** Milliseconds between form mount and submit. */
  elapsedMs: z.coerce.number().nonnegative().default(0),
});

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "whatsapp" | "message", string>>;
};

const MIN_FILL_MS = 2000;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp") ?? "",
    message: formData.get("message"),
    sourcePage: formData.get("sourcePage") ?? "/contact",
    company: formData.get("company") ?? "",
    elapsedMs: formData.get("elapsedMs") ?? 0,
  });

  if (!parsed.success) {
    const fieldErrors: LeadFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "whatsapp" || key === "message") {
        fieldErrors[key] ??= issue.message;
      }
    }
    return {
      status: "error",
      message: "Ada isian yang perlu diperbaiki.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Silent drops. Telling a bot why it failed only helps it retry.
  if (data.company) return { status: "success" };
  if (data.elapsedMs > 0 && data.elapsedMs < MIN_FILL_MS) return { status: "success" };

  // Storage and notification are attempted independently: a Resend outage must
  // not lose the row, and a Turso outage must not swallow the notification.
  let storedInDb = false;

  const db = getDb();
  if (db) {
    try {
      await db.insert(schema.leads).values({
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp || null,
        message: data.message,
        sourcePage: data.sourcePage,
      });
      storedInDb = true;
    } catch (error) {
      console.error("[lead] gagal menyimpan ke Turso:", error);
    }
  } else if (!isDbConfigured()) {
    console.warn(
      "[lead] TURSO_DATABASE_URL belum diset. Lead tidak disimpan:",
      data.email,
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const email = renderLeadNotification({ ...data, storedInDb });
      await new Resend(resendKey).emails.send({
        from: process.env.RESEND_FROM ?? "Vour <onboarding@resend.dev>",
        to: email.to,
        replyTo: email.replyTo,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
    } catch (error) {
      console.error("[lead] gagal mengirim notifikasi Resend:", error);
    }
  } else {
    console.warn("[lead] RESEND_API_KEY belum diset. Notifikasi tidak dikirim.");
  }

  return {
    status: "success",
    message: "Terima kasih. Pesan Anda sudah masuk dan akan kami balas.",
  };
}
