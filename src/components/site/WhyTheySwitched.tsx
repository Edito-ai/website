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

const NEW_STEPS = ["Upload your footage", "Tell Broll what you want", "Get your finished cut"];

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
    <motion.li style={{ opacity: dim }} className="flex items-baseline gap-3 py-1 md:gap-4 md:py-4">
      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span className="relative text-base font-medium tracking-tight md:text-3xl">
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
      className="flex items-baseline gap-3 py-1.5 md:gap-4 md:py-5"
    >
      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span
        className={
          index === 1
            ? "font-serif text-xl italic md:text-4xl"
            : "text-lg font-medium tracking-tight md:text-4xl"
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
  const arrowHeadOpacity = useTransform(arrowDraw, [0.85, 1], [0, 1]);
  const newLabelOpacity = useTransform(p, [0.52, 0.58], [0, 1]);
  const minutesScale = useTransform(p, [0.8, 0.92], [0.85, 1]);
  const minutesOpacity = useTransform(p, [0.8, 0.9], [0, 1]);

  if (reduced) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          Why they switched
        </h2>
        <p className="mt-6 text-2xl text-ink-2 md:text-3xl">
          Six manual steps and eight hours became three steps and twelve minutes.
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[260vh] md:h-[320vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-clip px-5 md:px-10">
        <h2 className="pt-[4vh] text-center font-mono text-xs tracking-widest text-muted uppercase md:pt-[7vh]">
          Why they switched
        </h2>

        {/* Full-width split: old on the left, new on the right */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center gap-2 md:grid-cols-[1fr_minmax(6rem,10rem)_1fr] md:items-center md:gap-0">
          {/* Old workflow */}
          <motion.div style={{ opacity: oldDim }}>
            <p className="font-mono text-xs font-medium tracking-widest text-ink-2 uppercase md:text-lg">
              Old workflow
            </p>
            <ul className="mt-3 border-l border-line pl-4 md:mt-6 md:pl-6">
              {OLD_STEPS.map((step, i) => (
                <OldStep key={step} step={step} index={i} p={p} />
              ))}
            </ul>
            <p className="relative mt-3 inline-block text-3xl font-semibold tracking-tighter text-muted md:mt-8 md:text-7xl">
              8 hours
              <motion.span
                aria-hidden
                style={{ scaleX: oldHoursStrike }}
                className="absolute top-1/2 left-0 h-[3px] w-full origin-left bg-ink"
              />
            </p>
          </motion.div>

          {/* The arrow across the divide */}
          <div className="flex items-center justify-center py-1 md:h-full md:py-0">
            {/* Horizontal on desktop */}
            <div className="hidden w-full items-center md:flex">
              <motion.div
                style={{ scaleX: arrowDraw }}
                className="h-0.5 min-w-0 flex-1 origin-left bg-accent"
              />
              <motion.span style={{ opacity: arrowHeadOpacity }}>
                <ArrowRight className="-ml-2 size-6 shrink-0 text-accent" />
              </motion.span>
            </div>
            {/* Vertical on mobile */}
            <div className="flex flex-col items-center md:hidden">
              <motion.div
                style={{ scaleY: arrowDraw }}
                className="h-8 w-0.5 origin-top bg-accent"
              />
              <motion.span style={{ opacity: arrowHeadOpacity }}>
                <ArrowDown className="-mt-2 size-5 text-accent" />
              </motion.span>
            </div>
          </div>

          {/* New workflow */}
          <div>
            <motion.p
              style={{ opacity: newLabelOpacity }}
              className="font-mono text-xs font-medium tracking-widest text-accent uppercase md:text-lg"
            >
              New workflow
            </motion.p>
            <ul className="mt-3 border-l border-accent/40 pl-4 md:mt-6 md:pl-6">
              {NEW_STEPS.map((step, i) => (
                <NewStep key={step} step={step} index={i} p={p} />
              ))}
            </ul>
            <motion.p
              style={{ scale: minutesScale, opacity: minutesOpacity }}
              className="mt-3 origin-left text-4xl font-semibold tracking-tighter md:mt-8 md:text-8xl"
            >
              12 minutes<span className="text-accent">.</span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
