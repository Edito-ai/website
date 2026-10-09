"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Clapperboard, Globe, Monitor, Sparkles } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import SectionHeader from "@/components/site/SectionHeader";
import { cn } from "@/lib/utils";

const CYCLE_MS = 7000;

/* --- Shared mock pieces ---------------------------------------------------- */

const CLIPS = [
  { src: "/clips/int_studio.webp", w: 26 },
  { src: "/clips/cu_hands.webp", w: 14 },
  { src: "/clips/broll_city.webp", w: 22 },
  { src: "/clips/drone_04.webp", w: 18 },
  { src: "/clips/a012_take3.webp", w: 20 },
];

function Frame({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      <Image src={src} alt="" fill sizes="480px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

function Timeline({ playhead = 42, tall = false }: { playhead?: number; tall?: boolean }) {
  return (
    <div className="relative">
      <div className={cn("flex gap-[3px]", tall ? "h-11" : "h-9")}>
        {CLIPS.map((c) => (
          <div key={c.src} style={{ width: `${c.w}%` }} className="relative">
            <Frame src={c.src} className="h-full rounded-[5px] border border-white/10" />
          </div>
        ))}
      </div>
      <div className="mt-[3px] flex h-3 gap-[3px]">
        {[30, 18, 34, 12].map((w, i) => (
          <div key={i} style={{ width: `${w}%` }} className="rounded-[3px] bg-red/30" />
        ))}
      </div>
      <div
        className="absolute -top-1.5 -bottom-1 w-px bg-red shadow-[0_0_10px_var(--red)]"
        style={{ left: `${playhead}%` }}
      >
        <span className="absolute -top-0.5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-red" />
      </div>
    </div>
  );
}

function Prompt({ text, reply }: { text: string; reply: string }) {
  return (
    <div className="space-y-2 text-[11px] leading-snug">
      <div className="ml-auto w-fit max-w-[92%] rounded-xl rounded-br-sm border border-line bg-surface-2 px-3 py-2 text-ink-2">
        {text}
      </div>
      <div className="flex gap-2">
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red/20">
          <Sparkles className="size-3 text-red" />
        </span>
        <div className="text-muted">{reply}</div>
      </div>
    </div>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <div className="space-y-1.5 text-[10px]">
      {items.map((l) => (
        <div key={l} className="flex items-center gap-2 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-ink-2">
          <Check className="size-3 text-red" /> {l}
        </div>
      ))}
    </div>
  );
}

function Chrome({
  children,
  title,
  browser,
}: {
  children: React.ReactNode;
  title: string;
  browser?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[var(--shadow-lift)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/15" />
          ))}
        </div>
        {browser ? (
          <span className="mx-auto flex w-[55%] min-w-0 items-center justify-center gap-1.5 truncate whitespace-nowrap rounded-md bg-black/30 py-1 font-mono text-[10px] text-muted">
            <Globe className="size-3" /> {title}
          </span>
        ) : (
          <span className="mx-auto min-w-0 truncate font-mono text-[10px] text-muted">{title}</span>
        )}
        <span className="w-10" />
      </div>
      {children}
    </div>
  );
}

function Tabs({ tabs, on }: { tabs: string[]; on: string }) {
  return (
    <div className="flex gap-1 overflow-hidden border-b border-line px-4 py-2 font-mono text-[10px] text-muted">
      {tabs.map((t) => (
        <span key={t} className={cn("rounded px-2 py-0.5", t === on && "bg-white/10 text-ink")}>
          {t}
        </span>
      ))}
    </div>
  );
}

/* --- Stages ---------------------------------------------------------------- */

function BrowserStage() {
  return (
    <Chrome browser title="trybroll.com — open a tab, start editing">
      <div className="grid gap-4 p-4 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <Frame src="/clips/int_studio.webp" className="aspect-video rounded-xl border border-line" />
          <Timeline />
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-line bg-black/20 p-3">
          <Prompt text="Cut the silences and punch in on the hook" reply="Done — removed 14 pauses, tightened the intro to 9s." />
          <div className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-[11px] text-muted">Describe your edit…</div>
        </div>
      </div>
    </Chrome>
  );
}

