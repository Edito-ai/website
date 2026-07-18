# Broll — Landing Page Design

Single-page marketing site for **Broll**, an AI-powered agentic video editor.
Quality bar: Cardboard, Mosaic, Linear, Apple, Stripe — editorial, not SaaS.

## Principles

- **Premium monochrome.** White + black. Light theme default, dark follows
  `prefers-color-scheme` automatically. Accent (electric blue `--accent`,
  purple `--glow`) appears **only on interaction** — hover, focus, playhead.
- **The background is never empty.** Grain overlay, drifting light blobs,
  floating dust particles (`fx/Particles`), flowing signal lines.
- **Nothing suddenly appears.** Scroll-driven scenes are scrubbed, not
  triggered; entrances rise out of clip masks.
- `prefers-reduced-motion` disables Lenis, pinned scenes, particles, and
  entrance animations (static fallbacks render instead).

## Brand assets & claims

- **Logo**: `public/broll-logo.png` (uploaded asset — never recreate). White
  RGBA mark rendered via CSS mask filled with `currentColor`
  (`site/BrollLogo.tsx`). Navbar 34px, footer large. The hero uses the
  giant "Broll." text wordmark (user's explicit choice over the logo).
- **Credibility numbers**: "200M+ monthly views" and "15M+ follower
  production house". No testimonial sections, no fake logos.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
(tokens in `globals.css` via `@theme inline`) · Framer Motion · GSAP
ScrollTrigger (announcement bar) · Lenis (smooth scroll, driven by GSAP
ticker in `providers/SmoothScroll.tsx`, exposed as `window.__lenis` for
anchor rides).

## Page flow (`src/app/page.tsx`) — deliberately short

0. **AnnouncementBar** — fixed 40px pure-black static statement (no marquee);
   GSAP slide-in, hides on scroll down / returns on scroll up via
   `--annbar-offset` (navbar follows); click rides Lenis to `#features`.
1. **Navbar** — logo (34px, magnetic + hover glow), Product / Pricing /
   Contact, "Book Demo". Transparent at rest, glass pill after scrolling.
   Note: `#pricing` currently has no target section.
2. **Hero** — pill eyebrow "Agentic video editing", giant "Broll." wordmark,
   "The AI editor that finishes videos *before* you do.", original
   description; floating clips with live waveforms + signal lines assemble
   onto a timeline while scrolling (220vh sticky, mouse parallax).
3. **WhyTheySwitched** — 380vh pinned scene: old 6-step workflow struck out,
   "8 hours" crossed, arrow draws, new 3-step workflow rises, "12 minutes."
   scales in, then a final beat: `timeline.xml` chip — export XML and open in
   Premiere Pro / DaVinci Resolve / Final Cut.
4. **StackedFeatures** (`#features`) — scroll-stacking cards: each card pins,
   then recedes to the back (scales down + dims) as the next slides over it.
   Cards: Prompt-based editing (console mock), Export XML to any platform
   (timeline.xml → editor pills), AI color grading (swatch cycle), AI lip
   sync (waveform + language pills).
5. **Footer** (`#contact`) — minimal, dark, large logo, links, inline social
   SVGs.

## Conventions

- Motion primitives in `src/components/fx/`: `Reveal`, `WordReveal`,
  `Magnetic`, `Particles`.
- Buttons (`ui/button.tsx`): magnetic wrap + inflate spring + liquid fill
  from cursor entry (`.btn-liquid`) + glow on hover only.
- Sections live in `src/components/site/`; each is self-contained.
- Fonts: Geist Sans (UI), Geist Mono (labels/eyebrows), Instrument Serif
  italic (accent words only).
- Copy style: short, confident, no buzzwords.
