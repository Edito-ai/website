"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Captions,
  Check,
  Download,
  Film,
  Loader2,
  Palette,
  Pause,
  Play,
  Search,
  Sparkles,
} from "lucide-react";
import BrollLogo from "@/components/site/BrollLogo";
import { cn } from "@/lib/utils";

/* --- Data ------------------------------------------------------------------ */

const EXAMPLES = [
  { prompt: "Create the first cut of this episode.", done: "First cut ready" },
  { prompt: "Find the strongest reaction from the interview.", done: "Best reaction placed" },
  { prompt: "Cut the silences and punch in on the hook.", done: "Tightened to 2:14" },
];

const STEPS = [
  "Watching 300 clips",
  "Finding the best moments",
  "Comparing takes",
  "Removing 14 silences",
  "Building the story",
  "Writing captions",
  "Matching the grade",
];

const CLIPS = {
  take3: { src: "/clips/a012_take3.webp", name: "A012_TAKE3", caption: "And that's exactly why we built it." },
  city: { src: "/clips/broll_city.webp", name: "B-ROLL_CITY", caption: "The city never stops moving." },
  drone: { src: "/clips/drone_04.webp", name: "DRONE_04", caption: "From above, it all makes sense." },
  vo: { src: "/clips/vo_final.webp", name: "VO_FINAL", caption: "Three hundred clips. One sentence." },
  hands: { src: "/clips/cu_hands.webp", name: "CU_HANDS", caption: "No timeline. No bins." },
  studio: { src: "/clips/int_studio.webp", name: "INT_STUDIO", caption: "Just tell it what you want." },
} as const;

type ClipKey = keyof typeof CLIPS;

// The cut Broll assembles, left to right, with relative widths.
const CUT: { k: ClipKey; w: number }[] = [
  { k: "drone", w: 11 },
  { k: "take3", w: 19 },
  { k: "city", w: 10 },
  { k: "vo", w: 16 },
  { k: "hands", w: 9 },
  { k: "take3", w: 14 },
  { k: "studio", w: 21 },
];

const RUN_MS = 6500;
const TOTAL_S = 134; // 2:14 finished cut
const WAVE = Array.from({ length: 140 }, (_, i) => 15 + ((i * 53 + (i % 7) * 13) % 85));

type Phase = "idle" | "typing" | "running" | "done";

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* --- Component ------------------------------------------------------------- */

/**
 * The hero product shot — a working miniature of Broll, built in the DOM so
 * it stays sharp at any size. It runs itself once; visitors can type their
 * own prompt (or pick one) and watch the agent assemble the cut.
 */
