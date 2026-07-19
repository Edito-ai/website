# Broll SEO Report — trybroll.com

Date: 2026-07-19 · Framework: Next.js 16 App Router · Scope: full technical + content audit and implementation.

> **Honesty notes.** Lighthouse scores below are real, measured locally against the
> production build (throttled mobile simulation, so live CrUX numbers will be better).
> Keyword volume/difficulty are **qualitative estimates** (High/Med/Low) — no live
> keyword-tool data was available; validate in Google Keyword Planner or Ahrefs before
> committing budget. No schema was added for things that don't exist (no SearchAction —
> the site has no search box; no ratings, reviews, or fake social proof).

---

## 1. Audit — before → after

| Area | Before | After |
| --- | --- | --- |
| Lighthouse SEO | 100 (after earlier metadata pass; was ~75 pre-project) | **100** |
| Lighthouse Performance (mobile, throttled) | 65 | **83** |
| Lighthouse Accessibility | 96 | **100** |
| Lighthouse Best Practices | 100 | **100** |
| LCP (throttled mobile) | 12.1 s | **4.4 s** |
| CLS | 0 | **0** |
| Total Blocking Time | 210 ms | **20 ms** |
| Speed Index | 6.4 s | **3.5 s** |
| Total page weight | 5,737 KiB | **652 KiB** |
| Titles / descriptions / canonicals | ✅ (earlier pass) | ✅ all pages, absolute URLs on trybroll.com |
| robots.txt / sitemap.xml | ✅ | ✅ |
| OG + Twitter cards, generated OG images | ✅ | ✅ + per-page OG on subpages |
| Favicon / apple-touch-icon / manifest | ✅ | ✅ |
| Structured data | Organization, WebSite, SoftwareApplication | + **FAQPage**, + **BreadcrumbList** on /demo, /privacy, /terms |
| Heading hierarchy | 1 h1 / 4 h2 / 4 h3 | 1 h1 / 4 h2 / 10 h3 (FAQ adds 6) |
| Image alt text | ✅ decorative blanked, features descriptive | ✅ |
| Lazy loading | feature images only | + `decoding="async"` everywhere, intrinsic width/height |
| Image compression | 7 MB of 1024–2000px PNGs | **~460 KB WebP** (clips 512px, features 1024px, logo 512px) |
| ARIA | `aria-label` on generic `<span>` (prohibited) | sr-only text pattern in WordReveal |
| Internal linking | Footer: Features/Demo/Legal | + FAQ anchor; see §4 for the cluster plan |
| Crawlable body copy | ~200 words | ~600 words (FAQ + capabilities subheading), keywords included naturally |

**What was already fine:** fonts are self-hosted via `next/font` (no render-blocking
third-party origins, so no preconnect/dns-prefetch needed); trailing slashes are
consistent (Next default, no trailing slash); no duplicate metadata; no orphan pages
(all four routes linked from nav/footer and listed in the sitemap); compression and
static asset caching are handled by the host.

**Deliberate trade-off:** the remaining LCP gap comes from the entrance animations —
every above-the-fold element renders hidden until the JS bundle hydrates. That is the
design (per DESIGN.md), and it was preserved. If ranking pressure ever demands it, the
single biggest lever is rendering the hero headline visible in SSR HTML and animating
only on first interaction/scroll.

---

## 2. Keyword map (per page)

Intent: **C** commercial · **T** transactional · **I** informational.

| Page | Primary keyword | Secondary | Intent | Title (implemented) | H1 (implemented) |
| --- | --- | --- | --- | --- | --- |
| `/` | AI video editor | agentic video editing, AI video search, search inside videos, AI b-roll, export XML to Premiere Pro | C | Broll — The operating system for autonomous video editing | Broll. The AI editor that finishes videos before you do. |
| `/demo` | AI video editor demo | video editing for production houses, AI editing for teams | T | Claim your free demo — Broll | Tell us about your production house. |
| `/privacy` | — (navigational) | — | I | Privacy Policy — Broll | Privacy Policy |
| `/terms` | — (navigational) | — | I | Terms of Service — Broll | Terms of Service |

Recommended **new** pages (slugs + primary keywords) — see §4/§5:

| Proposed page | Primary keyword | Intent |
| --- | --- | --- |
| `/pricing` | AI video editor pricing | T |
| `/features/video-search` | AI video search / search inside videos | C |
| `/features/xml-export` | export XML to Premiere Pro | C |
| `/vs/traditional-editing` | AI editing vs manual editing | C |
| `/blog` | (hub) | I |

