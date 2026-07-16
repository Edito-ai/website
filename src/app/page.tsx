import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import SectionHead from "@/components/SectionHead";
import AppFrame from "@/components/AppFrame";
import Reveal from "@/components/fx/Reveal";
import OpeningScene from "@/components/fx/OpeningScene";
import TheCut from "@/components/fx/TheCut";
import LogoCollapse from "@/components/fx/LogoCollapse";
import PromptConsole from "@/components/fx/PromptConsole";
import FaceSearchDemo from "@/components/fx/FaceSearchDemo";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Adarpan Cut — Find anyone. Cut everything.",
  description:
    "Adarpan Cut is a desktop video editor with a real multi-track timeline. Upload one photo and it locates every frame containing that person across hours of footage — entirely on your machine.",
};

const trustChips = [
  "Native desktop app",
  "AI runs 100% locally",
  "Footage never uploads",
];

const faceSearchPoints = [
  {
    title: "Hours of footage, zero scrubbing",
    body: "Every sampled frame of every video is scanned and checked against your reference photo.",
  },
  {
    title: "Ranked crops, ready to use",
    body: "The sharpest, best-framed appearances are cropped full-body and ranked — not a dump of blurry frames.",
  },
  {
    title: "Metadata your pipeline can read",
    body: "Each person gets a folder with a profile card and structured JSON the editor — or your tools — can build on.",
  },
];

const features: { title: string; body: string; wide?: boolean; keys?: string[] }[] = [
  {
    title: "A timeline you already know",
    body: "Four video and four audio tracks, magnetic snapping, blade, trim, ripple delete. Premiere muscle memory works on day one.",
    wide: true,
    keys: ["Space", "S", "Ctrl+K", "Ctrl+Z"],
  },
  {
    title: "Frame-accurate playback",
    body: "The monitor plays real frames, seeked exactly, up to 4K. What you scrub is what ships.",
  },
  {
    title: "Instant import",
    body: "Thumbnails and waveforms appear the moment media lands. No proxies, no waiting.",
  },
  {
    title: "GPU rendering",
    body: "Compositing rides the GPU, so heavy timelines stay scrubbable.",
  },
  {
    title: "Live inspector",
    body: "Position, scale, rotation, opacity — changed on the clip, visible in the preview immediately.",
  },
  {
    title: "One undo history",
    body: "Your cuts and the AI's share it. Ctrl+Z rolls back an entire AI pass.",
  },
];

const comparison: { row: string; us: string; nle: string; web: string }[] = [
  { row: "Real multi-track timeline", us: "✓", nle: "✓", web: "—" },
  { row: "Find a person from one photo", us: "✓", nle: "—", web: "—" },
  { row: "AI output is editable timeline cuts", us: "✓", nle: "—", web: "re-rendered video" },
  { row: "Runs locally — footage stays private", us: "✓", nle: "✓", web: "uploads required" },
  { row: "Undo an entire AI edit", us: "✓", nle: "n/a", web: "—" },
  { row: "Time to first cut", us: "minutes", nle: "weeks of learning", web: "minutes" },
];

const roadmap: { status: "Shipped" | "In progress" | "Planned"; items: string[] }[] = [
  {
    status: "Shipped",
    items: [
      "Multi-track NLE core — timeline, blade, trim, ripple, full undo",
      "AI Face Search with ranked crops & metadata export",
      "Frame-accurate playback up to 4K with real waveforms",
    ],
  },
  {
    status: "In progress",
    items: [
      "Prompt-based editing — plain-language prompts become readable edit plans",
      "GPU-accelerated effects pipeline",
    ],
  },
  {
    status: "Planned",
    items: ["Auto-captions from dialogue", "Beat-synced auto-cuts", "Plugin API"],
  },
];

const statusStyle = {
  Shipped: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
  "In progress": "border-amber-400/40 bg-amber-500/10 text-amber-300",
  Planned: "border-sky-400/40 bg-sky-500/10 text-sky-300",
} as const;

const statusDot = {
  Shipped: "bg-emerald-400 group-hover:shadow-[0_0_12px_rgb(52_211_153/0.8)]",
  "In progress": "bg-amber-400 group-hover:shadow-[0_0_12px_rgb(251_191_36/0.8)]",
  Planned: "bg-sky-400 group-hover:shadow-[0_0_12px_rgb(56_189_248/0.8)]",
} as const;

