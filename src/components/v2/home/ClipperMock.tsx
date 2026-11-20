import Image from "next/image";
import { CLIPS } from "@/components/v2/Shot";

/**
 * The hero's clipping window: a long stream goes in, the agent scores the
 * whole thing and hands back captioned 9:16 clips. Purely decorative.
 */

const STEPS = [
  { label: "Watched the full 3h 12m stream", t: "01:58" },
  { label: "Scored every moment for hooks and reactions", t: "03:40" },
  { label: "Picked the 6 strongest highlights", t: "04:05" },
  { label: "Reframed to 9:16 and added captions", t: "06:30" },
  { label: "6 clips ready to post", t: "07:12" },
];

// Stream heat, 0–100, across the whole VOD.
const HEAT = [18, 22, 30, 26, 20, 34, 58, 92, 86, 40, 28, 24, 30, 36, 28, 22, 44, 70, 96, 88, 50, 30, 26, 22, 28, 34, 30, 40, 64, 90, 94, 52, 32, 28, 24, 30, 46, 84, 78, 36, 28, 24, 32, 60, 88, 82, 40, 26, 22, 30, 38, 72, 91, 66, 30, 24];
const PICKS = [
  { at: 7, n: 1 },
  { at: 18, n: 2 },
  { at: 29.5, n: 3 },
  { at: 37, n: 4 },
  { at: 44, n: 5 },
  { at: 52, n: 6 },
];

const OUT = [
  { src: CLIPS.streamer, pos: "center", cap: <>no <span className="text-red">way</span></>, title: "The comeback round", dur: "0:42", score: 97 },
  { src: CLIPS.podcast, pos: "center", cap: <>he <span className="text-red">did it</span></>, title: "Chat goes wild", dur: "0:28", score: 94 },
  { src: CLIPS.creator, pos: "center", cap: <><span className="text-red">listen</span> to this</>, title: "The big reveal", dur: "0:35", score: 91 },
  { src: CLIPS.interview, pos: "45% 30%", cap: <>that&apos;s <span className="text-red">insane</span></>, title: "Final 10 seconds", dur: "0:19", score: 88 },
];

export default function ClipperMock() {
  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-line-strong bg-surface-2 text-left shadow-[0_50px_140px_-30px_rgba(190,30,52,0.55),0_0_0_1px_rgba(255,92,112,0.12)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-2.5 truncate font-mono text-xs text-muted">friday_stream · 3h 12m · YouTube</span>
        <span className="ml-auto hidden items-center gap-4 font-mono text-[11px] text-muted md:flex">
          <span>Shorts · Reels · TikTok</span>
          <span>9:16</span>
        </span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-2 font-mono text-xs text-red md:ml-4">
          <span className="size-2 animate-pulse rounded-full bg-crimson motion-reduce:animate-none" />
          Agent clipping
        </span>
      </div>

      <div className="flex flex-wrap" aria-hidden>
        {/* Left: agent */}
        <div className="box-border flex min-w-0 flex-[1_1_320px] flex-col gap-4 border-line-2 p-4 max-md:border-t sm:p-[22px] md:border-r">
          <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-bg px-3 py-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5C70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
              <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
            </svg>
            <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink-2">youtube.com/watch?v=… · 3:12:40</span>
          </div>
          <div className="max-w-[300px] self-end rounded-[14px_14px_4px_14px] bg-[#1E2132] px-3.5 py-3 text-sm leading-normal">
            Find the best moments in this stream and make captioned clips for Shorts.
          </div>
          <div className="flex flex-col gap-2.5">
            {STEPS.map((s, i) => (
              <div
                key={s.label}
                className={
                  "flex items-center gap-2.5 text-sm text-ink-2 " +
                  (i > 0 && i < STEPS.length - 1 ? "max-sm:hidden" : "")
                }
              >
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
          <div className="mt-auto hidden items-center gap-2.5 rounded-xl border border-line px-3 py-2.5 text-sm text-muted sm:flex">
            <span className="flex-1">Ask for more clips, or a different style…</span>
            <span className="inline-flex size-[30px] items-center justify-center rounded-lg bg-crimson">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Right: stream heat + clips out */}
        <div className="box-border flex min-w-0 flex-[999_1_480px] flex-col gap-4 p-3 max-md:order-first sm:p-[22px]">
          <div className="flex flex-col gap-2.5 rounded-xl border border-line-2 bg-[#0C0D15] p-3">
            <div className="flex justify-between font-mono text-[10px] text-muted">
              <span>0:00:00</span>
              <span className="text-red">6 HIGHLIGHTS FOUND</span>
              <span>3:12:40</span>
            </div>
            <div className="relative">
              <div className="flex h-12 items-end gap-[2px] sm:h-14">
                {HEAT.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[2px]"
                    style={{ height: `${h}%`, background: h > 80 ? "#BE1E34" : h > 55 ? "#5A1E30" : "#2A2E42" }}
                  />
                ))}
              </div>
              {PICKS.map((p) => (
                <span
                  key={p.n}
                  className="absolute -top-2 flex size-[18px] -translate-x-1/2 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-semibold text-bg"
                  style={{ left: `${(p.at / HEAT.length) * 100}%` }}
                >
                  {p.n}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {OUT.map((c, i) => (
              <div key={c.title} className={"flex min-w-0 flex-col gap-1.5 " + (i === 3 ? "max-sm:hidden" : "")}>
                <div
                  className={
                    "relative aspect-[9/16] overflow-hidden rounded-xl bg-[#191B28] " +
                    (i === 0 ? "border-[1.5px] border-crimson shadow-[0_0_30px_-6px_rgba(255,92,112,0.6)]" : "border border-line")
                  }
                >
                  <Image src={c.src} alt="" fill sizes="(min-width: 1024px) 200px, 30vw" className="object-cover" style={{ objectPosition: c.pos }} />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,15,0.4)_0%,rgba(8,9,15,0)_30%,rgba(8,9,15,0)_60%,rgba(8,9,15,0.6)_100%)]" />
                  <span className="absolute top-2 left-2 rounded bg-bg/90 px-[5px] py-0.5 font-mono text-[10px] text-ink-2">{c.dur}</span>
                  <span className="absolute top-2 right-2 rounded bg-crimson px-[5px] py-0.5 font-mono text-[10px] font-semibold text-white">{c.score}</span>
                  <span className="absolute top-[62%] left-1/2 -translate-x-1/2 rounded bg-bg px-1.5 py-[3px] text-[11px] font-bold whitespace-nowrap sm:text-[13px]">
                    {c.cap}
                  </span>
                </div>
                <span className="truncate text-[11px] text-ink-2 sm:text-xs">
                  <span className="font-mono text-red">#{i + 1}</span> {c.title}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
            <span className="chip chip-hot">6 clips · 9:16</span>
            <span className="chip">Captions on</span>
            <span className="chip max-sm:hidden">Auto-reframed</span>
            <span className="ml-auto hidden sm:inline">Ready for Shorts, Reels &amp; TikTok</span>
          </div>
        </div>
      </div>
    </div>
  );
}
