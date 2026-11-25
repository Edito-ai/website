import Image from "next/image";
import { CLIPS } from "@/components/v2/Shot";
import { ArrowRight, CHAT_URL } from "@/components/v2/ui";

/**
 * Phone hero: a fanned hand of three captioned 9:16 clips floating under the
 * headline, one CTA and a scroll cue. Replaces the tabs/prompt/editor window
 * below 640px so the first screen reads at a glance.
 */

const FAN = [
  { src: CLIPS.podcast, cap: <>he <span className="text-red">did it</span></>, score: 94, cls: "fan-l" },
  { src: CLIPS.creator, cap: <><span className="text-red">listen</span></>, score: 91, cls: "fan-r" },
  { src: CLIPS.streamer, cap: <>no <span className="text-red">way</span></>, score: 97, cls: "fan-c" },
];

export default function HeroFan() {
  return (
    <div className="flex w-full flex-col items-center gap-7 sm:hidden">
      <div data-reveal aria-hidden className="relative h-[270px] w-full">
        <div className="absolute top-1/2 left-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(190,30,52,0.45),transparent)]" />
        {FAN.map((c) => (
          <div key={c.cls} className={`fan-card ${c.cls} absolute top-1/2 left-1/2`}>
            <div
              className={
                "relative aspect-[9/16] w-[132px] overflow-hidden rounded-2xl bg-surface " +
                (c.cls === "fan-c"
                  ? "border-[1.5px] border-crimson shadow-[0_30px_60px_-20px_rgba(190,30,52,0.8)]"
                  : "border border-line-strong shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)]")
              }
            >
              <Image src={c.src} alt="" fill priority={c.cls === "fan-c"} sizes="132px" className="object-cover" />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,15,0.3)_0%,transparent_30%,transparent_60%,rgba(8,9,15,0.65)_100%)]" />
              <span className="absolute top-2 right-2 rounded bg-crimson px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                {c.score}
              </span>
              <span className="absolute top-[64%] left-1/2 -translate-x-1/2 rounded bg-bg px-1.5 py-[3px] text-[13px] font-bold whitespace-nowrap">
                {c.cap}
              </span>
            </div>
          </div>
        ))}
        <span className="fan-chip absolute top-[8%] left-[4%] rounded-full border border-line-strong bg-surface/90 px-2.5 py-1 font-mono text-[11px] text-ink-2 backdrop-blur">
          ✂ auto-clipped
        </span>
        <span className="fan-chip absolute right-[4%] bottom-[10%] rounded-full border border-wine-line bg-wine/90 px-2.5 py-1 font-mono text-[11px] text-red backdrop-blur [animation-delay:-2s]">
          ✓ edited · captioned
        </span>
      </div>

      <div data-reveal className="flex w-full flex-col items-center gap-3">
        <a href={CHAT_URL} className="btn btn-primary w-full gap-2 shadow-[0_12px_40px_-8px_rgba(190,30,52,0.6)]">
          Start in Chat
          <ArrowRight />
        </a>
        <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
          <span className="size-[6px] rounded-full bg-red" />
          Live on web, Windows and Mac
        </span>
      </div>

      <a href="#layers-title" aria-label="Scroll to explore" className="scroll-cue flex flex-col items-center gap-1.5 font-mono text-[11px] text-muted">
        Scroll to explore
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </div>
  );
}
