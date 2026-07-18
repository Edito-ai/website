"use client";

import Reveal from "@/components/fx/Reveal";

const QUOTES = [
  {
    quote:
      "We stopped opening our editing software. Footage goes in after a shoot, a finished Broll cut is waiting by the time we've had coffee.",
    who: "Head of Content · 15M+ follower production house",
  },
  {
    quote:
      "The first edit it produced was better than our second draft usually is.",
    who: "Documentary editor",
  },
  {
    quote:
      "Our shorts output went from three a week to three a day. Same team.",
    who: "Short-form lead",
  },
  {
    quote:
      "It found the hook in a 40-minute interview in under a minute. That used to be my whole afternoon.",
    who: "Podcast producer",
  },
  {
    quote:
      "The captions alone would be worth it. The fact that it also cuts, grades, and mixes still feels unfair.",
    who: "Independent creator",
  },
  {
    quote:
      "Notes used to take a day to apply. Now they take a sentence.",
    who: "Creative director, ad studio",
  },
];

/** Floating quote cards on an infinite drift. Hover pauses the row. */
export default function Testimonials() {
  return (
    <section className="overflow-hidden py-28 md:py-40">
      <Reveal className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          What teams say
        </p>
      </Reveal>

      <div className="marquee mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-6 pr-6 [--marquee-duration:70s]">
          {[...QUOTES, ...QUOTES].map((q, i) => (
            <figure
              key={i}
              className="w-[20rem] shrink-0 rounded-2xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-[var(--shadow-lift)] md:w-[24rem]"
            >
              <blockquote className="leading-relaxed text-ink-2">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs tracking-wide text-muted">
                {q.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
