import { Btn, CHAT_URL, Check } from "@/components/v2/ui";
import Shot, { CLIPS } from "@/components/v2/Shot";

const WAVE = [30, 42, 26, 58, 36, 22, 48, 92, 88, 40, 28, 34, 52, 30, 24, 38, 60, 96, 84, 44, 30, 26, 36, 48, 32, 28, 42, 54, 90, 94, 46, 34, 30, 24, 40, 56, 36, 88, 80, 32];
const HOT = new Set([7, 8, 17, 18, 28, 29, 37, 38]);
const YT_CLIPS = [
  { dur: "0:42", cap: "no way", title: "The comeback round", src: CLIPS.streamer, pos: "center" },
  { dur: "0:28", cap: "he did it", title: "Chat goes wild", src: CLIPS.podcast, pos: "center" },
  { dur: "0:35", cap: "listen", title: "The big reveal", src: CLIPS.creator, pos: "center" },
];

const tag = "font-mono text-[10px] px-[7px] py-1 rounded-[5px]";

function Phone({ file, src, pos, children, hot }: { file: string; src: string; pos: string; children: React.ReactNode; hot?: boolean }) {
  return (
    <div
      className="relative aspect-[9/14] overflow-hidden rounded-[14px]"
      style={{
        background: hot ? "#1E2132" : "#191B28",
        border: hot ? "1.5px solid #BE1E34" : "1px solid #272B3E",
      }}
    >
      <Shot src={src} position={pos} sizes="(min-width: 1024px) 240px, 45vw" />
      <span className="absolute top-2.5 left-2.5 font-mono text-[10px] text-soft">{file}</span>
      <span className="absolute top-[58%] left-1/2 -translate-x-1/2 rounded bg-bg px-2 py-1 text-[13px] font-bold whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}

export default function NewFeatures({ eyebrow = "NEW IN BROLL" }: { eyebrow?: string }) {
  return (
    <section id="new" aria-labelledby="new-title" className="w-full scroll-mt-20 bg-bg">
      <div className="mx-auto box-border flex max-w-[1440px] flex-col gap-12 px-6 lg:px-10 pt-20 pb-24 md:pt-24 md:pb-28">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2.5 font-mono text-[13px] text-red">
              <span className="rounded-full bg-crimson px-2 py-[3px] font-sans text-xs font-semibold text-white">New</span>
              {eyebrow}
            </span>
            <h2 id="new-title" className="m-0 text-[clamp(34px,4.6vw,64px)] leading-[1.02] font-semibold tracking-[-0.04em]">
              Two faster ways to a finished video.
            </h2>
          </div>
          <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-soft lg:mb-2">
            Copy the style of a video that already works, or turn a long YouTube video into clips in one pass.
          </p>
        </div>

        {/* 01 — reference-style editing */}
        <article
          className="box-border flex flex-wrap items-center gap-12 rounded-[28px] border border-line bg-surface-2"
          style={{ padding: "clamp(24px, 3.4vw, 48px)" }}
        >
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px]">
            <span className="mono-label">01 · REFERENCE-STYLE EDITING</span>
            <h3 className="m-0 text-[clamp(28px,3vw,42px)] leading-[1.08] font-semibold tracking-[-0.035em]">
              Show it a video you love. Get the same edit.
            </h3>
            <p className="m-0 text-base leading-[1.7] text-soft">
              Give Broll a reference, like your best-performing reel or a format you want to repeat. It picks up the
              pacing, caption style, layout and look, then cuts your new footage to the same template.
            </p>
            <ol className="mt-1 mb-0 flex list-none flex-col gap-3 p-0">
              {["Add a reference video", "Drop in your new footage", "Get a cut in the same style, ready to review"].map(
                (s, i) => (
                  <li key={s} className="flex items-baseline gap-3.5 text-[15px] text-ink-2">
                    <span className="w-[22px] shrink-0 font-mono text-xs text-red">0{i + 1}</span>
                    {s}
                  </li>
                ),
              )}
            </ol>
            <p className="m-0 text-sm leading-relaxed text-muted">Built for series, recurring formats and client house styles.</p>
          </div>
          <div aria-hidden className="flex min-w-0 flex-[999_1_520px] flex-wrap items-stretch gap-3.5">
            <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2.5">
              <span className="font-mono text-[11px] text-muted">REFERENCE</span>
              <Phone file="best_reel.mp4" src={CLIPS.podcast} pos="center">
                stop <span className="text-red">scrolling</span>
              </Phone>
              <div className="flex flex-wrap gap-1.5">
                {["3s hook", "fast cuts", "bold captions", "warm grade"].map((t) => (
                  <span key={t} className={`${tag} bg-[#1D2030] text-ink-2`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-[0_0_56px] flex-col items-center justify-center gap-2">
              <span className="flex size-11 items-center justify-center rounded-full bg-crimson">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="text-center font-mono text-[10px] text-muted">
                same
                <br />
                template
              </span>
            </div>
            <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2.5">
              <span className="font-mono text-[11px] text-red">YOUR NEW CUT</span>
              <Phone file="ep43_reel.mp4" src={CLIPS.creator} pos="center" hot>
                this is <span className="text-red">huge</span>
              </Phone>
              <div className="flex flex-wrap gap-1.5">
                {["✓ hook", "✓ pacing", "✓ captions", "✓ grade"].map((t) => (
                  <span key={t} className={`${tag} bg-wine text-red`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* 02 — YouTube & stream clipping */}
        <article
          className="box-border flex flex-wrap-reverse items-center gap-12 rounded-[28px] border border-line bg-surface-2"
          style={{ padding: "clamp(24px, 3.4vw, 48px)" }}
        >
          <div aria-hidden className="flex min-w-0 flex-[999_1_520px] flex-col gap-4">
            <div className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-bg px-3.5 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
              </svg>
              <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-ink-2">
                youtube.com/watch?v=… · Friday stream · 3:12:40
              </span>
              <span className="shrink-0 rounded-lg bg-crimson px-2.5 py-1.5 text-xs font-semibold text-white">Find clips</span>
            </div>
            <div className="flex flex-col gap-2.5 rounded-[14px] border border-line bg-[#0C0D15] p-3.5">
              <div className="flex justify-between font-mono text-[10px] text-muted">
                <span>0:00:00</span>
                <span>HIGHLIGHTS FOUND · 6</span>
                <span>3:12:40</span>
              </div>
              <div className="flex h-11 items-end gap-0.5">
                {WAVE.map((h, i) => (
                  <div key={i} className="flex-1 rounded-[2px]" style={{ height: `${h}%`, background: HOT.has(i) ? "#BE1E34" : "#33384E" }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {YT_CLIPS.map((c) => (
                <div key={c.title} className="flex min-w-0 flex-col gap-2">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-line bg-[#191B28]">
                    <Shot src={c.src} position={c.pos} sizes="(min-width: 1024px) 200px, 30vw" />
                    <span className="absolute top-2 left-2 rounded bg-bg px-[5px] py-0.5 font-mono text-[10px] text-ink-2">{c.dur}</span>
                    <span className="absolute top-[60%] left-1/2 -translate-x-1/2 rounded bg-bg px-1.5 py-[3px] text-[11px] font-bold whitespace-nowrap">
                      {c.cap}
                    </span>
                  </div>
                  <span className="truncate text-xs text-ink-2">{c.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px]">
            <span className="mono-label">02 · YOUTUBE &amp; STREAM CLIPPING</span>
            <h3 className="m-0 text-[clamp(28px,3vw,42px)] leading-[1.08] font-semibold tracking-[-0.035em]">
              Paste a link. Get the clips.
            </h3>
            <p className="m-0 text-base leading-[1.7] text-soft">
              Drop in a YouTube video or a long stream. Broll watches the whole thing, finds the moments worth posting,
              and cuts them into captioned short clips for Shorts, Reels and TikTok.
            </p>
            <ul className="mt-1 mb-0 flex list-none flex-col gap-3 p-0">
              {[
                "Hours of stream turned into clips in one pass",
                "Captions on every clip",
                "Combine with a reference to keep every clip on-brand",
              ].map((s) => (
                <li key={s} className="flex gap-2.5 text-[15px] leading-normal text-ink-2">
                  <Check />
                  {s}
                </li>
              ))}
            </ul>
            <p className="m-0 text-sm leading-relaxed text-muted">For videos you own or have the rights to use.</p>
          </div>
        </article>

        <div className="flex flex-wrap justify-center gap-3">
          <Btn href={CHAT_URL}>Try it in Chat</Btn>
          <Btn href="/product#chat" variant="ghost">
            See all products
          </Btn>
        </div>
      </div>
    </section>
  );
}
