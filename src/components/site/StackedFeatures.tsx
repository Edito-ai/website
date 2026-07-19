"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Terminal,
  FileCode2,
  Palette,
  AudioLines,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import WordReveal from "@/components/fx/WordReveal";

type VisualKind = "prompt" | "xml" | "grade" | "lipsync";

interface Feature {
  icon: LucideIcon;
  n: string;
  title: string;
  body: string;
  visual: VisualKind;
  img: string;
}

const FEATURES: Feature[] = [
  {
    icon: Terminal,
    n: "01",
    title: "Prompt-based editing",
    body: "Describe the edit in a sentence. Broll cuts silences, punches in on the hook, restructures the story — no timeline, no keyframes.",
    visual: "prompt",
    img: "/features/prompt_editing.webp",
  },
  {
    icon: FileCode2,
    n: "02",
    title: "Export XML to any platform",
    body: "The finished cut is never locked in. One click exports an XML timeline that opens in Premiere Pro, DaVinci Resolve or Final Cut.",
    visual: "xml",
    img: "/features/xml_export.webp",
  },
  {
    icon: Palette,
    n: "03",
    title: "AI color grading",
    body: "One consistent cinematic grade across every camera, take and lighting condition — matched to your brand look.",
    visual: "grade",
    img: "/features/color_grading.webp",
  },
  {
    icon: AudioLines,
    n: "04",
    title: "AI lip sync",
    body: "Dub your videos into new languages with lips that actually match. One shoot, every audience.",
    visual: "lipsync",
    img: "/features/lip_sync.webp",
  },
];

/* --- Card visuals ------------------------------------------------------- */

function PromptVisual() {
  return (
    <div className="w-full rounded-xl border border-line bg-surface-2 p-5 font-mono text-sm">
      <p className="text-muted">
        <span className="mr-2 text-accent">›</span>
        remove the silences, punch in on the hook, add captions
        <span className="animate-blink ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-ink align-middle" />
      </p>
      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-md border border-line px-2 py-1 text-[10px] tracking-widest text-muted uppercase">
          Enter
        </span>
        <span className="text-[10px] tracking-widest text-muted uppercase">
          to edit
        </span>
      </div>
    </div>
  );
}

function XmlVisual() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <span className="flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2 font-mono text-xs text-muted">
        <FileCode2 className="size-4 text-accent" />
        timeline.xml
      </span>
      <ArrowRight className="ml-4 size-4 rotate-90 text-muted" />
      <div className="flex flex-wrap gap-2">
        {["Premiere Pro", "DaVinci Resolve", "Final Cut"].map((editor) => (
          <span
            key={editor}
            className="rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent hover:text-accent"
          >
            {editor}
          </span>
        ))}
      </div>
    </div>
  );
}

function GradeVisual() {
  const swatches = ["#b9b9bd", "#98989f", "#6f6f78", "#4a4a54", "#26262e"];
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        {swatches.map((c, i) => (
          <span
            key={c}
            className="relative size-10 rounded-full md:size-12"
            style={{ background: c }}
          >
            <span
              style={{ "--cc-delay": `${i * 1.5}s` } as React.CSSProperties}
              className="caption-cycle absolute -inset-1 rounded-full border border-accent"
            />
          </span>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-widest text-muted uppercase">
        Grading · Cinematic 01
      </p>
    </div>
  );
}

function LipsyncVisual() {
  const wave = [0.4, 0.8, 0.55, 0.95, 0.5, 0.7, 0.35, 0.85, 0.6, 0.9, 0.45, 0.75];
  return (
    <div className="w-full">
      <div className="flex h-12 items-end gap-1">
        {wave.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h * 100}%`, animationDelay: `${i * 110}ms` }}
            className="animate-eq w-full rounded-full bg-muted/60"
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["English", "हिन्दी", "Español", "日本語"].map((lang) => (
          <span
            key={lang}
            className="rounded-full border border-line px-3 py-1 text-xs text-muted"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

const VISUALS: Record<VisualKind, () => React.ReactNode> = {
  prompt: PromptVisual,
  xml: XmlVisual,
  grade: GradeVisual,
  lipsync: LipsyncVisual,
};

/* --- Stacked cards ------------------------------------------------------ */

function StackCard({
  feature,
  index,
  total,
  p,
}: {
  feature: Feature;
  index: number;
  total: number;
  p: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const Visual = VISUALS[feature.visual];

  // Once this card is pinned, it recedes — shrinking and dimming — while
  // the next one scrolls over it. Front to back, card by card.
  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.06;
  const scale = useTransform(p, [start, 1], [1, targetScale]);
  const dim = useTransform(p, [start, 1], [0, index === total - 1 ? 0 : 0.45]);

  return (
    <div
      className="flex justify-center md:sticky"
      style={{ top: `calc(8vh + ${index * 1.6}rem)` }}
    >
      {/* The card fills the pinned viewport exactly; the screenshot gets the
          larger column and is never cropped (object-contain), so the whole
          UI is readable. On mobile the cards flow normally at full height. */}
      <motion.div
        style={{
          ...(reduced ? {} : { scale }),
          "--stack-mh": `calc(90vh - ${index * 1.6}rem)`,
        } as React.CSSProperties & { "--stack-mh": string }}
        className="relative mb-10 flex w-full origin-top flex-col overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-lift)] sm:p-7 md:h-(--stack-mh) md:p-10"
      >
        <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-[2fr_3fr] md:gap-12">
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-muted">{feature.n}</span>
              <span className="rounded-full border border-line p-2.5">
                <feature.icon className="size-5 text-accent" strokeWidth={1.5} />
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tighter sm:text-3xl md:mt-6 md:text-4xl">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {feature.body}
            </p>
            <div className="mt-8 hidden md:block">
              <Visual />
            </div>
          </div>

          {/* Product demo screenshot — full image, never cropped */}
          <div className="relative flex min-h-0 items-center justify-center self-stretch overflow-hidden rounded-2xl border border-line/60 bg-surface-2 p-2 md:p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={feature.img}
              alt={`${feature.title} — Broll demo`}
              width={1024}
              height={1024}
              className="max-h-full w-full rounded-xl object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="md:hidden">
            <Visual />
          </div>
        </div>

        {/* Dims as the card falls to the back of the stack */}
        <motion.div
          aria-hidden
          style={reduced ? { opacity: 0 } : { opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-bg"
        />
      </motion.div>
    </div>
  );
}

export default function StackedFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

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

      <div ref={ref} className="relative mt-16">
        {FEATURES.map((feature, i) => (
          <StackCard
            key={feature.n}
            feature={feature}
            index={i}
            total={FEATURES.length}
            p={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