/** A word whose letters rise in one after another, sliced by an overflow-hidden mask. */
function RisingWord({ word, from = 0 }: { word: string; from?: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]">
      {word.split("").map((ch, i) => (
        <span
          key={i}
          style={{ animationDelay: `${from + i * 45}ms` }}
          className="animate-rise inline-block"
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function AdarpanCutPage() {
  const project = getProject("adarpan-cut")!;

  return (
    <>
      {/*
        Opening scene — the editor assembles itself on the right while the
        headline waits its turn: eyebrow as the title card, then the copy
        lands as the cast is found (~3.1s in). Text is in the DOM from first
        paint; only its entrance is choreographed.
      */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_30%_0%,rgb(139_92_246/0.14),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <Reveal variant="blur">
                <Eyebrow color="violet">{project.kind}</Eyebrow>
              </Reveal>
              <h1 className="mt-6 text-5xl leading-[0.95] font-black tracking-tighter uppercase sm:text-6xl">
                <RisingWord word="Find" from={3100} />{" "}
                <RisingWord word="anyone." from={3280} />
                <br />
                <span className="inline-flex overflow-hidden pb-[0.08em]">
                  <span style={{ animationDelay: "3520ms" }} className="animate-rise inline-block">
                    <span className="animate-gradient-x bg-linear-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-size-[200%_auto] bg-clip-text text-transparent">
                      Cut everything.
                    </span>
                  </span>
                </span>
              </h1>
              <Reveal delay={3750}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
                  Adarpan Cut is a desktop video editor with a real multi-track
                  timeline. Upload one photo and it locates every frame
                  containing that person — across hours of footage, entirely on
                  your machine.
                </p>
              </Reveal>
              <Reveal delay={3900}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href="/contact"
                    className="inline-block rounded-full bg-violet-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-400"
                  >
                    Request early access
                  </a>
                  <a
                    href="#film"
                    className="text-sm font-semibold text-mist transition-colors hover:text-frost"
                  >
                    Run the film ↓
                  </a>
                </div>
              </Reveal>
              <Reveal delay={4050}>
                <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
                  {trustChips.map((chip) => (
                    <li key={chip} className="flex items-center gap-2 text-sm text-mist">
                      <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
                      {chip}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <OpeningScene />
              <p className="mt-3 text-center font-mono text-[11px] text-mist">
                The editor, assembling — and finding a face before the headline
                lands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The film — import to export in one pinned take, scrubbed by scroll. */}
      <section id="film" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 pb-4">
        <SectionHead
          title="You're not scrolling. You're editing."
          lede="One take, import to export. Scroll runs the clock — back up and the film reverses."
        />
      </section>
      <TheCut />

      {/* AI Face Search — the flagship, explorable at your own pace. */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              eyebrow="AI Face Search"
              title="One photo finds every shot of them"
              lede="Upload a single photo. Adarpan Cut locates every frame containing that person across hours of footage — while you get coffee."
            />
            <div className="mt-8 space-y-5">
              {faceSearchPoints.map((point, i) => (
                <div key={point.title} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 font-mono text-[10px] text-violet-300"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-frost">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pt-2">
            <Reveal variant="zoom">
              <FaceSearchDemo />
            </Reveal>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              Hover a match — the bounding box opens to the crop it would
              export. Interview subjects, the couple at a wedding, a podcast
              guest: anywhere one person is hiding in hours of footage.
            </p>
          </div>
        </div>
      </section>

      {/* The editor underneath — proof of depth, scannable. */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHead
          eyebrow="The editor"
          title="The editor underneath"
          lede="The AI is only useful because the editor under it is real. Everything here is in the build today."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((tile) => (
            <div
              key={tile.title}
              className={`card-surface p-6 transition-colors hover:border-violet-500/40 ${
                tile.wide ? "sm:col-span-2" : ""
              }`}
            >
              <h3 className="font-semibold text-violet-300">{tile.title}</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist">{tile.body}</p>
              {tile.keys && (
                <div className="group mt-5 flex flex-wrap gap-3">
                  {tile.keys.map((k) => (
                    <kbd key={k} className="keycap text-xs!">
                      {k}
                    </kbd>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Prompt console — second AI surface, honestly labeled beta. */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHead
          eyebrow="In beta"
          title="Or just tell it"
          lede="Describe the edit in plain language, read the plan before it runs, and watch it land as ordinary, undoable cuts."
        />
        <Reveal variant="zoom" className="mt-10">
          <PromptConsole />
        </Reveal>
      </section>

      {/* Inside the app — the "is it real software?" check. */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHead
          eyebrow="Inside the app"
          title="Four panels you'll live in"
        />
        <Reveal variant="zoom" className="mt-12">
          <AppFrame />
        </Reveal>
      </section>

      {/* Comparison — positioning against both incumbents, factually. */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHead
          eyebrow="Where it stands"
          title="Not a toy. Not a career change."
          lede="Traditional NLEs are powerful and slow to learn. Web AI tools are fast and shallow. This is the overlap."
        />
        <Reveal className="mt-10">
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-xl border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="p-4 font-medium text-mist" scope="col">
                    Capability
                  </th>
                  <th className="bg-violet-500/8 p-4 font-semibold text-violet-300" scope="col">
                    Adarpan Cut
                  </th>
                  <th className="p-4 font-medium text-mist" scope="col">
                    Traditional NLEs
                  </th>
                  <th className="p-4 font-medium text-mist" scope="col">
                    Web AI tools
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.row} className="border-b border-white/5 last:border-0">
                    <th scope="row" className="p-4 text-left font-normal text-frost">
                      {r.row}
                    </th>
                    <td className="bg-violet-500/8 p-4 font-semibold text-violet-300">{r.us}</td>
                    <td className="p-4 text-mist">{r.nle}</td>
                    <td className="p-4 text-mist">{r.web}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Roadmap — trust through specificity. Hovering a group lights it up. */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHead
          eyebrow="Roadmap"
          title="Shipped means shipped"
          lede="No vaporware column. If it says shipped, it's in the build you'd receive today."
        />
        <div className="mt-10 space-y-8 border-l border-white/10 pl-6 sm:pl-8">
          {roadmap.map((group) => (
            <div key={group.status} className="group relative">
              <span
                aria-hidden
                className={`absolute top-1 -left-7.25 size-2.5 rounded-full transition-shadow duration-300 sm:-left-9.25 ${statusDot[group.status]}`}
              />
              <span
                className={`inline-block rounded-full border px-3 py-1 font-mono text-[11px] tracking-widest uppercase ${statusStyle[group.status]}`}
              >
                {group.status}
              </span>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-mist transition-colors duration-300 group-hover:text-frost"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* The closing shot — the editor collapses into the mark, then the ask. */}
      <LogoCollapse />
    </>
  );
}
