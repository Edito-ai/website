"use client";

import { useScrollProgress, seg, easeOut, easeOutBack } from "./useScrollProgress";

/**
 * The film. One pinned editor, five acts, and scroll as the only clock:
 *
 *   IMPORT  media pops into the bin, waveforms generate
 *   CUT     clips snap onto tracks while the playhead scrubs
 *   FIND    aarav.jpg drops in; a scan line crosses the timeline and
 *           matching clips ring in with confidence scores
 *   PROMPT  an instruction types itself; non-matches collapse and the
 *           keepers slide left to close the gaps — a ripple edit, live
 *   EXPORT  the playhead becomes a render head; the monitor fills in
 *           pixel by pixel until the file card lands
 *
 * Every number below derives from scroll progress, so scrolling up runs
 * the film backwards. Nothing is triggered; everything is scrubbed.
 */

const ACTS = [
  { id: "IMPORT", at: 0, note: "media in — thumbnails + waveforms, instantly" },
  { id: "CUT", at: 0.18, note: "blade, trim, snap — the playhead follows your scroll" },
  { id: "FIND", at: 0.42, note: "one photo — every clip he's in lights up" },
  { id: "PROMPT", at: 0.64, note: "«keep only aarav's shots» — a ripple edit executes" },
  { id: "EXPORT", at: 0.84, note: "the render head sweeps; pixels land; file ships" },
] as const;

const THUMBS = [
  { name: "intro.mp4", look: "from-violet-800/60 to-ink-800" },
  { name: "interview_a", look: "from-sky-800/50 to-ink-800" },
  { name: "b-roll_02", look: "from-fuchsia-900/50 to-ink-800" },
  { name: "score.mp3", look: "from-indigo-900/40 to-ink-800" },
];

const WAVE = [6, 12, 9, 15, 7, 13, 10, 5, 12, 8, 14, 6, 11, 9, 15, 7];

/** l/w in %; `at` = landing order inside CUT; `fl` = left after the ripple edit. */
const CLIPS = [
  { name: "title", track: 0, l: 8, w: 14, at: 0.55, cut: false },
  { name: "b-roll_02", track: 0, l: 46, w: 20, at: 0.7, match: true, fl: 4 },
  { name: "intro.mp4", track: 1, l: 0, w: 26, at: 0.05, cut: false },
  { name: "interview_a", track: 1, l: 28, w: 44, at: 0.25, match: true, fl: 0 },
  { name: "dialogue.wav", track: 2, l: 0, w: 70, at: 0.4, audio: true, keep: true },
  { name: "score.mp3", track: 3, l: 12, w: 52, at: 0.85, audio: true, keep: true },
];

/** Deterministic pseudo-random per pixel cell, stable across renders. */
function cellThreshold(i: number) {
  return ((i * 2654435761) % 997) / 997;
}

