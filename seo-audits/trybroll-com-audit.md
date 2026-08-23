# SEO / AEO / GEO Audit & Strategy — trybroll.com (Broll AI)

**Date:** 2026-08-23
**Scope:** Live crawl (homepage, robots.txt, sitemap.xml, llms.txt, 3 sub-pages), plus live search-visibility check for brand and category queries.

## Executive Summary

Broll is a well-built site technically — clean Next.js/Vercel setup, strong titles/meta descriptions, full Organization/WebSite/SoftwareApplication/FAQPage JSON-LD already in place, and an `llms.txt` file most competitors don't even have. The problem you're seeing ("can't find my site searching broll or broll ai") is **not** a broken page — it's two separate, fixable issues:

1. **Correction (per site owner): the domain was verified and indexed in Google Search Console about a month ago** — so this is not an indexing-lag problem. A live search for `site:trybroll.com` and `trybroll.com` still returned zero results referencing the domain, which means the site is indexed but effectively invisible in ranking — a much harder problem than "wait for the next crawl." Combined with finding #2 below, the most likely explanation is that the brand-name collision is actively suppressing you: Google has crawled and indexed the pages, but has nothing forcing it to surface `trybroll.com` over the entrenched "B-roll generator" tools already occupying that query space. Confirm current indexing status directly in Search Console (Coverage report, and URL Inspection on `/`) rather than relying on live search alone — if pages show "Indexed" there but still don't surface for `site:` searches, that's consistent with a ranking/authority suppression, not a crawl problem.
2. **"Broll" collides with an existing, crowded product category name: "B-roll."** A live search for "broll ai video editor" returned nine competitors — but every single one is a "B-roll generator" (a tool that inserts supplementary footage into an existing edit), not an agentic full-video editor like yours. Google is matching your brand name to the wrong category because "broll"/"b-roll" is already an established term for a different kind of tool. This is an entity-disambiguation problem, and it will keep suppressing your brand visibility until you deliberately fix it — no amount of technical SEO alone solves it.

The competitive head term "AI video editor" is dominated by Adobe, Canva, Runway, Kapwing, VEED, and OpusClip — all high-authority, long-established brands. Ranking #1 for that exact phrase site-wide is not a realistic near-term goal; your own site already shows the right instinct by targeting a long-tail variant (`/ai-video-editor-for-production-houses`), which is the correct strategy to double down on rather than abandon for the head term.

## Scope & Inputs

Fetched and verified directly:
- `https://www.trybroll.com/` — full HTML, response headers (301 redirect from apex confirmed working correctly)
- `https://www.trybroll.com/robots.txt` — explicitly allows all major crawlers including AI bots
- `https://www.trybroll.com/sitemap.xml` — 7 URLs
- `https://www.trybroll.com/llms.txt` — present and well-written
- `/ai-video-editor`, `/ai-video-editor-for-production-houses`, `/about` — title/meta spot-check

Live search-visibility checks (this is the evidence behind the "can't find my site" finding):
- `"broll ai video editor"` — 9 results, all B-roll-generator competitors, zero results are Broll itself
- `"trybroll.com"` — zero relevant results
- `"site:trybroll.com"` — zero relevant results
- `"ai video editor"` — dominated by Adobe/Canva/Runway/Kapwing/VEED/OpusClip

