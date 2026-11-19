import Image from "next/image";
import Shot, { CLIPS } from "@/components/v2/Shot";

export type MockKind = "chat" | "windows" | "mac" | "resolve";

const COPY: Record<MockKind, { ask: string; reply: string; tc: string; format: string; caption: string; hot: string; vertical: boolean }> = {
  windows: { ask: "Cut a 30s teaser from the interview. Keep the laugh at the end.", reply: "30s cut, 6 edits, captions on. Ready to review.", tc: "00:00:21:10", format: "16:9 · 1080p", caption: "that one moment", hot: "changed it", vertical: false },
  mac: { ask: "Make it vertical for Reels with bold captions.", reply: "Reframed to 9:16 and captioned. 2 versions ready.", tc: "00:00:08:02", format: "9:16 · Reels", caption: "wait for", hot: "it", vertical: true },
  resolve: { ask: "Tighten the intro to 20 seconds.", reply: "Removed 3 pauses and added b-roll at 00:12.", tc: "", format: "", caption: "", hot: "", vertical: false },
  chat: { ask: "Cut a 60s reel from these clips in the same style as my last reel.", reply: "Done. Matched the hook, pacing and captions of your reference.", tc: "", format: "", caption: "", hot: "", vertical: false },
};

type Clip = [string, string];
const APP_TRACKS: Clip[][] = [
  [["16%", "#5A1E30"], ["22%", "#1E2132"], ["30%", "#5A1E30"]],
  [["20%", "#41465E"], ["18%", "#363B52"], ["26%", "#41465E"], ["30%", "#363B52"]],
  [["11%", "#8A2238"], ["9%", "#8A2238"], ["13%", "#8A2238"], ["10%", "#8A2238"], ["12%", "#8A2238"]],
];
const R_TRACKS: { label: string; clips: Clip[] }[] = [
  { label: "V2", clips: [["14%", "#2A2A2E"], ["16%", "#8A2238"], ["40%", "#2A2A2E"]] },
  { label: "V1", clips: [["22%", "#3B4A66"], ["18%", "#34425C"], ["30%", "#3B4A66"], ["20%", "#34425C"]] },
  { label: "A1", clips: [["55%", "#2F4A3A"], ["35%", "#2F4A3A"]] },
  { label: "A2", clips: [["30%", "#2F4A3A"], ["40%", "#2F4A3A"]] },
];
const LIBRARY: [string, string | null, boolean][] = [
  ["CAM_A_001.mov", CLIPS.set, false],
  ["CAM_B_001.mov", CLIPS.interview, true],
  ["CAM_C_002.mov", CLIPS.hands, false],
  ["LAV_audio.wav", null, false],
  ["city_broll_04.mov", CLIPS.city, false],
];

function Clips({ clips, r = 2 }: { clips: Clip[]; r?: number }) {
  return (
    <>
      {clips.map(([w, bg], i) => (
        <div key={i} className="h-full" style={{ flex: `0 0 ${w}`, background: bg, borderRadius: r }} />
      ))}
    </>
  );
}

function Icon({ size = 14 }: { size?: number }) {
  return <Image src="/brand/broll-icon.png" alt="" width={size} height={size} style={{ width: size, height: size, borderRadius: 3 }} />;
}

const bubbleMe = "self-end max-w-[92%] rounded-[10px_10px_3px_10px] bg-[#1E2132] px-[9px] py-[7px] text-[11px] leading-[1.4]";
const bubbleAi = "max-w-[92%] rounded-[10px_10px_10px_3px] border border-line px-[9px] py-[7px] text-[11px] leading-[1.4] text-ink-2";
const inputBar = "mt-auto flex items-center gap-1.5 rounded-lg border border-line px-2 py-1.5 text-[10px] text-muted";

