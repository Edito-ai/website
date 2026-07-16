"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A tall scroll section pinning one journey to the screen: community reports
 * land, they paint a step-free layer over the map, a route is planned around
 * the broken lift, a traveler walks it with live detection, and arrives.
 * The scrollbar walks the route — the same scrubbed-pin pattern as
 * Adarpan Cut's TheCut, so the two products feel like siblings.
 */
const PHASES = [
  { at: 0, label: "REPORT", note: "three reports in the last hour — 12 seconds each to file" },
  { at: 0.24, label: "MAP", note: "reports become a live step-free layer over every street" },
  { at: 0.44, label: "ROUTE", note: "step-free beats shortest — the lift is down, so no lift" },
  { at: 0.66, label: "GO", note: "the camera watches the path ahead while you move" },
  { at: 0.9, label: "ARRIVE", note: "zero steps, zero surprises" },
];

/* The planned route follows verified infrastructure (all straight segments,
   so the traveler dot is plain linear interpolation — no path APIs needed). */
const ROUTE_PTS: [number, number][] = [
  [50, 300], [190, 300], [190, 240], [330, 240], [330, 120], [400, 120], [400, 60], [470, 60],
];
/* The "shortest" route a normal map would pick — straight through the dead lift. */
const GHOST_PTS: [number, number][] = [
  [50, 300], [260, 300], [260, 60], [470, 60],
];

const PINS = [
  { x: 190, y: 240, at: 0.05, ok: true, label: "Curb cut — verified ✓" },
  { x: 260, y: 180, at: 0.11, ok: false, label: "Lift out — Station St" },
  { x: 330, y: 120, at: 0.17, ok: true, label: "Ramp — east entrance ✓" },
];

/* Streets that the verified reports light up during the MAP phase. */
const OK_SEGMENTS = ["M120,240 L260,240", "M330,180 L330,60", "M50,300 L190,300"];
const BAD_SEGMENT = "M260,240 L260,120";

const CALLOUTS = [
  { at: 0.68, left: "56%", top: "56%", text: "camera: clear path ✓" },
  { at: 0.78, left: "68%", top: "20%", text: "curb cut on your right" },
];

function toPath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

/** Point at fraction t along the polyline, by arc length. */
function pointAt(pts: [number, number][], t: number): [number, number] {
  const lens: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    lens.push(l);
    total += l;
  }
  let target = t * total;
  for (let i = 0; i < lens.length; i++) {
    if (target <= lens[i]) {
      const f = lens[i] === 0 ? 0 : target / lens[i];
      return [
        pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f,
        pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f,
      ];
    }
    target -= lens[i];
  }
  return pts[pts.length - 1];
}

