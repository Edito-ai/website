"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import SectionHeader from "@/components/site/SectionHeader";
import BrollLogo from "@/components/site/BrollLogo";
import { cn } from "@/lib/utils";

/** Relative cost of the same edit. Broll is the 1× baseline. */
const RIVALS = [
  { id: "max", label: "Fable 5.1", tag: "Flagship frontier", mult: 81 },
  { id: "top", label: "Opus 5.5 · GPT Astra", tag: "Top-tier frontier", mult: 32 },
  { id: "mid", label: "Sonnet 5.5 · GPT 6.1", tag: "Mid-tier frontier", mult: 17 },
] as const;

/**
 * Models in the charts, lowest price first. Logo files are expected at /public/logos/<logo>.png; until a
 * file is there the mark falls back to a letter badge, so nothing breaks.
 */
const MODELS = [
  { id: "broll", name: "Broll", logo: null, mult: 1, brand: true },
  { id: "sonnet", name: "Sonnet 5.5", logo: "claude", mult: 17 },
  { id: "gpt61", name: "GPT 6.1", logo: "openai", mult: 17 },
  { id: "opus", name: "Opus 5.5", logo: "claude", mult: 32 },
  { id: "astra", name: "GPT Astra", logo: "openai", mult: 32 },
  { id: "fable", name: "Fable 5.1", logo: "claude", mult: 81 },
] as const;

const MAX = 81;
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

/** One big "N× more affordable than X" card. */
function Stat({ mult, label, tag, wide }: { mult: number; label: string; tag: string; wide?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 text-center sm:p-8",
        wide && "md:col-span-2 md:mx-auto md:w-full md:max-w-md",
      )}
    >
      <p className="text-xs tracking-[0.18em] text-muted uppercase">vs {tag}</p>
      <p className="font-display mt-3 leading-none tracking-tight" style={{ fontSize: "clamp(4rem, 9vw, 6.5rem)" }}>
        <span className="serif-voice text-brand">
          <Counter value={mult} />×
        </span>
      </p>
      <p className="font-display mt-2 text-xl sm:text-2xl">more affordable</p>
      <p className="mt-1 text-sm text-ink-2">than {label}</p>
    </div>
  );
}


function Mark({ logo, name }: { logo: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  if (logo === null) return <BrollLogo className="size-7 text-red" />;
  if (failed)
    return (
      <span className="font-display grid size-7 place-items-center rounded-full bg-white/10 text-xs text-ink-2">
        {name[0]}
      </span>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/logos/${logo}.png`} alt="" className="size-7 object-contain" onError={() => setFailed(true)} />
  );
}

/** Horizontal bar chart, one row per model with Broll on top. `value` is a 0–1 bar length. */
function Chart({
  title,
  caption,
  value,
  label,
  tone,
  badge,
}: {
  title: string;
  caption: string;
  value: (m: (typeof MODELS)[number]) => number;
  label: (m: (typeof MODELS)[number]) => string;
  tone: "quality" | "price";
  badge?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <p className="font-display text-lg">{title}</p>
      <p className="text-xs text-muted">{caption}</p>

      <div className="mt-5 grid gap-2.5">
        {MODELS.map((m, i) => {
          const brand = "brand" in m && m.brand;
          const w = Math.max(value(m) * 100, 2.5);
          return (
            <div
              key={m.id}
              className={cn(
                "rounded-xl border px-3 py-2.5",
                brand ? "border-red/40 bg-red/[0.07]" : "border-transparent",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Mark logo={m.logo} name={m.name} />
                  <p className={cn("truncate text-sm", brand ? "font-display text-ink" : "text-ink-2")}>{m.name}</p>
                  {brand && badge && (
                    <span className="shrink-0 rounded-full bg-red px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase">
                      {badge}
                    </span>
                  )}
                </div>
                <p className={cn("font-display shrink-0 text-xl", brand ? "text-red" : "text-ink")}>{label(m)}</p>
              </div>
              <div className="mt-2 h-4 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={reduced ? false : { width: 0 }}
                  whileInView={{ width: `${w}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "h-full rounded-full",
                    tone === "quality"
                      ? "bg-emerald-400/80"
                      : brand
                        ? "bg-gradient-to-r from-crimson to-red shadow-[0_0_14px_rgba(236,75,82,0.7)]"
                        : "bg-ink-2/45",
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
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
                <Stat key={r.id} mult={r.mult} label={r.label} tag={r.tag} wide={r.id === "max"} />
              ))}
            </div>

            {/* One clear chart: Broll on top, everyone else far longer */}
            <div className="relative mt-10 md:mt-12">
              <Chart
                title="What the same edit costs"
                caption="Shorter bar = lower price"
                tone="price"
                badge="Lowest price"
                value={(m) => m.mult / MAX}
                label={(m) => ("brand" in m && m.brand ? "1×" : `${m.mult}× more`)}
              />
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-emerald-300">
                <Check className="size-4" strokeWidth={3} /> Editing power: Broll is +1 over every model above
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
