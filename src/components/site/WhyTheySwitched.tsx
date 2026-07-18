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
import { ArrowRight, ArrowDown } from "lucide-react";

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
  // Struck through one by one as the scroll progresses.
  const t0 = 0.08 + index * 0.05;
  const strike = useTransform(p, [t0, t0 + 0.05], [0, 1]);
  const dim = useTransform(p, [t0, t0 + 0.05], [1, 0.35]);

  return (
    <motion.li style={{ opacity: dim }} className="flex items-baseline gap-4 py-3 md:py-4">
      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span className="relative text-xl font-medium tracking-tight md:text-3xl">
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

function NewStep({
  step,
  index,
  p,
}: {
  step: string;
  index: number;
  p: MotionValue<number>;
}) {
  // Each new step rises in after the arrow has drawn.
  const t0 = 0.56 + index * 0.07;
  const opacity = useTransform(p, [t0, t0 + 0.07], [0, 1]);
  const y = useTransform(p, [t0, t0 + 0.09], [40, 0]);

  return (
    <motion.li
      style={{ opacity, y }}
      className="flex items-baseline gap-4 py-4 md:py-5"
    >
      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span
        className={
          index === 1
            ? "font-serif text-2xl italic md:text-4xl"
            : "text-2xl font-medium tracking-tight md:text-4xl"
        }
      >
        {step}
      </span>
    </motion.li>
  );
}

/**
 * An editorial before/after of the workflow itself, side by side across the
 * full width. Scrolling strikes out the old process step by step, draws an
 * arrow across the divide, and the new three-step reality rises on the
 * right. Eight hours becomes twelve minutes.
 */
export default function WhyTheySwitched() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  const oldDim = useTransform(p, [0.42, 0.52], [1, 0.45]);
  const oldHoursStrike = useTransform(p, [0.42, 0.48], [0, 1]);
  const arrowDraw = useTransform(p, [0.46, 0.56], [0, 1]);
  const arrowHeadOpacity = useTransform(p, [0.54, 0.58], [0, 1]);
  const newLabelOpacity = useTransform(p, [0.52, 0.58], [0, 1]);
  const minutesScale = useTransform(p, [0.8, 0.92], [0.85, 1]);
  const minutesOpacity = useTransform(p, [0.8, 0.9], [0, 1]);

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
      <div className="sticky top-0 flex h-screen flex-col overflow-clip px-6 md:px-10">
        <p className="pt-[7vh] text-center font-mono text-xs tracking-widest text-muted uppercase">
          Why they switched
        </p>

        {/* Full-width split: old on the left, new on the right */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center gap-6 md:grid-cols-[1fr_minmax(6rem,10rem)_1fr] md:items-center md:gap-0">
          {/* Old workflow */}
          <motion.div style={{ opacity: oldDim }}>
            <p className="font-mono text-base font-medium tracking-widest text-ink-2 uppercase md:text-lg">
              Old workflow
            </p>
            <ul className="mt-4 border-l border-line pl-6 md:mt-6">
              {OLD_STEPS.map((step, i) => (
                <OldStep key={step} step={step} index={i} p={p} />
              ))}
            </ul>
            <p className="relative mt-6 inline-block text-5xl font-semibold tracking-tighter text-muted md:mt-8 md:text-7xl">
              8 hours
              <motion.span
                aria-hidden
                style={{ scaleX: oldHoursStrike }}
                className="absolute top-1/2 left-0 h-[3px] w-full origin-left bg-ink"
              />
            </p>
          </motion.div>

          {/* The arrow across the divide */}
          <div className="flex items-center justify-center py-2 md:h-full md:py-0">
            {/* Horizontal on desktop */}
            <div className="hidden w-full items-center md:flex">
              <svg className="h-2 w-full overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none">
                <motion.line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: arrowDraw }}
                />
              </svg>
              <motion.span style={{ opacity: arrowHeadOpacity }}>
                <ArrowRight className="-ml-1 size-6 shrink-0 text-accent" />
              </motion.span>
            </div>
            {/* Vertical on mobile */}
            <div className="flex flex-col items-center md:hidden">
              <svg width="2" height="56" viewBox="0 0 2 56" className="overflow-visible">
                <motion.line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="56"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  style={{ pathLength: arrowDraw }}
                />
              </svg>
              <motion.span style={{ opacity: arrowHeadOpacity }}>
                <ArrowDown className="-mt-1 size-5 text-accent" />
              </motion.span>
            </div>
          </div>

          {/* New workflow */}
          <div>
            <motion.p
              style={{ opacity: newLabelOpacity }}
              className="font-mono text-base font-medium tracking-widest text-accent uppercase md:text-lg"
            >
              New workflow
            </motion.p>
            <ul className="mt-4 border-l border-accent/40 pl-6 md:mt-6">
              {NEW_STEPS.map((step, i) => (
                <NewStep key={step} step={step} index={i} p={p} />
              ))}
            </ul>
            <motion.p
              style={{ scale: minutesScale, opacity: minutesOpacity }}
              className="mt-6 origin-left text-6xl font-semibold tracking-tighter md:mt-8 md:text-8xl"
            >
              12 minutes<span className="text-accent">.</span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
