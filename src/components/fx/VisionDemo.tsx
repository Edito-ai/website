"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live obstacle detection, on loop: the camera sweeps the scene, detections
 * ring in one at a time, then the guidance line says what a voice would say.
 * Same header → live surface → output-line anatomy as Adarpan Cut's
 * FaceSearchDemo, so the two flagship demos read as one family.
 */
const DETECTIONS: {
  left: string;
  top: string;
  w: string;
  h: string;
  tone: "red" | "amber" | "teal";
  label: string;
}[] = [
  { left: "7%", top: "34%", w: "26%", h: "44%", tone: "red", label: "stairs · 6 m · avoid" },
  { left: "60%", top: "18%", w: "9%", h: "52%", tone: "amber", label: "pole · 2 m" },
  { left: "72%", top: "64%", w: "23%", h: "24%", tone: "teal", label: "curb cut · clear ✓" },
];

/* step 0: sweep · steps 1–3: detections land · step 4: guidance spoken (hold) */
const STEP_MS = [1300, 650, 650, 650, 4200];
const GUIDANCE = "Stairs ahead. Curb cut three metres to your right, then straight on.";

const toneStyles = {
  red: "border-red-400/80 text-red-300",
  amber: "border-amber-400/80 text-amber-300",
  teal: "border-teal-400/80 text-teal-300",
} as const;

export default function VisionDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduced motion: show every detection and the guidance line as a still.
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setStep(STEP_MS.length - 1);
          io.disconnect();
        }
      });
      io.observe(el);
      return () => io.disconnect();
    }

    let timer: ReturnType<typeof setTimeout>;
    let running = false;

    const advance = (n: number) => {
      setStep(n);
      timer = setTimeout(() => advance(n === STEP_MS.length - 1 ? 0 : n + 1), STEP_MS[n]);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          advance(0);
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

  const speaking = step >= STEP_MS.length - 1;
  const found = Math.min(step, DETECTIONS.length);

  return (
    <div ref={rootRef} className="card-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3">
        <span aria-hidden className="animate-blink size-1.5 rounded-full bg-red-400" />
        <p className="truncate font-mono text-xs text-mist">
          camera · <span className="text-teal-300">obstacle detection</span>
        </p>
        <span
          className={`ml-auto rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
            speaking
              ? "border-teal-400/40 bg-teal-500/10 text-teal-300"
              : "border-white/15 bg-white/5 text-mist"
          }`}
        >
          {speaking ? "guiding" : "scanning"}
        </span>
      </div>

      {/* Viewfinder */}
      <div className="relative aspect-video overflow-hidden bg-ink-950" aria-hidden>
        {/* Abstract street scene, kept dim so the detections carry the light */}
        <svg viewBox="0 0 400 225" className="absolute inset-0 size-full" preserveAspectRatio="none">
          <rect width="400" height="225" fill="#0c0c11" />
          {/* Sidewalk perspective */}
          <path d="M0,225 L150,90 L250,90 L400,225 Z" fill="#ffffff06" />
          <line x1="150" y1="90" x2="0" y2="225" stroke="#ffffff14" strokeWidth="1.5" />
          <line x1="250" y1="90" x2="400" y2="225" stroke="#ffffff14" strokeWidth="1.5" />
          {/* Stairs, left */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={36 - i * 4} y={92 + i * 22} width={94 + i * 10} height="9" rx="1.5" fill="#ffffff10" />
          ))}
          {/* Pole */}
          <rect x="248" y="42" width="7" height="118" rx="3" fill="#ffffff12" />
          {/* Curb cut ramp, right */}
          <path d="M292,196 L382,146 L396,158 L316,212 Z" fill="#2dd4bf14" stroke="#2dd4bf33" strokeWidth="1" />
          {/* Crosswalk hints */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={168 + i * 26} y={196 - i * 3} width="16" height="22" rx="2" fill="#ffffff08" />
          ))}
        </svg>

        {/* Scan sweep */}
        {!speaking && (
          <div className="animate-scan-x absolute inset-0 bg-linear-to-r from-transparent from-35% via-teal-400/15 to-transparent to-65%" />
        )}

        {/* Corner brackets — viewfinder chrome */}
        {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map(
          (pos) => (
            <span key={pos} className={`absolute size-4 border-white/25 ${pos}`} />
          ),
        )}

        {/* Detections */}
        {DETECTIONS.map((d, i) => {
          const on = step > i;
          return (
            <div
              key={d.label}
              style={{ left: d.left, top: d.top, width: d.w, height: d.h }}
              className={`absolute rounded-md border-2 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${toneStyles[d.tone]} ${
                on ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            >
              <span className="absolute -top-6 left-0 rounded bg-ink-950/90 px-1.5 py-0.5 font-mono text-[9px] whitespace-nowrap backdrop-blur sm:text-[10px]">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Guidance — what the voice says */}
      <div className="flex items-center gap-3 border-t border-white/8 px-4 py-3">
        {/* Voice bars: only animate while "speaking" */}
        <span aria-hidden className="flex h-4 items-end gap-0.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.14}s`, height: `${50 + (i % 2) * 40}%` }}
              className={`w-0.5 origin-bottom rounded-full bg-teal-400 ${speaking ? "animate-eq" : "scale-y-[0.3] opacity-40"}`}
            />
          ))}
        </span>
        <p aria-live="polite" className="min-h-4 font-mono text-[11px] text-mist sm:text-xs">
          {speaking ? (
            <span className="text-frost">“{GUIDANCE}”</span>
          ) : (
            <>
              {found} of {DETECTIONS.length} objects identified…
            </>
          )}
        </p>
      </div>
    </div>
  );
}
