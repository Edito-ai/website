import { Upload, Wand2, Download, ArrowRight, ArrowDown, type LucideIcon } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

interface Step {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    icon: Upload,
    title: "Upload your footage",
    body: "Drop in the raw clips — multiple cameras, mismatched audio, hours of footage. No prep, no organizing required.",
  },
  {
    n: "02",
    icon: Wand2,
    title: "Tell Broll what you want",
    body: "Describe the edit in a sentence. Broll finds the moments, cuts the silences, and builds the story.",
  },
  {
    n: "03",
    icon: Download,
    title: "Get your finished cut",
    body: "Review, tweak if you like, then export — ready for social, or as an XML timeline for Premiere, Resolve or Final Cut.",
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-7">
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-full border border-line bg-surface-2 transition-colors duration-300 group-hover:border-accent/40">
          <step.icon className="size-5 text-accent" strokeWidth={1.5} />
        </span>
        <span className="font-mono text-xs text-muted">{step.n}</span>
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tighter md:text-2xl">
        {step.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-5 py-24 sm:px-6 md:px-8 md:py-40">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Workflow
      </p>
      <WordReveal
        text="From footage to final cut."
        className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl"
      />
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        Three steps. No timeline, no keyframes, no eight-hour edit session.
      </p>

      <div className="mt-16 flex flex-col gap-6 md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6">
        {STEPS.map((step, i) => (
          <div key={step.n} className="contents">
            <Reveal delay={0.12 * i} className="md:h-full">
              <StepCard step={step} />
            </Reveal>

            {i < STEPS.length - 1 && (
              <Reveal
                delay={0.12 * i + 0.06}
                className="flex items-center justify-center py-1 md:h-full md:py-0"
              >
                <ArrowDown aria-hidden className="size-4 text-muted md:hidden" />
                <ArrowRight aria-hidden className="hidden size-4 text-muted md:block" />
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
