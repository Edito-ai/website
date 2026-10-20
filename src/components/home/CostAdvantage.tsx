"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import SectionHeader from "@/components/site/SectionHeader";

/** Relative cost of the same edit. Broll is the 1× baseline. */
const RIVALS = [
  { id: "mid", label: "Sonnet 5.5 · GPT 6.1", tag: "Mid-tier frontier", mult: 17 },
  { id: "top", label: "Opus 5.5 · GPT Astra", tag: "Top-tier frontier", mult: 32 },
] as const;

const SAME = ["Story", "Captions", "Color grade", "Timeline export"];

/** Counts up to `value` when first scrolled into view. */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 1);

  useEffect(() => {
    if (!seen || reduced) return;
    const c = animate(1, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => c.stop();
  }, [value, seen, reduced]);

  return <span ref={ref}>{reduced ? value : shown}</span>;
}

/** One big "N× cheaper than X" card. */
function Stat({ mult, label, tag }: { mult: number; label: string; tag: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 text-center sm:p-8">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">vs {tag}</p>
      <p className="font-display mt-3 leading-none tracking-tight" style={{ fontSize: "clamp(4.5rem, 12vw, 8rem)" }}>
        <span className="serif-voice text-brand">
          <Counter value={mult} />×
        </span>
      </p>
      <p className="font-display mt-2 text-xl sm:text-2xl">cheaper</p>
      <p className="mt-1 text-sm text-ink-2">than {label}</p>
    </div>
  );
}

export default function CostAdvantage() {
  return (
    <section id="cost" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          align="center"
          eyebrow="Why Broll"
          title="The same quality of edit."
          voice="At a fraction of the price."
          lede="Same story, same captions, same grade — from a model built for editing, not rented from a general-purpose one."
        />

        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <div className="panel relative overflow-hidden p-5 sm:p-8 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-red/15 blur-3xl"
            />

            {/* Both comparisons at once */}
            <div className="relative grid gap-4 md:grid-cols-2">
              {RIVALS.map((r) => (
                <Stat key={r.id} mult={r.mult} label={r.label} tag={r.tag} />
              ))}
            </div>

            <div className="relative mt-6 flex justify-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-sm text-emerald-300">
                <Check className="size-4" strokeWidth={3} /> No drop in edit quality
              </p>
            </div>

            {/* What stays the same */}
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-2/80">
              <span className="text-muted">Same output:</span>
              {SAME.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-400" strokeWidth={3} /> {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
