"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import CtaLink from "@/components/ui/CtaLink";
import { buttonClasses, trackLiquid } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/**
 * Hero: the promise, a primary CTA and the teaser link.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-glow absolute inset-x-0 top-0 -z-10 h-[900px]" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-5 pt-36 text-center sm:px-8 md:pt-44">
        <motion.div {...rise(0.1)}>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1 pr-3 pl-1 text-[13px] text-ink-2 transition-colors duration-300 hover:border-line-strong"
          >
            <span className="rounded-full bg-red px-2 py-0.5 text-[11px] font-semibold text-white">New</span>
            Backed by Google for Startups
            <ArrowRight className="size-3.5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-red" />
          </Link>
        </motion.div>

        <motion.h1
          {...rise(0.2)}
          className="font-display mx-auto mt-8 max-w-4xl text-[clamp(2.75rem,6.4vw,5.5rem)] text-balance"
        >
          The AI editor that finishes videos{" "}
          <span className="serif-voice text-brand pr-1">before</span> you do.
        </motion.h1>

        <motion.p
          {...rise(0.3)}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2/75 md:text-xl"
        >
          Upload raw footage and describe the video you want. Broll&apos;s agent
          builds the first cut — story, captions and grade — ready for
          Premiere, Resolve or Final Cut.
        </motion.p>

        <motion.div {...rise(0.4)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CtaLink href="/demo" size="lg">
            Book a free demo
          </CtaLink>
          <Link
            href="/#film"
            onPointerEnter={trackLiquid}
            onPointerMove={trackLiquid}
            className={buttonClasses("ghost", "lg", "group/play")}
          >
            <Play className="size-4 fill-current transition-colors duration-300 group-hover/play:text-white" />
            Watch the teaser
          </Link>
        </motion.div>

        <motion.p {...rise(0.5)} className="mt-5 text-sm text-muted">
          No card required · Set up on your footage within 24 hours
        </motion.p>
      </div>
    </section>
  );
}
