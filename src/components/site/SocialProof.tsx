"use client";

import Counter from "@/components/fx/Counter";
import Reveal from "@/components/fx/Reveal";
import Particles from "@/components/fx/Particles";

const STATS = [
  { value: 20, suffix: "M+", label: "Followers" },
  { value: 500, suffix: "+", label: "Hours edited" },
  { value: 98, suffix: "%", label: "Editing time saved" },
];

/** Dark, quiet, three numbers. No invented logos — just the facts. */
export default function SocialProof() {
  return (
    <section className="relative overflow-clip bg-dark-bg py-32 text-dark-ink md:py-44">
      <Particles light />
      <div
        aria-hidden
        className="animate-drift absolute -top-1/3 right-1/4 size-[50vw] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.04),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <Reveal className="text-center">
          <p className="font-mono text-xs tracking-widest text-dark-muted uppercase">
            In production, today
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={0.1 + i * 0.12}
              className="text-center md:border-l md:border-dark-line md:first:border-l-0"
            >
              <p className="text-7xl font-semibold tracking-tighter md:text-8xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-mono text-xs tracking-widest text-dark-muted uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-20 max-w-xl text-center text-lg leading-relaxed text-dark-muted md:text-xl">
            Trusted by one of India&apos;s fastest-growing production houses —
            where Broll cuts the videos their audience watches every day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
