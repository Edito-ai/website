"use client";


import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Play } from "lucide-react";
import Button from "@/components/ui/button";
import Magnetic from "@/components/fx/Magnetic";
import Particles from "@/components/fx/Particles";

/**
 * Floating footage clips. Each drifts continuously, leans with the cursor,
 * and — as the user scrolls — glides into its slot on a timeline near the
 * bottom. Animated signal lines connect the clips while they float free.
 */
const CLIPS = [
  { label: "A012_TAKE3", dur: "00:07", x: 7, y: 16, r: -7, depth: 1.0, slot: 0, img: "/clips/a012_take3.png" },
  { label: "DRONE_04", dur: "00:12", x: 78, y: 11, r: 5, depth: 0.6, slot: 1, img: "/clips/drone_04.png" },
  { label: "INT_STUDIO", dur: "00:05", x: 85, y: 54, r: -4, depth: 1.2, slot: 2, img: "/clips/int_studio.png" },
  { label: "B-ROLL_CITY", dur: "00:09", x: 4, y: 60, r: 6, depth: 0.8, slot: 3, img: "/clips/broll_city.png" },
  { label: "VO_FINAL", dur: "00:14", x: 66, y: 78, r: -5, depth: 1.4, slot: 4, img: "/clips/vo_final.png" },
  { label: "CU_HANDS", dur: "00:04", x: 23, y: 82, r: 8, depth: 0.7, slot: 5, img: "/clips/cu_hands.png" },
];

const SLOT_COUNT = CLIPS.length;

// Signal lines between clips while they float (indices into CLIPS).
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [3, 0],
  [3, 5],
  [5, 4],
  [2, 4],
];

const WAVES = [0.4, 0.9, 0.55, 0.75, 0.35, 0.85, 0.5];

