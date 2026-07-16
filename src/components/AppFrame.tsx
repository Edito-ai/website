/**
 * A faithful mock of the actual app layout (toolbar / media / monitor /
 * inspector / timeline), built from the product's own design tokens. Swap the
 * interior for a real capture when screenshots are available — the frame,
 * chrome, and callouts stay.
 */

const mediaThumbs = [
  { name: "intro.mp4", look: "from-violet-800/60 to-ink-800" },
  { name: "interview_a.mov", look: "from-sky-800/50 to-ink-800" },
  { name: "b-roll_02.mp4", look: "from-fuchsia-900/50 to-ink-800" },
  { name: "drone_04.mp4", look: "from-indigo-800/50 to-ink-800" },
];

const inspector = [
  { label: "Position", value: 64 },
  { label: "Scale", value: 82 },
  { label: "Rotation", value: 12 },
  { label: "Opacity", value: 100 },
];

const callouts = [
  { label: "Media library — real thumbnails on import", pos: "top-[22%] -left-2 -translate-x-full", side: "right" },
  { label: "Program monitor — frame-accurate, up to 4K", pos: "top-[8%] left-1/2 -translate-x-1/2 -translate-y-full", side: "bottom" },
  { label: "Inspector — live transform & effects", pos: "top-[26%] -right-2 translate-x-full", side: "left" },
  { label: "Timeline — 4 video + 4 audio tracks", pos: "bottom-[12%] -left-2 -translate-x-full", side: "right" },
];

export default function AppFrame() {
  return (
    <figure className="relative">
      {/* Callout labels (lg+) */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden xl:block" aria-hidden>
        {callouts.map((c) => (
          <span
            key={c.label}
            className={`absolute ${c.pos} w-40 font-mono text-[10px] leading-snug text-mist ${
              c.side === "right" ? "pr-6 text-right" : c.side === "left" ? "pl-6" : "pb-4 text-center"
            }`}
          >
            {c.label}
            <span
              className={`absolute bg-white/20 ${
                c.side === "bottom"
                  ? "bottom-0 left-1/2 h-3 w-px"
                  : c.side === "right"
                    ? "top-1/2 right-0 h-px w-4"
                    : "top-1/2 left-0 h-px w-4"
              }`}
            />
          </span>
        ))}
      </div>

      <div className="card-surface overflow-hidden shadow-[0_40px_80px_-40px_rgb(139_92_246/0.25)]">
        {/* Chrome */}
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/70" />
          <span className="size-3 rounded-full bg-amber-400/70" />
          <span className="size-3 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-xs text-mist">adarpan cut — wedding_final · autosaved</span>
          <span className="ml-auto hidden gap-3 font-mono text-[10px] text-mist sm:flex">
            <span>File</span><span>Edit</span><span>Sequence</span><span>AI</span>
          </span>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-[1fr_2fr] gap-px bg-white/5 sm:grid-cols-[1fr_2.2fr_1fr]">
          {/* Media library */}
          <div className="bg-ink-900 p-3">
            <p className="mb-2 font-mono text-[9px] tracking-widest text-mist uppercase">Media</p>
            <div className="grid grid-cols-2 gap-1.5">
              {mediaThumbs.map((m) => (
                <div key={m.name} className={`aspect-video rounded bg-linear-to-br ${m.look} p-1`}>
                  <p className="truncate font-mono text-[7px] text-white/60">{m.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex h-5 items-end gap-px" aria-hidden>
              {[5, 9, 14, 8, 12, 6, 15, 10, 7, 13, 9, 5, 11, 8, 14, 6].map((h, i) => (
                <span key={i} style={{ height: `${h * 6}%` }} className="w-full rounded-sm bg-sky-400/50" />
              ))}
            </div>
            <p className="mt-1 truncate font-mono text-[7px] text-mist">dialogue.wav</p>
          </div>

          {/* Monitor */}
          <div className="relative flex flex-col bg-ink-950 p-3">
            <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded border border-white/5 bg-[radial-gradient(70%_100%_at_35%_25%,rgb(139_92_246/0.35),transparent_60%),radial-gradient(60%_90%_at_70%_80%,rgb(96_165_250/0.3),transparent_60%)]">
              <div aria-hidden className="absolute inset-[8%] rounded border border-white/10" />
              <p className="font-mono text-lg font-bold tracking-widest text-frost tabular-nums sm:text-2xl">
                00:12:31:16
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[8px] text-mist sm:text-[9px]">
              <span>◂◂ ◂ ▶ ▸ ▸▸</span>
              <span>1080p · 24 fps · fit</span>
            </div>
          </div>

          {/* Inspector */}
          <div className="hidden bg-ink-900 p-3 sm:block">
            <p className="mb-2 font-mono text-[9px] tracking-widest text-mist uppercase">Inspector</p>
            <div className="space-y-2.5">
              {inspector.map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between font-mono text-[8px] text-mist">
                    <span>{row.label}</span>
                    <span className="text-frost">{row.value}</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-ink-700">
                    <div style={{ width: `${row.value}%` }} className="h-full rounded-full bg-violet-400/80" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded border border-violet-400/20 bg-violet-500/10 px-2 py-1.5 font-mono text-[8px] text-violet-300">
              fx · Cross Dissolve · on
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative space-y-1.5 border-t border-white/8 bg-ink-950 p-3 font-mono text-[8px] text-white/50">
          <div aria-hidden className="absolute inset-y-2 left-[46%] z-10 w-px bg-violet-400 shadow-[0_0_10px_1px_rgb(139_92_246/0.7)]" />
          {[
            { label: "V2", clips: [{ l: 18, w: 20, n: "title" }, { l: 52, w: 18, n: "b-roll_02" }], video: true },
            { label: "V1", clips: [{ l: 0, w: 30, n: "intro.mp4" }, { l: 31, w: 45, n: "interview_a" }], video: true },
            { label: "A1", clips: [{ l: 0, w: 76, n: "dialogue.wav" }], video: false },
            { label: "A2", clips: [{ l: 10, w: 58, n: "score.mp3" }], video: false },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <span className="w-5 shrink-0 text-mist">{t.label}</span>
              <div className="relative h-5 flex-1 rounded bg-ink-800">
                {t.clips.map((c) => (
                  <span
                    key={c.n}
                    style={{ left: `${c.l}%`, width: `${c.w}%` }}
                    className={`absolute top-0.5 flex h-4 items-center truncate rounded-sm px-1.5 ${
                      t.video ? "bg-violet-500/30 text-violet-200" : "bg-sky-500/25 text-sky-200"
                    }`}
                  >
                    {c.n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / non-xl caption */}
      <figcaption className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1.5 font-mono text-[10px] text-mist xl:hidden">
        <span>media library</span>
        <span>·</span>
        <span>frame-accurate monitor</span>
        <span>·</span>
        <span>live inspector</span>
        <span>·</span>
        <span>8-track timeline</span>
      </figcaption>
    </figure>
  );
}
