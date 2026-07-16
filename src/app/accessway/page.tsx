import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/fx/Reveal";
import LiveRoute from "@/components/fx/LiveRoute";
import JourneyScrub from "@/components/fx/JourneyScrub";
import VisionDemo from "@/components/fx/VisionDemo";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "AccessWay — If you can't take the stairs, the map shouldn't either.",
  description:
    "AccessWay is navigation built for the billion people other maps forget — step-free routes indoors and out, live obstacle detection, and a map kept honest by the people who use it.",
};

const trustChips = [
  "Step-free routing, door to door",
  "Live obstacle detection",
  "Community-verified map",
];

const visionPoints = [
  {
    title: "It catches what no map can",
    body: "A parked scooter, fresh scaffolding, a delivery van across the curb cut — none of it is on any map. The camera sees it and says it before you're on top of it.",
  },
  {
    title: "Spoken, not just drawn",
    body: "For people with low vision, a highlighted route is useless. Detections become plain sentences: what's ahead, how far, and which way is clear.",
  },
  {
    title: "It keeps working indoors",
    body: "GPS dies at the front door. Corridors, platforms, and lobbies are where detection matters most — and where it stays on.",
  },
];

const reports = [
  {
    place: "Elevator — Metro Line 3, platform level",
    status: "Out of service",
    tone: "red" as const,
    time: "12 min ago",
    note: "Confirmed by 2 riders. Routes through this station now use the Oak St ramp.",
  },
  {
    place: "Ramp — Central Library, east entrance",
    status: "Verified step-free",
    tone: "teal" as const,
    time: "2 h ago",
    note: "Re-verified this week. Door opener button works.",
  },
  {
    place: "Scaffolding — Harbor St sidewalk",
    status: "Cleared",
    tone: "teal" as const,
    time: "Today",
    note: "Path reopened. Routes switched back to the shorter side.",
  },
  {
    place: "Curb cut — 5th & Main crossing",
    status: "Added to map",
    tone: "teal" as const,
    time: "Yesterday",
    note: "First report from this intersection. One photo, ten seconds.",
  },
];

const reportTone = {
  red: "border-red-400/40 bg-red-500/10 text-red-300",
  teal: "border-teal-400/40 bg-teal-500/10 text-teal-300",
} as const;

const personas = [
  {
    title: "Wheelchair users",
    body: "Routes that guarantee step-free access — not routes that assume a workaround at the curb.",
  },
  {
    title: "People with low vision",
    body: "What's ahead, spoken in the moment. Not discovered after the fact.",
  },
  {
    title: "Parents and caregivers",
    body: "The routing that helps a wheelchair helps a stroller exactly the same way.",
  },
  {
    title: "Anyone, temporarily",
    body: "A sprained ankle or a heavy suitcase turns 'fastest' into 'wrong.' AccessWay adapts either way.",
  },
];

export default function AccessWayPage() {
  const project = getProject("accessway")!;

  return (
    <>
      {/* Hero — the problem stated in one breath, and the answer running live beside it. */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_0%,rgb(45_212_191/0.12),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Reveal variant="blur">
                <Eyebrow color="teal">{project.kind}</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="mt-6 text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                  If you can&apos;t take the stairs,{" "}
                  <span className="animate-gradient-x bg-linear-to-r from-teal-300 via-sky-400 to-teal-300 bg-size-[200%_auto] bg-clip-text text-transparent">
                    the map shouldn&apos;t either.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={250}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
                  AccessWay is navigation built for the billion people other
                  maps forget — step-free routes indoors and out, live obstacle
                  detection, and a map kept honest by the people who use it.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href={project.external!.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-teal-500/30 transition-colors hover:bg-teal-300"
                  >
                    Open {project.external!.label} ↗
                  </a>
                  <a
                    href="#journey"
                    className="text-sm font-semibold text-mist transition-colors hover:text-frost"
                  >
                    Walk one journey ↓
                  </a>
                </div>
              </Reveal>
              <Reveal delay={550}>
                <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
                  {trustChips.map((chip) => (
                    <li key={chip} className="flex items-center gap-2 text-sm text-mist">
                      <span aria-hidden className="size-1.5 rounded-full bg-teal-400" />
                      {chip}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* The product's whole promise, looping: plan → report → reroute → arrive. */}
            <Reveal variant="zoom" delay={300}>
              <LiveRoute />
              <p className="mt-3 text-center font-mono text-[11px] text-mist">
                A broken lift changes your route before you reach it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The journey — the whole pipeline, scrubbed by scroll. */}
      <section id="journey" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 pb-4">
        <SectionHead
          color="teal"
          eyebrow="One journey"
          title="From a stranger's report to your route"
          lede="Every route rests on three layers: what the community reported, what the map learned, and what the camera sees right now. Scroll — the page walks one journey through all three."
        />
      </section>
      <JourneyScrub />

      {/* Live detection — what happens between the map and the ground. */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              color="teal"
              eyebrow="Live detection"
              title="The map can't see the parked scooter. The camera can."
              lede="Maps describe the world as it was. Computer vision handles the world as it is — while you're moving through it."
            />
            <div className="mt-8 space-y-5">
              {visionPoints.map((point, i) => (
                <div key={point.title} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-teal-400/40 bg-teal-500/10 font-mono text-[10px] text-teal-300"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-frost">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pt-2">
            <Reveal variant="zoom">
              <VisionDemo />
            </Reveal>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              A curb without a cut is an inconvenience for some and a hard stop
              for others. The difference is knowing before you get there.
            </p>
          </div>
        </div>
      </section>

      {/* Community — the proof layer. Reports land one after another, like they do on the map. */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHead
          color="teal"
          eyebrow="Community"
          title="You report it once. Nobody hits it again."
          lede="The next person doesn't have to discover the broken ramp — because you already told the map."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {reports.map((r, i) => (
            <Reveal key={r.place} delay={i * 120}>
              <div className="card-surface h-full p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase ${reportTone[r.tone]}`}
                  >
                    {r.status}
                  </span>
                  <span className="font-mono text-[11px] text-mist">{r.time}</span>
                </div>
                <h3 className="mt-3 font-semibold text-frost">{r.place}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-mist">
          Illustrative reports — the live map is at accessway.xyz.
        </p>

        {/* Who this reaches — compressed, no cards, no hover tricks. The copy is the content. */}
        <div className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <div key={p.title} className="border-l-2 border-teal-500/30 pl-4">
              <h3 className="text-sm font-semibold text-teal-300">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The future — one quiet statement, no card chrome. */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
              Every report filed today is a route someone takes tomorrow.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-mist">
              AccessWay is young, and the map grows city by city, contributor
              by contributor. It exists to prove a simple thing: routing around
              stairs, broken lifts, and missing curb cuts shouldn&apos;t be a
              feature. It should be how maps work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The ask. */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Try the route you&apos;d actually take.
            </h2>
            <div className="mt-8">
              <a
                href={project.external!.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-teal-400 px-8 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-teal-500/30 transition-colors hover:bg-teal-300"
              >
                Open {project.external!.label} ↗
              </a>
            </div>
            <p className="mt-5 text-sm text-mist">
              Free to use · runs in the browser · and if you spot something the
              map doesn&apos;t know yet — tell it. That&apos;s the whole point.
            </p>
            <div className="mt-12">
              <Link
                href="/"
                className="text-sm text-mist transition-colors hover:text-frost"
              >
                ← Previous project: Adarpan Cut
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
