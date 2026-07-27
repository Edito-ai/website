#!/usr/bin/env node
/**
 * Ping IndexNow so Bing, Yandex, Seznam and Naver pick up the site within
 * minutes instead of waiting to be crawled. Google does NOT participate —
 * for Google use Search Console → URL Inspection → Request Indexing.
 *
 * Bing's index is what backs ChatGPT search, so this is the fastest route to
 * being quotable there.
 *
 * Ownership is proved by the key file in public/, which must stay reachable
 * at https://<host>/<key>.txt — deleting it silently breaks every submission.
 *
 * Usage:  node scripts/indexnow.mjs [https://other-origin.com]
 */

const KEY = "af3a479972f65369645a9373ed086b30";

const SITE_URL = (
  process.argv[2] ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.trybroll.com"
).replace(/\/$/, "");

const host = new URL(SITE_URL).host;

const urlList = ["/", "/demo", "/privacy", "/terms"].map(
  (path) => `${SITE_URL}${path === "/" ? "" : path}`,
);

const keyLocation = `${SITE_URL}/${KEY}.txt`;

// Fail loudly if the key file is not actually served — IndexNow rejects the
// whole batch with a 403 otherwise, and it is easy to miss.
const keyCheck = await fetch(keyLocation);
if (!keyCheck.ok) {
  console.error(
    `✗ Key file unreachable: ${keyLocation} returned ${keyCheck.status}.\n` +
      `  public/${KEY}.txt must be deployed before submitting.`,
  );
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
});

// 200 = accepted, 202 = accepted but key still being validated. Both are wins.
if (res.status === 200 || res.status === 202) {
  console.log(`✓ Submitted ${urlList.length} URLs for ${host} (HTTP ${res.status})`);
  urlList.forEach((url) => console.log(`  ${url}`));
} else {
  console.error(`✗ IndexNow returned HTTP ${res.status}`);
  console.error(await res.text());
  process.exit(1);
}
