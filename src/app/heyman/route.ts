import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { listAllLeads, type LeadRow } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Private lead list at /heyman: every row of `demo_requests`, live from
 *  Postgres, behind one shared password (`HEYMAN_PASSWORD`). Without that env
 *  var the page is disabled, never open. It is a route handler (not a page)
 *  so it stays out of the app layout, the sitemap and search results. */

const COOKIE = "heyman_session";
const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function token(password: string) {
  return createHmac("sha256", password).update("broll-heyman-v1").digest("hex");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

function authed(request: NextRequest, password: string) {
  const cookie = request.cookies.get(COOKIE)?.value;
  return !!cookie && safeEqual(cookie, token(password));
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Broll leads</title>
<style>
:root{color-scheme:light dark;--bg:#f5f6f4;--fg:#17201c;--mut:#5d6a64;--line:#dde2de;--card:#fff;--acc:#0d6b52}
@media(prefers-color-scheme:dark){:root{--bg:#101512;--fg:#e7ede9;--mut:#95a39b;--line:#2a342e;--card:#171d19;--acc:#4fc59e}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.45 system-ui,sans-serif;padding:24px 16px}
.w{max-width:1280px;margin:0 auto}h1{font-size:24px;margin:0 0 4px}.m{color:var(--mut);margin:0 0 16px}
.top{display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;align-items:flex-end;margin-bottom:12px}
a.b,button{background:var(--acc);color:var(--bg);border:0;border-radius:6px;padding:9px 16px;font:600 14px system-ui;text-decoration:none;cursor:pointer}
input{font:inherit;padding:9px 10px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--fg)}
.box{overflow:auto;border:1px solid var(--line);border-radius:8px;background:var(--card)}
table{border-collapse:collapse;width:100%;min-width:900px}
th{position:sticky;top:0;background:var(--card);text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);padding:10px 12px;border-bottom:1px solid var(--line)}
td{padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}td.d{max-width:360px;word-break:break-word}
.n,.t{font-family:ui-monospace,Consolas,monospace;font-size:12px;white-space:nowrap}
td.d{max-width:340px}.p{display:inline-block;padding:2px 9px;border-radius:99px;font-size:12px;font-weight:600;background:var(--line)}
.Lead{background:#dcefe6;color:#0d6b52}.Duplicate{background:#f6ebc8;color:#8a6100}.Test{background:#e6eae7;color:#5d6a64}.Spam{background:#f6dcd6;color:#a1311f}
.tg{display:block;color:var(--mut);font-size:12px;margin-top:3px}.bar{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px}.bar input{flex:1 1 240px}
.st{display:flex;flex-wrap:wrap;gap:6px 18px;color:var(--mut);margin:0 0 12px}.st b{color:var(--fg)}
form.l{display:flex;gap:8px;flex-wrap:wrap;max-width:420px}form.l input{flex:1 1 200px}.e{color:#b3321f;margin:8px 0}
</style></head><body><div class="w">${body}</div></body></html>`,
    { status, headers: HEADERS },
  );
}

function loginPage(error = "", status = 200) {
  return page(
    `<h1>Broll leads</h1><p class="m">Enter the password to continue.</p>
<form class="l" method="post" action="/heyman">
<input type="password" name="password" placeholder="Password" autocomplete="current-password" autofocus required>
<button type="submit">Open</button></form>${error ? `<p class="e">${esc(error)}</p>` : ""}`,
    status,
  );
}

function csvCell(value: string) {
  // Leading = + - @ would be run as a formula when the file opens in Excel.
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

function stamp(r: LeadRow) {
  return r.created_at.slice(0, 16).replace("T", " ");
}

function toCsv(rows: LeadRow[]) {
  const head = ["Date / Time (UTC)", "Source", "Production House / Company", "Name", "Email", "Phone", "Channel / Link", "Details", "Referral Source", "Cal.com Demo", "Flag", "Notes", "Need / Use-case tags"];
  const lines = [...rows].reverse().map((r) =>
    [stamp(r), r.source, r.production_house, r.name, r.email, r.phone, r.channel_link, r.details, r.referral_source, r.cal_demo, r.flag, r.notes, r.tags]
      .map(csvCell)
      .join(","),
  );
  // BOM so Excel reads UTF-8 (Cyrillic, Chinese names) correctly.
  return "﻿" + [head.map(csvCell).join(","), ...lines].join("\r\n");
}

const FLAGS = ["Lead", "Duplicate", "Test", "Spam"];

export async function GET(request: NextRequest) {
  const password = process.env.HEYMAN_PASSWORD;
  if (!password) return page(`<h1>Broll leads</h1><p class="m">Disabled: HEYMAN_PASSWORD is not set.</p>`, 503);
  if (!authed(request, password)) return loginPage();

  let rows: LeadRow[];
  try {
    rows = await listAllLeads();
  } catch (err) {
    console.error("Failed to load submissions for /heyman:", err);
    return page(`<h1>Broll leads</h1><p class="e">Could not read the database.</p>`, 500);
  }

  if (request.nextUrl.searchParams.get("download") === "csv") {
    return new NextResponse(toCsv(rows), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="broll_submissions_${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const count = (f: string) => rows.filter((r) => r.flag === f).length;
  const tr = rows
    .map(
      (r) => `<tr data-f="${esc(r.flag)}"><td class="t">${esc(stamp(r))}</td>
<td><b>${esc(r.name)}</b><br>${esc(r.production_house)}</td><td>${esc(r.email)}</td><td class="t">${esc(r.phone)}</td>
<td>${esc(r.source)}</td><td>${esc(r.referral_source)}</td>
<td><span class="p ${esc(r.flag)}">${esc(r.flag)}</span>${r.cal_demo ? `<span class="tg">Cal.com: ${esc(r.cal_demo)}</span>` : ""}</td>
<td class="d">${esc(r.channel_link)}${r.channel_link && r.details ? "<br>" : ""}${esc(r.details)}${r.tags ? `<span class="tg">${esc(r.tags)}</span>` : ""}${r.notes ? `<span class="tg">${esc(r.notes)}</span>` : ""}</td></tr>`,
    )
    .join("");

  return page(`<div class="top"><div><h1>Broll leads</h1>
<p class="m" style="margin:0">Live from the database, newest first. Times are UTC.</p></div>
<a class="b" href="/heyman?download=csv">Download for Excel</a></div>
<p class="st"><span><b>${rows.length}</b> total</span><span><b>${count("Lead")}</b> real leads</span><span><b>${count("Duplicate")}</b> duplicates</span><span><b>${count("Test") + count("Spam")}</b> test / spam</span></p>
<div class="bar"><input id="q" type="search" placeholder="Search name, company, email, details" aria-label="Search">
<select id="f" aria-label="Filter by flag"><option value="">All flags</option>${FLAGS.map((f) => `<option>${f}</option>`).join("")}</select></div>
<div class="box"><table><thead><tr><th>Date (UTC)</th><th>Name / company</th><th>Email</th><th>Phone</th><th>Source</th><th>Referral</th><th>Flag</th><th>Link / details</th></tr></thead>
<tbody id="r">${tr || `<tr><td colspan="8">No submissions yet.</td></tr>`}</tbody></table></div>
<script>(function(){var q=document.getElementById('q'),f=document.getElementById('f'),rs=[].slice.call(document.querySelectorAll('#r tr'));
function go(){var s=q.value.toLowerCase(),v=f.value;rs.forEach(function(r){r.hidden=!((!v||r.dataset.f===v)&&(!s||r.textContent.toLowerCase().indexOf(s)>-1));});}
q.addEventListener('input',go);f.addEventListener('change',go);})();</script>`);
}

export async function POST(request: NextRequest) {
  const password = process.env.HEYMAN_PASSWORD;
  if (!password) return page(`<h1>Broll leads</h1><p class="m">Disabled: HEYMAN_PASSWORD is not set.</p>`, 503);

  const form = await request.formData().catch(() => null);
  const given = typeof form?.get("password") === "string" ? (form!.get("password") as string) : "";
  if (!safeEqual(token(given), token(password))) return loginPage("Wrong password.", 401);

  const res = NextResponse.redirect(new URL("/heyman", request.url), 303);
  res.cookies.set(COOKIE, token(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/heyman",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
