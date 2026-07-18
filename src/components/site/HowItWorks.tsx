"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FolderInput,
  Eye,
  Flame,
  BookOpen,
  Scissors,
  Layers,
  Captions,
  AudioLines,
  Send,
} from "lucide-react";
import WordReveal from "@/components/fx/WordReveal";

gsap.registerPlugin(ScrollTrigger);

// Not a feature list — the sequence of thoughts the agent actually has.
const BEATS = [
  {
    icon: FolderInput,
    n: "01",
    title: "Footage enters",
    body: "Raw takes, interviews, b-roll, voice notes. Everything lands in one place, unsorted.",
  },
  {
    icon: Eye,
    n: "02",
    title: "Understands context",
    body: "Every frame watched, every word transcribed. Broll knows who's on screen and what they mean.",
  },
  {
    icon: Flame,
    n: "03",
    title: "Finds the hook",
    body: "The three seconds that earn the next thirty, located before any cut is made.",
  },
  {
    icon: BookOpen,
    n: "04",
    title: "Builds narrative",
    body: "An arc emerges — setup, turn, payoff — assembled from the strongest material.",
  },
  {
    icon: Scissors,
    n: "05",
    title: "Edits",
    body: "Cuts land on rhythm. Pacing and continuity handled without a timeline.",
  },
  {
    icon: Layers,
    n: "06",
    title: "Adds B-roll",
    body: "The right cutaway at the right beat, pulled from your own library.",
  },
  {
    icon: Captions,
    n: "07",
    title: "Creates captions",
    body: "Styled, timed, readable on a phone held at arm's length.",
  },
  {
    icon: AudioLines,
    n: "08",
    title: "Balances audio",
    body: "Music under dialogue, SFX on the cuts, the mix levelled for every platform.",
  },
  {
    icon: Send,
    n: "09",
    title: "Exports",
    body: "Every aspect ratio, every spec. Ready for YouTube, Reels, and ads.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        gsap.utils.toArray<HTMLElement>(".how-card").forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0.2,
            rotate: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 55%",
              scrub: true,
            },
          });
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="how" ref={sectionRef} className="overflow-clip py-24 md:py-0">
      <div className="flex h-auto flex-col justify-center md:h-screen">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Inside the agent
          </p>
          <div className="flex items-end justify-between gap-8">
            <WordReveal
              text="How Broll thinks"
              className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl"
            />
            {/* Scroll progress through the thought process */}
            <div className="mb-3 hidden h-px w-40 overflow-hidden bg-line md:block">
              <div ref={progressRef} className="h-full origin-left scale-x-0 bg-accent" />
            </div>
          </div>
        </div>

        <div className="relative mt-14">
          <div
            ref={trackRef}
            className="relative flex w-max flex-col gap-6 px-6 will-change-transform md:flex-row md:gap-8 md:pr-[38vw] md:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]"
          >
            {/* Dashed thread connecting the beats, visible in the gaps */}
            <div
              aria-hidden
              className="absolute top-[4.4rem] right-0 left-0 hidden border-t border-dashed border-line-strong md:block"
            />

            {BEATS.map((beat) => (
              <article
                key={beat.n}
                className="how-card group relative w-full max-w-[85vw] shrink-0 rounded-2xl border border-line bg-surface p-8 transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-[var(--shadow-lift)] md:w-[22rem] md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-muted">{beat.n}</span>
                  <span className="rounded-full border border-line p-2.5 transition-colors duration-500 group-hover:border-accent/50">
                    <beat.icon
                      className="size-5 text-muted transition-colors duration-500 group-hover:text-accent"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
                <h3 className="mt-14 text-2xl font-semibold tracking-tight md:mt-20">
                  {beat.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{beat.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
