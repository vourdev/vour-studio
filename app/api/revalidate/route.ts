import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * Webhook endpoint called by the admin CMS (`vour-studio-admin`) after content
 * changes. Invalidates every CMS-backed route immediately, so admin edits go
 * live without waiting for the 60s ISR window.
 *
 * Protected by a shared secret sent as the `x-revalidate-secret` header
 * (REVALIDATE_SECRET here must match the admin's REVALIDATE_SECRET). If the
 * secret is unset or wrong, the endpoint refuses with 401 — the site keeps
 * working on time-based ISR revalidation either way.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const auth = request.headers.get("x-revalidate-secret");

  if (!secret || auth !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }

  // Expire the unstable_cache entries in lib/cms.ts. `{ expire: 0 }` makes the
  // next request blocking-revalidate (the documented pattern for webhooks that
  // need immediate expiration), so visitors never see stale CMS data.
  for (const tag of [
    "cms-products",
    "cms-projects",
    "cms-posts",
    "cms-site-settings",
  ]) {
    revalidateTag(tag, { expire: 0 });
  }

  // Invalidate the root layout and every page beneath it (nav, footer, all
  // routes), so the next visit to any path regenerates with fresh data.
  revalidatePath("/", "layout");

  return Response.json({ ok: true, revalidated: true, now: Date.now() });
}
