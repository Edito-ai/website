"use client";

import { cn } from "@/lib/utils";

// Fixed positions — deterministic so server and client render identically.
const DOTS = [
  { x: 6, y: 18, s: 3, d: 0, dur: 13 },
  { x: 14, y: 62, s: 2, d: 2.2, dur: 11 },
  { x: 22, y: 34, s: 2, d: 4.1, dur: 15 },
  { x: 31, y: 78, s: 3, d: 1.4, dur: 12 },
  { x: 38, y: 12, s: 2, d: 5.6, dur: 14 },
  { x: 47, y: 52, s: 2, d: 3.0, dur: 10 },
  { x: 55, y: 86, s: 3, d: 6.8, dur: 16 },
  { x: 63, y: 26, s: 2, d: 0.8, dur: 12 },
  { x: 70, y: 66, s: 2, d: 4.9, dur: 13 },
  { x: 78, y: 8, s: 3, d: 2.7, dur: 15 },
  { x: 85, y: 44, s: 2, d: 7.5, dur: 11 },
  { x: 92, y: 74, s: 2, d: 1.9, dur: 14 },
  { x: 43, y: 92, s: 2, d: 8.3, dur: 12 },
  { x: 88, y: 90, s: 2, d: 5.1, dur: 16 },
];

/** Faint drifting dust. Pass `light` inside always-dark sections. */
export default function Particles({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {DOTS.map((p, i) => (
        <span
          key={i}
          className={cn(
            "animate-particle absolute rounded-full",
            light ? "bg-white/30" : "bg-ink/25",
          )}
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              "--pf-delay": `${p.d}s`,
              "--pf-duration": `${p.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
