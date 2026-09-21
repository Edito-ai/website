"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Upload, Wand2, Download, type LucideIcon } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

const PAIN_POINTS = [
  "Import footage",
  "Watch it all back",
  "Hunt for the moments",
  "Cut by hand",
  "Add captions",
  "Export, finally",
];

interface SolutionStep {
  icon: LucideIcon;
  title: string;
  body: string;
}

const SOLUTION_STEPS: SolutionStep[] = [
  {
    icon: Upload,
    title: "Upload your footage",
    body: "However messy — multiple cameras, rough audio, hours of clips.",
  },
  {
    icon: Wand2,
    title: "Tell Broll what you want",
    body: "One sentence is enough. Broll finds the story in the footage.",
  },
  {
    icon: Download,
    title: "Get your finished cut",
    body: "Ready to post, or exported as a timeline for your editor.",
  },
];

function PainChip({ text, index }: { text: string; index: number }) {
  const reduced = useReducedMotion();
  const tilt = ((index % 3) - 1) * 1.5;

  return (
    <Reveal delay={0.35 + index * 0.07} y={12}>
      <span
        style={{ transform: reduced ? undefined : `rotate(${tilt}deg)` }}
        className="relative inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-ink-2 md:text-base"
      >
        {text}
        <motion.span
          aria-hidden
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.07, ease: [0.65, 0, 0.35, 1] }}
          className="absolute top-1/2 left-0 h-px w-full origin-left bg-ink-2/70"
        />
      </span>
    </Reveal>
  );
}

function SolutionRow({ step, index }: { step: SolutionStep; index: number }) {
  return (
    <Reveal delay={0.15 * index} y={20}>
      <div className="group flex gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 md:p-7">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent-soft">
          <step.icon className="size-5 text-accent" strokeWidth={1.5} />
        </span>
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-semibold tracking-tight md:text-xl">{step.title}</h3>
          </div>
          <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Editorial problem → solution flow: the manual workflow is named and
 * struck out first, then the three-step Broll flow rises in its place.
 * Eight hours becomes twelve minutes.
 */
export default function WhyTheySwitched() {
  const reduced = useReducedMotion();

  return (
    <section className="mx-auto max-w-5xl px-5 py-24 sm:px-6 md:px-8 md:py-32">
      {/* The problem */}
      <div>
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">The problem</p>
        </Reveal>
        <WordReveal
          text="Editing takes longer than shooting."
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tighter md:text-6xl"
        />
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Raw footage sits untouched until someone spends hours turning it into a
            video — one manual step at a time.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {PAIN_POINTS.map((point, i) => (
            <PainChip key={point} text={point} index={i} />
          ))}
        </div>

        <Reveal delay={0.85}>
          <p className="relative mt-10 inline-block text-5xl font-semibold tracking-tighter text-muted md:text-7xl">
            8 hours
            <motion.span
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 1.05, ease: [0.65, 0, 0.35, 1] }}
              className="absolute top-1/2 left-0 h-[3px] w-full origin-left bg-ink-2/70"
            />
          </p>
        </Reveal>
      </div>

      {/* The solution */}
      <div className="mt-20 md:mt-28">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-accent uppercase">The solution</p>
        </Reveal>
        <WordReveal
          text="Say what you want. Broll does the rest."
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tighter md:text-6xl"
        />
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            One prompt turns raw footage into a finished cut — nothing to drag, trim,
            or keyframe.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4">
          {SOLUTION_STEPS.map((step, i) => (
            <SolutionRow key={step.title} step={step} index={i} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-5xl font-semibold tracking-tighter md:text-7xl">
            12 minutes<span className="text-accent">.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
