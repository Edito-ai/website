"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Search, Captions, Palette, AudioLines, FileCode2, MoveHorizontal } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import Spotlight from "@/components/fx/Spotlight";
import SectionHeader from "@/components/site/SectionHeader";
import { cn } from "@/lib/utils";

/** Cycles 0..n-1 every `ms` while the element is on screen. */
function useCycle(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(id);
  }, [inView, reduced, n, ms]);
  return [ref, i] as const;
}

function CardHead({ icon: Icon, n, title, body }: { icon: typeof Search; n: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 transition-all duration-500 group-hover:border-red group-hover:bg-red group-hover:shadow-[0_0_24px_-4px_var(--red)]">
        <Icon className="size-[18px] text-red transition-colors duration-500 group-hover:text-white" strokeWidth={1.7} />
      </span>
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <span className="slate">{n}</span>
        </div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2/65">{body}</p>
      </div>
    </div>
  );
}

/* --- 01 · Semantic search -------------------------------------------------- */

const FOOTAGE = [
  { src: "/clips/drone_04.webp", name: "DRONE_04" },
  { src: "/clips/a012_take3.webp", name: "A012_TAKE3" },
  { src: "/clips/broll_city.webp", name: "B-ROLL_CITY" },
  { src: "/clips/int_studio.webp", name: "INT_STUDIO" },
  { src: "/clips/vo_final.webp", name: "VO_FINAL" },
  { src: "/clips/cu_hands.webp", name: "CU_HANDS" },
];
const QUERIES = [
  { q: "aerial of the city at golden hour", hit: 0 },
  { q: "she explains why it matters", hit: 1 },
  { q: "rainy street, neon, b-roll", hit: 2 },
  { q: "hands typing, close up", hit: 5 },
];

