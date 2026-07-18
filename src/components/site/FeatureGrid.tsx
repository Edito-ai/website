"use client";

import { useRef } from "react";
import {
  Film,
  BookText,
  Clapperboard,
  Mic2,
  HeartPulse,
  Flame,
  Layers,
  Captions,
  ZoomIn,
  Palette,
  BadgeCheck,
  Languages,
  Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import { cn } from "@/lib/utils";

type VisualKind = "filmstrip" | "hook" | "captions" | "grade";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  visual?: VisualKind;
  featured?: boolean;
}

// Asymmetric editorial rows. Featured cells carry an auto-playing preview
// and take more room; hovering any cell reshapes its whole row.
const ROWS: Feature[][] = [
  [
    {
      icon: Film,
      title: "Long video understanding",
      body: "Hours of footage, fully indexed. Broll remembers what happened in minute 4 when it cuts minute 40.",
      visual: "filmstrip",
      featured: true,
    },
    {
      icon: BookText,
      title: "AI Storytelling",
      body: "Structure before cuts. Every edit serves the narrative.",
    },
    {
      icon: Clapperboard,
      title: "Scene Detection",
      body: "Precise boundaries, even in continuous takes.",
    },
  ],
  [
    {
      icon: Mic2,
      title: "Speaker Detection",
      body: "Knows who is talking, and frames them.",
    },
    {
      icon: Flame,
      title: "Viral Hook Finder",
      body: "Surfaces the three seconds that earn the next thirty. Trained on what actually holds attention.",
      visual: "hook",
      featured: true,
    },
    {
      icon: HeartPulse,
      title: "Emotion Detection",
      body: "Finds the beats that make people stay.",
    },
  ],
  [
    {
      icon: Captions,
      title: "Caption Generator",
      body: "Styled, timed, and readable on every screen.",
      visual: "captions",
      featured: true,
    },
    {
      icon: ZoomIn,
      title: "Auto Zoom",
      body: "Punch-ins that follow the energy of the take.",
    },
    {
      icon: Layers,
      title: "AI B-roll Selection",
      body: "The right cutaway, pulled from your own library.",
    },
  ],
  [
    {
      icon: Palette,
      title: "AI Color Grading",
      body: "A consistent grade across every camera and clip.",
      visual: "grade",
      featured: true,
    },
    {
      icon: BadgeCheck,
      title: "Brand Presets",
      body: "Your fonts, colors, and lower thirds — applied everywhere.",
    },
    {
      icon: Languages,
      title: "Multi-language",
      body: "Captions and dubs in the languages your audience speaks.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      body: "Review, comment, and approve without exporting a draft.",
    },
  ],
];

/* --- Auto-playing mock previews ---------------------------------------- */

function Filmstrip() {
  return (
    <div className="relative mt-6 flex gap-1 overflow-hidden rounded-lg">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-14 flex-1 rounded-sm bg-gradient-to-br from-surface-2 to-line"
          style={{ opacity: 0.5 + ((i * 7) % 5) * 0.1 }}
        />
      ))}
      <div className="animate-scan-x absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
    </div>
  );
}

function HookMeter() {
  const bars = [0.3, 0.45, 0.35, 0.9, 1, 0.85, 0.4, 0.5, 0.3, 0.45, 0.35, 0.25, 0.4, 0.3];
  return (
    <div className="relative mt-6">
      <span className="absolute -top-3 left-[26%] animate-pulse rounded-full border border-accent/60 bg-accent-soft px-2 py-0.5 font-mono text-[9px] tracking-widest text-accent uppercase">
        Hook · 00:07
      </span>
      <div className="flex h-14 items-end gap-1 pt-4">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h * 100}%` }}
            className={cn(
              "flex-1 rounded-sm",
              i >= 3 && i <= 5 ? "bg-accent/70" : "bg-line-strong",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CaptionLoop() {
  const captions = ["so we tried something new", "and it changed everything", "here's what happened"];
  return (
    <div className="relative mt-6 flex h-20 items-end justify-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_40%_20%,#26262c,#0d0d10_75%)] pb-3">
      {captions.map((c, i) => (
        <span
          key={c}
          style={{ "--cc-delay": `${i * 2.5}s` } as React.CSSProperties}
          className="caption-cycle absolute rounded-md bg-black/70 px-3 py-1 text-xs font-semibold text-white"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function GradeStrip() {
  const swatches = ["#b9b9bd", "#98989f", "#6f6f78", "#4a4a54", "#26262e"];
  return (
    <div className="mt-6 flex items-center gap-3">
      {swatches.map((c, i) => (
        <span key={c} className="relative size-9 rounded-full" style={{ background: c }}>
          <span
            style={{ "--cc-delay": `${i * 1.5}s` } as React.CSSProperties}
            className="caption-cycle absolute -inset-1 rounded-full border border-accent"
          />
        </span>
      ))}
      <span className="ml-2 font-mono text-[10px] tracking-widest text-muted uppercase">
        Grading…
      </span>
    </div>
  );
}

const VISUALS: Record<VisualKind, () => React.ReactNode> = {
  filmstrip: Filmstrip,
  hook: HookMeter,
  captions: CaptionLoop,
  grade: GradeStrip,
};

/* --- Cells -------------------------------------------------------------- */

function Cell({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);
  const Visual = feature.visual ? VISUALS[feature.visual] : null;

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/cell relative overflow-hidden rounded-2xl p-px transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]",
        "group-hover/grid:opacity-75 hover:!opacity-100",
        // The row reshapes itself around whichever card is being read.
        feature.featured ? "md:flex-[1.8] md:hover:flex-[2.6]" : "md:flex-1 md:hover:flex-[1.5]",
      )}
    >
      {/* Animated border — a conic sweep that only exists on hover */}
      <div
        aria-hidden
        className="animate-border-spin absolute -inset-[100%] opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 300deg, var(--accent) 340deg, transparent 360deg)",
        }}
      />

      <div className="relative h-full rounded-[calc(1rem-1px)] border border-line bg-surface p-7 transition-colors duration-500 group-hover/cell:border-transparent">
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 70%)",
          }}
        />

        <feature.icon
          className="size-5 text-muted transition-colors duration-500 group-hover/cell:text-accent"
          strokeWidth={1.5}
        />
        <h3 className="mt-8 text-lg font-semibold tracking-tight">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
        {Visual && <Visual />}
      </div>
    </div>
  );
}

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-40">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Capabilities
      </p>
      <WordReveal
        text="Everything an editor does. Nothing an editor dreads."
        className="mt-4 max-w-3xl text-4xl font-semibold tracking-tighter md:text-6xl"
      />

      <Reveal delay={0.15}>
        <div className="group/grid mt-16 flex flex-col gap-4">
          {ROWS.map((row, i) => (
            <div key={i} className="flex flex-col gap-4 md:flex-row">
              {row.map((f) => (
                <Cell key={f.title} feature={f} />
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
