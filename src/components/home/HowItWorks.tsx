import Image from "next/image";
import { Check, CloudUpload, Sparkles } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import SectionHeader from "@/components/site/SectionHeader";

const FILES = [
  { src: "/clips/a012_take3.webp", name: "A012_TAKE3.mov", size: "4.2 GB" },
  { src: "/clips/drone_04.webp", name: "DRONE_04.mp4", size: "1.8 GB" },
  { src: "/clips/vo_final.webp", name: "VO_FINAL.wav", size: "312 MB" },
];

function Upload() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-4 text-xs text-muted">
        <CloudUpload className="size-4 text-red" /> Drop raw footage
      </div>
      {FILES.map((f, i) => (
        <div key={f.name} className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] p-1.5 pr-3">
          <div className="relative h-7 w-11 shrink-0 overflow-hidden rounded">
            <Image src={f.src} alt="" fill sizes="44px" className="object-cover" />
          </div>
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-ink-2">{f.name}</span>
          <span className="text-[11px] text-muted">{f.size}</span>
          {i < 2 ? (
            <Check className="size-3.5 text-emerald-400" strokeWidth={3} />
          ) : (
            <span className="h-1 w-8 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-2/3 bg-red" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Describe() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-red/40 bg-white/[0.03] p-3 text-[13px] leading-relaxed text-ink-2">
        Make a 2-minute cut of the interview. Open on the strongest reaction, keep it punchy, add captions.
        <span className="animate-blink ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-ink" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["2 min", "16:9", "Captions on", "Brand grade"].map((c) => (
          <span key={c} className="rounded-md border border-white/[0.08] px-2 py-1 text-[11px] text-muted">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function Deliver() {
  return (
    <div className="space-y-2">
      <div className="flex gap-[3px]">
        {["/clips/drone_04.webp", "/clips/a012_take3.webp", "/clips/broll_city.webp", "/clips/vo_final.webp"].map((s, i) => (
          <div key={i} className="relative h-9 flex-1 overflow-hidden rounded">
            <Image src={s} alt="" fill sizes="80px" className="object-cover" />
          </div>
        ))}
      </div>
      {[
        ["Final cut · MP4", "Download"],
        ["timeline.xml · Premiere / Resolve / FCP", "Export"],
      ].map(([a, b]) => (
        <div key={a} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-[12px]">
          <span className="truncate text-ink-2">{a}</span>
          <span className="ml-3 shrink-0 rounded bg-ink px-2 py-0.5 text-[11px] font-medium text-bg">{b}</span>
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Upload raw footage",
    body: "Every camera, every take. Broll indexes each frame as it arrives — no logging, no bins.",
    ui: Upload,
  },
  {
    n: "02",
    title: "Describe the video",
    body: "Say what you want in plain language. Broll finds the moments and builds the story.",
    ui: Describe,
  },
  {
    n: "03",
    title: "Review and deliver",
    body: "Publish the cut, or export a timeline XML and keep refining in your own editor.",
    ui: Deliver,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="How it works"
          title="Raw footage in."
          voice="A first cut out, in minutes."
        />
        <ol className="mt-14 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.n} className="min-w-0">
              <Reveal delay={0.08 * i} className="h-full">
                <article className="panel panel-hover flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-full bg-red/15 font-mono text-[11px] font-semibold text-red">
                      {s.n}
                    </span>
                    <h3 className="font-semibold tracking-tight">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2/70">{s.body}</p>
                  <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#0b0c14] p-3">
                    <s.ui />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
            <Sparkles className="size-4 text-red" /> Captions, color grading and lip sync happen in the same pass.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
