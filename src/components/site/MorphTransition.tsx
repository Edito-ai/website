"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * The connective tissue after the hero: a pinned scene where the timeline
 * morphs into a workflow graph, which collapses into an AI core. Everything
 * is scrubbed by scroll — nothing appears, it all transforms.
 */
export default function MorphTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  // Phase 1 → 2: timeline segments spread into workflow nodes.
  const phase2 = useTransform(p, [0.15, 0.45], [0, 1]);
  // Phase 2 → 3: nodes converge into the core.
  const phase3 = useTransform(p, [0.55, 0.85], [0, 1]);

  const timelineOpacity = useTransform(p, [0, 0.25], [1, 0]);
  const graphOpacity = useTransform([phase2, phase3], ([a, b]: number[]) =>
    Math.min(a, 1 - b),
  );
  const draw = phase2;
  const coreScale = useTransform(phase3, [0, 1], [0.4, 1]);
  const coreOpacity = phase3;

  const label = useTransform(p, (v): string =>
    v < 0.3 ? "Your footage" : v < 0.65 ? "Becomes a plan" : "Becomes intelligence",
  );

  // Workflow node positions (viewBox 800x400).
  const nodes = [
    { x: 130, y: 200 },
    { x: 300, y: 110 },
    { x: 300, y: 290 },
    { x: 490, y: 200 },
    { x: 660, y: 200 },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
  ] as const;

  if (reduced) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <p className="text-2xl text-ink-2 md:text-3xl">
          Your footage becomes a plan. The plan becomes intelligence.
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} aria-hidden className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-clip px-6">
        <motion.p className="mb-12 font-mono text-xs tracking-widest text-muted uppercase">
          {label}
        </motion.p>

        <div className="relative h-[46vh] w-full max-w-4xl">
          {/* Phase 1 — timeline */}
          <motion.div
            style={{ opacity: timelineOpacity }}
            className="absolute inset-0 flex items-center justify-center gap-2"
          >
            {[24, 14, 20, 10, 18, 12].map((w, i) => (
              <div
                key={i}
                style={{ width: `${w}%` }}
                className="h-14 rounded-lg border border-line bg-surface-2"
              />
            ))}
          </motion.div>

          {/* Phase 2 — workflow graph with drawn connections */}
          <motion.div style={{ opacity: graphOpacity }} className="absolute inset-0">
            <svg viewBox="0 0 800 400" className="h-full w-full" fill="none">
              {edges.map(([a, b], i) => (
                <motion.path
                  key={i}
                  d={`M ${nodes[a].x} ${nodes[a].y} C ${(nodes[a].x + nodes[b].x) / 2} ${nodes[a].y}, ${(nodes[a].x + nodes[b].x) / 2} ${nodes[b].y}, ${nodes[b].x} ${nodes[b].y}`}
                  stroke="var(--line-strong)"
                  strokeWidth="1.5"
                  style={{ pathLength: draw }}
                />
              ))}
              {nodes.map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r="26" fill="var(--surface)" stroke="var(--line-strong)" />
                  <circle cx={n.x} cy={n.y} r="5" fill="var(--muted)" />
                </g>
              ))}
            </svg>
            <div className="absolute inset-x-0 -bottom-2 flex justify-center gap-10 font-mono text-[10px] text-muted uppercase">
              <span>Ingest</span>
              <span>Understand</span>
              <span>Plan</span>
              <span>Edit</span>
              <span>Deliver</span>
            </div>
          </motion.div>

          {/* Phase 3 — the core */}
          <motion.div
            style={{ opacity: coreOpacity, scale: coreScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative flex size-44 items-center justify-center md:size-56">
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  animate={{ rotate: ring % 2 ? -360 : 360 }}
                  transition={{ duration: 24 + ring * 10, repeat: Infinity, ease: "linear" }}
                  className="absolute rounded-full border border-line-strong"
                  style={{
                    inset: `${ring * 14}%`,
                    borderStyle: ring === 1 ? "dashed" : "solid",
                  }}
                />
              ))}
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="size-16 rounded-full bg-ink shadow-[0_0_60px_-10px_var(--glow)] md:size-20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
