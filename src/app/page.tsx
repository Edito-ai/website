import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Edito Studio",
  description:
    "A working desktop non-linear video editor — real timeline, real playback, real media — plus an AI companion that finds a person across footage from a single photo.",
};

const stats = [
  { value: "8", label: "timeline tracks" },
  { value: "4K", label: "preview playback" },
  { value: "∞", label: "undo / redo" },
  { value: "1", label: "photo to find your whole cast" },
];

const editorFeatures = [
  {
    title: "Multi-track timeline",
    body: "Four video and four audio tracks. Drag media in, trim from both edges, blade-split, ripple-delete, copy/paste — all with magnetic snapping to clip edges, the playhead, and frames.",
  },
  {
    title: "Real playback",
    body: "The program monitor plays real video, seeked frame-accurately under the advancing playhead. Frame stepping, looping, resolution presets from 480p to 4K, zoom, pan, and safe margins.",
  },
  {
    title: "Real media, instantly",
    body: "Drop in your footage and get real thumbnails and real audio waveforms right away — no waiting, no re-encoding, no round-trip to another app.",
  },
  {
    title: "Live inspector",
    body: "Select a clip and edit its transform — position, scale, rotation, anchor, opacity — with changes reflected in the preview immediately. Effects can be searched, added, and toggled per clip.",
  },
  {
    title: "Full undo history",
    body: "Every add, move, trim, split, delete, and paste is tracked, with complete undo/redo across your whole session.",
  },
  {
    title: "Editor-grade shortcuts",
    body: "The muscle memory professionals expect, from blade to ripple delete — see the deck below.",
  },
];

const shortcuts: [string, string][] = [
  ["Space", "Play / Pause"],
  ["S", "Blade tool"],
  ["Ctrl+K", "Split at playhead"],
  ["← →", "Step frames"],
  ["Backspace", "Ripple delete"],
  ["Ctrl+Z", "Undo"],
  ["Ctrl+C / V", "Copy / Paste"],
  ["L", "Loop"],
];

const pipelineSteps = [
  { step: "01", title: "Look", body: "Every sampled frame is scanned for faces, across every video you give it." },
  { step: "02", title: "Confirm", body: "Each face found is checked against your reference photo, so only the right person is kept." },
  { step: "03", title: "Isolate", body: "The full person is cropped out of the frame, not just the face." },
  { step: "04", title: "Rank & export", body: "The sharpest, best-framed crops are chosen and saved with a profile card and metadata." },
];

const mediaLibraryFeatures = [
  "Native file picker or drag-and-drop straight onto the panel",
  "Real video thumbnails and real audio waveforms, generated the moment you import",
  "Search, sort by name / duration / type, and switch grid ⇄ list",
  "Multi-select, inline rename, delete, and a right-click context menu",
  "MP4, MOV, AVI, MKV, MP3, WAV, PNG, JPG, JPEG out of the box",
];

const monitorFeatures = [
  "Resolution presets — 480p, 720p, 1080p, 4K",
  "Fullscreen, safe-margin overlay, fit-to-screen",
  "Mouse-wheel zoom and drag-to-pan on the frame",
  "Live timecode and FPS readout while you scrub",
];

const designTokens = [
  { hex: "#161618", label: "ink · base" },
  { hex: "#1E1E1E", label: "ink · panel" },
  { hex: "#252526", label: "ink · raised" },
  { hex: "#2D2D30", label: "ink · overlay" },
  { hex: "#8B5CF6", label: "accent · violet" },
  { hex: "#60A5FA", label: "accent · azure" },
];

