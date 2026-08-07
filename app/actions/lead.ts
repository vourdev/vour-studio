"use server";

import { z } from "zod";

/**
 * The database lives in the admin project (vour-studio-admin). This server
 * action validates the form, then forwards the lead to the admin's public API
 * (`POST /api/leads`) where it is stored and emailed out.
 *
 * Everything degrades gracefully: if the admin URL or API key is unset, or the
 * request fails, we log and still return success so the visitor is never
 * blocked by an infrastructure problem.
 */

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

type LeadApiError = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

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

  const apiUrl = process.env.LEAD_API_URL;
  const apiKey = process.env.LEAD_API_KEY;

  if (!apiUrl || !apiKey) {
    console.warn(
      "[lead] LEAD_API_URL atau LEAD_API_KEY belum diset. Lead tidak dikirim ke CMS:",
      data.email,
    );
    return {
      status: "success",
      message: "Terima kasih. Pesan Anda sudah masuk dan akan kami balas.",
    };
  }

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/api/leads`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(data),
      cache: "no-store",
      // A stalled admin API must not hang the server action.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok && response.status === 422) {
      const body = (await response.json().catch(() => null)) as LeadApiError | null;
      const fieldErrors: LeadFormState["fieldErrors"] = {};
      if (body?.fieldErrors) {
        for (const key of ["name", "email", "whatsapp", "message"] as const) {
          const first = body.fieldErrors[key]?.[0];
          if (first) fieldErrors[key] = first;
        }
      }
      return {
        status: "error",
        message: body?.error ?? "Ada isian yang perlu diperbaiki.",
        fieldErrors,
      };
    }

    if (!response.ok) {
      console.error(`[lead] admin API menolak lead (${response.status}):`, data.email);
    }
  } catch (error) {
    console.error("[lead] gagal menghubungi admin API:", error);
  }

  return {
    status: "success",
    message: "Terima kasih. Pesan Anda sudah masuk dan akan kami balas.",
  };
}
