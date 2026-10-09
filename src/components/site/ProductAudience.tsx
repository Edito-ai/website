import { Building2, Users, Briefcase } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import Spotlight from "@/components/fx/Spotlight";
import SectionHeader from "@/components/site/SectionHeader";

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
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Who it's for" title="Built for teams shipping video every week." />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.title} delay={0.1 * i}>
              <Spotlight as="article" className="group relative h-full overflow-hidden p-8 md:p-10">
                <span
                  aria-hidden
                  className="hairline-red absolute inset-x-0 top-0 h-px scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                />
                <a.icon className="size-7 text-red" strokeWidth={1.4} />
                <h3 className="font-display mt-14 text-2xl md:text-3xl">{a.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-2/70">{a.body}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