function Clip({
  clip,
  progress,
  mx,
  my,
}: {
  clip: (typeof CLIPS)[number];
  progress: MotionValue<number>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const slotX = 50 + (clip.slot - (SLOT_COUNT - 1) / 2) * 13;
  const left = useTransform(progress, [0, 1], [`${clip.x}vw`, `${slotX - 6}vw`]);
  const top = useTransform(progress, [0, 1], [`${clip.y}vh`, "74vh"]);
  const rotate = useTransform(progress, [0, 1], [clip.r, 0]);
  const scale = useTransform(progress, [0, 1], [1, 0.72]);
  const parallax = useTransform(progress, [0, 0.7], [16 * clip.depth, 0]);
  const px = useTransform([mx, parallax], ([m, p]) => (m as number) * (p as number));
  const py = useTransform([my, parallax], ([m, p]) => (m as number) * (p as number));

  return (
    <motion.div
      style={{ left, top, rotate, scale, x: px, y: py }}
      className="absolute w-40 select-none will-change-transform md:w-48"
    >
      {/* Continuous drift — the clips are never at rest. */}
      <motion.div
        animate={{
          x: [0, 14 * clip.depth, -9 * clip.depth, 0],
          y: [0, -12, 7, 0],
          rotate: [0, 1.6, -1.2, 0],
        }}
        transition={{
          duration: 11 + clip.depth * 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: clip.slot * 0.7,
        }}
        className="rounded-xl border border-line bg-surface p-2 shadow-[var(--shadow-lift)]"
      >
        <div className="cursor-media relative h-16 overflow-hidden rounded-lg bg-gradient-to-br from-surface-2 to-line md:h-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={clip.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          <Play className="absolute top-1.5 left-1.5 size-3 text-white/80 drop-shadow-sm" />
          {/* Live audio waveform */}
          <div className="absolute inset-x-1.5 bottom-1.5 flex h-4 items-end gap-[2px]">
            {WAVES.map((h, i) => (
              <span
                key={i}
                style={{
                  height: `${h * 100}%`,
                  animationDelay: `${(i + clip.slot) * 140}ms`,
                }}
                className="animate-eq w-full rounded-full bg-white/30"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-1 pt-1.5 font-mono text-[10px] text-muted">
          <span>{clip.label}</span>
          <span>{clip.dur}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const assemble = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 16 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 16 });

  const headlineY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const timelineOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const linesOpacity = useTransform(assemble, [0, 0.12, 0.4], [0, 1, 0]);

  function onMove(e: React.PointerEvent) {
    if (reduced) return;
    mxRaw.set((e.clientX / window.innerWidth) * 2 - 1);
    myRaw.set((e.clientY / window.innerHeight) * 2 - 1);
  }

  return (
    <section ref={ref} onPointerMove={onMove} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-clip">
        {/* Ambient background — moving light, dust, never empty. */}
        <div aria-hidden className="absolute inset-0">
          <div className="animate-drift absolute -top-1/4 -left-1/4 size-[70vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40" />
          <div
            className="animate-drift absolute -right-1/3 top-1/3 size-[60vw] rounded-full bg-[radial-gradient(circle,rgb(139_92_246/0.06),transparent_60%)]"
            style={{ animationDelay: "-8s" }}
          />
        </div>
        {!reduced && <Particles />}

        {/* Signal lines connecting the floating clips */}
        {!reduced && (
          <motion.svg
            aria-hidden
            style={{ opacity: linesOpacity }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 hidden h-full w-full md:block"
          >
            {LINKS.map(([a, b], i) => {
              const p1 = { x: CLIPS[a].x + 6, y: CLIPS[a].y + 6 };
              const p2 = { x: CLIPS[b].x + 6, y: CLIPS[b].y + 6 };
              const bend = i % 2 ? 8 : -8;
              return (
                <motion.path
                  key={i}
                  d={`M ${p1.x} ${p1.y} Q ${(p1.x + p2.x) / 2 + bend} ${(p1.y + p2.y) / 2 + bend} ${p2.x} ${p2.y}`}
                  stroke="var(--line-strong)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  className="animate-dash-flow"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.9 + i * 0.15, ease: "easeOut" }}
                />
              );
            })}
          </motion.svg>
        )}

        {/* Floating clips */}
        {!reduced && (
          <div aria-hidden className="absolute inset-0 hidden md:block">
            {CLIPS.map((clip) => (
              <Clip key={clip.label} clip={clip} progress={assemble} mx={mx} my={my} />
            ))}
          </div>
        )}

        {/* Timeline ruler the clips land on */}
        <motion.div
          aria-hidden
          style={{ opacity: timelineOpacity }}
          className="absolute inset-x-[8vw] top-[72vh] hidden md:block"
        >
          <div className="flex justify-between font-mono text-[10px] text-muted">
            {["00:00", "00:10", "00:20", "00:30", "00:40"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="mt-2 h-px bg-line-strong" />
          <div className="mt-14 h-px bg-line" />
        </motion.div>

        {/* Copy */}
        <motion.div
          style={reduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center"
        >
        

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 rounded-full border border-line px-4 py-1.5 font-mono text-xs tracking-widest text-muted uppercase"
          >
            Agentic video editing
          </motion.p>

          <h1>
            <span className="block overflow-hidden">
              <motion.span
                initial={reduced ? false : { y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[clamp(4.5rem,16vw,12rem)] leading-[0.95] font-semibold tracking-tighter"
              >
                Broll<span className="text-accent">.</span>
              </motion.span>
            </span>

            <span className="mt-4 block overflow-hidden pb-[0.15em]">
              <motion.span
                initial={reduced ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block text-xl font-medium tracking-tight text-ink-2 text-balance md:text-3xl"
              >
                The AI editor that finishes videos{" "}
                <span className="font-serif italic">before</span> you do.
              </motion.span>
            </span>
          </h1>

      

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Button size="lg">Start Creating</Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="ghost">
                <Play className="size-4" />
                Watch Demo
              </Button>
            </Magnetic>
          </motion.div>
    
        </motion.div>
      </div>
    </section>
  );
}
