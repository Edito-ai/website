import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "AccessWay",
  description:
    "AccessWay — Accessibility in Motion. AI-powered navigation and smart assistance for people with disabilities: accessible indoor and outdoor routing, obstacle detection, and community-driven accessibility data.",
};

const stats = [
  { value: "1B+", label: "people worldwide live with disabilities" },
  { value: "2", label: "worlds covered — indoors and outdoors" },
  { value: "24/7", label: "community-driven accessibility data" },
];

const journeySteps = [
  { step: "01", title: "Report", body: "Anyone can flag a ramp, a lift, a curb cut, or a blocked entrance — the map only gets smarter with more contributors." },
  { step: "02", title: "Map", body: "Reports feed a shared accessibility layer over indoor and outdoor spaces, kept current by the people who use it every day." },
  { step: "03", title: "Route", body: "The AI plans a path using that layer — favoring step-free routes over the shortest one when it matters." },
  { step: "04", title: "Navigate", body: "Real-time obstacle detection watches the path ahead as the user moves, indoors and out." },
];

const personas = [
  { title: "Wheelchair users", body: "Routes that guarantee step-free access, not routes that assume you'll find a workaround at the curb." },
  { title: "People with low vision", body: "AI obstacle detection surfaces what's ahead in the moment, not after the fact." },
  { title: "Parents and caregivers", body: "The same step-free, obstacle-aware routing that helps a wheelchair also helps a stroller." },
  { title: "Anyone, temporarily", body: "A sprained ankle or a heavy suitcase turns 'the fastest way' into the wrong way — AccessWay adapts either way." },
];

const features = [
  {
    title: "Accessible routing",
    body: "Routes are planned around ramps, elevators, and step-free paths — not just the shortest line on a map. It works indoors and outdoors, so the journey doesn't end at the building's front door.",
    icon: "🧭",
  },
  {
    title: "AI obstacle detection",
    body: "Computer vision flags obstacles in the user's path in real time, giving wheelchair users and people with low vision the information sighted, able-bodied travelers take for granted.",
    icon: "👁️",
  },
  {
    title: "Community-driven data",
    body: "Accessibility information is crowdsourced from the people who rely on it. Every report — a broken lift, a blocked ramp, a new accessible entrance — makes the next person's journey easier.",
    icon: "🤝",
  },
  {
    title: "Smart assistance",
    body: "Guidance that adapts to each user's needs — the more it's used, the better it understands what a good route looks like for you.",
    icon: "✨",
  },
];

