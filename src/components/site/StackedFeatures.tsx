"use client";

import { Terminal, FileCode2, Palette, AudioLines, type LucideIcon } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import PixelDiagram, { type Point, line, ring, ellipse, waveform, dust, dot } from "@/components/fx/PixelDiagram";

const PROMPT_POINTS: Point[] = [
  // terminal window
  ...line(40, 50, 280, 50, 26, 0.5, 1),
  ...line(40, 190, 280, 190, 26, 0.5, 40),
  ...line(40, 50, 40, 190, 14, 0.5, 80),
  ...line(280, 50, 280, 190, 14, 0.5, 100),
  // title bar controls
  ...[0, 1, 2].map((i) => ({ x: 58 + i * 14, y: 66, r: 2, o: 0.8 })),
  // ">" prompt chevron
  ...line(62, 108, 80, 122, 7, 0.9, 200),
  ...line(80, 122, 62, 136, 7, 0.9, 220),
  // blinking cursor
  { x: 92, y: 122, r: 2, o: 1 },
  // typed command
  ...line(104, 122, 250, 122, 20, 0.35, 260),
  // ambient dust
  ...dust(60, 10, 10, 310, 230, 500),
];

const EXPORT_POINTS: Point[] = [
  // document with folded corner
  ...line(60, 40, 150, 40, 12, 0.5, 1),
  ...line(60, 40, 60, 190, 22, 0.5, 30),
  ...line(60, 190, 170, 190, 16, 0.5, 60),
  ...line(170, 60, 170, 190, 20, 0.5, 90),
  ...line(150, 40, 170, 60, 6, 0.6, 120),
  // inner text lines
  ...line(75, 75, 140, 75, 10, 0.3, 150),
  ...line(75, 95, 150, 95, 12, 0.3, 170),
  ...line(75, 115, 130, 115, 8, 0.3, 190),
  // export flow
  ...line(182, 115, 228, 115, 12, 0.7, 210),
  // three destination nodes (Premiere, Resolve, Final Cut)
  ...ring(268, 68, 14, 10, 0.6, 260),
  ...ring(278, 115, 14, 10, 0.6, 290),
  ...ring(268, 162, 14, 10, 0.6, 320),
  ...line(228, 115, 268, 68, 8, 0.3, 350),
  ...line(228, 115, 278, 115, 6, 0.3, 370),
  ...line(228, 115, 268, 162, 8, 0.3, 390),
  ...dust(55, 10, 10, 310, 230, 700),
];

const GRADE_POINTS: Point[] = [
  ...ring(170, 120, 18, 10, 0.9, 1),
  ...ring(170, 120, 36, 16, 0.7, 40),
  ...ring(170, 120, 54, 22, 0.5, 90),
  ...ring(170, 120, 72, 28, 0.32, 150),
  ...ring(170, 120, 90, 34, 0.18, 220),
  ...[0, 1, 2, 3].map((i) => {
    const angle = (i / 4) * Math.PI * 2 + 0.4;
    return dot(170 + Math.cos(angle) * 90, 120 + Math.sin(angle) * 90, 3.2, 0.95);
  }),
  ...dust(50, 10, 10, 320, 230, 900),
];

const LIPSYNC_POINTS: Point[] = [
  ...waveform(55, 265, 22, 100, 60, 0.75, 5),
  ...ellipse(160, 175, 30, 13, 22, 0.6, 400),
  ...dust(45, 10, 10, 310, 220, 1100),
];

function PromptDiagram() {
  return <PixelDiagram points={PROMPT_POINTS} />;
}
function ExportDiagram() {
  return <PixelDiagram points={EXPORT_POINTS} />;
}
function GradeDiagram() {
  return <PixelDiagram points={GRADE_POINTS} />;
}
function LipsyncDiagram() {
  return <PixelDiagram points={LIPSYNC_POINTS} />;
}

/* --- Feature data --------------------------------------------------------- */

interface Feature {
  icon: LucideIcon;
  n: string;
  title: string;
  body: string;
  Diagram: () => React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    icon: Terminal,
    n: "01",
    title: "Prompt-based editing",
    body: "Describe the edit in a sentence. Broll cuts silences, punches in on the hook, restructures the story — no timeline, no keyframes.",
    Diagram: PromptDiagram,
  },
  {
    icon: FileCode2,
    n: "02",
    title: "Export XML to any platform",
    body: "The finished cut is never locked in. One click exports an XML timeline that opens in Premiere Pro, DaVinci Resolve or Final Cut.",
    Diagram: ExportDiagram,
  },
  {
    icon: Palette,
    n: "03",
    title: "AI color grading",
    body: "One consistent cinematic grade across every camera, take and lighting condition — matched to your brand look.",
    Diagram: GradeDiagram,
  },
  {
    icon: AudioLines,
    n: "04",
    title: "AI lip sync",
    body: "Dub your videos into new languages with lips that actually match. One shoot, every audience.",
    Diagram: LipsyncDiagram,
  },
];

/* --- Feature grid --------------------------------------------------------- */

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <Reveal delay={0.1 * index} y={28} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 sm:p-8">
        <div className="relative overflow-hidden rounded-2xl border border-line/60 bg-surface-2">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,var(--accent-soft),transparent_65%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative flex aspect-[4/3] items-center justify-center p-6">
            <feature.Diagram />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="font-mono text-xs text-muted">{feature.n}</span>
          <span className="flex size-10 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent/40">
            <feature.icon className="size-5 text-accent" strokeWidth={1.5} />
          </span>
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
          {feature.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{feature.body}</p>
      </div>
    </Reveal>
  );
}

export default function StackedFeatures() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-5 py-24 sm:px-6 md:px-8 md:py-40">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Capabilities
      </p>
      <WordReveal
        text="What Broll can do."
        className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl"
      />
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        One AI video editor that searches your footage, builds the story, and
        ships the edit.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.n} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