export default function EditoPage() {
  const project = getProject("edito")!;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_30%_0%,rgb(139_92_246/0.2),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 right-[15%] size-48 animate-float rounded-full bg-violet-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[8%] size-40 animate-float-delayed rounded-full bg-sky-500/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <Eyebrow color="violet">{project.kind}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            Cut like it&apos;s a{" "}
            <span className="animate-gradient-x bg-linear-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-size-[200%_auto] bg-clip-text text-transparent">
              real editor.
            </span>
            <br />
            Because it is.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
            {project.tagline} Not a mockup — import real media, cut on a real
            timeline, and watch real playback in a frameless, cinematic desktop
            shell.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/8 bg-ink-900/60 p-4 transition-colors hover:border-violet-500/30"
              >
                <dt className="order-last mt-1 text-xs text-mist">{s.label}</dt>
                <dd className="text-3xl font-semibold text-violet-300">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Timeline illustration */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="card-surface overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
            <span className="size-3 rounded-full bg-red-400/70" />
            <span className="size-3 rounded-full bg-amber-400/70" />
            <span className="size-3 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-xs text-mist">
              edito — sequence_01 · 00:00:12:07 · 24 fps
            </span>
          </div>
          <div className="overflow-x-auto p-4">
            <div className="relative min-w-xl space-y-2 font-mono text-[10px] text-white/60">
              <div
                aria-hidden
                className="absolute inset-y-0 z-10 ml-9 w-px animate-playhead bg-violet-400 shadow-[0_0_12px_2px_rgb(139_92_246/0.7)]"
              />
              {[
                { label: "V2", clips: [["ml-[18%] w-[22%]", "b-roll_02"], ["ml-[6%] w-[14%]", "title"]] },
                { label: "V1", clips: [["w-[30%]", "intro.mp4"], ["ml-[2%] w-[38%]", "interview_a.mov"]] },
                { label: "A1", clips: [["w-[72%]", "dialogue.wav"]] },
                { label: "A2", clips: [["ml-[10%] w-[55%]", "score.mp3"]] },
              ].map((track) => (
                <div key={track.label} className="flex items-center gap-3">
                  <span className="w-6 shrink-0 text-mist">{track.label}</span>
                  <div className="flex h-8 flex-1 items-center rounded-md bg-ink-800 px-1">
                    {track.clips.map(([cls, name]) => (
                      <div
                        key={name}
                        className={`flex h-6 items-center truncate rounded px-2 ${cls} ${
                          track.label.startsWith("V")
                            ? "bg-violet-500/30 text-violet-200"
                            : "bg-sky-500/25 text-sky-200"
                        }`}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-mist">
          The timeline: V1–V4 / A1–A4 tracks, magnetic snapping, blade tool, ripple delete — with the playhead always on the move.
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">What actually works</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {editorFeatures.map((f) => (
            <div
              key={f.title}
              className="card-surface p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-violet-500/40"
            >
              <h3 className="font-semibold text-violet-300">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Media library + Program monitor */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card-surface p-6">
            <Eyebrow color="violet">Media library</Eyebrow>
            <h3 className="mt-3 text-xl font-semibold">
              Every asset, ready to cut
            </h3>
            <ul className="mt-4 space-y-2.5">
              {mediaLibraryFeatures.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-6">
            <Eyebrow color="violet">Program monitor</Eyebrow>
            <h3 className="mt-3 text-xl font-semibold">
              What you see is what plays
            </h3>
            <ul className="mt-4 space-y-2.5">
              {monitorFeatures.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">The shortcut deck</h2>
        <p className="mt-2 text-mist">Hands on keys, eyes on the cut.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {shortcuts.map(([key, action]) => (
            <div key={key} className="card-surface flex flex-col items-center gap-2 p-5 text-center">
              <kbd className="rounded-lg border border-white/15 bg-ink-800 px-3 py-1.5 font-mono text-sm text-frost shadow-[0_3px_0_rgb(255_255_255/0.08)]">
                {key}
              </kbd>
              <span className="text-xs text-mist">{action}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI cast pipeline */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="relative overflow-hidden card-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 right-10 size-56 animate-float rounded-full bg-violet-500/15 blur-3xl"
          />
          <Eyebrow color="violet">The AI companion</Eyebrow>
          <h2 className="relative mt-3 text-3xl font-semibold tracking-tight">
            Find anyone in your footage from one photo
          </h2>
          <p className="relative mt-4 max-w-3xl leading-relaxed text-mist">
            The cast pipeline takes a single reference photo and your videos,
            then finds every frame where that person appears and exports clean
            full-body crops — each cast member gets a folder with ranked crops,
            a profile card, and structured metadata the editor can build on.
          </p>
          <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pipelineSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-white/8 bg-ink-900/60 p-5 transition-colors hover:border-violet-500/40"
              >
                <span className="font-mono text-xs text-violet-400">{s.step}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design language */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="card-surface p-8 sm:p-12">
          <Eyebrow color="violet">Design language</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Charcoal, graphite, and one electric accent
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-mist">
            An original dark UI, not a template: a four-step graphite surface
            stack for depth, glassmorphic floating panels with a soft float
            shadow, and every interactive control shipping hover / active /
            focus-visible / selected states.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {designTokens.map((t) => (
              <div key={t.hex} className="overflow-hidden rounded-xl border border-white/8">
                <div className="h-16 w-full" style={{ backgroundColor: t.hex }} />
                <div className="bg-ink-900/60 px-3 py-2">
                  <p className="font-mono text-[11px] text-frost">{t.hex}</p>
                  <p className="text-[11px] text-mist">{t.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20 text-center">
        <Link
          href="/accessway"
          className="text-sm text-mist transition-colors hover:text-frost"
        >
          Next project: AccessWay →
        </Link>
      </section>
    </>
  );
}