export default function AccessWayPage() {
  const project = getProject("accessway")!;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_0%,rgb(45_212_191/0.18),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 left-[12%] size-48 animate-float rounded-full bg-teal-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] bottom-0 size-40 animate-float-delayed rounded-full bg-sky-500/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <Eyebrow color="teal">{project.kind}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            Accessibility in{" "}
            <span className="animate-gradient-x bg-linear-to-r from-teal-300 via-sky-400 to-teal-300 bg-size-[200%_auto] bg-clip-text text-transparent">
              motion.
            </span>
            <br />
            Everywhere you go.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
            {project.blurb}
          </p>
          <div className="mt-8">
            <a
              href={project.external!.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-teal-500/30 transition-transform hover:scale-[1.04]"
            >
              Visit {project.external!.label} ↗
            </a>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/8 bg-ink-900/60 p-4 transition-colors hover:border-teal-500/30"
              >
                <dt className="order-last mt-1 text-xs text-mist">{s.label}</dt>
                <dd className="text-3xl font-semibold text-teal-300">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Navigation that assumes nothing
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-mist">
              <p>
                Most navigation apps assume you can take the stairs, step over
                the curb, and read the small print. For over a billion people
                living with disabilities, those assumptions make “the fastest
                route” useless — or dangerous.
              </p>
              <p>
                AccessWay starts from the opposite premise: every route it
                suggests must be one its user can actually take. AI does the
                seeing, the community does the knowing, and the app does the
                guiding — everywhere they go.
              </p>
            </div>
          </div>

          {/* Route illustration */}
          <div className="card-surface overflow-hidden p-6" aria-hidden>
            <svg viewBox="0 0 400 260" className="w-full" role="presentation">
              <defs>
                <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </radialGradient>
                <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              <rect x="0" y="0" width="400" height="260" rx="12" fill="#16161c" />
              <circle cx="40" cy="220" r="70" fill="url(#glow)" />
              {[40, 120, 200, 280, 360].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="#ffffff0d" />
              ))}
              {[52, 130, 208].map((y) => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#ffffff0d" />
              ))}
              <path
                d="M 40 220 C 120 220 110 130 190 130 S 300 60 350 52"
                fill="none"
                stroke="url(#route)"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.35"
                filter="url(#soft)"
              />
              <path
                d="M 40 220 C 120 220 110 130 190 130 S 300 60 350 52"
                fill="none"
                stroke="url(#route)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className="animate-dash"
              />
              <circle cx="40" cy="220" r="10" fill="#0a0a0e" stroke="#2dd4bf" strokeWidth="2.5" />
              <circle cx="40" cy="220" r="4" fill="#2dd4bf" className="animate-pulse" />
              <circle cx="350" cy="52" r="9" fill="#60a5fa" />
              <g transform="translate(160 176)">
                <rect x="-13" y="-13" width="26" height="26" rx="7" fill="#f8717126" stroke="#f87171" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="600" fill="#f87171">!</text>
              </g>
              <text x="40" y="244" textAnchor="middle" fontSize="11" fontWeight="500" fill="#c7c7d1">You</text>
              <text x="350" y="34" textAnchor="middle" fontSize="11" fontWeight="500" fill="#c7c7d1">Step-free arrival</text>
              <text x="160" y="152" textAnchor="middle" fontSize="10" fill="#f87171">Obstacle avoided</text>
            </svg>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="relative overflow-hidden card-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-10 size-56 animate-float rounded-full bg-teal-500/15 blur-3xl"
          />
          <Eyebrow color="teal">How it works</Eyebrow>
          <h2 className="relative mt-3 text-3xl font-semibold tracking-tight">
            The map gets better every time someone uses it
          </h2>
          <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-white/8 bg-ink-900/60 p-5 transition-colors hover:border-teal-500/40"
              >
                <span className="font-mono text-xs text-teal-400">{s.step}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-semibold tracking-tight">Built for everyone the map forgets</h2>
        <p className="mt-2 max-w-2xl text-mist">
          Accessibility needs aren&apos;t one-size-fits-all, and neither are AccessWay&apos;s routes.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <div
              key={p.title}
              className="card-surface p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-teal-500/40"
            >
              <h3 className="font-semibold text-teal-300">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission statement */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="card-surface p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built to prove accessibility-first navigation can work everywhere
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-mist">
            Not a demo, not an afterthought — a navigation experience designed
            from the ground up around the people most apps leave out.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-8 pb-16">
        <h2 className="text-3xl font-semibold tracking-tight">What it does</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-surface p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-teal-500/40"
            >
              <span className="text-2xl" aria-hidden>
                {f.icon}
              </span>
              <h3 className="mt-3 font-semibold text-teal-300">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-teal-500 to-sky-500 p-10 text-center shadow-xl shadow-teal-500/20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/4 size-48 animate-float rounded-full bg-white/10 blur-3xl"
          />
          <h2 className="relative text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            See it live
          </h2>
          <p className="relative mx-auto mt-2 max-w-xl text-white/85">
            AccessWay is live on the web. Try it, and if you spot something the
            map doesn&apos;t know yet — tell it. That&apos;s the whole point.
          </p>
          <a
            href={project.external!.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-6 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-teal-950 transition-transform hover:scale-[1.04]"
          >
            Open {project.external!.label} ↗
          </a>
          <div className="relative mt-4">
            <Link
              href="/"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              ← Previous project: Edito Studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
