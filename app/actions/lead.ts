"use server";

import { headers } from "next/headers";
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
  /** Cloudflare Turnstile token from client widget */
  turnstileToken: z.string().optional().or(z.literal("")),
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

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
};

async function verifyTurnstileToken(
  token?: string,
  ip?: string,
): Promise<{ success: boolean; error?: string }> {
  const secretKey =
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || process.env.SECRET;

  if (!secretKey) {
    console.warn(
      "[lead] CLOUDFLARE_TURNSTILE_SECRET_KEY belum diset. Turnstile verification dilewati.",
    );
    return { success: true };
  }

  if (!token) {
    return {
      success: false,
      error: "Verifikasi keamanan diperlukan. Silakan refresh dan coba lagi.",
    };
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      cache: "no-store",
      signal: AbortSignal.timeout(6_000),
    });

    if (!res.ok) {
      console.warn(`[lead] Turnstile API HTTP ${res.status}`);
      return { success: true }; // Graceful degradation
    }

    const data = (await res.json()) as TurnstileVerifyResponse;
    if (!data.success) {
      console.warn("[lead] Turnstile verification rejected:", data["error-codes"]);
      return {
        success: false,
        error: "Verifikasi keamanan Cloudflare gagal. Silakan coba lagi.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[lead] Gagal menghubungi Cloudflare Turnstile API:", err);
    // Graceful degradation: never block legitimate visitors if Cloudflare is down
    return { success: true };
  }
}


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
    turnstileToken:
      formData.get("turnstileToken") ??
      formData.get("cf-turnstile-response") ??
      "",
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

  // Cloudflare Turnstile verification
  const headerList = await headers();
  const clientIp =
    headerList.get("cf-connecting-ip") ||
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

  const turnstile = await verifyTurnstileToken(data.turnstileToken, clientIp);
  if (!turnstile.success) {
    return {
      status: "error",
      message:
        turnstile.error ??
        "Verifikasi keamanan Cloudflare gagal. Silakan coba lagi.",
    };
  }

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

  const payload = {
    name: data.name,
    email: data.email,
    whatsapp: data.whatsapp,
    message: data.message,
    sourcePage: data.sourcePage,
  };

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/api/leads`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
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
