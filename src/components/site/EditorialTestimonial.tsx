"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Tilt from "@/components/fx/Tilt";
import Reveal from "@/components/fx/Reveal";
import Counter from "@/components/fx/Counter";

const LINES = [
  "We don't edit first drafts anymore.",
  "Broll delivers them before our editors even open Premiere.",
  "Our team now focuses on storytelling instead of timelines.",
];

/**
 * One voice, full screen. The card scales up out of the scroll,
 * leans toward the cursor, and the quote lands line by line.
 */
export default function EditorialTestimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const y = useTransform(p, [0, 1], [90, 0]);
  const opacity = useTransform(p, [0, 0.5], [0, 1]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-clip px-4 py-28 md:px-8">
      {/* Moving light behind the card */}
      <div
        aria-hidden
        className="animate-drift absolute top-1/4 left-1/3 size-[50vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-30"
      />

      <div ref={ref} className="w-full max-w-4xl">
        <motion.div style={{ scale, y, opacity }}>
          <Tilt max={3.5}>
            <figure className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-7 py-14 text-center shadow-[var(--shadow-lift)] md:px-20 md:py-20">
              {/* Inner ambient light */}
              <div
                aria-hidden
                className="animate-drift absolute -top-1/2 left-1/4 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(139_92_246/0.05),transparent_60%)]"
              />

              <div
                aria-label="Five stars"
                className="relative text-lg tracking-[0.5em] text-ink"
              >
                ★★★★★
              </div>

              <blockquote className="relative mt-10 space-y-6">
                {LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + i * 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={
                      i === 1
                        ? "text-2xl leading-snug font-semibold tracking-tight text-balance md:text-4xl"
                        : "text-xl leading-snug font-medium tracking-tight text-ink-2 text-balance md:text-2xl"
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </blockquote>

              <motion.figcaption
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 }}
                className="relative mt-12"
              >
                <p className="font-medium">Production Team</p>
                <p className="mt-1 font-mono text-xs tracking-widest text-muted uppercase">
                  20M+ followers across YouTube &amp; Instagram
                </p>
              </motion.figcaption>
            </figure>
          </Tilt>

          <Reveal delay={0.2} className="mt-16 text-center">
            <p className="text-7xl font-semibold tracking-tighter md:text-8xl">
              <Counter to={20} suffix="M+" />
            </p>
            <p className="mt-2 font-mono text-xs tracking-widest text-muted uppercase">
              Followers
            </p>
            <p className="mx-auto mt-6 max-w-md text-muted">
              Trusted every week by one of India&apos;s fastest-growing
              production houses.
            </p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