const PIXELS = Array.from({ length: 60 }, (_, i) => cellThreshold(i));

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function TheCut() {
  const { ref, p } = useScrollProgress<HTMLDivElement>();

  const act = [...ACTS].reverse().find((a) => p >= a.at) ?? ACTS[0];

  const impS = seg(p, 0, 0.18);
  const cutS = seg(p, 0.18, 0.42);
  const findS = seg(p, 0.42, 0.64);
  const prmS = seg(p, 0.64, 0.84);
  const expS = seg(p, 0.84, 1);

  // Typing, then executing: first half of PROMPT types, second half edits.
  const promptText = "keep only aarav's shots — cut everything else";
  const typed = promptText.slice(0, Math.round(seg(prmS, 0, 0.45) * promptText.length));
  const exec = easeOut(seg(prmS, 0.5, 1));

  // The playhead scrubs during CUT, parks during FIND/PROMPT, then becomes the render head.
  const playheadX = expS > 0 ? expS * 100 : prmS > 0 ? 72 : cutS * 72;

  // Timecode: 24fps over a 12s sequence that gets 38% shorter after the ripple
  // edit. During EXPORT the render head re-sweeps the shortened sequence, so
  // the chrome timecode ends where the file card says it does (~00:07).
  const frames = Math.round((expS > 0 ? expS : cutS) * (12 * 24) * (1 - 0.38 * exec));
  const tc = `00:00:${String(Math.floor(frames / 24)).padStart(2, "0")}:${String(frames % 24).padStart(2, "0")}`;

  const scanX = findS * 100;
  const matchCount = CLIPS.filter(
    (c) => c.match && scanX >= c.l + c.w / 2,
  ).length;

  const entrance = easeOut(seg(p, 0, 0.04));

  return (
    <div ref={ref} className="relative h-[600vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent_80%)]"
        />

        {/* The act title — the film's chapter card. */}
        <p
          aria-hidden
          className="text-outline pointer-events-none absolute top-[6%] left-1/2 w-full -translate-x-1/2 text-center font-mono text-[clamp(3rem,13vw,10rem)] font-black tracking-tighter select-none"
        >
          {act.id}
        </p>

        <div
          style={{
            transform: `perspective(1200px) scale(${0.92 + entrance * 0.08}) rotateX(${(1 - entrance) * 8}deg)`,
            opacity: 0.3 + entrance * 0.7,
          }}
          className="card-surface relative z-10 w-full max-w-4xl overflow-hidden bg-ink-950 will-change-transform"
        >
          {/* Chrome */}
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
            <span className="size-3 rounded-full bg-red-400/70" />
            <span className="size-3 rounded-full bg-amber-400/70" />
            <span className="size-3 rounded-full bg-emerald-400/70" />
            <span className="ml-3 truncate font-mono text-xs text-mist">
              adarpan cut — sequence_01 · {tc} · 24 fps
            </span>
            <span
              className={`ml-auto flex items-center gap-1.5 font-mono text-[10px] ${
                p > 0.97 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${p > 0.97 ? "bg-emerald-400" : "animate-blink bg-red-400"}`}
              />
              {p > 0.97 ? "DONE" : "REC"}
            </span>
          </div>

          {/* Monitor — one surface, five readings. */}
          <div className="relative h-36 overflow-hidden border-b border-white/8 bg-ink-950 sm:h-44">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(80%_120%_at_30%_20%,rgb(139_92_246/0.35),transparent_60%),radial-gradient(70%_110%_at_75%_85%,rgb(96_165_250/0.3),transparent_60%)]"
            />

            {/* IMPORT / CUT: timecode + act note */}
            <div
              style={{ opacity: findS > 0 ? 0 : 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300"
            >
              <p className="font-mono text-3xl font-bold tracking-widest text-frost tabular-nums sm:text-4xl">
                {tc}
              </p>
              <p className="mt-1 px-4 text-center font-mono text-[11px] tracking-[0.25em] text-white/60 uppercase">
                {act.note}
              </p>
            </div>

            {/* FIND / PROMPT: the subject, boxed and named. */}
            <div
              style={{ opacity: findS > 0 && expS === 0 ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center gap-6 transition-opacity duration-300"
            >
              <div className="relative">
                <svg viewBox="0 0 80 64" className="h-20 sm:h-24" aria-hidden>
                  <circle cx="40" cy="22" r="11" fill="rgb(196 181 253 / 0.85)" />
                  <path d="M18 64c0-13 9.5-21 22-21s22 8 22 21z" fill="rgb(196 181 253 / 0.85)" />
                  <rect
                    x="14" y="4" width="52" height="58" rx="4"
                    fill="none" stroke="rgb(167 139 250)" strokeWidth="1.5"
                    strokeDasharray="220"
                    strokeDashoffset={220 * (1 - easeOut(seg(findS, 0.15, 0.6)))}
                  />
                </svg>
                <span
                  style={{ opacity: seg(findS, 0.5, 0.7) }}
                  className="absolute -top-1 -right-2 rounded bg-violet-500/90 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white"
                >
                  aarav · 98%
                </span>
              </div>
              <div className="font-mono text-xs text-mist">
                <p className="text-frost">{prmS > 0 ? "executing plan" : "scanning frames"}</p>
                <p className="mt-1">
                  {prmS > 0
                    ? `${Math.round(exec * 2)} removed · 2 kept · gaps closed`
                    : `${matchCount} / 2 matches on the timeline`}
                </p>
              </div>
            </div>

            {/* EXPORT: pixels land until the frame is whole. */}
            <div
              style={{ opacity: expS > 0 ? 1 : 0 }}
              className="absolute inset-0 transition-opacity duration-300"
            >
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-5">
                {PIXELS.map((th, i) => (
                  <span
                    key={i}
                    style={{ opacity: seg(expS, 0, 0.85) >= th ? 1 : 0 }}
                    className="bg-linear-to-br from-violet-500/50 to-sky-500/40 transition-opacity duration-150"
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="rounded bg-ink-950/70 px-3 py-1 font-mono text-sm font-bold text-frost backdrop-blur">
                  {expS < 0.9 ? `rendering ${Math.round(seg(expS, 0, 0.85) * 100)}%` : ""}
                </p>
              </div>
              <div
                style={{
                  opacity: seg(expS, 0.88, 1),
                  transform: `scale(${0.8 + 0.2 * easeOutBack(seg(expS, 0.88, 1))})`,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-ink-950/90 px-4 py-2 font-mono text-xs text-emerald-300 shadow-xl backdrop-blur">
                  ✓ adarpan_cut_final.mp4 · 00:07:11 · 4K
                </p>
              </div>
            </div>

            {/* The dropped photo, top-right, from FIND onward. */}
            <div
              style={{
                opacity: findS > 0 ? 1 : 0,
                transform: `translateY(${(1 - easeOutBack(seg(findS, 0, 0.18))) * -16}px)`,
              }}
              className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-md border border-violet-400/50 bg-ink-900/95 px-2 py-1"
            >
              <span className="flex size-5 items-center justify-center rounded bg-linear-to-br from-violet-500/70 to-fuchsia-500/50 text-[9px] font-bold text-white">
                A
              </span>
              <span className="font-mono text-[9px] text-frost">aarav.jpg</span>
            </div>
          </div>

          {/* Media bin — fills during IMPORT. */}
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <span className="font-mono text-[9px] tracking-widest text-mist uppercase">bin</span>
            <div className="grid flex-1 grid-cols-4 gap-1.5">
              {THUMBS.map((m, i) => {
                const pop = easeOutBack(seg(impS, 0.1 + i * 0.18, 0.32 + i * 0.18));
                return (
                  <div
                    key={m.name}
                    style={{ opacity: Math.min(1, pop * 1.4), transform: `scale(${0.7 + 0.3 * pop})` }}
                    className={`h-6 rounded bg-linear-to-br px-1.5 py-0.5 ${m.look}`}
                  >
                    <p className="truncate font-mono text-[7px] text-white/60">{m.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="hidden h-5 items-end gap-px sm:flex" aria-hidden>
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  style={{
                    height: `${h * 6}%`,
                    transform: `scaleY(${easeOut(seg(impS, 0.4 + i * 0.03, 0.7 + i * 0.03))})`,
                  }}
                  className="w-1 origin-bottom rounded-sm bg-sky-400/50"
                />
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative space-y-2 p-4 font-mono text-[10px] text-white/60">
            {/* Prompt line — types itself, then the edit lands below it. */}
            <div
              style={{ opacity: prmS > 0 && expS < 0.2 ? 1 : 0 }}
              className="absolute -top-0.5 left-4 z-20 flex items-center gap-2 transition-opacity duration-300"
            >
              <span className="text-violet-400">›</span>
              <span className="text-frost">{typed}</span>
              {prmS > 0 && prmS < 0.5 && (
                <span className="animate-blink inline-block h-3 w-1.5 bg-violet-400" />
              )}
            </div>

            {/* Playhead / render head */}
            <div
              aria-hidden
              style={{
                left: `calc(2.25rem + ${playheadX / 100} * (100% - 3.25rem))`,
                opacity: cutS > 0 ? 1 : 0,
              }}
              className={`absolute inset-y-2 z-10 w-px ${
                expS > 0
                  ? "bg-emerald-300 shadow-[0_0_12px_2px_rgb(52_211_153/0.6)]"
                  : "bg-violet-400 shadow-[0_0_12px_2px_rgb(139_92_246/0.7)]"
              }`}
            >
              <span
                className={`absolute -top-0.5 -left-[5px] size-2.5 rotate-45 rounded-[2px] ${
                  expS > 0 ? "bg-emerald-300" : "bg-violet-400"
                }`}
              />
            </div>

            {/* Scan line during FIND */}
            {findS > 0 && findS < 1 && (
              <div
                aria-hidden
                style={{ left: `calc(2.25rem + ${scanX / 100} * (100% - 3.25rem))` }}
                className="absolute inset-y-2 z-10 w-px bg-linear-to-b from-transparent via-violet-300 to-transparent"
              />
            )}

            {["V2", "V1", "A1", "A2"].map((label, lane) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-6 shrink-0 text-mist">{label}</span>
                <div className="relative h-8 flex-1 rounded-md bg-ink-800">
                  {CLIPS.filter((c) => c.track === lane).map((c) => {
                    const snap = seg(cutS, c.at, c.at + 0.18);
                    const matched = c.match && scanX >= c.l + c.w / 2;
                    // The ripple edit: non-keepers collapse, keepers slide home.
                    const removed = !c.match && !c.keep ? exec : 0;
                    const left = c.match ? lerp(c.l, c.fl!, exec) : c.l;
                    const width = c.w * (1 - removed);
                    return (
                      <div
                        key={c.name}
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          opacity: Math.min(1, snap * 1.5) * (1 - removed),
                          transform: `translateY(${(1 - easeOutBack(Math.max(0.001, snap))) * -12}px)`,
                        }}
                        className={`absolute top-1 flex h-6 items-center truncate rounded px-2 ${
                          c.audio
                            ? "bg-sky-500/25 text-sky-200"
                            : "bg-violet-500/30 text-violet-200"
                        } ${
                          matched
                            ? "shadow-[0_0_0_1.5px_rgb(167_139_250),0_0_14px_rgb(139_92_246/0.55)]"
                            : ""
                        }`}
                      >
                        {c.name}
                        {matched && (
                          <span className="ml-auto pl-1 text-[8px] text-violet-100">98%</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Act rail */}
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {ACTS.map((a) => (
            <span
              key={a.id}
              className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest transition-all duration-300 sm:text-xs ${
                act.id === a.id
                  ? "border-violet-400/60 bg-violet-500/15 text-violet-200 shadow-[0_0_16px_rgb(139_92_246/0.35)]"
                  : "border-white/10 text-mist"
              }`}
            >
              {a.id}
            </span>
          ))}
        </div>

        <p
          className={`relative z-10 mt-4 font-mono text-[11px] tracking-[0.25em] text-mist uppercase transition-opacity duration-500 ${
            p > 0.04 ? "opacity-0" : "animate-pulse opacity-100"
          }`}
        >
          ▼ scroll — you&apos;re the editor now
        </p>
      </div>
    </div>
  );
}
