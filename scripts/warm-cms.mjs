/**
 * Wake the CMS before `next build` prerenders against it.
 *
 * The backend runs on a VPS with a Neon serverless database. Both go cold, and
 * the first query after an idle period has been measured at 10-20s while a warm
 * one takes ~35ms. The 1 Sep 2026 production build hit exactly that: every CMS
 * fetch timed out and each page shipped its static fallback instead of real
 * content. Pinging /health here pays the cold start once, outside the render.
 *
 * Never fails the build. A CMS that stays down is already handled -- the
 * fetchers fall back to static data -- and blocking a deploy on it would be
 * worse than shipping slightly stale content.
 */
const origin = process.env.CMS_API_URL ?? process.env.LEAD_API_URL;

if (!origin) {
  console.log("[warm-cms] CMS_API_URL tidak diset, lewati.");
  process.exit(0);
}

const DEADLINE_MS = 60_000;
const ATTEMPT_TIMEOUT_MS = 20_000;
const started = Date.now();

for (let attempt = 1; Date.now() - started < DEADLINE_MS; attempt++) {
  try {
    const response = await fetch(`${origin}/health`, {
      signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
    });
    if (response.ok) {
      console.log(`[warm-cms] siap setelah ${Date.now() - started}ms (percobaan ${attempt}).`);
      process.exit(0);
    }
    console.log(`[warm-cms] percobaan ${attempt}: HTTP ${response.status}.`);
  } catch (error) {
    console.log(`[warm-cms] percobaan ${attempt}: ${error instanceof Error ? error.message : error}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 2_000));
}

console.warn(`[warm-cms] CMS belum siap setelah ${Date.now() - started}ms. Build lanjut.`);
