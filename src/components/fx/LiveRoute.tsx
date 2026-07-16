"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero demo: a route is planned through the station elevator, a community
 * report arrives that the lift is down, and the route recalculates around it —
 * on loop. This is the product's one-sentence promise, running live.
 *
 * Phases: 0 reset · 1 plan route A · 2 report lands · 3 reroute via ramp · 4 arrived (hold)
 */
const PHASE_MS = [600, 2100, 1700, 2000, 3400];
const LAST = PHASE_MS.length - 1;

/* Grid-street geometry (viewBox 480×320). Route A rides the elevator corner;
   route B detours one block east over the verified ramp. */
const ROUTE_A = "M60,250 L220,250 L220,110 L380,110 L380,40";
const ROUTE_B = "M60,250 L300,250 L300,110 L380,110 L380,40";
const V_STREETS = [60, 140, 220, 300, 380];
const H_STREETS = [40, 110, 180, 250];

const STATUS: Record<number, { text: string; tone: "teal" | "red" | "green" }> = {
  0: { text: "planning step-free route…", tone: "teal" },
  1: { text: "route found — via station elevator · 12 min · 0 steps", tone: "teal" },
  2: { text: "community report: elevator out of service — 4 min ago", tone: "red" },
  3: { text: "rerouting via 5th St ramp — before you reach the lift", tone: "teal" },
  4: { text: "arrived — still step-free · +2 min, 0 surprises", tone: "green" },
};

