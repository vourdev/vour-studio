import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

/**
 * Turso is optional at build and deploy time.
 *
 * The site is a marketing site first: it must build and go live before a
 * database exists. So nothing here throws on import. `getDb()` returns null when
 * the credentials are absent, and the caller decides what to do about it.
 */
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

export function isDbConfigured() {
  return Boolean(url);
}

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!url) return null;
  if (!cached) {
    // A local `file:` URL needs no token; a remote libsql:// one does.
    cached = drizzle({ client: createClient({ url, authToken }), schema });
  }
  return cached;
}

export { schema };
