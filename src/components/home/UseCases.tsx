"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionHeader from "@/components/site/SectionHeader";

const CASES = [
  { title: "Podcasts", body: "One conversation, cut into multiple stories.", src: "/clips/vo_final.webp", tag: "16:9 · 9:16" },
  { title: "Production houses", body: "Multi-camera shoots to client-ready cuts.", src: "/clips/int_studio.webp", tag: "Multi-cam" },
  { title: "Creator teams", body: "Daily videos without an editor per format.", src: "/clips/a012_take3.webp", tag: "Daily" },
  { title: "Real estate", body: "A 45-second walkthrough from one prompt.", src: "/clips/drone_04.webp", tag: "Aerial" },
  { title: "Brands & agencies", body: "More output in the same editing time.", src: "/clips/broll_city.webp", tag: "Every ratio" },
];

function Card({ c, index }: { c: (typeof CASES)[number]; index: number }) {
  return (
    <article className="group relative h-[52vh] max-h-[460px] min-h-[320px] w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-line transition-[border-color,box-shadow] duration-500 hover:border-red/50 hover:shadow-[var(--shadow-red)] sm:w-[52vw] md:w-[36vw] lg:w-[30vw]">
      <Image
        src={c.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 36vw, 78vw"
        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080e] via-[#07080e]/40 to-transparent" />
      <span className="absolute top-4 left-4 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur">
        {c.tag}
      </span>
      <span className="absolute top-4 right-5 font-mono text-xs text-white/50">
        {String(index + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl text-white md:text-3xl">{c.title}</h3>
        <p className="mt-1.5 text-[15px] text-white/70">{c.body}</p>
      </div>
    </article>
  );
}

/**
 * Pinned horizontal "side-loading" gallery: the section sticks to the
 * viewport while vertical scroll slides the cards in from the right.
 * Falls back to a plain swipeable row for reduced-motion users.
 */
export default function UseCases() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  // Track is wider than the viewport; slide it left by (track - viewport).
  const x = useTransform(smooth, [0, 1], ["0%", "-62%"]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  const header = (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeader eyebrow="Use cases" title="One AI editor." voice="Every kind of video." />
    </div>
  );

  if (reduced) {
    return (
      <section className="py-24">
        {header}
        <div className="mt-14 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:px-8">
          {CASES.map((c, i) => (
            <div key={c.title} className="snap-start">
              <Card c={c} index={i} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-12 overflow-hidden py-16">
        {header}
        <motion.div style={{ x }} className="flex w-max gap-5 px-5 will-change-transform sm:px-8 md:gap-6">
          {CASES.map((c, i) => (
            <Card key={c.title} c={c} index={i} />
          ))}
        </motion.div>
        <div className="mx-auto h-px w-[min(90%,72rem)] bg-line">
          <motion.div style={{ width: bar }} className="h-px bg-red" />
        </div>
      </div>
    </section>
  );
}
