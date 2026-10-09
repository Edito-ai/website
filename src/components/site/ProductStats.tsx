import Reveal from "@/components/fx/Reveal";
import CountUp from "@/components/fx/CountUp";

const STATS = [
  { value: "200M+", label: "monthly views powered by teams using Broll" },
  { value: "15M+", label: "follower production house among Broll's users" },
];

/** Proof band: two counted numbers, then the 8h → 12m headline stat. */
export default function ProductStats() {
  return (
    <section className="border-y border-line px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-line max-md:divide-y md:grid-cols-[1fr_1fr_1.4fr] md:divide-x">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={0.1 * i} className="py-12 md:px-10 md:py-16 md:first:pl-0">
            <CountUp value={stat.value} className="font-display block text-5xl md:text-6xl" />
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">{stat.label}</p>
          </Reveal>
        ))}
        <Reveal delay={0.2} className="py-12 md:px-10 md:py-16 md:pr-0">
          <p className="font-display flex flex-wrap items-baseline gap-x-4 text-5xl md:text-6xl">
            <span className="text-muted line-through decoration-red decoration-[3px]">8h</span>
            <span aria-hidden className="text-red">→</span>
            <span className="text-brand">12m</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            typical edit time, before human review
          </p>
        </Reveal>
      </div>
    </section>
  );
}
