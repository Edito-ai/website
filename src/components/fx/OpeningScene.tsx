"use client";

import { useEffect, useState } from "react";
import { seg, easeOut, easeOutBack } from "./useScrollProgress";

/**
 * The opening scene: a black canvas that assembles into the editor, piece by
 * piece — playhead, chrome, lanes, media, waveforms, clips snapping in, then
 * one photo dropped and two matches found. Runs once on load (~3.6s), driven
 * by a single elapsed-time value so every element derives from the same clock.
 * The page headline is choreographed to enter as this finishes.
 */

const END = 3800;

const THUMBS = [
  { name: "intro.mp4", look: "from-violet-800/60 to-ink-800" },
  { name: "interview_a", look: "from-sky-800/50 to-ink-800" },
  { name: "b-roll_02", look: "from-fuchsia-900/50 to-ink-800" },
  { name: "score.mp3", look: "from-indigo-900/40 to-ink-800" },
];

const WAVE = [5, 11, 8, 14, 6, 12, 9, 15, 7, 13, 10, 5, 12, 8, 14, 6, 10, 13, 7, 11];

const CLIPS = [
  { name: "title", track: 0, l: 8, w: 14, at: 1800 },
  { name: "intro.mp4", track: 1, l: 0, w: 26, at: 2000, video: true },
  { name: "interview_a", track: 1, l: 28, w: 44, at: 2200, video: true, match: true },
  { name: "dialogue.wav", track: 2, l: 0, w: 70, at: 2400 },
  { name: "b-roll_02", track: 0, l: 46, w: 20, at: 2550, video: true, match: true },
  { name: "score.mp3", track: 3, l: 12, w: 52, at: 2700 },
];

function status(t: number) {
  if (t < 900) return "starting engine";
  if (t < 1800) return "importing media — thumbnails + waveforms";
  if (t < 2750) return "building timeline";
  if (t < 3250) return "aarav.jpg dropped — scanning frames";
  return "cast: aarav · 2 matches on the timeline";
}

export default function OpeningScene() {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setT(END));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const e = Math.min(now - start, END);
      setT(e);
      if (e < END) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Every element's entrance is a window on the same clock.
  const playhead = easeOut(seg(t, 100, 550));
  const chrome = seg(t, 450, 700);
  const scan = seg(t, 2800, 3250);

  return (
    <div className="card-surface overflow-hidden bg-ink-950" aria-hidden>
      {/* Chrome */}
      <div
        style={{ opacity: chrome }}
        className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5"
      >
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-amber-400/70" />
        <span className="size-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 truncate font-mono text-[11px] text-mist">
          adarpan cut — untitled_project
        </span>
        <span
          style={{ opacity: seg(t, 3250, 3450) }}
          className="ml-auto rounded-full border border-violet-400/40 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-violet-300 uppercase"
        >
          cast ready
        </span>
      </div>

      <div className="relative p-4">
        {/* The first thing that exists: a playhead drawing itself in the dark. */}
        <div
          style={{ transform: `scaleY(${playhead})`, left: "38%" }}
          className="absolute inset-y-3 z-20 w-px origin-top bg-violet-400 shadow-[0_0_10px_1px_rgb(139_92_246/0.7)]"
        />

        {/* Media bin */}
        <div className="mb-3 grid grid-cols-4 gap-2">
          {THUMBS.map((m, i) => {
            const pop = easeOutBack(seg(t, 900 + i * 200, 1150 + i * 200));
            return (
              <div
                key={m.name}
                style={{ opacity: Math.min(1, pop * 1.4), transform: `scale(${0.7 + 0.3 * pop})` }}
                className={`aspect-video rounded bg-linear-to-br p-1 ${m.look}`}
              >
                <p className="truncate font-mono text-[7px] text-white/60">{m.name}</p>
              </div>
            );
          })}
        </div>

        {/* Waveform generating left → right */}
        <div className="mb-3 flex h-6 items-end gap-px">
          {WAVE.map((h, i) => (
            <span
              key={i}
              style={{
                height: `${h * 6}%`,
                transform: `scaleY(${easeOut(seg(t, 1400 + i * 28, 1650 + i * 28))})`,
              }}
              className="w-full origin-bottom rounded-sm bg-sky-400/50"
            />
          ))}
        </div>

        {/* Timeline lanes + clips snapping in */}
        <div className="space-y-1.5 font-mono text-[8px] text-white/50">
          {["V2", "V1", "A1", "A2"].map((label, lane) => {
            const laneIn = seg(t, 550 + lane * 90, 800 + lane * 90);
            return (
              <div
                key={label}
                style={{ opacity: laneIn, transform: `translateX(${(1 - easeOut(laneIn)) * -16}px)` }}
                className="flex items-center gap-2"
              >
                <span className="w-5 shrink-0 text-mist">{label}</span>
                <div className="relative h-5 flex-1 rounded bg-ink-800">
                  {CLIPS.filter((c) => c.track === lane).map((c) => {
                    const snap = seg(t, c.at, c.at + 260);
                    const matched = c.match && scan >= (c.l + c.w / 2) / 100;
                    return (
                      <span
                        key={c.name}
                        style={{
                          left: `${c.l}%`,
                          width: `${c.w}%`,
                          opacity: Math.min(1, snap * 1.5),
                          transform: `translateY(${(1 - easeOutBack(snap)) * -10}px)`,
                        }}
                        className={`absolute top-0.5 flex h-4 items-center truncate rounded-sm px-1.5 transition-shadow ${
                          c.track < 2
                            ? "bg-violet-500/30 text-violet-200"
                            : "bg-sky-500/25 text-sky-200"
                        } ${matched ? "shadow-[0_0_0_1.5px_rgb(167_139_250),0_0_12px_rgb(139_92_246/0.6)]" : ""}`}
                      >
                        {c.name}
                        {matched && (
                          <span className="ml-auto pl-1 text-[7px] text-violet-100">98%</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* The dropped photo + its scan line crossing the timeline */}
        <div
          style={{
            opacity: seg(t, 2750, 2950),
            transform: `translateY(${(1 - easeOutBack(seg(t, 2750, 3050))) * -14}px)`,
          }}
          className="absolute top-3 right-4 z-20 flex items-center gap-1.5 rounded-md border border-violet-400/50 bg-ink-900/95 px-2 py-1 shadow-lg"
        >
          <span className="flex size-5 items-center justify-center rounded bg-linear-to-br from-violet-500/70 to-fuchsia-500/50 text-[9px] font-bold text-white">
            A
          </span>
          <span className="font-mono text-[9px] text-frost">aarav.jpg</span>
        </div>
        {scan > 0 && scan < 1 && (
          <div
            style={{ left: `${6 + scan * 88}%` }}
            className="absolute inset-y-16 z-10 w-px bg-linear-to-b from-transparent via-violet-300 to-transparent"
          />
        )}
      </div>

      {/* Status line — the sequence narrates itself. */}
      <div className="border-t border-white/8 px-4 py-2">
        <p className="flex items-center gap-2 font-mono text-[10px] text-mist">
          <span
            className={`size-1.5 rounded-full ${t >= END ? "bg-emerald-400" : "animate-blink bg-violet-400"}`}
          />
          {status(t)}
        </p>
      </div>
    </div>
  );
}
