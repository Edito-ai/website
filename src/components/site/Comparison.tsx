"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

const WAVE = [0.4, 0.8, 0.55, 0.95, 0.5, 0.7, 0.35, 0.85, 0.6, 0.9, 0.45, 0.75];

/**
 * Raw footage on the left, the finished cut on the right.
 * Drag the handle to reveal what Broll did.
 */
export default function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(0.5);
  const smooth = useSpring(pos, { stiffness: 220, damping: 28 });
  const clip = useTransform(smooth, (v) => `inset(0 0 0 ${v * 100}%)`);
  const handleLeft = useTransform(smooth, (v) => `${v * 100}%`);

  function setFromEvent(clientX: number) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pos.set(Math.min(0.94, Math.max(0.06, (clientX - rect.left) / rect.width)));
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-40">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Before / After
      </p>
      <WordReveal
        text="Same footage. Different film."
        className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl"
      />

      <Reveal delay={0.15}>
        <div
          ref={ref}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromEvent(e.clientX);
          }}
          onPointerMove={(e) => e.buttons === 1 && setFromEvent(e.clientX)}
          className="cursor-media relative mt-14 aspect-[16/9] touch-pan-y overflow-hidden rounded-2xl border border-line select-none md:aspect-[21/9]"
        >
          {/* Raw side */}
          <div className="absolute inset-0 bg-surface-2">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgb(120_120_130/0.06)_3px,rgb(120_120_130/0.06)_4px)]" />
            <div className="absolute top-5 left-5 space-y-2 font-mono text-[10px] text-muted uppercase md:text-xs">
              <p>REC ● 00:41:22:07</p>
              <p>A-CAM / UNGRADED</p>
              <p>NO AUDIO MIX</p>
            </div>
            <div className="absolute right-5 bottom-5 font-mono text-[10px] text-muted uppercase md:text-xs">
              47 clips, unsorted
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-medium tracking-tight text-muted/60 md:text-4xl">
                Raw footage
              </p>
            </div>
          </div>

          {/* Cinematic side, revealed by the handle */}
          <motion.div
            style={{ clipPath: clip }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,#2a2a33,#0a0a0d_75%)] text-white"
          >
            <div className="absolute inset-x-0 top-0 h-[9%] bg-black" />
            <div className="absolute inset-x-0 bottom-0 h-[9%] bg-black" />
            <div className="absolute top-[13%] left-5 font-mono text-[10px] tracking-widest text-white/50 uppercase md:text-xs">
              Broll cut · graded · mixed
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <p className="text-2xl font-semibold tracking-tight md:text-4xl">
                Cinematic output
              </p>
              <span className="rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold md:text-sm">
                — and every word becomes a caption
              </span>
            </div>
            {/* Music visualization */}
            <div className="absolute bottom-[13%] left-1/2 flex h-8 -translate-x-1/2 items-end gap-1">
              {WAVE.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 90}ms` }}
                  className="animate-eq w-1 rounded-full bg-white/60"
                />
              ))}
            </div>
          </motion.div>

          {/* Drag handle */}
          <motion.div
            style={{ left: handleLeft }}
            className="absolute inset-y-0 z-10 -ml-px w-0.5 bg-white mix-blend-difference"
          >
            <div className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-[var(--shadow-lift)]">
              <ChevronsLeftRight className="size-4" />
            </div>
          </motion.div>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mt-6 text-center font-mono text-xs tracking-widest text-muted uppercase">
          Drag to compare
        </p>
      </Reveal>
    </section>
  );
}
