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
- `prefers-reduced-motion` disables Lenis, pinned scenes, particles, tilt,
  and entrance animations (static fallbacks render instead).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
(tokens in `globals.css` via `@theme inline`) · Framer Motion · GSAP
ScrollTrigger (horizontal pin) · Lenis (driven by GSAP ticker in
`providers/SmoothScroll.tsx`).

## Brand assets & claims

- **Logo**: `public/broll-logo.png` (uploaded asset — never recreate). White
  RGBA mark rendered via CSS mask filled with `currentColor`
  (`site/BrollLogo.tsx`) so it adapts to any surface. Navbar 34px, hero
  ~92px (mask reveal + float + cursor rotate + hover glow), footer large.
- **Credibility numbers**: "200M+ monthly views" and "15M+ follower
  production house". Emphasis on scale, not follower count. No testimonial
  section, no fake logos. 20M+ is retired.

## Page flow (`src/app/page.tsx`)

0. **AnnouncementBar** — fixed 40px pure-black marquee above the navbar
   (pauses on hover, GSAP slide-in, hides on scroll down / returns on scroll
   up via a `--annbar-offset` var the navbar follows; click rides Lenis to
   `#demo`).
1. **Hero** — eyebrow "Powering the next generation of video production",
   masked-reveal logo, headline "The operating system for *autonomous* video
   editing.", quiet ✓-proof line under the CTAs; footage clips drift with
   live waveforms, signal lines, mouse parallax; clips assemble onto a
   timeline as you scroll (220vh sticky).
3. **WhyTheySwitched** — 320vh pinned scene: old 6-step workflow struck out
   line by line, "8 hours" crossed, accent arrow draws, new 3-step workflow
   rises, "12 minutes." scales in.
4. **MorphTransition** — pinned: timeline → workflow graph (SVG draw) → AI core.
5. **FeatureGrid** — editorial mosaic: asymmetric flex rows where hovering a
   cell *reshapes the row* (animated flex-grow), conic-sweep animated borders,
   cursor spotlight, siblings dim, auto-playing mock previews (filmstrip scan,
   hook meter, caption cycle, grade swatches).
6. **HowItWorks** — "How Broll thinks": GSAP-pinned horizontal rail of 9
   thought beats on a dashed thread, with a scroll progress bar.
7. **ScrollStory** — 400vh pinned dark editor that edits itself: clips fly in,
   playhead scrubs, cuts, captions, zoom markers, waveform fill, color grade
   wash, export button + glow.
8. **SocialProof** — dark stats: 200M+ monthly views / 500+ hours edited /
   98% time saved, spring counters. No fake logos.
9. **Comparison** — draggable raw vs. cinematic split slider.
10. **WhyBroll** — Think. Plan. Create. Repeat.
11. **Testimonials** — infinite marquee of quote cards, hover pauses.
12. **CTA** — "Ready to stop editing? *Start directing.*", drifting ambient bg.
13. **Footer** — minimal, dark, large wordmark, inline social SVGs
    (lucide dropped brand icons).

## Conventions

- Motion primitives in `src/components/fx/`: `Reveal`, `WordReveal`,
  `Counter`, `Magnetic`, `Tilt`, `Particles`.
- Buttons (`ui/button.tsx`): magnetic wrap + inflate spring + liquid fill
  pooling from the cursor entry point (`.btn-liquid`) + glow on hover only.
- Sections live in `src/components/site/`; each is self-contained.
- Fonts: Geist Sans (UI), Geist Mono (labels/eyebrows), Instrument Serif
  italic (accent words only).
- Copy style: short, confident, no buzzwords. Honesty rule: never fabricate
  logos or present testimonials as real endorsements beyond the one real
  claim (production house, 20M+ followers).
