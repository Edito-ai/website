import { neon } from "@neondatabase/serverless";
import type { DemoRequestFields } from "@/lib/email";

/** HTTP-based Neon client — no connection pooling to manage, safe to call
 *  from a serverless/edge function per request (unlike a plain TCP `pg`
 *  pool, which would exhaust connections under serverless concurrency). */
let client: ReturnType<typeof neon> | null = null;

/** Created lazily so a missing `DATABASE_URL` (e.g. a Preview deploy without
 *  the env var) fails the request, not the build. */
function getSql() {
  client ??= neon(process.env.DATABASE_URL!);
  return client;
}

let schemaReady: Promise<void> | null = null;

/** Idempotent, memoized per server instance — the first request pays for
 *  the `CREATE TABLE IF NOT EXISTS` round-trip, every request after that
 *  in the same instance skips it entirely. Safe to call concurrently. */
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getSql()`
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

let historyReady: Promise<void> | null = null;

/** `lead_history` holds submissions that predate the database (Formspree
 *  emails, Cal.com bookings) plus the hand-curated Flag / Notes / Tags for
 *  older rows. `db_id` links a row to its `demo_requests` twin so the two are
 *  never listed twice. Filled once by `scripts/import-lead-history.mjs`. */
function ensureHistorySchema(): Promise<void> {
  if (!historyReady) {
    historyReady = getSql()`
      CREATE TABLE IF NOT EXISTS lead_history (
        id SERIAL PRIMARY KEY,
        db_id INTEGER,
        excel_no INTEGER,
        created_at TIMESTAMPTZ NOT NULL,
        source TEXT,
        production_house TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        channel_link TEXT,
        details TEXT,
        referral_source TEXT,
        cal_demo TEXT,
        flag TEXT,
        notes TEXT,
        tags TEXT
      )
    `.then(() => undefined);
  }
  return historyReady;
}

export type LeadRow = {
  key: string;
  created_at: string;
  source: string;
  production_house: string;
  name: string;
  email: string;
  phone: string;
  channel_link: string;
  details: string;
  referral_source: string;
  cal_demo: string;
  flag: string;
  notes: string;
  tags: string;
};

const s = (v: unknown) => (v == null ? "" : String(v));

/** Every lead for `/heyman`, newest first: the saved history rows plus every
 *  live `demo_requests` row not already in it. Live rows get an automatic
 *  flag: Duplicate when the same email submitted earlier, otherwise Lead. */
export async function listAllLeads(): Promise<LeadRow[]> {
  await ensureSchema();
  await ensureHistorySchema();
  const sql = getSql();
  const [hist, live] = await Promise.all([
    sql`SELECT * FROM lead_history`,
    sql`SELECT id, name, email, phone, production_house, channel_link, details,
               referral_source, created_at FROM demo_requests`,
  ]);
  const covered = new Set((hist as Record<string, unknown>[]).map((r) => r.db_id).filter((v) => v != null).map(Number));
  const rows: LeadRow[] = (hist as Record<string, unknown>[]).map((r) => ({
    key: `h${r.id}`,
    created_at: new Date(r.created_at as string | Date).toISOString(),
    source: s(r.source),
    production_house: s(r.production_house),
    name: s(r.name),
    email: s(r.email),
    phone: s(r.phone),
    channel_link: s(r.channel_link),
    details: s(r.details),
    referral_source: s(r.referral_source),
    cal_demo: s(r.cal_demo),
    flag: s(r.flag),
    notes: s(r.notes),
    tags: s(r.tags),
  }));
  for (const r of live as Record<string, unknown>[]) {
    if (covered.has(Number(r.id))) continue;
    rows.push({
      key: `d${r.id}`,
      created_at: new Date(r.created_at as string | Date).toISOString(),
      source: "Early-access request",
      production_house: s(r.production_house),
      name: s(r.name),
      email: s(r.email),
      phone: s(r.phone),
      channel_link: s(r.channel_link),
      details: s(r.details),
      referral_source: s(r.referral_source),
      cal_demo: "",
      flag: "",
      notes: "",
      tags: "",
    });
  }
  rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
  const seen = new Set<string>();
  for (const r of rows) {
    const e = r.email.trim().toLowerCase();
    if (!r.flag) r.flag = e && seen.has(e) ? "Duplicate" : "Lead";
    if (e) seen.add(e);
  }
  return rows.reverse();
}

/** Saves one form submission. Throws on failure — the caller decides
 *  whether a DB failure should fail the whole request. */
export async function saveDemoRequest(fields: DemoRequestFields): Promise<void> {
  await ensureSchema();
  await getSql()`
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
