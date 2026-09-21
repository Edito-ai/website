import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import PixelDiagram, { type Point, line, ring, dust } from "@/components/fx/PixelDiagram";

/* --- Pixel-dust diagrams, one per step ------------------------------------ */

const UPLOAD_POINTS: Point[] = [
  // upload tray
  ...line(90, 190, 230, 190, 20, 0.5, 1),
  ...line(160, 90, 160, 172, 14, 0.7, 30),
  ...line(130, 120, 160, 90, 8, 0.9, 60),
  ...line(160, 90, 190, 120, 8, 0.9, 80),
  // two footage clips drifting down toward the tray
  ...line(60, 45, 108, 45, 8, 0.4, 110),
  ...line(60, 45, 60, 80, 6, 0.4, 130),
  ...line(108, 45, 108, 80, 6, 0.4, 150),
  ...line(60, 80, 108, 80, 8, 0.4, 170),
  { x: 84, y: 62, r: 3, o: 0.6 },
  ...line(212, 55, 260, 55, 8, 0.4, 200),
  ...line(212, 55, 212, 90, 6, 0.4, 220),
  ...line(260, 55, 260, 90, 6, 0.4, 240),
  ...line(212, 90, 260, 90, 8, 0.4, 260),
  { x: 236, y: 72, r: 3, o: 0.6 },
  ...dust(55, 10, 10, 310, 220, 500),
];

const PROMPT_BUBBLE_POINTS: Point[] = [
  // speech bubble
  ...line(70, 60, 250, 60, 22, 0.5, 1),
  ...line(70, 150, 250, 150, 22, 0.5, 30),
  ...line(70, 60, 70, 150, 12, 0.5, 60),
  ...line(250, 60, 250, 150, 12, 0.5, 80),
  ...line(90, 150, 75, 180, 6, 0.5, 100),
  ...line(75, 180, 108, 152, 6, 0.5, 120),
  // typed sentence inside
  ...line(90, 92, 232, 92, 18, 0.75, 150),
  ...line(90, 118, 190, 118, 12, 0.4, 180),
  // sparkle accents (AI magic)
  ...line(260, 38, 260, 52, 4, 0.8, 210),
  ...line(253, 45, 267, 45, 4, 0.8, 220),
  ...line(38, 168, 38, 180, 3, 0.7, 230),
  ...line(32, 174, 44, 174, 3, 0.7, 240),
  ...dust(50, 10, 10, 310, 220, 700),
];

const FINISHED_CUT_POINTS: Point[] = [
  // video frame
  ...line(70, 55, 250, 55, 20, 0.5, 1),
  ...line(70, 170, 250, 170, 20, 0.5, 30),
  ...line(70, 55, 70, 170, 14, 0.5, 60),
  ...line(250, 55, 250, 170, 14, 0.5, 80),
  // play triangle
  ...line(142, 92, 142, 133, 10, 0.85, 110),
  ...line(142, 92, 184, 112, 9, 0.85, 130),
  ...line(142, 133, 184, 112, 9, 0.85, 150),
  // scrubber below the frame
  ...line(70, 195, 250, 195, 26, 0.3, 180),
  ...ring(150, 195, 4, 10, 0.9, 210, 1.4),
  // completion badge
  ...ring(238, 162, 15, 12, 0.7, 240),
  ...line(230, 162, 236, 169, 4, 0.9, 270),
  ...line(236, 169, 247, 153, 5, 0.9, 290),
  ...dust(45, 10, 10, 310, 220, 900),
];

function UploadDiagram() {
  return <PixelDiagram points={UPLOAD_POINTS} />;
}
function PromptBubbleDiagram() {
  return <PixelDiagram points={PROMPT_BUBBLE_POINTS} />;
}
function FinishedCutDiagram() {
  return <PixelDiagram points={FINISHED_CUT_POINTS} />;
}

/* --- Step data -------------------------------------------------------------- */

interface Step {
  title: string;
  body: string;
  Diagram: () => React.ReactNode;
}

const STEPS: Step[] = [
  {
    title: "Upload your footage",
    body: "Drop in the raw clips — multiple cameras, mismatched audio, hours of footage. No prep, no organizing required.",
    Diagram: UploadDiagram,
  },
  {
    title: "Tell Broll what you want",
    body: "Describe the edit in a sentence. Broll finds the moments, cuts the silences, and builds the story.",
    Diagram: PromptBubbleDiagram,
  },
  {
    title: "Get your finished cut",
    body: "Review, tweak if you like, then export — ready for social, or as an XML timeline for Premiere, Resolve or Final Cut.",
    Diagram: FinishedCutDiagram,
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7">
      <div className="relative overflow-hidden rounded-2xl border border-line/60 bg-surface-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,var(--accent-soft),transparent_65%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="relative flex aspect-[4/3] items-center justify-center p-5">
          <step.Diagram />
        </div>
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

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-8">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={0.12 * i} className="md:h-full">
            <StepCard step={step} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
