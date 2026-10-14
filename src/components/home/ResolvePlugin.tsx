import Image from "next/image";
import { Check, MessageSquare, Sparkles } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import SectionHeader from "@/components/site/SectionHeader";
import CtaLink from "@/components/ui/CtaLink";
import { INSTALLER } from "@/lib/site";

const POINTS = [
  "Opens as a chat panel inside Resolve Studio, next to your timeline",
  "Cuts, captions, grade and export happen on your own timeline",
  "One Windows installer, and updates arrive by themselves",
];

const CLIPS = [
  { src: "/clips/int_studio.webp", w: 26 },
  { src: "/clips/cu_hands.webp", w: 14 },
  { src: "/clips/broll_city.webp", w: 22 },
  { src: "/clips/drone_04.webp", w: 18 },
  { src: "/clips/a012_take3.webp", w: 20 },
];

/** Home section: the DaVinci Resolve plugin, shown as the panel living in Resolve. */
export default function ResolvePlugin() {
  return (
    <section id="resolve" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1.1fr]">
        <div className="min-w-0">
          <SectionHeader
            eyebrow="DaVinci Resolve plugin"
            title="Broll, inside"
            voice="your Resolve timeline."
            lede="Ask for a cut, captions or a grade in plain words and watch it happen — without leaving Resolve."
          />
          <Reveal delay={0.14}>
            <ul className="mt-8 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-2/80">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-red" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CtaLink href="/download" size="lg">
                Get the plugin
              </CtaLink>
              <p className="text-sm text-muted">
                Windows · v{INSTALLER.version} · {INSTALLER.sizeLabel}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={18}>
          <div className="band-border min-w-0 rounded-[1.25rem] p-px">
            <div className="overflow-hidden rounded-[calc(1.25rem-1px)] bg-surface">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-muted">
                <Image src="/davinci-resolve-logo.png" alt="" width={16} height={16} className="size-4" />
                DaVinci Resolve Studio · Workspace › Workflow Integrations › Broll AI
              </div>
              <div className="grid min-w-0 grid-cols-[1fr_0.8fr]">
                <div className="min-w-0 space-y-3 p-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-line">
                    <Image src="/clips/int_studio.webp" alt="" fill sizes="400px" className="object-cover" />
                  </div>
                  <div className="flex h-9 gap-[3px]">
                    {CLIPS.map((c) => (
                      <div key={c.src} style={{ width: `${c.w}%` }} className="relative overflow-hidden rounded-[5px] border border-white/10">
                        <Image src={c.src} alt="" fill sizes="120px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="min-w-0 space-y-3 border-l border-line p-4 text-[11px] leading-snug">
                  <p className="flex items-center gap-1.5 font-medium text-ink">
                    <MessageSquare className="size-3.5 text-red" /> Broll AI
                  </p>
                  <div className="ml-auto w-fit max-w-[95%] rounded-xl rounded-br-sm border border-line bg-surface-2 px-3 py-2 text-ink-2">
                    Cut the interview to 60 seconds and add captions
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red/20">
                      <Sparkles className="size-3 text-red" />
                    </span>
                    <span className="text-muted">Done. 14 cuts, captions styled, timeline updated.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
