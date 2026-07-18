"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

const VERBS = ["Think.", "Plan.", "Create.", "Repeat."];

export default function WhyBroll() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-44">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Why Broll
      </p>

      <WordReveal
        text="Instead of editing…"
        className="mt-4 text-3xl font-medium tracking-tight text-muted md:text-5xl"
      />

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 md:mt-14">
        {VERBS.map((verb, i) => (
          <span key={verb} className="overflow-hidden pb-[0.1em]">
            <motion.span
              initial={{ y: "108%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block text-6xl font-semibold tracking-tighter md:text-[7.5rem]"
            >
              {verb}
            </motion.span>
          </span>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-16 max-w-2xl md:mt-24">
        <p className="text-xl leading-relaxed text-ink-2 md:text-2xl">
          The timeline is dead.{" "}
          <span className="font-serif italic">Agents are the future.</span>
        </p>
        <p className="mt-6 leading-relaxed text-muted">
          You direct. Broll executes. Every version, every format, every
          platform — while you decide what the next film should say.
        </p>
      </Reveal>
    </section>
  );
}
