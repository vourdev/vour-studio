import { revalidatePath, revalidateTag } from "next/cache";
import { after } from "next/server";
import type { NextRequest } from "next/server";

import { siteConfig } from "@/lib/site";

/** Tags assigned to the unstable_cache entries in `lib/cms.ts`. */
const CMS_TAGS = [
  "cms-products",
  "cms-projects",
  "cms-posts",
  "cms-site-settings",
] as const;

/**
 * Top-level routes rendered from CMS data. The nav/footer live in the root
 * layout, so warming these paths covers every page a visitor can land on.
 */
const WARMUP_PATHS = [
  "/",
  "/products",
  "/projects",
  "/resources",
  "/solutions",
  "/about",
  "/contact",
] as const;

/**
 * Webhook endpoint called by the admin CMS (`vour-studio-admin`) after content
 * changes. Invalidates every CMS-backed route immediately and regenerates all
 * pages in the background, so admin edits go live instantly AND the first
 * visitor gets a warm page instead of paying the blocking revalidate cost.
 *
 * Protected by a shared secret sent as the `x-revalidate-secret` header
 * (REVALIDATE_SECRET here must match the admin's REVALIDATE_SECRET). If the
 * secret is unset or wrong, the endpoint refuses with 401 — the site keeps
 * working on time-based ISR revalidation either way.
 */
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const auth = request.headers.get("x-revalidate-secret");

  if (!secret || auth !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }

  // Expire the unstable_cache entries in lib/cms.ts. `{ expire: 0 }` makes the
  // next request blocking-revalidate (the documented pattern for webhooks that
  // need immediate expiration), so visitors never see stale CMS data.
  for (const tag of CMS_TAGS) {
    revalidateTag(tag, { expire: 0 });
  }

  // Invalidate the root layout and every page beneath it (nav, footer, all
  // routes), so the next visit to any path regenerates with fresh data.
  revalidatePath("/", "layout");

  // Regenerate every page NOW, after the response is sent. Without this, the
  // first visitor after a content change would block on the revalidation
  // (~4s of admin fetches + re-render). `after` keeps this serverless
  // invocation alive until all warm-up requests settle.
  after(async () => {
    await Promise.allSettled(
      WARMUP_PATHS.map((path) =>
        fetch(`${siteConfig.url}${path}`, {
          cache: "no-store",
          signal: AbortSignal.timeout(15_000),
        }),
      ),
    );
  });

  return Response.json({ ok: true, revalidated: true, now: Date.now() });
}
