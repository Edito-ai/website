import { Building2, Users, Briefcase } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

const AUDIENCE = [
  {
    icon: Building2,
    title: "Production houses",
    body: "Move from raw footage to a client-ready cut without a full manual assembly pass on every project — even running several in parallel.",
  },
  {
    icon: Users,
    title: "Creator teams",
    body: "Turn hours of raw recording into publish-ready videos on a daily schedule, without hiring an editor for every format.",
  },
  {
    icon: Briefcase,
    title: "Agencies",
    body: "Deliver client videos faster without lowering the bar — captions, grading and lip sync happen in the same pass as the cut.",
  },
];

export default function ProductAudience() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 sm:px-6 md:px-8 md:py-32">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">Who it&apos;s for</p>
      <WordReveal
        text="Built for teams shipping video every week."
        className="mt-4 max-w-2xl text-4xl font-semibold tracking-tighter md:text-6xl"
      />

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        {AUDIENCE.map((a, i) => (
          <Reveal key={a.title} delay={0.1 * i}>
            <span className="flex size-11 items-center justify-center rounded-full border border-line bg-surface-2">
              <a.icon className="size-5 text-accent" strokeWidth={1.5} />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{a.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
