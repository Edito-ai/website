import Reveal from "@/components/fx/Reveal";

const STATS = [
  { value: "200M+", label: "monthly views powered by teams using Broll" },
  { value: "15M+", label: "follower production house among Broll's users" },
  { value: "8hrs → 12min", label: "typical edit time, before human review" },
];

export default function ProductStats() {
  return (
    <section className="border-y border-line px-5 py-16 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={0.1 * i} className="text-center sm:text-left">
            <p className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
