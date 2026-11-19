import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CLIPS } from "@/components/v2/Shot";

/**
 * The hero's Broll window: agent chat + found moments on the left, viewer
 * and a real-looking multi-track timeline on the right. Purely decorative.
 */

const STEPS = [
  { label: "Indexed 3h 12m across 4 cameras", t: "02:41" },
  { label: "Found 14 strong moments", t: "03:10" },
  { label: "Built the hook and cut the timeline", t: "06:55" },
  { label: "Added captions and warm grade", t: "09:20" },
  { label: "First cut ready for review", t: "11:48" },
];

const MOMENTS = [
  { src: CLIPS.interview, pos: "45% 30%", quote: "and that's when everything changed", tc: "00:42:18", score: 96 },
  { src: CLIPS.podcast, pos: "50% 35%", quote: "we almost shut the whole thing down", tc: "01:17:02", score: 91 },
  { src: CLIPS.set, pos: "50% 45%", quote: "three cameras, one take, no retakes", tc: "02:03:40", score: 87 },
];

// Timeline is 60s wide; clips are [start%, width%].
type Span = { at: number; w: number };
const V2: (Span & { src: string; name: string })[] = [
  { at: 14, w: 13, src: CLIPS.city, name: "city_night_04" },
  { at: 47, w: 17, src: CLIPS.set, name: "bts_set_02" },
  { at: 76, w: 11, src: CLIPS.city, name: "city_night_07" },
];
const V1: (Span & { src: string; name: string; pos: string })[] = [
  { at: 0, w: 14, src: CLIPS.interview, name: "CAM B · hook", pos: "45% 30%" },
  { at: 14.4, w: 21, src: CLIPS.podcast, name: "CAM A · wide", pos: "50% 40%" },
  { at: 35.8, w: 25, src: CLIPS.interview, name: "CAM B · story", pos: "45% 30%" },
  { at: 61.2, w: 17, src: CLIPS.creator, name: "CAM C · react", pos: "50% 30%" },
  { at: 78.6, w: 21.4, src: CLIPS.interview, name: "CAM B · close", pos: "45% 30%" },
];
const CC: (Span & { text: string })[] = [
  { at: 1, w: 9, text: "so here's" },
  { at: 10.5, w: 7, text: "the thing" },
  { at: 18, w: 12, text: "nobody tells you" },
  { at: 31, w: 9, text: "about this" },
  { at: 41, w: 15, text: "and that's when" },
  { at: 56.5, w: 13, text: "everything" },
  { at: 70, w: 9, text: "changed" },
  { at: 80.5, w: 16, text: "for all of us" },
];
const A1: Span[] = [
  { at: 0, w: 61 },
  { at: 61.2, w: 38.8 },
];

const PLAYHEAD = 63; // % — 00:00:37:20 on a 60s ruler

function waveformPath(seed: number, n = 120) {
  let x = seed * 7919;
  const pts: number[] = [];
  for (let i = 0; i < n; i++) {
    x = (x * 9301 + 49297) % 233280;
    const env = 0.35 + 0.65 * Math.abs(Math.sin(i / 9 + seed)) * (0.6 + 0.4 * Math.sin(i / 23));
    pts.push(Math.max(0.08, (x / 233280) * env));
  }
  const top = pts.map((v, i) => `${(i / (n - 1)) * 100},${50 - v * 46}`).join(" L");
  const bot = pts
    .map((v, i) => `${((n - 1 - i) / (n - 1)) * 100},${50 + pts[n - 1 - i] * 46}`)
    .join(" L");
  return `M${top} L${bot} Z`;
}

const pos = (s: Span): CSSProperties => ({ left: `${s.at}%`, width: `${s.w}%` });

function Track({ label, icon, children, tall }: { label: string; icon: ReactNode; children: ReactNode; tall?: boolean }) {
  return (
    <div className="flex items-stretch gap-2">
      <div className="flex w-[30px] shrink-0 items-center justify-center rounded-[5px] bg-[#141623] px-1 text-muted sm:w-[52px] sm:justify-between sm:px-1.5">
        <span className="font-mono text-[10px]">{label}</span>
        <span className="hidden sm:inline">{icon}</span>
      </div>
      <div className={`relative flex-1 ${tall ? "h-[34px]" : "h-[26px]"}`}>{children}</div>
    </div>
  );
}

