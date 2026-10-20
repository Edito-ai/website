"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import SectionHeader from "@/components/site/SectionHeader";
import BrollLogo from "@/components/site/BrollLogo";
import { cn } from "@/lib/utils";

/** Models in the chart, lowest price first. */
const MODELS = [
  { id: "broll", name: "Broll", mult: 1, brand: true },
  { id: "mid", name: "Sonnet 5.5 · GPT 6.1", mult: 17 },
  { id: "top", name: "Opus 5.5 · GPT Astra", mult: 32 },
  { id: "fable", name: "Fable 5.1", mult: 81 },
] as const;

const MAX = 81;
const SAME = ["Story", "Captions", "Color grade", "Timeline export"];

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
          const worst = m.mult === MAX;
          const w = Math.max(value(m) * 100, 2.5);
          return (
            <div
              key={m.id}
              className={cn(
                "rounded-xl border px-3 py-2.5",
                brand
                  ? "border-emerald-400/40 bg-emerald-400/[0.07]"
                  : worst
                    ? "border-red/40 bg-red/[0.07]"
                    : "border-transparent",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  {"brand" in m && m.brand && <BrollLogo className="size-7 text-emerald-400" />}
                  <p className={cn("truncate text-sm", brand || worst ? "font-display text-ink" : "text-ink-2")}>{m.name}</p>
                  {brand && badge && (
                    <span className="shrink-0 rounded-full bg-emerald-500 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase">
                      {badge}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "font-display shrink-0 text-xl",
                    brand ? "text-emerald-400" : worst ? "text-red" : "text-ink",
                  )}
                >
                  {label(m)}
                </p>
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
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.6)]"
                        : worst
                          ? "bg-red shadow-[0_0_14px_rgba(239,68,68,0.55)]"
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
          lede="Our goal: the same story, captions and grade — from a model built specifically for editing."
        />

        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <div className="panel relative overflow-hidden p-5 sm:p-8 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-red/15 blur-3xl"
            />

            {/* One clear chart: Broll on top, everyone else far longer */}
            <div className="relative mt-10 md:mt-12">
              <Chart
                title="Estimated cost of the same edit"
                caption="Relative to Broll (1×) · shorter bar = lower estimated cost"
                tone="price"
                badge="Broll"
                value={(m) => m.mult / MAX}
                label={(m) => ("brand" in m && m.brand ? "1×" : `~${m.mult}×`)}
              />
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-emerald-300">
                <Check className="size-4" strokeWidth={3} /> Built specifically for video editing
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-muted">
                Illustrative estimates based on Broll&apos;s own internal comparison of typical edit workloads at
                publicly listed API rates. Actual costs vary by usage and pricing changes. Model names are
                trademarks of their respective owners; Broll is not affiliated with or endorsed by them.
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
