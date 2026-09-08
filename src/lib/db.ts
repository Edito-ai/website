import { neon } from "@neondatabase/serverless";
import type { DemoRequestFields } from "@/lib/email";

/** HTTP-based Neon client — no connection pooling to manage, safe to call
 *  from a serverless/edge function per request (unlike a plain TCP `pg`
 *  pool, which would exhaust connections under serverless concurrency). */
const sql = neon(process.env.DATABASE_URL!);

let schemaReady: Promise<void> | null = null;

/** Idempotent, memoized per server instance — the first request pays for
 *  the `CREATE TABLE IF NOT EXISTS` round-trip, every request after that
 *  in the same instance skips it entirely. Safe to call concurrently. */
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS demo_requests (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        production_house TEXT NOT NULL,
        channel_link TEXT,
        details TEXT,
        referral_source TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.then(() => undefined);
  }
  return schemaReady;
}

/** Saves one form submission. Throws on failure — the caller decides
 *  whether a DB failure should fail the whole request. */
export async function saveDemoRequest(fields: DemoRequestFields): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO demo_requests
      (name, email, phone, production_house, channel_link, details, referral_source)
    VALUES (
      ${fields.name},
      ${fields.email},
      ${fields.phone},
      ${fields.production_house},
      ${fields.channel_link || null},
      ${fields.details || null},
      ${fields.referral_source}
    )
  `;
}