---

## 3. Structured data (implemented)

- `/` — `@graph`: `Organization` (#organization), `WebSite` (#website), `SoftwareApplication`, `FAQPage` (mirrors the visible FAQ section exactly, per Google's FAQ rich-result rules).
- `/demo`, `/privacy`, `/terms` — `BreadcrumbList` (Home → page).
- **Intentionally omitted:** `SearchAction` (no site search exists), `Product`/`Offer` (no public pricing), `AggregateRating` (no reviews — never fabricate), `Article` (no blog yet; add per-post when the blog ships).

---

## 4. Internal linking & topic clusters

Current: Navbar (Product → #features, Pricing → **dead anchor**, Contact → footer, Book Demo → /demo), Footer (Features, FAQ, Get a demo, Contact, Privacy, Terms), legal pages cross-link to /demo.

Actions taken: FAQ section added to `/` with footer anchor link; FAQ answer routes readers to the demo section.

Recommended cluster architecture once new pages exist:

```
/ (money page: "AI video editor")
├── /features/video-search   ← cluster hub: "video search" keywords
├── /features/xml-export     ← cluster hub: "editor interop" keywords
├── /pricing                 ← fix the navbar's dead #pricing link here
├── /vs/traditional-editing  ← comparison intent
└── /blog                    ← informational long tail; every post links up
                                to its feature hub + the homepage
```

**Fix needed (your call):** the navbar "Pricing" link points to `#pricing`, which has
no target. Either build `/pricing` or retarget the link — a permanently dead nav link
is bad UX and wasted crawl signal.

---

## 5. Blog topical-authority map (105 ideas)

Volume/difficulty are **estimates** (H/M/L). Slugs live under `/blog/`.

### Cluster A — AI Editing (15)
| # | Topic / keyword | Vol | Diff | Intent | Slug |
|---|---|---|---|---|---|
| 1 | Best AI video editors compared | H | H | C | best-ai-video-editors |
| 2 | What is agentic video editing? | L | L | I | what-is-agentic-video-editing |
| 3 | AI video editing vs manual editing: real numbers | M | M | C | ai-vs-manual-video-editing |
| 4 | How AI removes silences and dead air | M | L | I | ai-remove-silences |
| 5 | Prompt-based video editing explained | L | L | I | prompt-based-video-editing |
| 6 | AI color grading: how it works | M | M | I | ai-color-grading-explained |
| 7 | AI lip sync for dubbing: state of the art | M | M | I | ai-lip-sync-dubbing |
| 8 | Auto-captions that don't embarrass you | M | L | I | ai-captions-guide |
| 9 | Can AI edit a documentary? | L | L | I | ai-edit-documentary |
| 10 | AI jump-cut editing for talking heads | M | L | I | ai-jump-cut-talking-heads |
| 11 | How AI picks the best take | L | L | I | ai-best-take-selection |
| 12 | Editing long-form podcasts with AI | M | M | C | ai-podcast-video-editing |
| 13 | AI editing glossary: 40 terms | L | L | I | ai-editing-glossary |
| 14 | The cost of an 8-hour edit (and how to get it to 12 minutes) | L | L | C | cost-of-manual-editing |
| 15 | AI editing myths, tested | L | L | I | ai-editing-myths |

### Cluster B — Video Search (15)
| # | Topic / keyword | Vol | Diff | Intent | Slug |
|---|---|---|---|---|---|
| 16 | Semantic video search explained | M | M | I | semantic-video-search |
| 17 | How to search inside videos | M | M | I | search-inside-videos |
| 18 | AI clip finder: find any moment in hours of footage | M | M | C | ai-clip-finder |
| 19 | Video indexing: how machines watch footage | M | M | I | video-indexing-explained |
| 20 | Natural-language search for video libraries | L | L | I | natural-language-video-search |
| 21 | Finding b-roll with AI | M | L | C | find-b-roll-with-ai |
| 22 | Search footage by what's said vs what's shown | L | L | I | transcript-vs-visual-search |
| 23 | Building a searchable video archive | M | M | I | searchable-video-archive |
| 24 | Video embeddings 101 | L | M | I | video-embeddings-101 |
| 25 | Scene detection: splitting footage automatically | L | L | I | ai-scene-detection |
| 26 | Speaker detection and diarization in video | L | M | I | speaker-detection-video |
| 27 | OCR in video: search on-screen text | L | L | I | video-ocr-search |
| 28 | Best video search engines for teams | M | H | C | video-search-engines |
| 29 | Query your footage like a database | L | L | I | query-footage-like-database |
| 30 | From logging to searching: retiring the bins workflow | L | L | I | retire-footage-logging |

### Cluster C — Video Asset Management (15)
| # | Topic / keyword | Vol | Diff | Intent | Slug |
|---|---|---|---|---|---|
| 31 | Media asset management (MAM) buyer's guide | M | H | C | media-asset-management-guide |
| 32 | DAM vs MAM: what video teams actually need | M | M | C | dam-vs-mam |
| 33 | Organizing raw footage: a system that scales | M | L | I | organize-raw-footage |
| 34 | Video file naming conventions that survive | M | L | I | video-file-naming-conventions |
| 35 | Proxy workflows for large teams | L | M | I | proxy-workflow-guide |
| 36 | Cloud vs on-prem footage storage costs | M | M | C | cloud-vs-onprem-footage-storage |
| 37 | Metadata schemas for video libraries | L | M | I | video-metadata-schemas |
| 38 | Archiving finished projects without losing them | L | L | I | video-project-archiving |
| 39 | Rights management for stock and b-roll | L | M | I | footage-rights-management |
| 40 | Versioning edits: cuts, revisions, approvals | L | L | I | edit-version-control |
| 41 | How AI auto-tags your footage library | M | M | C | ai-auto-tagging-footage |
| 42 | Multi-cam footage management | L | L | I | multicam-footage-management |
| 43 | Backup strategies editors actually follow | M | L | I | footage-backup-strategy |
| 44 | Shared storage for remote edit teams | L | M | I | shared-storage-remote-editing |
| 45 | The true cost of lost footage | L | L | I | cost-of-lost-footage |

### Cluster D — Content Repurposing (15)
| # | Topic / keyword | Vol | Diff | Intent | Slug |
|---|---|---|---|---|---|
| 46 | Turn one video into 30 pieces of content | H | M | C | one-video-30-pieces |
| 47 | Long-form to Shorts/Reels/TikTok workflow | H | M | C | long-form-to-shorts |
| 48 | AI clipping for podcasts | M | M | C | ai-podcast-clipping |
| 49 | Repurposing webinars into marketing assets | M | M | C | repurpose-webinars |
| 50 | Finding viral moments in old footage | M | L | C | find-viral-moments |
| 51 | Vertical crop without ruining framing | M | L | I | vertical-crop-guide |
| 52 | Caption styles that perform on each platform | M | L | I | caption-styles-by-platform |
| 53 | Hook writing for short-form video | M | M | I | short-form-hooks |
| 54 | Batch-producing a month of content in a day | M | M | C | batch-content-production |
| 55 | Multi-language versions of one video | M | M | C | multi-language-video-versions |
| 56 | Repurposing UGC legally and well | L | M | I | repurpose-ugc |
| 57 | Evergreen vs timely repurposing | L | L | I | evergreen-repurposing |
| 58 | Newsletter clips: video in email | L | L | I | video-in-newsletters |
| 59 | Turning testimonials into ads | M | M | C | testimonials-into-ads |
| 60 | Measuring repurposed-content ROI | L | M | I | repurposing-roi |

### Cluster E — Creator Workflow (15)
| # | Topic / keyword | Vol | Diff | Intent | Slug |
|---|---|---|---|---|---|
| 61 | YouTube editing workflow from A to Z | H | H | I | youtube-editing-workflow |
| 62 | How much editing time per minute of video? | M | L | I | editing-time-per-minute |
| 63 | Solo creator vs hiring an editor vs AI | M | M | C | solo-vs-editor-vs-ai |
| 64 | Editing faster without losing your style | M | L | I | edit-faster-keep-style |
| 65 | The 12-minute edit: a case study format | L | L | C | twelve-minute-edit |
| 66 | Talking-head setups that cut themselves | L | L | I | talking-head-setup |
| 67 | B-roll shot lists for creators | M | L | I | b-roll-shot-list |
| 68 | Filming with the edit in mind | M | L | I | film-for-the-edit |
| 69 | Creator burnout and the editing bottleneck | M | L | I | editing-bottleneck-burnout |
| 70 | Publishing cadence: what data says | M | M | I | publishing-cadence-data |
| 71 | Thumbnails + titles: the packaging workflow | H | H | I | packaging-workflow |
| 72 | Audio cleanup for creators | M | M | I | audio-cleanup-guide |
| 73 | From script to publish in one day | M | M | C | script-to-publish-one-day |
| 74 | Building a content engine as a team of one | M | M | I | one-person-content-engine |
| 75 | Creator tech stack (what's worth paying for) | M | M | C | creator-tech-stack |

### Cluster F — Production Teams (15)
| # | Topic / keyword | Vol | Diff | Intent | Slug |
|---|---|---|---|---|---|
| 76 | Post-production pipeline for small studios | M | M | I | post-production-pipeline |
| 77 | Scaling a production house without scaling headcount | L | M | C | scale-production-house |
| 78 | Editor handoff: XML, EDL, AAF explained | M | M | I | xml-edl-aaf-explained |
| 79 | Premiere Pro XML import: complete guide | M | M | I | premiere-xml-import |
| 80 | DaVinci Resolve XML roundtrip | M | M | I | resolve-xml-roundtrip |
| 81 | Final Cut interchange formats | L | M | I | final-cut-interchange |
| 82 | Review-and-approval workflows that don't stall | M | M | I | review-approval-workflow |
| 83 | Client revision management | M | L | I | client-revision-management |
| 84 | Rate cards: pricing editing services in 2026 | M | M | C | editing-rate-cards |
| 85 | Hiring editors vs augmenting with AI | M | M | C | hiring-vs-ai-augmentation |
| 86 | Producing 200M monthly views: the operations | L | L | I | operations-at-scale |
| 87 | Editing style guides for teams | L | L | I | editing-style-guide |
| 88 | Turnaround-time SLAs for agencies | L | M | C | editing-sla-agencies |
| 89 | Freelancer + AI hybrid teams | L | M | I | freelancer-ai-hybrid |
| 90 | The agency margin problem in post | L | M | C | agency-margin-post-production |

### Cluster G — Enterprise Video (15)
| # | Topic / keyword | Vol | Diff | Intent | Slug |
|---|---|---|---|---|---|
| 91 | Enterprise video content strategy | M | H | C | enterprise-video-strategy |
| 92 | Video intelligence for enterprises | L | M | C | video-intelligence-enterprise |
| 93 | Internal comms video at scale | M | M | C | internal-comms-video |
| 94 | Training-video production pipelines | M | M | C | training-video-pipeline |
| 95 | Localizing corporate video (dubbing + lip sync) | M | M | C | localize-corporate-video |
| 96 | Brand consistency across hundreds of videos | L | M | I | brand-consistency-video |
| 97 | Security and privacy in AI video tools | M | M | I | ai-video-security-privacy |
| 98 | SOC 2 and footage: what buyers should ask | L | M | I | soc2-video-vendors |
| 99 | Video ROI reporting for marketing teams | M | M | I | video-roi-reporting |
| 100 | Event footage: from 3-day conference to campaign | M | M | C | conference-footage-campaign |
| 101 | Executive comms: fast turnaround video | L | L | C | executive-comms-video |
| 102 | Procurement guide: evaluating AI video vendors | L | M | C | evaluate-ai-video-vendors |
| 103 | Compliance review for published video | L | M | I | video-compliance-review |
| 104 | Migrating a legacy video archive to AI search | L | M | C | migrate-video-archive |
| 105 | Build vs buy: video AI inside the enterprise | L | M | C | build-vs-buy-video-ai |

Publishing order: start with Cluster B (video search) and Cluster A — they support the
homepage's money keywords directly and have the least competition; add `Article` +
`BreadcrumbList` schema per post when the blog ships.

---

## 6. Remaining recommendations (not implemented — need your call or external action)

1. **Google Search Console**: verify trybroll.com (DNS TXT), submit `sitemap.xml`, then use URL Inspection on `/` to request indexing.
2. **Build `/pricing`** (or retarget the navbar's dead `#pricing` anchor).
3. **Blog + feature pages** per §4/§5 — this is the real ranking lever; a 4-page site will not outrank incumbents for "AI video editor" on technical SEO alone.
4. **Hero SSR visibility** — only if CWV field data (CrUX) shows poor LCP: render above-the-fold text visible before hydration.
5. **Host-level**: confirm the host 301s `www.trybroll.com` → `trybroll.com` and HTTP → HTTPS (one canonical origin). Vercel does this when both domains are assigned.
6. **Backlinks**: the durable path to #1 — directory listings (G2, Product Hunt, Futurepedia-class AI directories), founder posts, and the credibility numbers you already own (200M+ monthly views) turned into case-study content.
7. Re-run Lighthouse on the **live** site after deploy; lab numbers here are throttled local measurements.