export default function AppDemo() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const [input, setInput] = useState("");
  const [t, setT] = useState(0);
  const [doneLabel, setDoneLabel] = useState(EXAMPLES[0].done);
  const timers = useRef<number[]>([]);
  const raf = useRef(0);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    cancelAnimationFrame(raf.current);
  };

  const run = useCallback(
    (prompt: string) => {
      clear();
      setDoneLabel(EXAMPLES.find((e) => e.prompt === prompt)?.done ?? "First cut ready");
      setInput("");
      setT(0);
      if (reduced) {
        setTyped(prompt);
        setT(1);
        setPhase("done");
        return;
      }
      setPhase("typing");
      setTyped("");
      [...prompt].forEach((_, i) => {
        timers.current.push(window.setTimeout(() => setTyped(prompt.slice(0, i + 1)), 26 * i));
      });
      timers.current.push(
        window.setTimeout(() => {
          setPhase("running");
          const start = performance.now();
          const tick = (now: number) => {
            const v = Math.min(1, (now - start) / RUN_MS);
            setT(v);
            if (v < 1) raf.current = requestAnimationFrame(tick);
            else setPhase("done");
          };
          raf.current = requestAnimationFrame(tick);
        }, 26 * prompt.length + 400),
      );
    },
    [reduced],
  );

  // Runs itself shortly after the page loads.
  useEffect(() => {
    const id = window.setTimeout(() => run(EXAMPLES[0].prompt), 1400);
    return () => {
      clearTimeout(id);
      clear();
    };
  }, [run]);

  const busy = phase === "typing" || phase === "running";
  const step = phase === "done" ? STEPS.length : Math.floor(t * STEPS.length);
  const built = clamp((t - 0.3) / 0.45); // timeline assembly progress
  const shown = Math.round(built * CUT.length);
  const captions = t > 0.72;
  const graded = t > 0.86;

  // Which clip sits under the playhead → shown in the preview.
  const head = phase === "done" ? 0.38 : t;
  let acc = 0;
  let current: ClipKey = "studio";
  const total = CUT.reduce((a, c) => a + c.w, 0);
  for (const [i, c] of CUT.entries()) {
    if (i >= shown) break;
    acc += c.w / total;
    current = c.k;
    if (head <= acc) break;
  }
  if (shown === 0) current = "studio";
  const clip = CLIPS[current];

  return (
    <div className="band-border shadow-[0_80px_160px_-60px_rgb(184_24_44/0.55),0_40px_80px_-40px_rgb(0_0_0/0.9)]">
      <div className="overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0b0c14] text-left">
        {/* Title bar */}
        <div className="flex h-11 items-center gap-3 border-b border-white/[0.07] bg-[#0e1019] px-4">
          <div className="flex gap-1.5">
            {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
              <span key={c} className={cn("size-3 rounded-full opacity-80", c)} />
            ))}
          </div>
          <div className="mx-auto flex items-center gap-2 text-xs text-muted">
            <BrollLogo className="size-3.5 text-ink" />
            <span className="text-ink-2">Episode 04</span>
            <span className="hidden sm:inline">— Raw footage · 300 clips</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex -space-x-1.5">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#38466b] text-[10px] font-semibold ring-2 ring-[#0e1019]">A</span>
              <span className="flex size-6 items-center justify-center rounded-full bg-crimson text-[10px] font-semibold ring-2 ring-[#0e1019]">R</span>
            </div>
            <span
              className={cn(
                "flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors duration-500",
                phase === "done" ? "bg-ink text-bg" : "bg-white/[0.06] text-muted",
              )}
            >
              <Download className="size-3.5" /> Export
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[52px_1fr_300px]">
          {/* Tool rail */}
          <div className="hidden flex-col items-center gap-1 border-r border-white/[0.07] py-3 lg:flex">
            {[Film, Search, Captions, Palette, Sparkles].map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  i === 4 ? "bg-red/15 text-red" : "text-muted",
                )}
              >
                <Icon className="size-[18px]" strokeWidth={1.7} />
              </span>
            ))}
          </div>

          {/* Main: prompt + preview */}
          <div className="min-w-0 border-white/[0.07] p-4 lg:border-r">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = input.trim();
                if (v && !busy) run(v);
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl border bg-white/[0.03] py-1.5 pr-1.5 pl-3 transition-[border-color,box-shadow] duration-500",
                busy ? "border-red/50 shadow-[0_0_0_3px_rgb(236_75_82/0.12)]" : "border-white/10 focus-within:border-red/60",
              )}
            >
              <Sparkles className="size-4 shrink-0 text-red" />
              <label htmlFor="hero-prompt" className="sr-only">
                Describe your edit
              </label>
              <input
                id="hero-prompt"
                value={busy ? typed : input || typed}
                onChange={(e) => !busy && setInput(e.target.value)}
                onFocus={() => !busy && setTyped("")}
                readOnly={busy}
                placeholder="Describe your edit…"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted/60 sm:text-[15px]"
              />
              <button
                type="submit"
                aria-label="Run edit"
                disabled={busy}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-ink text-bg transition-colors duration-300 hover:bg-red hover:text-white disabled:cursor-wait disabled:bg-white/10 disabled:text-muted"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" strokeWidth={2.5} />}
              </button>
            </form>
            <div className="mt-2 flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.prompt}
                  type="button"
                  disabled={busy}
                  onClick={() => run(ex.prompt)}
                  className="shrink-0 cursor-pointer rounded-md border border-white/[0.08] px-2 py-1 text-[11px] whitespace-nowrap text-muted transition-colors duration-300 hover:border-red/50 hover:text-ink disabled:cursor-wait"
                >
                  {ex.prompt}
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="relative mt-4 aspect-video overflow-hidden rounded-lg bg-black">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={clip.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    priority
                    className={cn(
                      "object-cover transition-[filter] duration-1000",
                      graded ? "[filter:contrast(1.08)_saturate(1.15)]" : "[filter:saturate(0.55)_contrast(0.92)]",
                    )}
                  />
                </motion.div>
              </AnimatePresence>
              <span className="absolute top-2.5 left-2.5 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur">
                {clip.name}
              </span>
              {graded && (
                <span className="absolute top-2.5 right-2.5 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white/80 backdrop-blur">
                  Graded
                </span>
              )}
              <AnimatePresence>
                {captions && (
                  <motion.span
                    key={clip.caption}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-[12%] left-1/2 max-w-[90%] -translate-x-1/2 rounded-md bg-black/70 px-2.5 py-1 text-center text-xs font-semibold text-white sm:text-sm"
                  >
                    {clip.caption}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-2.5 flex items-center gap-3 text-[11px] text-muted">
              {busy ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current" />}
              <span className="font-mono tabular-nums">
                {fmt(head * TOTAL_S * built)} / {fmt(TOTAL_S * built)}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-ink/70" style={{ width: `${head * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Agent panel */}
          <div className="border-t border-white/[0.07] p-4 lg:border-t-0">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="size-4 text-red" /> Broll agent
              </p>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-medium",
                  phase === "done"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : busy
                      ? "bg-red/15 text-red"
                      : "bg-white/[0.06] text-muted",
                )}
              >
                {phase === "done" ? "Done" : busy ? "Working" : "Ready"}
              </span>
            </div>
            <ol className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[12.5px] lg:grid-cols-1">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step && phase === "running";
                return (
                  <li key={s} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                        done ? "border-red bg-red" : active ? "border-red/60" : "border-white/15",
                      )}
                    >
                      {done && <Check className="size-2.5 text-white" strokeWidth={3.5} />}
                      {active && <Loader2 className="size-2.5 animate-spin text-red" />}
                    </span>
                    <span className={cn("truncate transition-colors duration-500", done ? "text-ink-2" : active ? "text-ink" : "text-muted/60")}>
                      {s}
                    </span>
                  </li>
                );
              })}
            </ol>
            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3"
                >
                  <p className="text-sm font-medium">{doneLabel}</p>
                  <p className="mt-0.5 text-xs text-muted">2:14 · 23 cuts · captions & grade applied</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-md bg-ink px-2.5 py-1 text-[11px] font-medium text-bg">Review cut</span>
                    <span className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-ink-2">Export XML</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-t border-white/[0.07] bg-[#090a11] px-4 pt-3 pb-4">
          <div className="mb-2 flex justify-between font-mono text-[10px] text-muted/70">
            {["0:00", "0:30", "1:00", "1:30", "2:00"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="space-y-1">
            {/* Captions */}
            <div className="flex h-4 gap-[3px]">
              {CUT.map((c, i) => (
                <span
                  key={i}
                  style={{ width: `${c.w}%` }}
                  className={cn(
                    "rounded-[3px] bg-white/70 transition-opacity duration-500",
                    captions && i < shown ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
            {/* Video */}
            <div className="flex h-10 gap-[3px] rounded-md bg-white/[0.03] sm:h-12">
              {CUT.map((c, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: i < shown ? 1 : 0, y: i < shown ? 0 : 6 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: `${c.w}%`,
                    backgroundImage: `url(${CLIPS[c.k].src})`,
                  }}
                  className="relative overflow-hidden rounded-[4px] bg-cover bg-center ring-1 ring-white/15 ring-inset"
                >
                  <span className="absolute bottom-0.5 left-1 truncate font-mono text-[8px] text-white/90 [text-shadow:0_1px_2px_black]">
                    {CLIPS[c.k].name}
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Audio */}
            <div className="flex h-7 items-center gap-[1.5px] rounded-md bg-white/[0.03] px-1">
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${i / WAVE.length < built ? h : 8}%` }}
                  className={cn(
                    "w-full rounded-full transition-[height,background-color] duration-500",
                    i / WAVE.length < built ? "bg-red/75" : "bg-white/10",
                  )}
                />
              ))}
            </div>
          </div>
          {/* Playhead */}
          <div aria-hidden className="pointer-events-none absolute inset-y-3 right-4 left-4">
            <span style={{ left: `${head * 100}%` }} className="absolute inset-y-0 w-px bg-red">
              <span className="absolute -top-0.5 left-1/2 h-2 w-2.5 -translate-x-1/2 rounded-b-sm bg-red" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
