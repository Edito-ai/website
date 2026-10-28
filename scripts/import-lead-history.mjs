// One-off: load the curated lead sheet (exported to JSON) into `lead_history`
// and link each row to its `demo_requests` twin by email + closest timestamp.
//   node scripts/import-lead-history.mjs <history.json>          (dry run)
//   node scripts/import-lead-history.mjs <history.json> --apply  (writes)
// Refuses to run twice: it stops if `lead_history` already has rows.
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

const [file, flag] = process.argv.slice(2);
if (!file) throw new Error("usage: node scripts/import-lead-history.mjs <history.json> [--apply]");
const apply = flag === "--apply";

const env = { ...process.env };
if (fs.existsSync(".env.local")) {
  for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !(m[1] in env)) env[m[1]] = m[2];
  }
}
const sql = neon(env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS lead_history (
    id SERIAL PRIMARY KEY, db_id INTEGER, excel_no INTEGER, created_at TIMESTAMPTZ NOT NULL,
    source TEXT, production_house TEXT, name TEXT, email TEXT, phone TEXT, channel_link TEXT,
    details TEXT, referral_source TEXT, cal_demo TEXT, flag TEXT, notes TEXT, tags TEXT
  )`;
const [{ n }] = await sql`SELECT count(*)::int AS n FROM lead_history`;
if (n > 0) throw new Error(`lead_history already has ${n} rows; not importing again.`);

const sheet = JSON.parse(fs.readFileSync(file, "utf8"));
const live = await sql`SELECT id, email, created_at FROM demo_requests ORDER BY created_at`;
const used = new Set();
const dbIdFor = new Map();
for (const d of live) {
  const e = String(d.email).trim().toLowerCase();
  const t = new Date(d.created_at).getTime();
  let best = null;
  for (const r of sheet) {
    if (used.has(r.no) || String(r.email).trim().toLowerCase() !== e) continue;
    const diff = Math.abs(new Date(r.at).getTime() - t);
    if (diff < 6 * 3600e3 && (!best || diff < best.diff)) best = { r, diff };
  }
  if (best) { used.add(best.r.no); dbIdFor.set(best.r.no, d.id); }
}
const unmatchedLive = live.length - dbIdFor.size;
console.log(`sheet rows ${sheet.length}, live rows ${live.length}, matched ${dbIdFor.size}, live-only ${unmatchedLive}`);
if (!apply) { console.log("dry run: nothing written (use --apply)"); process.exit(0); }

for (const r of sheet) {
  await sql`
    INSERT INTO lead_history (db_id, excel_no, created_at, source, production_house, name, email, phone,
      channel_link, details, referral_source, cal_demo, flag, notes, tags)
    VALUES (${dbIdFor.get(r.no) ?? null}, ${r.no}, ${r.at}, ${r.source}, ${r.company}, ${r.name}, ${r.email},
      ${r.phone}, ${r.link}, ${r.details}, ${r.referral}, ${r.cal}, ${r.flag}, ${r.notes}, ${r.tags})`;
}
console.log(`imported ${sheet.length} rows`);
