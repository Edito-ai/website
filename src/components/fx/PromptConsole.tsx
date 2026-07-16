"use client";

import { useEffect, useState } from "react";

const SCENARIOS: { prompt: string; steps: string[] }[] = [
  {
    prompt: "Cut every awkward silence out of interview_a.mov",
    steps: [
      "Scanning dialogue.wav for gaps longer than 400 ms",
      "14 silences found",
      "Blade + ripple delete applied on V1",
      "Sequence is 1:42 tighter — one Ctrl+Z rolls it all back",
    ],
  },
  {
    prompt: "Keep only the shots where Aarav is on screen",
    steps: [
      "Loading cast profile — aarav · built from 1 photo",
      "Matched in 23 clips across 4 videos",
      "Rebuilding V1 from the matches",
      "62 cuts placed, every one undoable",
    ],
  },
  {
    prompt: "Make a 30-second beat-synced teaser from all of it",
    steps: [
      "Detecting beats in score.mp3",
      "Ranking the sharpest, best-framed moments",
      "Cutting on the beat grid",
      "Teaser on the timeline — 00:00:30:00 exactly",
    ],
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * The product, live: prompts type themselves in, the AI answers with an edit
 * plan, and the steps check off one by one — looping through three scenarios.
 */
export default function PromptConsole() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      await sleep(300);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTyped(SCENARIOS[0].prompt);
        setVisibleSteps(SCENARIOS[0].steps.length);
        return;
      }
      for (let i = 0; !cancelled; i = (i + 1) % SCENARIOS.length) {
        const s = SCENARIOS[i];
        setIdx(i);
        setTyped("");
        setVisibleSteps(0);
        await sleep(500);
        for (let c = 1; c <= s.prompt.length && !cancelled; c++) {
          setTyped(s.prompt.slice(0, c));
          await sleep(28);
        }
        await sleep(550);
        for (let st = 1; st <= s.steps.length && !cancelled; st++) {
          setVisibleSteps(st);
          await sleep(650);
        }
        await sleep(3200);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const scenario = SCENARIOS[idx];

  return (
    <div className="card-surface overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="size-3 rounded-full bg-red-400/70" />
        <span className="size-3 rounded-full bg-amber-400/70" />
        <span className="size-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-mono text-xs text-mist">
          adarpan cut — ai console
        </span>
        <span className="ml-auto rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-violet-300 uppercase">
          connected to timeline
        </span>
      </div>

      <div className="min-h-64 p-5 font-mono text-sm sm:p-6">
        {/* The prompt being typed */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-violet-400">›</span>
          <p className="text-frost">
            {typed}
            <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-violet-400" />
          </p>
        </div>

        {/* The edit plan checking off */}
        <div className="mt-5 space-y-2.5 border-l border-white/10 pl-4">
          {scenario.steps.slice(0, visibleSteps).map((step, i) => (
            <p
              key={`${idx}-${i}`}
              className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                i === scenario.steps.length - 1 ? "text-emerald-300" : "text-mist"
              }`}
            >
              <span className={i === scenario.steps.length - 1 ? "text-emerald-400" : "text-violet-400"}>
                {i === scenario.steps.length - 1 ? "✓" : "→"}
              </span>
              {step}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
