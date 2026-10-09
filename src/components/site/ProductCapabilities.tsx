import { Search, Terminal, Captions, Palette, AudioLines, FileCode2, type LucideIcon } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import Spotlight from "@/components/fx/Spotlight";
import SectionHeader from "@/components/site/SectionHeader";
import { cn } from "@/lib/utils";

interface Capability {
  icon: LucideIcon;
  n: string;
  title: string;
  body: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: Search,
    n: "01",
    title: "Semantic footage search",
    body: "Every frame is indexed the moment it's uploaded. Search hours of raw footage the way you'd search text — describe the shot, and the clip surfaces. No logging, no bins, no pre-sorting.",
  },
  {
    icon: Terminal,
    n: "02",
    title: "Prompt-based editing",
    body: "Describe the edit in a sentence and Broll drafts the cut: silences removed, the hook punched in early, pacing restructured around the story — before anyone opens a timeline.",
  },
  {
    icon: Captions,
    n: "03",
    title: "Auto captions",
    body: "Every cut ships with accurate, styled captions already timed to the edit. No separate captioning pass, and no re-syncing after a re-cut — captions move when the edit moves.",
  },
  {
    icon: Palette,
    n: "04",
    title: "AI color grading",
    body: "One consistent, cinematic grade applied across every camera, take and lighting condition in the footage — matched to your brand look, not a generic preset.",
  },
  {
    icon: AudioLines,
    n: "05",
    title: "AI lip sync",
    body: "Dub into new languages with lips that actually match the audio, so a single shoot reaches every audience without a reshoot or a visibly dubbed mouth.",
  },
  {
    icon: FileCode2,
    n: "06",
    title: "Export to any platform",
    body: "Nothing is locked in. Every edit exports as a standard timeline XML that opens in Premiere Pro, DaVinci Resolve or Final Cut Pro — pick up exactly where the agent left off.",
  },
];

export default function ProductCapabilities() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Every capability"
          title="One agent, the whole edit."
          lede="Six capabilities, all part of the same pass — nothing bolted on separately."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={0.06 * i} className={cn(i === 1 && "lg:translate-y-8", i === 4 && "lg:translate-y-8")}>
              <Spotlight as="article" className="group flex h-full flex-col p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-line-strong bg-surface-2 transition-all duration-500 group-hover:border-red group-hover:bg-red group-hover:shadow-[0_0_30px_-4px_var(--red)]">
                    <c.icon className="size-5 text-red transition-colors duration-500 group-hover:text-white" strokeWidth={1.6} />
                  </span>
                  <span className="slate tabular-nums">{c.n}</span>
                </div>
                <h3 className="mt-10 text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2/70">{c.body}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
