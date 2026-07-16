"use client";

import { useEffect, useRef, useState } from "react";

/** Fake footage frames — index, timecode, gradient look, and whether Aarav is in it. */
const FRAMES: { tc: string; look: string; match?: number }[] = [
  { tc: "00:02:11", look: "from-violet-900/60 to-ink-800", match: 0.98 },
  { tc: "00:07:43", look: "from-sky-900/50 to-ink-800" },
  { tc: "00:14:05", look: "from-fuchsia-900/40 to-ink-800", match: 0.96 },
  { tc: "00:21:38", look: "from-ink-700 to-ink-800" },
  { tc: "00:29:52", look: "from-indigo-900/50 to-ink-800", match: 0.93 },
  { tc: "00:36:19", look: "from-ink-600/80 to-ink-800" },
  { tc: "00:44:07", look: "from-violet-950/80 to-ink-800" },
  { tc: "00:51:26", look: "from-sky-950/70 to-ink-800", match: 0.97 },
  { tc: "01:03:44", look: "from-ink-700 to-ink-900" },
  { tc: "01:12:30", look: "from-fuchsia-950/60 to-ink-800", match: 0.91 },
  { tc: "01:26:15", look: "from-indigo-950/70 to-ink-800" },
  { tc: "01:38:02", look: "from-violet-900/50 to-ink-900", match: 0.95 },
];

const MATCH_COUNT = FRAMES.filter((f) => f.match).length;
const SCAN_MS = 240;
const HOLD_MS = 4200;

/**
 * The flagship demo: a reference photo scans a wall of footage frames,
 * matches ring in with confidence scores, and ranked crops export — on loop.
 */
export default function FaceSearchDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scanned, setScanned] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setScanned(FRAMES.length);
          io.disconnect();
        }
      });
      io.observe(el);
      return () => io.disconnect();
    }

    let timer: ReturnType<typeof setTimeout>;
    let running = false;

    const step = (n: number) => {
      setScanned(n);
      if (n < FRAMES.length) {
        timer = setTimeout(() => step(n + 1), SCAN_MS);
      } else {
        timer = setTimeout(() => step(0), HOLD_MS);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          step(0);
        } else if (!entry.isIntersecting && running) {
          running = false;
          clearTimeout(timer);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const done = scanned >= FRAMES.length;
  const found = FRAMES.slice(0, scanned).filter((f) => f.match).length;

  return (
    <div ref={rootRef} className="card-surface overflow-hidden">
      {/* Header: the single reference photo */}
      <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
        <div className="relative">
          <div className="flex size-10 items-center justify-center rounded-lg bg-linear-to-br from-violet-500/70 to-fuchsia-500/50 text-sm font-bold text-white ring-2 ring-violet-400/70">
            A
          </div>
          <span className="absolute -right-1 -bottom-1 flex size-3.5 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-bold text-ink-950">
            ✓
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-frost">aarav.jpg — 1 reference photo</p>
          <p className="font-mono text-[10px] text-mist" aria-live="polite">
            {done
              ? `${MATCH_COUNT} appearances found across 01:38:02 of footage`
              : `scanning footage… ${Math.min(scanned, FRAMES.length)}/${FRAMES.length} segments`}
          </p>
        </div>
        <span
          className={`ml-auto rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
            done
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
              : "border-violet-400/30 bg-violet-500/10 text-violet-300"
          }`}
        >
          {done ? "complete" : "searching"}
        </span>
      </div>

      {/* Footage wall */}
      <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-4" aria-hidden>
        {FRAMES.map((f, i) => {
          const isScanned = i < scanned;
          const isMatch = isScanned && f.match;
          const isActive = i === scanned && !done;
          return (
            <div
              key={f.tc}
              className={`group/frame relative aspect-video overflow-hidden rounded-md bg-linear-to-br transition-all duration-300 ${f.look} ${
                isMatch
                  ? "ring-2 ring-violet-400 shadow-[0_0_16px_rgb(139_92_246/0.45)] hover:shadow-[0_0_24px_rgb(139_92_246/0.7)]"
                  : isScanned
                    ? "opacity-35 hover:opacity-75"
                    : "opacity-70"
              } ${isActive ? "ring-1 ring-frost/60" : ""}`}
            >
              {/* Person silhouette in matching frames */}
              {f.match && (
                <svg
                  viewBox="0 0 40 24"
                  className={`absolute inset-0 size-full transition-opacity duration-300 ${isScanned ? "opacity-90" : "opacity-25"}`}
                >
                  <circle cx="27" cy="9" r="4.5" fill="rgb(196 181 253 / 0.9)" />
                  <path d="M19 24c0-5 3.6-8 8-8s8 3 8 8z" fill="rgb(196 181 253 / 0.9)" />
                </svg>
              )}
              {/* Bounding box that expands to the crop edge on hover */}
              {isMatch && (
                <span className="absolute inset-[18%] rounded-sm border border-violet-300/80 transition-all duration-200 group-hover/frame:inset-[4%]" />
              )}
              <span className="absolute bottom-1 left-1.5 font-mono text-[8px] text-white/70 sm:text-[9px]">
                {f.tc}
              </span>
              {isMatch && (
                <span className="absolute top-1 right-1 rounded bg-violet-500/90 px-1 py-px font-mono text-[8px] font-bold text-white sm:text-[9px]">
                  {Math.round(f.match! * 100)}%
                </span>
              )}
              {/* Scan sweep on the active frame */}
              {isActive && (
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-violet-400/30 to-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {/* Export line */}
      <div className="border-t border-white/8 px-4 py-3">
        <p className="flex items-center gap-2 font-mono text-[11px] text-mist sm:text-xs">
          <span className={done ? "text-emerald-400" : "text-violet-400"}>
            {done ? "✓" : "›"}
          </span>
          {done ? (
            <>
              exported {MATCH_COUNT} ranked crops → <span className="text-frost">cast/aarav/</span> + profile.json
            </>
          ) : (
            <>
              {found} match{found === 1 ? "" : "es"} so far — ranking crops by sharpness &amp; framing
            </>
          )}
        </p>
      </div>
    </div>
  );
}
