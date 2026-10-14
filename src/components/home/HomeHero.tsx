"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import DownloadButton from "@/components/site/DownloadButton";
import { INSTALLER } from "@/lib/site";
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

      <div className="mx-auto max-w-6xl px-5 pt-28 text-center sm:px-8 md:pt-32">
        <motion.div {...rise(0.1)}>
          <Link
            href="/download"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1 pr-3 pl-1 text-[13px] text-ink-2 transition-colors duration-300 hover:border-line-strong"
          >
            <span className="rounded-full bg-red px-2 py-0.5 text-[11px] font-semibold text-white">Now live</span>
            Broll is out — DaVinci Resolve plugin v{INSTALLER.version}
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

        <motion.div {...rise(0.36)} className="mt-10 flex justify-center">
          <div className="band-border rounded-full p-px">
            <div className="flex items-center gap-3 rounded-full bg-surface py-2 pr-5 pl-3 text-left">
              <span className="relative flex size-8 items-center justify-center rounded-full border border-line bg-white/[0.04]">
                <Image src="/davinci-resolve-logo.png" alt="" width={20} height={20} className="size-5" />
                <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-emerald-400" />
              </span>
              <span className="text-sm text-ink-2">
                <strong className="font-semibold text-ink">DaVinci Resolve plugin is ready.</strong>{" "}
                <span className="text-muted max-sm:hidden">Live now for Resolve Studio on Windows.</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div {...rise(0.44)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <DownloadButton href={INSTALLER.url} size="lg">
            Download for Resolve
          </DownloadButton>
          <Link
            href="/#film"
            onPointerEnter={trackLiquid}
            onPointerMove={trackLiquid}
            className={buttonClasses("ghost", "lg", "group/play")}
          >
            <Play className="size-4 fill-current transition-colors duration-300 group-hover/play:text-white" />
            Watch the film
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