function SearchDemo() {
  const [ref, i] = useCycle(QUERIES.length, 2600);
  const { q, hit } = QUERIES[i];
  return (
    <div ref={ref} className="mt-7">
      <div className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-bg-2/80 px-3.5 py-2.5">
        <Search className="size-4 text-muted" />
        <AnimatePresence mode="wait">
          <motion.span
            key={q}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="truncate text-sm text-ink"
          >
            {q}
          </motion.span>
        </AnimatePresence>
        <span className="slate ml-auto shrink-0 text-red">1 match</span>
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {FOOTAGE.map((f, idx) => (
          <li
            key={f.name}
            className={cn(
              "relative aspect-video overflow-hidden rounded-lg border transition-all duration-700",
              idx === hit
                ? "scale-[1.03] border-peach shadow-[0_0_30px_-6px_rgb(255_196_174/0.7)]"
                : "border-line opacity-40 grayscale",
            )}
          >
            <Image src={f.src} alt="" fill sizes="200px" className="object-cover" />
            <span className="absolute bottom-1 left-1.5 font-mono text-[8px] tracking-wider text-white/80">
              {f.name}
            </span>
            {idx === hit && (
              <span className="absolute top-1 right-1 rounded bg-peach px-1 font-mono text-[8px] text-[#3a1418]">
                00:{String(12 + idx * 7).padStart(2, "0")}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --- 02 · Colour grading (draggable before/after) ------------------------- */

function GradeDemo() {
  const [split, setSplit] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setSplit(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div className="mt-7">
      <div
        ref={box}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
        className="relative aspect-[4/3] cursor-ew-resize touch-none overflow-hidden rounded-xl border border-line select-none"
      >
        <Image
          src="/clips/int_studio.webp"
          alt="Studio shot, graded by Broll"
          fill
          sizes="400px"
          className="object-cover [filter:contrast(1.12)_saturate(1.3)_sepia(0.18)_hue-rotate(-10deg)]"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          <Image
            src="/clips/int_studio.webp"
            alt=""
            fill
            sizes="400px"
            className="object-cover [filter:saturate(0.25)_contrast(0.82)_brightness(1.08)]"
          />
        </div>
        <span className="slate absolute top-2.5 left-2.5 rounded bg-black/55 px-1.5 py-0.5 text-white/80">Log</span>
        <span className="slate absolute top-2.5 right-2.5 rounded bg-red px-1.5 py-0.5 text-white">Broll grade</span>
        <div className="absolute inset-y-0" style={{ left: `${split}%` }}>
          <div className="absolute inset-y-0 -left-px w-[2px] bg-white shadow-[0_0_12px_rgb(0_0_0/0.5)]" />
          <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#10121f] shadow-lg">
            <MoveHorizontal className="size-4" />
          </span>
        </div>
      </div>
      <input
        type="range"
        min={4}
        max={96}
        value={Math.round(split)}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label="Compare ungraded and graded footage"
        className="sr-only"
      />
      <p className="slate mt-3">Drag to compare · one grade across every camera</p>
    </div>
  );
}

/* --- 03 · Captions --------------------------------------------------------- */

const LINE = ["And", "that's", "exactly", "why", "we", "built", "it."];

function CaptionDemo() {
  const [ref, i] = useCycle(LINE.length + 2, 420);
  return (
    <div ref={ref} className="relative mt-7 aspect-[4/3] overflow-hidden rounded-xl border border-line">
      <Image src="/clips/a012_take3.webp" alt="" fill sizes="400px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <p className="absolute inset-x-4 bottom-5 text-center text-lg font-bold tracking-tight text-white [text-shadow:0_2px_12px_rgb(0_0_0/0.6)]">
        {LINE.map((w, idx) => (
          <span
            key={idx}
            className={cn(
              "mx-[0.15em] inline-block rounded px-0.5 transition-all duration-200",
              idx === i ? "scale-110 bg-red text-white" : idx < i ? "text-white" : "text-white/45",
            )}
          >
            {w}
          </span>
        ))}
      </p>
    </div>
  );
}

/* --- 04 · Lip sync --------------------------------------------------------- */

const LANGS = ["English", "हिन्दी", "Español", "日本語", "Português"];
const WAVE = Array.from({ length: 56 }, (_, i) => 20 + ((i * 41) % 80));

function LipSyncDemo() {
  const [ref, i] = useCycle(LANGS.length, 1800);
  return (
    <div ref={ref} className="mt-7 rounded-xl border border-line bg-bg-2/70 p-4">
      <div className="flex flex-wrap gap-1.5">
        {LANGS.map((l, idx) => (
          <span
            key={l}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition-all duration-500",
              idx === i ? "border-red bg-red text-white" : "border-line text-muted",
            )}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="mt-5 flex h-16 items-center gap-[3px]">
        {WAVE.map((h, idx) => (
          <span
            key={idx}
            style={{ height: `${h}%`, animationDelay: `${(idx % 9) * 0.09}s` }}
            className="animate-eq w-full rounded-full bg-[linear-gradient(180deg,var(--peach),var(--red))]"
          />
        ))}
      </div>
      <div className="slate mt-4 flex justify-between">
        <span>Lips matched</span>
        <span className="text-ink">98%</span>
      </div>
    </div>
  );
}

/* --- 05 · XML export ------------------------------------------------------- */

const EDITORS = [
  { k: "Pr", name: "Premiere Pro" },
  { k: "DR", name: "DaVinci Resolve" },
  { k: "FCP", name: "Final Cut Pro" },
];

function XmlDemo() {
  return (
    <div className="mt-7 flex flex-col gap-3">
      <div className="mx-auto flex shrink-0 items-center gap-2.5 rounded-xl border border-peach/50 bg-peach/10 px-4 py-3">
        <FileCode2 className="size-4 text-peach" />
        <span className="font-mono text-sm text-ink">timeline.xml</span>
      </div>
      <svg aria-hidden viewBox="0 0 240 24" preserveAspectRatio="none" className="h-5 w-full text-red">
        {[40, 120, 200].map((x) => (
          <path
            key={x}
            d={`M120 0 C 120 12, ${x} 12, ${x} 24`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            className="animate-dash-flow"
          />
        ))}
      </svg>
      <ul className="grid grid-cols-3 gap-2">
        {EDITORS.map((e) => (
          <li
            key={e.k}
            className="group/ed flex flex-col items-center gap-2 rounded-lg border border-line px-2 py-3 text-center transition-colors duration-300 hover:border-red/60"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-surface-2 font-mono text-[11px] font-semibold text-ink transition-all duration-300 group-hover/ed:bg-red group-hover/ed:shadow-[0_0_20px_-4px_var(--red)]">
              {e.k}
            </span>
            <span className="text-[12px] leading-tight text-ink-2/80">{e.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --- Section --------------------------------------------------------------- */

export default function Capabilities() {
  return (
    <section id="features" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Features"
          title="Everything the edit needs."
          voice="In a single pass."
        />

        <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Spotlight as="article" className="group h-full p-6 md:p-8">
              <CardHead
                icon={Search}
                n="01"
                title="Semantic footage search"
                body="Every frame indexed on upload. Describe the shot — the clip surfaces. No logging, no bins."
              />
              <SearchDemo />
            </Spotlight>
          </Reveal>
          <Reveal delay={0.08}>
            <Spotlight as="article" className="group h-full p-6 md:p-8">
              <CardHead
                icon={Palette}
                n="02"
                title="AI color grading"
                body="One cinematic grade matched across every camera and take."
              />
              <GradeDemo />
            </Spotlight>
          </Reveal>
          <Reveal>
            <Spotlight as="article" className="group h-full p-6 md:p-8">
              <CardHead
                icon={Captions}
                n="03"
                title="Auto captions"
                body="Styled, timed to the cut — and they move when the edit moves."
              />
              <CaptionDemo />
            </Spotlight>
          </Reveal>
          <Reveal delay={0.08}>
            <Spotlight as="article" className="group h-full p-6 md:p-8">
              <CardHead
                icon={AudioLines}
                n="04"
                title="AI lip sync"
                body="Dub into new languages with lips that actually match the audio."
              />
              <LipSyncDemo />
            </Spotlight>
          </Reveal>
          <Reveal delay={0.16}>
            <Spotlight as="article" className="group h-full p-6 md:p-8">
              <CardHead
                icon={FileCode2}
                n="05"
                title="Export to any editor"
                body="A standard timeline XML — keep cutting exactly where the agent left off."
              />
              <XmlDemo />
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