export default function JourneyScrub() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = outer.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setP(total > 0 ? clamp(-rect.top / total, 0, 1) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const phase = [...PHASES].reverse().find((ph) => p >= ph.at) ?? PHASES[0];
  const layer = clamp((p - 0.25) / 0.14, 0, 1); // step-free layer paints in
  const ghost = clamp((p - 0.44) / 0.05, 0, 1); // rejected shortest route
  const drawn = clamp((p - 0.5) / 0.36, 0, 1); // planned route + traveler
  const arrived = p > 0.9;
  const [dotX, dotY] = pointAt(ROUTE_PTS, drawn);

  return (
    <div ref={outerRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent_80%)]"
        />
        {/* Giant phase word behind the map */}
        <p
          aria-hidden
          className="text-outline pointer-events-none absolute top-[7%] left-1/2 w-full -translate-x-1/2 text-center font-mono text-[clamp(3.5rem,14vw,11rem)] font-black tracking-tighter select-none"
        >
          {phase.label}
        </p>

        <div className="card-surface relative z-10 w-full max-w-3xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3">
            <span aria-hidden className="animate-blink size-1.5 rounded-full bg-teal-400" />
            <span className="truncate font-mono text-xs text-mist">
              accessway — one journey · <span className="text-teal-300">step-free mode</span>
            </span>
            <span className="ml-auto font-mono text-[10px] tracking-widest text-mist uppercase">
              {Math.round(p * 100)}%
            </span>
          </div>

          {/* Map */}
          <div className="relative" aria-hidden>
            <svg viewBox="0 0 520 340" className="block w-full">
              <defs>
                <linearGradient id="js-route" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <rect width="520" height="340" fill="#0e0e13" />

              {[50, 120, 190, 260, 330, 400, 470].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="340" stroke="#ffffff0e" strokeWidth="1.5" />
              ))}
              {[60, 120, 180, 240, 300].map((y) => (
                <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="#ffffff0e" strokeWidth="1.5" />
              ))}
              <rect x="62" y="132" width="46" height="36" rx="4" fill="#ffffff05" />
              <rect x="272" y="252" width="46" height="36" rx="4" fill="#ffffff05" />
              <rect x="412" y="132" width="46" height="36" rx="4" fill="#ffffff05" />

              {/* MAP phase: the step-free layer painting itself over the streets */}
              <g style={{ opacity: layer }}>
                {OK_SEGMENTS.map((d) => (
                  <path key={d} d={d} fill="none" stroke="#2dd4bf55" strokeWidth="7" strokeLinecap="round" />
                ))}
                <path d={BAD_SEGMENT} fill="none" stroke="#f8717144" strokeWidth="7" strokeLinecap="round" />
              </g>

              {/* ROUTE phase: the shortest route, considered and rejected */}
              <g style={{ opacity: ghost * (1 - drawn * 0.7) }}>
                <path
                  d={toPath(GHOST_PTS)}
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="2.5"
                  strokeDasharray="6 7"
                  opacity="0.55"
                />
                <text x="272" y="150" fontSize="11" fontWeight="600" fill="#f87171">
                  ✕ shortest — lift is down
                </text>
              </g>

              {/* The planned route, drawn by your scrollbar */}
              <path
                d={toPath(ROUTE_PTS)}
                pathLength={1}
                fill="none"
                stroke="url(#js-route)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ strokeDasharray: 1, strokeDashoffset: 1 - drawn }}
              />

              {/* Report pins — the data the route is built from */}
              {PINS.map((pin) => {
                const on = p >= pin.at;
                return (
                  <g
                    key={pin.label}
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? "translateY(0)" : "translateY(-10px)",
                      transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="8"
                      fill={pin.ok ? "#2dd4bf22" : "#f8717122"}
                      stroke={pin.ok ? "#2dd4bf" : "#f87171"}
                      strokeWidth="1.5"
                    />
                    <text
                      x={pin.x}
                      y={pin.y + 3.5}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill={pin.ok ? "#2dd4bf" : "#f87171"}
                    >
                      {pin.ok ? "✓" : "!"}
                    </text>
                    <text
                      x={pin.x}
                      y={pin.y - 14}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="500"
                      fill={pin.ok ? "#99f6e4" : "#fca5a5"}
                    >
                      {pin.label}
                    </text>
                  </g>
                );
              })}

              {/* Start & destination */}
              <circle cx="50" cy="300" r="8" fill="#0a0a0e" stroke="#2dd4bf" strokeWidth="2.5" />
              <text x="50" y="324" textAnchor="middle" fontSize="11" fontWeight="500" fill="#c7c7d1">
                You
              </text>
              <circle
                cx="470"
                cy="60"
                r="8"
                fill="#60a5fa"
                style={{
                  transform: arrived ? "scale(1.3)" : "scale(1)",
                  transformOrigin: "470px 60px",
                  transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
              {arrived && (
                <circle cx="470" cy="60" r="8" fill="none" stroke="#60a5fa" strokeWidth="2" className="animate-ping" style={{ transformOrigin: "470px 60px" }} />
              )}
              <text x="470" y="40" textAnchor="middle" fontSize="11" fontWeight="500" fill="#c7c7d1">
                Destination
              </text>

              {/* The traveler — rides the route as you scroll */}
              <g style={{ opacity: drawn > 0.01 ? 1 : 0, transition: "opacity 0.3s ease" }}>
                <circle cx={dotX} cy={dotY} r="10" fill="#2dd4bf2e" />
                <circle cx={dotX} cy={dotY} r="5" fill="#2dd4bf" />
              </g>
            </svg>

            {/* GO phase: live-detection callouts near the path */}
            {CALLOUTS.map((c) => (
              <div
                key={c.text}
                style={{ left: c.left, top: c.top }}
                className={`absolute rounded-lg border border-teal-400/40 bg-ink-950/90 px-2.5 py-1.5 font-mono text-[10px] text-teal-300 shadow-lg backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  p >= c.at && !arrived ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {c.text}
              </div>
            ))}

            {/* Arrival toast */}
            <div
              className={`absolute right-3 bottom-3 flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-ink-900/90 px-3 py-2 font-mono text-[11px] text-emerald-300 shadow-lg backdrop-blur transition-all duration-500 ${
                arrived ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              ✓ arrived — step-free the whole way
            </div>
          </div>

          {/* What the app is doing right now, in words */}
          <div className="border-t border-white/8 px-4 py-3">
            <p className="flex items-center gap-2 font-mono text-[11px] text-mist sm:text-xs">
              <span className={arrived ? "text-emerald-400" : "text-teal-400"}>
                {arrived ? "✓" : "›"}
              </span>
              {phase.note}
            </p>
          </div>
        </div>

        {/* Phase rail */}
        <div className="relative z-10 mt-6 flex items-center gap-2 sm:gap-4">
          {PHASES.map((ph) => (
            <span
              key={ph.label}
              className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest transition-all duration-300 sm:text-xs ${
                phase.label === ph.label
                  ? "border-teal-400/60 bg-teal-500/15 text-teal-200 shadow-[0_0_16px_rgb(45_212_191/0.35)]"
                  : "border-white/10 text-mist"
              }`}
            >
              {ph.label}
            </span>
          ))}
        </div>

        <p
          className={`relative z-10 mt-4 font-mono text-[11px] tracking-[0.25em] text-mist uppercase transition-opacity duration-500 ${
            p > 0.05 ? "opacity-0" : "opacity-100 animate-pulse"
          }`}
        >
          ▼ scroll — the page walks the route with you
        </p>
      </div>
    </div>
  );
}