function DesktopStage() {
  return (
    <Chrome title="Broll — Brand film · Local project">
      <div className="grid gap-4 p-4 md:grid-cols-[88px_1.6fr]">
        <div className="hidden grid-cols-1 gap-2 md:grid">
          {CLIPS.slice(0, 4).map((c, i) => (
            <Frame key={i} src={c.src} className="aspect-video rounded-md border border-line" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="relative">
            <Frame src="/clips/drone_04.webp" className="aspect-video rounded-xl border border-line" />
            <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-ink-2 backdrop-blur">
              4K · read from D:\Footage
            </span>
          </div>
          <Timeline tall playhead={58} />
        </div>
      </div>
    </Chrome>
  );
}

function ResolveStage() {
  return (
    <Chrome title="DaVinci Resolve Studio — Workspace › Workflow Integrations › Broll AI">
      <Tabs tabs={["Media", "Cut", "Edit", "Fusion", "Color", "Fairlight", "Deliver"]} on="Edit" />
      <div className="grid gap-4 p-4 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <Frame src="/clips/broll_city.webp" className="aspect-video rounded-xl border border-line" />
          <Timeline playhead={34} />
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-black/20 p-3">
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <Image src="/davinci-resolve-logo.png" alt="" width={16} height={16} className="size-4" />
            Broll AI
          </div>
          <Prompt text="Grade it warm, add captions, keep my original" reply="Built it on a new timeline." />
          <Checks items={["Colour grade applied", "Animated captions added", "Saved as Timeline v2"]} />
        </div>
      </div>
    </Chrome>
  );
}

function PremiereStage() {
  return (
    <Chrome title="Adobe Premiere Pro — Window › Extensions › Broll">
      <Tabs tabs={["Import", "Edit", "Color", "Effects", "Audio", "Captions", "Export"]} on="Edit" />
      <div className="grid gap-4 p-4 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <Frame src="/clips/a012_take3.webp" className="aspect-video rounded-xl border border-line" />
          <Timeline tall playhead={48} />
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-black/20 p-3">
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <Clapperboard className="size-4 text-red" />
            Broll
          </div>
          <Prompt text="Assemble a 60s cut from the interview, add b-roll" reply="Sequence ready in your project." />
          <Checks items={["Interview selects pulled", "B-roll matched to lines", "New sequence: Cut v1"]} />
        </div>
      </div>
    </Chrome>
  );
}

/* --- Surfaces -------------------------------------------------------------- */

const SURFACES = [
  {
    key: "web",
    label: "Browser",
    icon: <Globe className="size-5 text-ink-2" strokeWidth={1.6} />,
    title: "Open a tab. Nothing to install.",
    body: "Drop in footage and describe the edit at trybroll.com. Always up to date.",
    Stage: BrowserStage,
  },
  {
    key: "desktop",
    label: "Desktop app",
    icon: <Monitor className="size-5 text-ink-2" strokeWidth={1.6} />,
    title: "Native and fast.",
    body: "Heavy footage stays on your machine, read straight from your drives.",
    Stage: DesktopStage,
  },
  {
    key: "resolve",
    label: "DaVinci Resolve",
    icon: <Image src="/davinci-resolve-logo.png" alt="" width={28} height={28} className="size-6" />,
    title: "Inside your professional workflow.",
    body: "A chat panel in Resolve Studio. Every edit lands on a new timeline — your original is never touched.",
    Stage: ResolveStage,
  },
  {
    key: "premiere",
    label: "Premiere Pro",
    icon: <Clapperboard className="size-5 text-ink-2" strokeWidth={1.6} />,
    title: "In the environment your team already uses.",
    body: "Ask Broll from inside Premiere and get a ready sequence in your project.",
    Stage: PremiereStage,
  },
];

/* --- Section --------------------------------------------------------------- */

export default function Workflow() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % SURFACES.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  const { Stage } = SURFACES[active];

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          align="center"
          eyebrow="Workflow"
          title="Broll lives where editors already work."
          voice="One account. Your workflow stays yours."
        />

        <Reveal y={28}>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative mt-14 grid grid-cols-1 gap-4 overflow-hidden rounded-[2rem] border border-line bg-surface p-3 sm:p-4 md:mt-16 lg:grid-cols-[320px_minmax(0,1fr)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 right-0 size-[520px] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)]"
            />

            {/* Selector */}
            <div role="tablist" className="relative flex min-w-0 flex-col gap-2 lg:p-2">
              {SURFACES.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 sm:p-5",
                      on ? "border-line-strong bg-surface-2" : "border-transparent hover:bg-white/[0.03]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-10 items-center justify-center rounded-xl border bg-surface transition-colors",
                          on ? "border-red/50" : "border-line",
                        )}
                      >
                        {s.icon}
                      </span>
                      <span className="flex-1">
                        <span className="block font-mono text-[10px] tracking-widest text-muted uppercase">0{i + 1}</span>
                        <span className="block font-semibold tracking-tight">{s.label}</span>
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-4 transition-all duration-300",
                          on ? "translate-x-0 text-red opacity-100" : "-translate-x-1 opacity-0",
                        )}
                      />
                    </div>
                    <div
                      className={cn(
                        "grid transition-all duration-500",
                        on ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-lg leading-snug font-medium tracking-tight">{s.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </div>
                    {on && !reduced && (
                      <motion.span
                        key={`${active}-${paused}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-px w-full origin-left bg-red"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage */}
            <div className="relative flex min-w-0 items-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_50%_0%,var(--accent-soft),transparent_70%)] p-3 sm:p-6">
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduced ? false : { opacity: 0, y: 16, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Stage />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
