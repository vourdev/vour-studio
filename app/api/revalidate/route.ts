import { revalidatePath, revalidateTag } from "next/cache";
import { after } from "next/server";
import type { NextRequest } from "next/server";

import { siteConfig } from "@/lib/site";

// Must match the `unstable_cache` tags in `lib/cms.ts`.
const CMS_TAGS = [
  "cms-products",
  "cms-projects",
  "cms-posts",
  "cms-site-settings",
] as const;

const WARMUP_PATHS = [
  "/",
  "/products",
  "/projects",
  "/blog",
  "/solutions",
  "/about",
  "/contact",
] as const;

// Called by the admin after every content change. `REVALIDATE_SECRET` must match the admin's;
// without it the endpoint answers 401 and the site falls back to time-based ISR.
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const auth = request.headers.get("x-revalidate-secret");

  if (!secret || auth !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }

  // `{ expire: 0 }` makes the next request revalidate blocking, so no visitor sees stale data.
  for (const tag of CMS_TAGS) {
    revalidateTag(tag, { expire: 0 });
  }

  revalidatePath("/", "layout");

  // Warm every page after responding, so the first visitor does not wait ~4s on the revalidation.
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
