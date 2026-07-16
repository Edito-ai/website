# Adarpan Cut — Landing Page Design Notes

The page is a film about the product, cut into three registers: an **opening
scene** (the editor assembles itself on load), a **pinned five-act feature**
(scroll is the clock), and **explorable sections** for depth at the visitor's
own pace. Everything still survives the question "does this improve
understanding or trust?" — and everything is a pure function of either elapsed
time or scroll progress, so scrolling up runs the film backwards. No Lenis, no
GSAP, no Framer Motion: scroll-derived values already give real scrubbing;
smoothing libraries add latency and break native scroll a11y for zero
narrative gain.

## Structure

1. **Opening scene** (`OpeningScene`, hero) — a black canvas assembles into
   the editor over ~3.6s: playhead draws → chrome → lanes slide in → media
   pops into the bin → waveforms generate → clips snap onto tracks
   (easeOutBack = magnetic snap) → aarav.jpg drops → a scan line crosses →
   two matches ring. The headline is choreographed to land as the cast is
   found. Headline text is in the DOM from first paint (LCP/SEO/readers);
   only its entrance is delayed. Reduced motion: everything instant (the
   global reduced-motion rule zeroes animation-delay too).
2. **The film** (`TheCut`, 600vh pinned) — five acts on one scroll axis:
   IMPORT (bin fills, waveforms draw) → CUT (clips snap in under a scrubbing
   playhead) → FIND (photo drop, scan line, matches ring with confidence) →
   PROMPT (an instruction types itself, then a ripple edit executes: rejects
   collapse, keepers slide home, the sequence gets 38% shorter) → EXPORT (the
   playhead becomes a green render head; the monitor fills pixel-by-pixel via
   a deterministic threshold grid — "particles become pixels" without WebGL;
   file card lands). Act chapter cards + act rail track progress.
3. **AI Face Search** (`FaceSearchDemo`) — flagship deep-dive, sticky copy +
   looping scanner. Hover a match: the bounding box opens to the crop edge;
   hover a dimmed frame: it peeks back.
4. **The editor underneath** — six static cards, one wide with keycaps.
5. **Prompt console** (`PromptConsole`) — beta-labeled, matches roadmap.
6. **Inside the app** (`AppFrame`) — app mock with callouts.
7. **Comparison + Roadmap** — trust carriers. Roadmap groups light up on
   hover (dot glows, items brighten) — "future features unlock."
8. **Closing shot** (`LogoCollapse`, 240vh pinned) — the editor scales away
   and the experience resolves into the LogoMark, then the ask fades up.
   Off-screen CTA links get `tabIndex={-1}` until visible.

## Motion architecture

- `useScrollProgress` — shared rAF-throttled 0→1 hook + `seg` (act windows) +
  `easeOut`/`easeOutBack`. One time axis per scene; all transforms derive
  from it. Transform/opacity only — no layout properties, no thrashing.
- `OpeningScene` runs one rAF clock for ~3.6s, then stops forever.
- Loops (`FaceSearchDemo`, `PromptConsole`) are IntersectionObserver-gated:
  start on view, pause off view.
- Everything respects `prefers-reduced-motion` (sequences jump to final
  frame; scroll scenes remain user-driven by definition).

## Typography

One display moment (hero: black, uppercase, tracking-tighter) + mono chapter
cards inside the film. All section heads: `text-3xl/4xl font-semibold
tracking-tight` sentence case. Body stays `text-mist` on ink.

---

# AccessWay — Landing Page Design Notes

The page optimizes one feeling before one fact: **hope — the map adapts to
you, not the other way around** → then "this is real, try it." Structure is a
journey, not a brochure: problem → emotion → technology → proof → future →
ask. Adarpan Cut = creative motion; AccessWay = intelligent movement. Same
family, its own personality: no uppercase display type (that's Cut's
signature), one gradient moment (hero headline), teal on ink.

## Structure (6 sections)

1. **Hero** — the problem in one breath ("If you can't take the stairs, the
   map shouldn't either.") beside `LiveRoute`: a looping demo where a route is
   planned through an elevator, a community report lands that the lift is
   down, and the route recalculates *before* the traveler reaches it. The
   product's entire promise runs live before the visitor scrolls. Three
   verifiable trust chips; one CTA + one anchor ("Walk one journey ↓").
2. **One journey** (`JourneyScrub`) — pinned scroll-scrub, the sibling of
   Cut's ScrubStudio. Phases: REPORT (pins drop) → MAP (a step-free layer
   paints over the streets) → ROUTE (the shortest path is shown *and
   rejected* because the lift is down; the real route draws) → GO (a traveler
   dot rides the route while detection callouts appear) → ARRIVE. The
   scrollbar walks the route; the whole pipeline is taught in one interaction.
3. **Live detection** (`VisionDemo`) — sibling of Cut's FaceSearchDemo (same
   header → live surface → output-line anatomy). A viewfinder sweeps, three
   detections ring in (stairs / pole / curb cut), then the guidance line shows
   what the voice says. Teaches that detection is *spoken*, which is the point
   for low-vision users. Sticky copy with three outcome bullets.
4. **Community** — proof. Four report cards land one after another (staggered
   Reveal — the one place staggering means something: reports arriving), each
   showing the consequence ("routes now use the Oak St ramp"). Honesty
   caption: reports are illustrative. Personas compressed from hover-cards to
   a quiet borderless strip — the copy is the content.
5. **Future** — one quiet statement, no card chrome: every report today is a
   route tomorrow; accessibility-first routing as default, not feature.
6. **CTA** — "Try the route you'd actually take." One teal button to the live
   product, risk-reducers under it, prev-project link. On ink — the old
   gradient banner box was the only one on the site and read as template.

## What was deliberately removed (and why)

- **Stats row** — "2 worlds covered" and "24/7" were filler dressed as data;
  the one real number (1B+ people) moved into the hero sentence where it has
  context.
- **Floating gradient blobs (hero + cards)** — same rule as Cut: ambient
  decoration teaches nothing.
- **Emoji feature cards** ("What it does") — the four features are now
  *demonstrated*: routing + community data in LiveRoute/JourneyScrub,
  obstacle detection in VisionDemo, adaptation in the reroute. A card that
  says "AI obstacle detection 👁" can't compete with watching it detect.
- **"How it works" numbered cards** — became JourneyScrub's phases; reading
  Report→Map→Route→Navigate is worse than scrolling through it.
- **Standalone mission-statement card** — merged into the Future section.
- **Card hover-lift (-translate-y)** — motion that decorated, not explained.

## Motion system

Dependency-free, same primitives as Cut: IntersectionObserver loops
(`LiveRoute`, `VisionDemo` — start on view, pause off view), rAF-throttled
scroll scrub (`JourneyScrub`), section-level `Reveal`. All animation is
transform/opacity/stroke-dashoffset — no layout properties. The JourneyScrub
traveler is plain linear interpolation over polyline segments (no motion-path
APIs, works everywhere). Reduced motion: loops render their completed final
frame; the scrub remains user-driven by definition.

## Copy rules applied

Engineer-who-cares voice, no marketing vocabulary. Every claim is concrete:
"reported 4 min ago · confirmed ×2", "+2 min, 0 surprises", "GPS dies at the
front door." Demo data is labeled illustrative rather than passed off as
telemetry.
