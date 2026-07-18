"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

const OLD_STEPS = [
  "Import footage",
  "Watch footage",
  "Find moments",
  "Edit manually",
  "Add captions",
  "Export",
];

const NEW_STEPS = ["Upload footage", "Broll understands everything", "Finished video"];

function OldStep({
  step,
  index,
  p,
}: {
  step: string;
  index: number;
  p: MotionValue<number>;
}) {
  // Each step gets struck through in sequence as the scroll progresses.
  const t0 = 0.12 + index * 0.05;
  const strike = useTransform(p, [t0, t0 + 0.05], [0, 1]);
  const dim = useTransform(p, [t0, t0 + 0.05], [1, 0.35]);

  return (
    <motion.li style={{ opacity: dim }} className="relative flex items-baseline gap-4 py-2.5">
      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span className="relative text-xl font-medium tracking-tight md:text-2xl">
        {step}
        <motion.span
          aria-hidden
          style={{ scaleX: strike }}
          className="absolute top-1/2 left-0 h-px w-full origin-left bg-ink"
        />
      </span>
    </motion.li>
  );
}

/**
 * An editorial before/after of the workflow itself. Scrolling strikes out
 * the old process step by step, draws an arrow, and lets the new three-step
 * reality rise in its place. Eight hours becomes twelve minutes.
 */
export default function WhyTheySwitched() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  const oldY = useTransform(p, [0.42, 0.62], [0, -48]);
  const oldOpacity = useTransform(p, [0.42, 0.62], [1, 0.14]);
  const oldHoursStrike = useTransform(p, [0.44, 0.5], [0, 1]);
  const arrowDraw = useTransform(p, [0.46, 0.58], [0, 1]);
  const arrowOpacity = useTransform(p, [0.46, 0.52, 0.72, 0.8], [0, 1, 1, 0]);
  const newOpacity = useTransform(p, [0.6, 0.72], [0, 1]);
  const newY = useTransform(p, [0.6, 0.78], [70, 0]);
  const minutesScale = useTransform(p, [0.78, 0.9], [0.85, 1]);
  const minutesOpacity = useTransform(p, [0.78, 0.88], [0, 1]);

  if (reduced) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          Why they switched
        </p>
        <p className="mt-6 text-2xl text-ink-2 md:text-3xl">
          Six manual steps and eight hours became three steps and twelve minutes.
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-clip px-6">
        <p className="absolute top-[8vh] font-mono text-xs tracking-widest text-muted uppercase">
          Why they switched
        </p>

        <div className="relative w-full max-w-xl">
          {/* Old workflow */}
          <motion.div style={{ y: oldY, opacity: oldOpacity }}>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              Old workflow
            </p>
            <ul className="mt-4 border-l border-line pl-6">
              {OLD_STEPS.map((step, i) => (
                <OldStep key={step} step={step} index={i} p={p} />
              ))}
            </ul>
            <p className="relative mt-6 inline-block text-4xl font-semibold tracking-tighter text-muted md:text-5xl">
              8 hours
              <motion.span
                aria-hidden
                style={{ scaleX: oldHoursStrike }}
                className="absolute top-1/2 left-0 h-[3px] w-full origin-left bg-ink"
              />
            </p>
          </motion.div>

          {/* Transition arrow */}
          <motion.div
            style={{ opacity: arrowOpacity }}
            className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center"
          >
            <div className="flex flex-col items-center">
              <svg width="2" height="120" viewBox="0 0 2 120" className="overflow-visible">
                <motion.line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="120"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  style={{ pathLength: arrowDraw }}
                />
              </svg>
              <ArrowDown className="-mt-1 size-5 text-accent" />
            </div>
          </motion.div>

          {/* New workflow */}
          <motion.div
            style={{ opacity: newOpacity, y: newY }}
            className="absolute inset-x-0 top-0"
          >
            <p className="font-mono text-xs tracking-widest text-accent uppercase">
              New workflow
            </p>
            <ul className="mt-4 border-l border-accent/40 pl-6">
              {NEW_STEPS.map((step, i) => (
                <li key={step} className="flex items-baseline gap-4 py-4">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={
                      i === 1
                        ? "font-serif text-2xl italic md:text-3xl"
                        : "text-2xl font-medium tracking-tight md:text-3xl"
                    }
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ul>
            <motion.p
              style={{ scale: minutesScale, opacity: minutesOpacity }}
              className="mt-8 origin-left text-6xl font-semibold tracking-tighter md:text-8xl"
            >
              12 minutes<span className="text-accent">.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
