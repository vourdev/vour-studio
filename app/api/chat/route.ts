import type { NextRequest } from "next/server";
import { z } from "zod";

import { buildSystemPrompt } from "@/lib/chat/knowledge";
import { SITE_URL } from "@/lib/site";

export const maxDuration = 60;

const GATEWAY_URL = "https://omniroute.vour.dev/v1/chat/completions";
const MODEL = "ai-assistant";
const MAX_TOKENS = 600;

const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000),
      }),
    )
    .min(1)
    .max(10),
});

/**
 * Per-instance request budget. Fluid Compute reuses instances but never
 * promises to, so a caller spread across instances can exceed this. Accepted:
 * the alternative is a datastore, and this repo deliberately has none.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function overRateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });

    // The map only ever grows otherwise; every write is a chance to sweep.
    if (hits.size > 500) {
      for (const [key, value] of hits) {
        if (now > value.resetAt) hits.delete(key);
      }
    }
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

/** Same-origin only: the widget is the sole intended caller. */
function isForeignOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host !== new URL(SITE_URL).host;
  } catch {
    return true;
  }
}

export async function POST(request: NextRequest) {
  if (isForeignOrigin(request)) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  const apiKey = process.env.OMNIROUTE_API_KEY;
  if (!apiKey) {
    console.error("[chat] OMNIROUTE_API_KEY is not set");
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (overRateLimit(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...parsed.data.messages,
        ],
      }),
    });
  } catch (error) {
    console.error("[chat] gateway unreachable", error);
    return Response.json({ error: "unavailable" }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    console.error("[chat] gateway returned", upstream.status);
    return Response.json({ error: "unavailable" }, { status: 502 });
  }

  /* The gateway answers with SSE whether or not `stream` is set, and reports
     upstream failures as an `error` object *inside* a 200 response. Passing the
     body straight through keeps that shape intact; the widget checks for it. */
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    },
  });
}
