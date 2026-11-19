# Broll — Website Design

Marketing site for **Broll**, the agentic AI video editor. The 2026-11
redesign comes from the "Broll Website Redesign" design canvas: an ink
ground in the logo's colours, Geist + Geist Mono, and an editing-suite motif
(timecode eyebrows, a ruler with a crimson playhead between home sections,
product windows built in the DOM).

## Palette (tokens in `src/app/globals.css`)

- Ink `--bg #08090f`; surfaces `--surface #11131d`, `--surface-2 #0e1019`;
  lines `--line #272b3e`, `--line-2 #1f2232`, `--line-strong #33384e`.
- Text: `--ink #f2f3f7`, `--ink-2`, `--soft #a8acbe` (body copy), `--muted`.
- Crimson `#be1e34` — primary buttons, the playhead, key moments only.
  Signal `--red #ff5c70` — accent text, eyebrows, links.
  Peach `#ffc1ac` — only inside the `.text-grad` headline gradient.

## Type & utilities

- Geist for everything; Geist Mono for eyebrows, labels, timecodes.
- `.eyebrow` (mono, red) → `.h-section` headline → `text-soft` lede
  (`SectionHead` in `components/v2/ui.tsx`).
- Buttons: `.btn .btn-primary` / `.btn .btn-ghost` (`Btn` component).
- `.text-grad` — one accent phrase per hero headline.

## Structure

- `components/site/Navbar.tsx`, `Footer.tsx` — shared chrome (centered nav).
- `components/v2/` — the redesign: `PageShell`, `PageIntro`, `Faq`,
  `CtaBand`, `Ruler`, `NewFeatures`, `ProductMock`, `Shot` (+ `CLIPS`),
  `BlogIndex`, `home/*` (EditorMock, HeroPrompt, ProductTabs, Film).
- FAQ copy lives in `lib/faqs.ts` and feeds both the page and FAQPage JSON-LD.
- Product lineup in `lib/products.ts`.

## Imagery

- Frames in `public/clips/gen_*.webp` were generated in Gemini (watermark
  corner cropped), 16:9 = interview, set, city; 9:16 = podcast, streamer,
  creator. Use them through `Shot` / `CLIPS`.
- `public/<key>.txt` is the IndexNow key (see `scripts/indexnow.mjs`) — keep it.

## Rules

- No invented prices or tiers: pricing is "coming soon" until announced.
- Chat is live at chat.trybroll.com; Windows, Mac and Resolve are "coming soon".
- Max content width 1440px; no horizontal scroll at 390px.
- `prefers-reduced-motion`: no decorative animation.