Not assessed (and why):
- Backlink profile / referring domains — no crawler/backlink tool access in this session; for a domain this new, the honest expectation is close to zero regardless.
- Core Web Vitals field data (real-user CrUX) — no synthetic Lighthouse run this session; page weight (43-107KB HTML) and Vercel edge caching suggest low risk, but this is inference, not a measured score.
- Google Search Console indexing status directly — inferred from search-visibility pattern above, not from Search Console itself (you should verify there directly, see Quick Wins #1).

## Findings

### Technical SEO — Strong (75/100)

- `robots.txt` explicitly allows `*`, and additionally names every major AI crawler by user-agent (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot, CCBot, etc.) with `Allow: /` — this is more deliberate than most sites bother to be.
- `sitemap.xml` exists, is referenced in robots.txt, is valid, 7 URLs, all real pages (no 404s in the sample checked).
- Canonical tag present and self-referencing on the homepage.
- Viewport meta present and correct.
- HTTPS enforced, HSTS header present.
- Served via Vercel with edge caching (`X-Vercel-Cache: HIT`) — fast by construction.
- Gap: only 7 URLs in the sitemap for what looks like a real product with a demo flow, pricing consideration, and presumably a blog/content plan eventually — there's no content depth yet to build topical authority on.

### On-Page SEO — Strong (80/100)

- Title tags are unique per page and keyword-intentional: `"Broll AI | Agentic AI Video Editor (Official Site)"` on the homepage, `"AI Video Editor — Broll"` and `"AI Video Editor for Production Houses — Broll"` on landing pages. This is exactly right — each page targets a distinct query.
- Meta descriptions are present, unique, and within length on every page checked.
- Open Graph tags fully populated (title, description, url, image, locale, type) — link shares will render correctly.
- H1 present and on-brand ("Broll. The AI editor that finishes videos before you do.").
- All images checked carry `alt` attributes — zero missing.
- Gap: the homepage H1 leads with the brand name and a tagline, not a query-matching phrase. That's a fine choice for a homepage (brand pages should say who you are), but it means the homepage isn't the page that should be expected to rank for "AI video editor" — that job belongs to `/ai-video-editor`, and internal linking should make that handoff explicit (see Quick Wins).

### AEO (Answer Engine Optimization) — Strong (75/100)

- `FAQPage` JSON-LD is already implemented with 6 well-written, genuinely useful Q&As ("What is Broll?", "How does Broll find the right moments in my footage?", etc.) — each answer is self-contained and specific, exactly the shape Google's snippet extraction and AI Overviews favor.
- Gap: the FAQ answers are strong for "what/how does Broll work" queries but don't yet cover comparison-intent questions people actually type when evaluating a tool ("Broll vs [competitor]", "is Broll free", "how much does Broll cost") — those are exactly the queries a prospective customer searches right before converting, and they're currently unanswered anywhere on the site.

### GEO (Generative Engine Optimization) — Strong foundation, one critical gap (65/100)

- Full `Organization`, `WebSite`, and `SoftwareApplication` JSON-LD present with name, url, logo, slogan, and a `memberOf` credibility signal (Google for Startups) — this is genuinely good GEO practice most sites skip entirely.
- `llms.txt` exists and is well-written: clear entity definition, feature list, audience, backing, page list, and FAQ — this is close to best-practice for the emerging llms.txt convention.
- AI crawler access is explicitly open (see Technical SEO) — a deliberate, correct choice for a product wanting AI-tool citation.
- **Critical gap — entity disambiguation:** none of the structured data, the FAQ, or the visible copy directly states "we are not a B-roll generator" or otherwise disambiguates from the existing "B-roll" tool category. When an LLM is asked "what is Broll" cold (no site context), it has to resolve a genuine naming collision, and right now nothing on the site does that resolution work for it. This is the single highest-leverage GEO fix available — see Quick Wins.

## Prioritized Action Plan

### Quick Wins (hours)
1. **Confirm the current Coverage/indexing status in Search Console** (already verified per site owner) and re-request indexing on the homepage and product pages after the disambiguation changes ship (items 2-4 below) — indexed does not mean ranked, and a re-crawl after the copy change is what actually gives Google new signal to work with.
2. **Add explicit disambiguation copy near the top of the homepage and in the `Organization`/`SoftwareApplication` schema `description` fields** — one sentence like *"Broll is an agentic AI video editor — not a B-roll (supplementary footage) generator — that edits your entire video end to end."* This directly targets the naming collision found in the live search test and gives both Google and LLMs the disambiguating signal they currently lack.
3. **Add the same disambiguation line to `llms.txt`** under a short "Not to be confused with" note — llms.txt is read literally by AI tools deciding how to describe you, so this is a very cheap, very targeted fix.
4. **Add comparison/purchase-intent FAQ entries** ("Is Broll free?", "How is Broll different from a B-roll generator?", "How is Broll different from [category] tools like Premiere/DaVinci plugins?") to the existing FAQPage schema and visible FAQ — these map to real pre-purchase queries and are currently unanswered.
5. **Internal-link from the homepage to `/ai-video-editor`** with descriptive anchor text (e.g. "See how the AI video editor works") — right now the query-matching page needs a clear internal signal that it's the canonical destination for that head term, separate from the brand-focused homepage.

### Structural Fixes (days)
1. **Build out topical depth beyond the current 7 pages.** A comparison page ("Broll vs AI B-roll generators", "Broll vs manual editing") directly resolves the disambiguation problem while also being genuinely useful, linkable content — it's the single page most likely to both rank and get cited by AI tools answering "what's the difference between Broll and a B-roll generator."
2. **Add a case-studies/social-proof page** using the "200M+ monthly views" and "15M+ follower production house" claims already in the llms.txt — right now those are strong trust signals mentioned only in a machine-readable file; put them on an actual page with names/logos (with permission) so they're both a ranking asset and a GEO citation asset.
3. **Set up backlink outreach targets**: video production/creator-economy press, AI tool directories (There's An AI For That, Futurepedia, etc.), and Product Hunt — for a domain this new, external validation is what will move both classic SEO authority and LLM training/retrieval visibility fastest.

### Strategic Investments (weeks+)
1. **Content program around the long-tail terms you're already winning the positioning battle on** — "agentic AI video editor," "AI video editor for production houses," "timeline-free video editing." These are far more winnable than "AI video editor" head-to-head against Adobe/Canva, and your existing page structure already shows the right instinct — build 4-6 more pages/posts in this same long-tail pattern (by use case: podcasters, YouTubers, agencies, etc.) rather than one page trying to rank for everything.
2. **Track and formally resolve the brand-collision problem over time** — re-run the "broll ai video editor" search test monthly; success looks like Broll itself starting to appear in results, not necessarily displacing the B-roll-generator tools (different intent), but appearing alongside them once disambiguation content and backlinks exist.
3. **Once indexed and stable, pursue category-defining language** ("agentic video editor" as a category term you own) — this is a longer play but is exactly how a differentiated product escapes a naming collision permanently: by making the search ecosystem associate the *new* term with you first.

## Schema Markup

Your existing schema is already strong. The one addition worth making now is folding the disambiguation statement into the existing `SoftwareApplication` description rather than adding a new schema type:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Broll",
  "url": "https://www.trybroll.com",
  "description": "Broll is an agentic AI video editor — distinct from B-roll (supplementary footage) generators — that turns raw footage into a publish-ready, fully edited video: story, cuts, captions, color grading, and lip sync included.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "publisher": { "@id": "https://www.trybroll.com/#organization" }
}
```

Add a matching FAQ entry with disambiguation-specific JSON-LD text (must match visible on-page copy exactly, per Google's structured-data guidelines):

```json
{
  "@type": "Question",
  "name": "Is Broll the same as a B-roll generator?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "No. B-roll generators add supplementary footage to an existing edit. Broll is a full agentic video editor — it builds the story, cuts the timeline, writes captions, grades color, and exports a publish-ready video from your raw footage."
  }
}
```

## Measurement & Reporting Plan

| Discipline | Metric | Tool | Cadence |
|---|---|---|---|
| Indexing | Pages indexed, crawl errors | Google Search Console | Weekly until stable, then monthly |
| SEO | Organic impressions/clicks/CTR for "broll," "broll ai," "ai video editor," "agentic video editor," + long-tail variants | Google Search Console | Weekly |
| SEO | Ranking position for target queries | Manual SERP check or rank tracker | Weekly for first 2 months, then monthly |
| AEO | Featured snippet / AI Overview appearances for FAQ-mapped queries | Manual SERP check | Monthly |
| GEO | Whether ChatGPT/Perplexity/Claude/Gemini correctly identify Broll (not confuse with B-roll generators) when asked directly | Manual spot-check by prompting each tool | Monthly — this is the direct test of whether the disambiguation fix worked |

Be aware: there is no mature, real-time analytics product for AI-citation tracking today — GEO measurement above is manual spot-checking, not a dashboard.

**Realistic timeline:** Indexing/Search Console fixes can show up within days to 2 weeks of the next Google crawl. The disambiguation copy and FAQ changes should start showing directional improvement in brand-query visibility within 2-4 weeks, but full resolution of the naming collision — actually out-ranking B-roll-generator tools for your own brand terms — is a 1-3 month play that depends on backlinks and content volume, not just on-page changes. Competing on the bare "AI video editor" head term against Adobe/Canva-tier incumbents is a 6-12+ month authority-building effort at minimum; the long-tail strategy is the faster path to real traffic in the meantime.