export default function LiveRoute() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduced motion: show the completed reroute as a still.
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setPhase(LAST);
          io.disconnect();
        }
      });
      io.observe(el);
      return () => io.disconnect();
    }

    let timer: ReturnType<typeof setTimeout>;
    let running = false;

    const step = (n: number) => {
      setPhase(n);
      timer = setTimeout(() => step(n === LAST ? 0 : n + 1), PHASE_MS[n]);
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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const reported = phase >= 2;
  const rerouted = phase >= 3;
  const arrived = phase >= 4;
  const status = STATUS[phase];

  return (
    <div ref={rootRef} className="card-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3">
        <span aria-hidden className="animate-blink size-1.5 rounded-full bg-teal-400" />
        <p className="truncate font-mono text-xs text-mist">
          accessway — live map · <span className="text-teal-300">step-free mode</span>
        </p>
        <span
          className={`ml-auto rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
            arrived
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
              : reported && !rerouted
                ? "border-red-400/40 bg-red-500/10 text-red-300"
                : "border-teal-400/30 bg-teal-500/10 text-teal-300"
          }`}
        >
          {arrived ? "arrived" : rerouted ? "rerouting" : reported ? "alert" : "routing"}
        </span>
      </div>

      {/* Map */}
      <div className="relative" aria-hidden>
        <svg viewBox="0 0 480 320" className="block w-full">
          <defs>
            <linearGradient id="lr-route" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <rect width="480" height="320" fill="#101014" />

          {/* Street grid */}
          {V_STREETS.map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="320" stroke="#ffffff10" strokeWidth="1.5" />
          ))}
          {H_STREETS.map((y) => (
            <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#ffffff10" strokeWidth="1.5" />
          ))}
          {/* City blocks, barely there */}
          <rect x="72" y="122" width="56" height="46" rx="4" fill="#ffffff05" />
          <rect x="232" y="192" width="56" height="46" rx="4" fill="#ffffff05" />
          <rect x="312" y="52" width="56" height="46" rx="4" fill="#ffffff05" />

          {/* Route A — via the elevator; dims to a ghost once the report lands */}
          <path
            d={ROUTE_A}
            pathLength={1}
            fill="none"
            stroke="url(#lr-route)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: phase >= 1 ? 0 : 1,
              opacity: rerouted ? 0.16 : 0.95,
              transition:
                phase >= 1
                  ? "stroke-dashoffset 1.7s cubic-bezier(0.45,0,0.2,1), opacity 0.6s ease"
                  : "none",
            }}
          />

          {/* Route B — the reroute over the verified ramp */}
          <path
            d={ROUTE_B}
            pathLength={1}
            fill="none"
            stroke="url(#lr-route)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: rerouted ? 0 : 1,
              transition: rerouted ? "stroke-dashoffset 1.6s cubic-bezier(0.45,0,0.2,1)" : "none",
            }}
          />

          {/* Start */}
          <circle cx="60" cy="250" r="9" fill="#0a0a0e" stroke="#2dd4bf" strokeWidth="2.5" />
          <circle cx="60" cy="250" r="3.5" fill="#2dd4bf" className="animate-pulse" />
          <text x="60" y="274" textAnchor="middle" fontSize="11" fontWeight="500" fill="#c7c7d1">
            You
          </text>

          {/* Destination */}
          <circle
            cx="380"
            cy="40"
            r="8"
            fill="#60a5fa"
            style={{
              transform: arrived ? "scale(1.25)" : "scale(1)",
              transformOrigin: "380px 40px",
              transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
          {arrived && (
            <circle cx="380" cy="40" r="8" fill="none" stroke="#60a5fa" strokeWidth="2" className="animate-ping" style={{ transformOrigin: "380px 40px" }} />
          )}
          <text x="380" y="22" textAnchor="middle" fontSize="11" fontWeight="500" fill="#c7c7d1">
            Destination
          </text>

          {/* Elevator marker — flips from verified to down when the report lands */}
          <g style={{ transition: "opacity 0.4s ease" }}>
            <rect
              x="208"
              y="98"
              width="24"
              height="24"
              rx="7"
              fill={reported ? "#f8717122" : "#2dd4bf1e"}
              stroke={reported ? "#f87171" : "#2dd4bf"}
              strokeWidth="1.5"
              style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
            />
            <text
              x="220"
              y="114"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={reported ? "#f87171" : "#2dd4bf"}
              style={{ transition: "fill 0.4s ease" }}
            >
              {reported ? "!" : "E"}
            </text>
            {reported && !arrived && (
              <circle cx="220" cy="110" r="14" fill="none" stroke="#f87171" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: "220px 110px" }} />
            )}
          </g>

          {/* Ramp marker — the community-verified detour */}
          <g style={{ opacity: rerouted ? 1 : 0.55, transition: "opacity 0.4s ease" }}>
            <rect x="288" y="238" width="24" height="24" rx="7" fill="#2dd4bf1e" stroke="#2dd4bf" strokeWidth="1.5" />
            <text x="300" y="254" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2dd4bf">
              R
            </text>
          </g>

          {/* An ambient verified curb cut — the map already knows things */}
          <circle cx="140" cy="180" r="4" fill="#2dd4bf66" stroke="#2dd4bf" strokeWidth="1" />
        </svg>

        {/* Report chip, dropped next to the elevator */}
        <div
          aria-hidden
          style={{ left: "48.5%", top: "24%" }}
          className={`absolute max-w-[46%] rounded-lg border border-red-400/40 bg-ink-950/90 px-2.5 py-1.5 font-mono text-[10px] leading-snug text-red-300 shadow-lg backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            reported ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          ⚠ Lift out of service
          <span className="block text-[9px] text-mist">reported 4 min ago · confirmed ×2</span>
        </div>

        {/* Reroute chip near the ramp */}
        <div
          aria-hidden
          style={{ right: "4%", bottom: "18%" }}
          className={`absolute rounded-lg border border-teal-400/40 bg-ink-950/90 px-2.5 py-1.5 font-mono text-[10px] leading-snug text-teal-300 shadow-lg backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            rerouted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          ✓ Ramp — verified
          <span className="block text-[9px] text-mist">still step-free · +2 min</span>
        </div>
      </div>

      {/* Status line — what the app is thinking, in words */}
      <div className="border-t border-white/8 px-4 py-3">
        <p aria-live="polite" className="flex items-center gap-2 font-mono text-[11px] text-mist sm:text-xs">
          <span
            className={
              status.tone === "red"
                ? "text-red-400"
                : status.tone === "green"
                  ? "text-emerald-400"
                  : "text-teal-400"
            }
          >
            {status.tone === "green" ? "✓" : "›"}
          </span>
          {status.text}
        </p>
      </div>
    </div>
  );
}