/** Decorative app window for each Broll surface (Chat, Windows, Mac, Resolve). */
export default function ProductMock({ kind }: { kind: MockKind }) {
  const c = COPY[kind];
  const isApp = kind === "windows" || kind === "mac";
  return (
    <div aria-hidden className="box-border w-full overflow-hidden rounded-2xl border border-line bg-surface-2 text-ink">
      {kind === "mac" && (
        <div className="relative flex h-[38px] items-center gap-2 border-b border-line bg-[#161824] px-3.5">
          <span className="size-[11px] rounded-full bg-[#FF5F57]" />
          <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
          <span className="size-[11px] rounded-full bg-[#28C840]" />
          <span className="absolute left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-soft">Broll — podcast_ep42</span>
        </div>
      )}
      {kind === "windows" && (
        <div className="flex h-[38px] items-center border-b border-line bg-[#161824] pl-3.5">
          <Icon />
          <span className="ml-2.5 truncate text-xs text-soft">Broll — interview_day2</span>
          <span className="ml-auto flex h-full">
            {["M0 5h10", "box", "M0 0l10 10M10 0L0 10"].map((d) => (
              <span key={d} className="flex w-11 items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  {d === "box" ? (
                    <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="#A8ACBE" strokeWidth="1" />
                  ) : (
                    <path d={d} stroke="#A8ACBE" strokeWidth="1" />
                  )}
                </svg>
              </span>
            ))}
          </span>
        </div>
      )}
      {kind === "resolve" && (
        <div className="flex h-[38px] items-center gap-3 border-b border-[#2E2E31] bg-[#1E1E20] px-3.5">
          <span className="text-xs whitespace-nowrap text-[#B4B4B8]">DaVinci Resolve Studio</span>
          <span className="truncate text-xs text-[#8E8E93]">· brand_film_v3</span>
          <span className="ml-auto rounded-md bg-crimson px-2 py-1 font-mono text-[11px] whitespace-nowrap text-white">Broll plugin</span>
        </div>
      )}
      {kind === "chat" && (
        <div className="flex h-[42px] items-center gap-3 border-b border-line bg-[#161824] px-3.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </span>
          <span className="mx-auto flex h-[26px] max-w-[420px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-bg font-mono text-[11px] text-soft">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A8ACBE" strokeWidth="2.4">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            chat.trybroll.com
          </span>
          <span className="inline-flex items-center gap-[5px] font-mono text-[10px] text-red">
            <span className="size-1.5 rounded-full bg-red" />
            LIVE
          </span>
        </div>
      )}

      {isApp && (
        <div className="flex aspect-video min-h-0">
          <div className="box-border flex min-w-0 flex-[0_0_21%] flex-col gap-1.5 overflow-hidden border-r border-line bg-[#0C0D15] px-2.5 py-3">
            <span className="mb-1 font-mono text-[10px] text-muted">LIBRARY · 5 clips</span>
            {LIBRARY.map(([name, thumb, on]) => (
              <div
                key={name}
                className="flex min-w-0 items-center gap-1.5 rounded-[5px] p-1"
                style={on ? { background: "#2E1220", outline: "1px solid #5A1E30" } : undefined}
              >
                <span className="relative h-4 flex-[0_0_26px] overflow-hidden rounded-[3px] bg-[#34394F]">
                  {thumb && <Shot src={thumb} sizes="32px" tint={false} />}
                </span>
                <span className="truncate font-mono text-[10px] text-ink-2">{name}</span>
              </div>
            ))}
          </div>
          <div className="box-border flex min-w-0 flex-1 flex-col gap-2.5 p-3">
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-[#161824]">
              <div
                className="relative overflow-hidden"
                style={
                  c.vertical
                    ? { height: "92%", aspectRatio: "9 / 16", borderRadius: 6, background: "#1E2132" }
                    : { width: "100%", height: "100%", background: "#191B28" }
                }
              >
                <Shot
                  src={c.vertical ? CLIPS.creator : CLIPS.interview}
                  position={c.vertical ? "center" : "center 30%"}
                  sizes="(min-width: 1024px) 420px, 60vw"
                />
                <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 rounded bg-bg px-1.5 py-[3px] text-[10px] font-bold whitespace-nowrap">
                  {c.caption} <span className="text-red">{c.hot}</span>
                </span>
              </div>
              <span className="absolute top-1.5 left-2 font-mono text-[9px] text-soft">{c.tc}</span>
              <span className="absolute top-1.5 right-2 font-mono text-[9px] text-soft">{c.format}</span>
            </div>
            <div className="relative flex flex-col gap-1">
              {APP_TRACKS.map((t, i) => (
                <div key={i} className="flex h-3 gap-0.5">
                  <Clips clips={t} />
                </div>
              ))}
              <div className="absolute -top-1 -bottom-1 left-[47%] w-0.5 bg-crimson" />
            </div>
          </div>
          <div className="box-border flex min-w-0 flex-[0_0_29%] flex-col gap-2 overflow-hidden border-l border-line bg-[#0C0D15] p-3">
            <span className="font-mono text-[10px] text-muted">BROLL AGENT</span>
            <div className={bubbleMe}>{c.ask}</div>
            <div className={bubbleAi}>
              <span className="font-semibold text-red">Broll · </span>
              {c.reply}
            </div>
            <div className={inputBar}>
              <span className="min-w-0 flex-1 truncate">Describe a change…</span>
              <span className="size-[18px] shrink-0 rounded-[5px] bg-crimson" />
            </div>
          </div>
        </div>
      )}

      {kind === "chat" && (
        <div className="flex aspect-video min-h-0 bg-[#0C0D15]">
          <div className="box-border flex min-w-0 flex-[0_0_19%] flex-col gap-1.5 overflow-hidden border-r border-line px-2.5 py-3">
            <div className="mb-1.5 flex items-center gap-1.5">
              <Icon size={16} />
              <span className="text-[11px] font-semibold">Broll</span>
            </div>
            <span className="truncate rounded-md bg-crimson px-2 py-1.5 text-[10px] text-white">+ New edit</span>
            <span className="mt-1.5 font-mono text-[9px] text-muted">RECENT</span>
            <span className="truncate rounded-[5px] bg-[#1D2030] px-1.5 py-[5px] text-[10px]">Podcast ep42 reel</span>
            <span className="truncate px-1.5 py-[5px] text-[10px] text-soft">Friday stream clips</span>
            <span className="truncate px-1.5 py-[5px] text-[10px] text-soft">Brand film v3</span>
          </div>
          <div className="box-border flex min-w-0 flex-1 flex-col gap-2.5 overflow-hidden px-[6%] py-3.5">
            <div className="flex max-w-[78%] flex-col items-end gap-1.5 self-end">
              <div className="flex gap-1.5">
                <span className="rounded-[5px] border border-line-strong px-1.5 py-1 font-mono text-[9px] whitespace-nowrap text-ink-2">3 clips · 2h 40m</span>
                <span className="rounded-[5px] border border-wine-line px-1.5 py-1 font-mono text-[9px] whitespace-nowrap text-red">ref: last_reel.mp4</span>
              </div>
              <div className="rounded-[10px_10px_3px_10px] bg-[#1E2132] px-2.5 py-[7px] text-[11px] leading-[1.4]">{c.ask}</div>
            </div>
            <div className="flex max-w-[82%] flex-col gap-2">
              <span className="text-[11px] leading-[1.4] text-ink-2">
                <span className="font-semibold text-red">Broll · </span>
                {c.reply}
              </span>
              <div className="flex items-stretch gap-2.5 rounded-[10px] border border-line bg-surface p-2">
                <div className="relative aspect-video flex-[0_0_38%] overflow-hidden rounded-md bg-[#1D2030]">
                  <Shot src={CLIPS.podcast} sizes="160px" />
                  <div className="absolute top-1/2 left-1/2 size-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
                  <span className="truncate text-[11px] font-semibold">First cut · 0:58</span>
                  <div className="flex flex-wrap gap-[5px]">
                    <span className="rounded bg-crimson px-1.5 py-[3px] text-[9px] text-white">Export MP4</span>
                    <span className="rounded border border-line-strong px-1.5 py-[3px] text-[9px] text-ink-2">XML</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto flex items-center gap-1.5 rounded-[10px] border border-line-strong px-2.5 py-[7px] text-[10px] text-muted">
              <span className="min-w-0 flex-1 truncate">Ask for a change, or drop more footage…</span>
              <span className="size-5 shrink-0 rounded-md bg-crimson" />
            </div>
          </div>
        </div>
      )}

      {kind === "resolve" && (
        <div className="flex aspect-video min-h-0 bg-[#19191B]">
          <div className="box-border flex min-w-0 flex-1 flex-col gap-2.5 p-2.5">
            <div className="flex min-h-0 flex-1 gap-2.5">
              <div className="relative flex-1 overflow-hidden rounded bg-[#232326]">
                <Shot src={CLIPS.drone} sizes="(min-width: 1024px) 220px, 35vw" />
                <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#8E8E93]">SOURCE</span>
              </div>
              <div className="relative flex-1 overflow-hidden rounded bg-[#262629]">
                <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#8E8E93]">TIMELINE · 00:00:12:04</span>
                <Shot src={CLIPS.city} sizes="(min-width: 1024px) 220px, 35vw" />
              </div>
            </div>
            <div className="relative flex flex-col gap-[3px] rounded bg-[#1E1E20] p-2">
              {R_TRACKS.map((t) => (
                <div key={t.label} className="flex h-3 items-center gap-0.5">
                  <span className="flex-[0_0_18px] font-mono text-[8px] text-[#8E8E93]">{t.label}</span>
                  <Clips clips={t.clips} />
                </div>
              ))}
              <div className="absolute top-1 bottom-1 left-[41%] w-[1.5px] bg-[#E8E8EA]" />
            </div>
          </div>
          <div className="box-border flex min-w-0 flex-[0_0_31%] flex-col gap-2 overflow-hidden border-l-2 border-crimson bg-surface-2 p-3">
            <div className="flex items-center gap-1.5">
              <Icon />
              <span className="text-xs font-semibold">Broll</span>
              <span className="ml-auto font-mono text-[9px] text-muted">PANEL</span>
            </div>
            <div className={bubbleMe}>{c.ask}</div>
            <div className={bubbleAi}>
              <span className="font-semibold text-red">Broll · </span>
              {c.reply}
            </div>
            <div className="flex gap-1.5 text-[10px]">
              <span className="rounded-md bg-crimson px-2 py-[5px] whitespace-nowrap text-white">Applied to timeline</span>
              <span className="rounded-md border border-line-strong px-2 py-[5px] text-ink-2">Undo</span>
            </div>
            <div className={inputBar}>
              <span className="min-w-0 flex-1 truncate">Ask Broll…</span>
              <span className="size-[18px] shrink-0 rounded-[5px] bg-crimson" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
