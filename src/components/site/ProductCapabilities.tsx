import { Search, Terminal, Captions, Palette, AudioLines, FileCode2, type LucideIcon } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

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

function CapabilityRow({ capability, index }: { capability: Capability; index: number }) {
  return (
    <Reveal delay={0.06 * index}>
      <div className="group grid grid-cols-[auto_1fr] items-start gap-5 border-b border-line py-8 first:pt-0 last:border-b-0 sm:grid-cols-[3rem_auto_1fr] sm:items-center sm:gap-8">
        <span className="hidden font-mono text-xs text-muted sm:block">{capability.n}</span>
        <span className="flex size-11 items-center justify-center rounded-full border border-line bg-surface-2 transition-colors duration-300 group-hover:border-accent/40">
          <capability.icon className="size-5 text-accent" strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
            {capability.title}
          </h3>
          <p className="mt-2 max-w-xl leading-relaxed text-muted">{capability.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function ProductCapabilities() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:px-6 md:px-8 md:py-32">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">
        Every capability
      </p>
      <WordReveal
        text="One agent, the whole edit."
        className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl"
      />
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        Six capabilities, all part of the same pass — nothing bolted on
        separately.
      </p>

      <div className="mt-12">
        {CAPABILITIES.map((capability, i) => (
          <CapabilityRow key={capability.n} capability={capability} index={i} />
        ))}
      </div>
    </section>
  );
}