const Eye = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const Speaker = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
  </svg>
);
const Lock = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function EditorMock() {
  return (
    <div className="mt-12 w-full [perspective:2400px]">
      <div className="w-full origin-top overflow-hidden rounded-[20px] border border-line-strong bg-surface-2 text-left shadow-[0_50px_140px_-30px_rgba(190,30,52,0.45),0_0_0_1px_rgba(255,92,112,0.08)] md:[transform:rotateX(9deg)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-line-2 px-4 py-3">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="ml-2.5 truncate font-mono text-xs text-muted">podcast_ep42 · 3h 12m raw · 4 cams</span>
          <span className="ml-auto hidden items-center gap-4 font-mono text-[11px] text-muted md:flex">
            <span>1080p · 25fps</span>
            <span>Reel · 9:16 + 16:9</span>
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-2 font-mono text-xs text-red md:ml-4">
            <span className="size-2 animate-pulse rounded-full bg-crimson motion-reduce:animate-none" />
            Agent editing
          </span>
        </div>

        <div className="flex flex-wrap" aria-hidden>
          {/* Left: agent */}
          <div className="box-border flex min-w-0 flex-[1_1_320px] flex-col gap-4 border-line-2 p-4 max-md:border-t sm:p-[22px] md:border-r">
            <div className="max-w-[300px] self-end rounded-[14px_14px_4px_14px] bg-[#1E2132] px-3.5 py-3 text-sm leading-normal">
              Make a 60s reel from this episode. Punchy hook, bold captions, warm grade.
            </div>
            <div className="flex flex-col gap-2.5">
              {STEPS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2.5 text-sm text-ink-2">
                  <span
                    className={
                      "inline-flex size-5 shrink-0 items-center justify-center rounded-md " +
                      (i === STEPS.length - 1 ? "bg-crimson" : "bg-wine")
                    }
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={i === STEPS.length - 1 ? "#fff" : "#FF5C70"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span className="flex-1">{s.label}</span>
                  <span className="font-mono text-xs text-muted">{s.t}</span>
                </div>
              ))}
            </div>

            {/* Moments found */}
            <div className="hidden flex-col gap-2 rounded-xl border border-line bg-[#0C0D15] p-2.5 md:flex">
              <div className="flex items-center justify-between px-1 font-mono text-[10px] text-muted">
                <span>MOMENTS · 14 FOUND</span>
                <span className="text-red">USED 6</span>
              </div>
              {MOMENTS.map((m, i) => (
                <div
                  key={m.tc}
                  className={
                    "flex items-center gap-2.5 rounded-lg p-1.5 " + (i === 0 ? "bg-wine/70 ring-1 ring-wine-line" : "")
                  }
                >
                  <div className="relative h-9 w-14 shrink-0 overflow-hidden rounded-[5px]">
                    <Image src={m.src} alt="" fill sizes="56px" className="object-cover" style={{ objectPosition: m.pos }} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-[12px] text-ink">&ldquo;{m.quote}&rdquo;</span>
                    <span className="font-mono text-[10px] text-muted">{m.tc}</span>
                  </div>
                  <span className="font-mono text-[10px] text-red">{m.score}</span>
                </div>
              ))}
            </div>

            {/* Export queue */}
            <div className="hidden flex-col gap-2 rounded-xl border border-line bg-[#0C0D15] p-3 font-mono text-[11px] md:flex">
              <div className="flex items-center justify-between text-[10px] text-muted">
                <span>EXPORT QUEUE</span>
                <span>2 / 3</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-ink-2">ep42_reel_9x16.mp4</span>
                <span className="text-red">78%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-[#1D2030]">
                <div className="h-full w-[78%] rounded-full bg-crimson" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-ink-2">ep42_reel_v1.xml</span>
                <span className="text-soft">Premiere ✓</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-muted">ep42_reel_16x9.mp4</span>
                <span className="text-dim">queued</span>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5 text-sm text-muted">
              <span className="flex-1">Ask Broll to change the edit…</span>
              <span className="inline-flex size-[30px] items-center justify-center rounded-lg bg-crimson">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Right: viewer + timeline */}
          <div className="box-border flex min-w-0 flex-[999_1_480px] flex-col gap-4 p-3 max-md:order-first sm:p-[22px]">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-line-2 bg-[#181A27]">
              <Image src={CLIPS.interview} alt="" fill priority sizes="(min-width: 1200px) 860px, 100vw" className="object-cover" style={{ objectPosition: "center 30%" }} />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,15,0.45)_0%,rgba(8,9,15,0)_28%,rgba(8,9,15,0)_62%,rgba(8,9,15,0.5)_100%)]" />
              <span className="absolute top-3 left-3.5 font-mono text-xs text-soft">CAM B · 00:00:42:18</span>
              <span className="absolute top-3 right-3.5 font-mono text-xs text-soft">GRADE · Warm 02</span>
              <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 rounded-lg bg-bg px-3.5 py-2 text-[clamp(14px,1.6vw,22px)] font-bold whitespace-nowrap">
                and that&apos;s when <span className="text-red">everything</span> changed
              </div>
            </div>

            {/* Transport */}
            <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
              <span className="flex items-center gap-2 text-ink-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                00:00:37:20
              </span>
              <span className="text-dim">/</span>
              <span>00:00:58:12</span>
              <span className="ml-auto hidden sm:inline">6 cuts · 3 b-roll · 8 captions</span>
            </div>

            {/* Timeline */}
            <div className="relative flex flex-col gap-1.5 rounded-xl border border-line-2 bg-[#0C0D15] p-2.5">
              {/* Ruler */}
              <div className="flex items-end gap-2">
                <div className="w-[30px] shrink-0 sm:w-[52px]" />
                <div className="relative h-5 flex-1">
                  <div
                    className="absolute inset-x-0 bottom-0 h-2"
                    style={{ background: "repeating-linear-gradient(90deg, #33384E 0 1px, transparent 1px 2.5%)" }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-3.5"
                    style={{ background: "repeating-linear-gradient(90deg, #565B74 0 1px, transparent 1px 25%)" }}
                  />
                  {["00:00", "00:15", "00:30", "00:45"].map((l, i) => (
                    <span key={l} className="absolute top-0 font-mono text-[9px] text-dim" style={{ left: `calc(${i * 25}% + 4px)` }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <Track label="V2" icon={<Eye />}>
                {V2.map((c) => (
                  <div key={c.at} className="absolute inset-y-0 overflow-hidden rounded-[4px] border border-[#8A2238]" style={pos(c)}>
                    <div className="absolute inset-0" style={{ backgroundImage: `url(${c.src})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x" }} />
                    <div className="absolute inset-0 bg-[#5A1E30]/55" />
                    <span className="absolute top-1/2 left-1.5 hidden -translate-y-1/2 truncate font-mono text-[9px] text-white/90 sm:block">{c.name}</span>
                  </div>
                ))}
              </Track>

              <Track label="V1" icon={<Eye />} tall>
                {V1.map((c) => (
                  <div key={c.at} className="absolute inset-y-0 overflow-hidden rounded-[4px] border border-[#41465E] bg-[#232638]" style={pos(c)}>
                    <div
                      className="absolute inset-0 opacity-80"
                      style={{ backgroundImage: `url(${c.src})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x", backgroundPosition: c.pos }}
                    />
                    <div className="absolute inset-x-0 top-0 hidden bg-[#08090F]/70 px-1.5 py-[1px] sm:block">
                      <span className="hidden truncate font-mono text-[9px] text-ink-2 sm:block">{c.name}</span>
                    </div>
                  </div>
                ))}
              </Track>

              <Track label="A1" icon={<Speaker />} tall>
                {A1.map((c, i) => (
                  <div key={c.at} className="absolute inset-y-0 overflow-hidden rounded-[4px] border border-[#2F4A5A] bg-[#13202A]" style={pos(c)}>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
                      <path d={waveformPath(i + 2)} fill="#4F7A8C" />
                    </svg>
                  </div>
                ))}
              </Track>

              <Track label="CC" icon={<Lock />}>
                {CC.map((c) => (
                  <div
                    key={c.at}
                    className={
                      "absolute inset-y-0 flex items-center overflow-hidden rounded-[4px] border px-1.5 " +
                      (c.text === "everything" ? "border-red bg-crimson" : "border-[#8A2238] bg-[#3A1422]")
                    }
                    style={pos(c)}
                  >
                    <span className="hidden truncate text-[10px] font-semibold text-white sm:block">{c.text}</span>
                  </div>
                ))}
              </Track>

              {/* Playhead */}
              <div className="pointer-events-none absolute top-1 bottom-1.5 left-[calc(10px+30px+8px)] sm:left-[calc(10px+52px+8px)] right-2.5">
                <div className="absolute inset-y-0 w-px bg-red shadow-[0_0_8px_rgba(255,92,112,0.8)]" style={{ left: `${PLAYHEAD}%` }}>
                  <span className="absolute -top-0.5 left-1/2 h-2.5 w-3 -translate-x-1/2 rounded-b-[3px] bg-crimson" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
