/**
 * Pays the CMS cold start (10-20s) once, before `next build` prerenders against it.
 * Never fails the build: the fetchers already fall back to static data.
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
