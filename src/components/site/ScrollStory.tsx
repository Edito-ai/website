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
import { Download, ZoomIn } from "lucide-react";

const TRACK_CLIPS = [
  { w: 22, label: "OPEN" },
  { w: 16, label: "HOOK" },
  { w: 26, label: "STORY" },
  { w: 14, label: "B-ROLL" },
  { w: 22, label: "CLOSE" },
];

const WAVE = [
  0.3, 0.7, 0.45, 0.9, 0.6, 0.35, 0.8, 0.5, 0.95, 0.4, 0.65, 0.85, 0.3, 0.7,
  0.55, 0.9, 0.45, 0.6, 0.8, 0.35, 0.75, 0.5, 0.9, 0.4, 0.6, 0.85, 0.5, 0.7,
];

function TimelineClip({
  clip,
  index,
  p,
}: {
  clip: (typeof TRACK_CLIPS)[number];
  index: number;
  p: MotionValue<number>;
}) {
  // Each clip flies in from below-right, staggered across the first phase.
  const t0 = 0.04 + index * 0.045;
  const y = useTransform(p, [t0, t0 + 0.1], [90, 0]);
  const opacity = useTransform(p, [t0, t0 + 0.08], [0, 1]);
  const rotate = useTransform(p, [t0, t0 + 0.1], [4, 0]);

  return (
    <motion.div
      style={{ width: `${clip.w}%`, y, opacity, rotate }}
      className="flex h-12 shrink-0 items-center justify-center rounded-md border border-dark-line bg-dark-surface font-mono text-[10px] tracking-widest text-dark-muted md:h-14"
    >
      {clip.label}
    </motion.div>
  );
}

/**
 * As the user scrolls: clips assemble on the timeline, the playhead scrubs,
 * cuts appear, captions pop onto the preview, the audio track fills with
 * waveform, and finally the export button arrives. The editing story, told
 * by the scrollbar.
 */
export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  const playhead = useTransform(p, [0.28, 0.95], ["0%", "100%"]);
  const cutsOpacity = useTransform(p, [0.3, 0.42], [0, 1]);
  const captionOpacity = useTransform(p, [0.44, 0.52], [0, 1]);
  const captionY = useTransform(p, [0.44, 0.52], [16, 0]);
  const zoomOpacity = useTransform(p, [0.54, 0.62], [0, 1]);
  const zoomScale = useTransform(p, [0.54, 0.62], [0.5, 1]);
  const waveClip = useTransform(p, [0.62, 0.78], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const gradeOpacity = useTransform(p, [0.78, 0.88], [0, 1]);
  const exportScale = useTransform(p, [0.88, 0.96], [0.6, 1]);
  const exportOpacity = useTransform(p, [0.88, 0.95], [0, 1]);
  const frameGlow = useTransform(p, [0.88, 1], ["0 0 0px 0px transparent", "0 0 80px -20px var(--glow)"]);

  const stage = useTransform(p, (v): string =>
    v < 0.28
      ? "Assembling scenes"
      : v < 0.44
        ? "Cutting"
        : v < 0.54
          ? "Writing captions"
          : v < 0.62
            ? "Placing zooms"
            : v < 0.78
              ? "Mixing audio"
              : v < 0.88
                ? "Grading color"
                : "Ready to export",
  );

  if (reduced) return null;

  return (
    <section ref={ref} aria-hidden className="relative h-[400vh] bg-dark-bg">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-clip px-4 md:px-6">
        <motion.p className="mb-8 font-mono text-xs tracking-widest text-dark-muted uppercase">
          {stage}
        </motion.p>

        <motion.div
          style={{ boxShadow: frameGlow }}
          className="w-full max-w-3xl rounded-2xl border border-dark-line bg-dark-bg/60 p-4 md:p-6"
        >
          {/* Preview */}
          <div className="cursor-media relative aspect-video overflow-hidden rounded-xl border border-dark-line bg-[radial-gradient(circle_at_35%_30%,#26262c,#0c0c0f_70%)]">
            {/* Color grade washes over the frame near the end */}
            <motion.div
              style={{ opacity: gradeOpacity }}
              className="absolute inset-0 bg-[linear-gradient(160deg,rgb(64_58_48/0.5),transparent_45%,rgb(28_32_44/0.55))]"
            />
            <motion.div
              style={{ opacity: gradeOpacity }}
              className="absolute top-4 left-4 rounded-full border border-dark-line bg-black/50 px-3 py-1 font-mono text-[10px] tracking-widest text-white/60 uppercase"
            >
              Grade · Cinematic 01
            </motion.div>
            <motion.div
              style={{ opacity: captionOpacity, y: captionY }}
              className="absolute inset-x-0 bottom-6 flex justify-center"
            >
              <span className="rounded-lg bg-black/70 px-4 py-2 text-sm font-semibold text-white md:text-base">
                This is where the story <span className="text-accent">turns</span>.
              </span>
            </motion.div>

            {/* Export button */}
            <motion.div
              style={{ scale: exportScale, opacity: exportOpacity }}
              className="absolute top-4 right-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-dark-ink px-4 py-2 text-xs font-semibold text-dark-bg">
                <Download className="size-3.5" />
                Export 4K
              </span>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative mt-4">
            {/* Zoom markers appear above the track */}
            <motion.div
              style={{ opacity: zoomOpacity, scale: zoomScale }}
              className="absolute -top-8 z-10 flex w-full"
            >
              {["28%", "64%"].map((left) => (
                <span
                  key={left}
                  style={{ left }}
                  className="absolute flex items-center gap-1 rounded-full border border-accent/50 bg-black/60 px-2 py-0.5 font-mono text-[9px] tracking-widest text-accent uppercase"
                >
                  <ZoomIn className="size-3" /> Zoom
                </span>
              ))}
            </motion.div>

            {/* Playhead */}
            <motion.div
              style={{ left: playhead }}
              className="absolute -top-1 bottom-0 z-10 w-px bg-accent shadow-[0_0_12px_var(--accent)]"
            >
              <div className="absolute -top-1 -left-[3px] size-[7px] rounded-sm bg-accent" />
            </motion.div>

            {/* Video track */}
            <div className="relative flex gap-1">
              {TRACK_CLIPS.map((clip, i) => (
                <TimelineClip key={clip.label} clip={clip} index={i} p={p} />
              ))}
              {/* Cut markers */}
              <motion.div style={{ opacity: cutsOpacity }} className="absolute inset-0">
                {TRACK_CLIPS.slice(0, -1).reduce<{ acc: number; marks: React.ReactNode[] }>(
                  (state, clip) => {
                    const at = state.acc + clip.w;
                    state.marks.push(
                      <div
                        key={at}
                        style={{ left: `${at}%` }}
                        className="absolute inset-y-0 w-px bg-glow/70"
                      />,
                    );
                    return { acc: at, marks: state.marks };
                  },
                  { acc: 0, marks: [] },
                ).marks}
              </motion.div>
            </div>

            {/* Audio track */}
            <div className="mt-1.5 h-10 overflow-hidden rounded-md border border-dark-line bg-dark-surface px-2 md:h-12">
              <motion.div
                style={{ clipPath: waveClip }}
                className="flex h-full items-end gap-[3px] py-1.5"
              >
                {WAVE.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h * 100}%` }}
                    className="w-full min-w-[2px] rounded-sm bg-dark-muted/70"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
