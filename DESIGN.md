# Broll — Website Design

Marketing site for **Broll**, the agentic AI video editor.
Art direction: **a professional product site in the logo's colours** —
Linear / Runway / Vercel calibre. The launch film is shown once (`#film`);
it is a source of colour and tone, never something to re-stage scene by
scene. (A 2026-10-09 "the site is the film" pass that copied film chrome —
REC dots, timecodes, viewfinders, film scenes — read as "video screenshots
pasted on a website" and was replaced.)

## Palette (tokens in `src/app/globals.css`)

- Base ink-navy `--bg #090a11`; surfaces `--surface` / `--surface-2`.
- Logo colours: `--navy #38466b`, `--crimson #b8182c`, `--red #ec4b52`,
  `--peach #ffc4ae`. `--red` is the single accent: eyebrows, hover, focus,
  playhead, one accent phrase per headline (`.serif-voice.text-brand`).
- Brand colour appears as light, never as a full-bleed fill: `.hero-glow`
  (top of pages), `.band-border` (1px logo-gradient edge on the hero product
  window and the final CTA card), `.bg-grid` (faint layout grid).

## Type

- `.font-display` — Geist semibold, tight tracking. All headlines.
- `.font-wordmark` — wide Archivo, the BROLL logotype only.
- `.serif-voice` — Instrument Serif italic, one accent phrase per heading.
- Section headers: red eyebrow → headline → muted second sentence
  (`site/SectionHeader.tsx`).

## Home (`src/app/page.tsx`)

1. **HomeHero** — centred promise + **AppDemo**: a working Broll window built
   in the DOM (real clip photos, preview with captions/grade, agent
   checklist, timeline). Runs itself; visitors can type their own prompt.
2. ProductStats · 3. HowItWorks · 4. Capabilities (live mini-demos)
5. Comparison (manual vs Broll table) · 6. BrollFilm (`#film`)
7. UseCases (photo grid) · 8. Workflow · 9. FAQ · 10. FinalCta · Footer

## Inner pages

`PageHero` (breadcrumb, headline, lede, CTA) → `PageBody` + `ContentSection`
→ `FaqSection` → `Footer`. Pricing adds `PricingPlans`; Blog uses `BlogGrid`.

## Rules

- No film chrome (REC, timecodes, slates, viewfinders), no blurred fake
  footage — use the real clip photos in `public/clips`.
- No stock-logo walls, no invented prices or tiers. Credibility: 200M+
  monthly views, 15M+ follower production house, Google for Startups.
- `prefers-reduced-motion`: demos render their finished state.
- No horizontal scroll at 390px (`grid-cols-1` + `min-w-0` on grids;
  clip decorative glows).
