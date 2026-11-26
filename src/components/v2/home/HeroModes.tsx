"use client";

import { useEffect, useState } from "react";
import HeroPrompt from "@/components/v2/home/HeroPrompt";
import HeroFan from "@/components/v2/home/HeroFan";
import { cn } from "@/lib/utils";

type Mode = "clip" | "edit";

const ROTATE_MS = 7000;

const MODES: {
  id: Mode;
  title: string;
  sub: string;
  isNew?: boolean;
  examples: string[];
}[] = [
  {
    id: "clip",
    title: "AI Clipping",
    sub: "Long video → viral shorts",
    isNew: true,
    examples: [
      "Turn this stream into 6 captioned Shorts",
      "Turn this 2-hour podcast into clips for Reels and TikTok",
      "Clip every big reaction from yesterday's stream",
      "Paste a YouTube link, get 9:16 clips with bold captions",
    ],
  },
  {
    id: "edit",
    title: "AI Editing",
    sub: "Raw footage → finished video",
    examples: [
      "Cut a 60s reel in the style of my last video",
      "Turn 3 hours of multi-cam footage into a finished episode",
      "Make a 9:16 version with bold captions and a warm grade",
      "Turn this 3-hour podcast into a 90s trailer with captions",
    ],
  },
];

function ScissorsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" />
    </svg>
  );
}

function FilmIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
    </svg>
  );
}

/**
 * Hero switch between Broll's two jobs — clipping long videos and editing raw
 * footage. Auto-advances so a first-time visitor sees both, and stops as soon
 * as they pick a tab or touch the prompt.
 */
export default function HeroModes({ children }: { children?: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("clip");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setMode((m) => (m === "clip" ? "edit" : "clip")), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [auto, mode]);

  const active = MODES.find((m) => m.id === mode)!;

  return (
    <>
      <HeroFan />

      <div
        data-reveal
        role="tablist"
        aria-label="What Broll does"
        className="grid w-full max-sm:hidden max-w-[560px] grid-cols-2 gap-1.5 rounded-[18px] border border-line bg-surface/80 p-1.5 backdrop-blur"
      >
        {MODES.map((m) => {
          const on = m.id === mode;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`mode-${m.id}`}
              aria-selected={on}
                            onClick={() => {
                setAuto(false);
                setMode(m.id);
              }}
              className={cn(
                "relative flex min-h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[13px] px-2.5 py-2.5 text-left sm:justify-start transition-[background-color,color,box-shadow] duration-300 sm:gap-3 sm:px-4 sm:py-3",
                on
                  ? m.id === "clip"
                    ? "bg-crimson text-white shadow-[0_10px_40px_-10px_rgba(190,30,52,0.8)]"
                    : "bg-ink text-bg"
                  : "text-ink-2 hover:bg-[#181A27]",
              )}
            >
              <span className={cn("shrink-0", on ? "" : m.id === "clip" ? "text-red" : "text-soft")}>
                {m.id === "clip" ? <ScissorsIcon /> : <FilmIcon />}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="flex items-center gap-1.5 text-[15px] font-semibold whitespace-nowrap sm:text-base">
                  {m.title}
                  {m.isNew && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-px text-[10px] font-semibold max-sm:hidden",
                        on ? "bg-white text-crimson" : "bg-crimson text-white",
                      )}
                    >
                      New
                    </span>
                  )}
                </span>
                <span className={cn("hidden truncate font-mono text-[11px] sm:block", on ? "opacity-80" : "text-muted")}>
                  {m.sub}
                </span>
              </span>
              {on && auto && (
                <span
                  key={mode}
                  aria-hidden
                  className="mode-progress absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-current opacity-50"
                  style={{ animationDuration: `${ROTATE_MS}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div data-reveal className="w-full max-w-[760px] max-sm:hidden" onFocusCapture={() => setAuto(false)}>
        <HeroPrompt key={mode} examples={active.examples} />
      </div>

      {children}

    </>
  );
}
