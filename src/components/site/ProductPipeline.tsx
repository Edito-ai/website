import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import PixelDiagram, { type Point, line, ring, dust, dot } from "@/components/fx/PixelDiagram";

const NODE_X = [110, 370, 630, 890];
const NODE_Y = 110;
const NODE_R = 34;

function node(cx: number, cy: number, seedBase: number): Point[] {
  return ring(cx, cy, NODE_R, 26, 0.7, seedBase, 1.6);
}

function connector(x0: number, x1: number, seedBase: number): Point[] {
  return line(x0, NODE_Y, x1, NODE_Y, 16, 0.4, seedBase);
}

const PIPELINE_POINTS: Point[] = [
  ...node(NODE_X[0], NODE_Y, 1),
  ...node(NODE_X[1], NODE_Y, 100),
  ...node(NODE_X[2], NODE_Y, 200),
  ...node(NODE_X[3], NODE_Y, 300),
  ...connector(NODE_X[0] + NODE_R, NODE_X[1] - NODE_R, 400),
  ...connector(NODE_X[1] + NODE_R, NODE_X[2] - NODE_R, 450),
  ...connector(NODE_X[2] + NODE_R, NODE_X[3] - NODE_R, 500),

  // stage 1 — Ingest & Index: a small grid of indexed frames
  ...[-9, 9].flatMap((dx) => [-9, 9].map((dy) => dot(NODE_X[0] + dx, NODE_Y + dy, 2.2, 0.95))),

  // stage 2 — Understand: a tiny semantic graph, centre linked to three points
  dot(NODE_X[1], NODE_Y, 2.4, 1),
  ...[[-14, -10], [14, -6], [0, 14]].flatMap(([dx, dy], i) => [
    dot(NODE_X[1] + dx, NODE_Y + dy, 2, 0.95),
    ...line(NODE_X[1], NODE_Y, NODE_X[1] + dx, NODE_Y + dy, 5, 0.6, 550 + i * 10),
  ]),

  // stage 3 — Generate the edit: a mini assembled timeline
  ...line(NODE_X[2] - 14, NODE_Y + 12, NODE_X[2] - 14, NODE_Y - 10, 5, 0.9, 600),
  ...line(NODE_X[2], NODE_Y + 15, NODE_X[2], NODE_Y - 6, 5, 0.9, 610),
  ...line(NODE_X[2] + 14, NODE_Y + 9, NODE_X[2] + 14, NODE_Y - 13, 5, 0.9, 620),

  // stage 4 — Refine & deliver: a checkmark
  ...line(NODE_X[3] - 12, NODE_Y, NODE_X[3] - 3, NODE_Y + 10, 6, 0.95, 650),
  ...line(NODE_X[3] - 3, NODE_Y + 10, NODE_X[3] + 15, NODE_Y - 12, 7, 0.95, 660),

  ...dust(70, 20, 20, 980, 200, 900),
];

const STAGES = [
  {
    n: "01",
    title: "Ingest & index",
    body: "Raw footage is uploaded and every frame is indexed as it comes in — no manual logging, no folder structure required.",
  },
  {
    n: "02",
    title: "Understand",
    body: "Broll builds a semantic map of the footage — what's in each shot, how moments relate — so it can be searched and reasoned about like text.",
  },
  {
    n: "03",
    title: "Generate the edit",
    body: "From your prompt, the agent selects moments, removes silences, and assembles a timeline the way a human editor would.",
  },
  {
    n: "04",
    title: "Refine & deliver",
    body: "Captions, color grading and lip sync are applied in the same pass, then the cut ships as a video or an XML timeline.",
  },
];

/** A single wide dot-matrix diagram tracing footage from upload to delivery. */
export default function ProductPipeline() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 sm:px-6 md:px-8 md:py-32">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Under the hood
      </p>
      <WordReveal
        text="From raw footage to a finished cut."
        className="mt-4 max-w-3xl text-4xl font-semibold tracking-tighter md:text-6xl"
      />
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        One pipeline, four stages — the same pass that turns hours of footage
        into a video you can publish.
      </p>

      <Reveal delay={0.15} className="mt-14">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface-2 p-4 sm:p-8">
          <PixelDiagram
            points={PIPELINE_POINTS}
            viewBox="0 0 1000 220"
            className="h-auto w-full text-accent"
          />
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {STAGES.map((stage, i) => (
          <Reveal key={stage.n} delay={0.1 * i}>
            <span className="font-mono text-xs text-muted">{stage.n}</span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">{stage.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{stage.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
