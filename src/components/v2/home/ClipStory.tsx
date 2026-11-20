"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLIPS } from "@/components/v2/Shot";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned, scroll-scrubbed diagram of clipping: a 3-hour stream goes in, a
 * scanner sweeps it, the peaks light up, and captioned 9:16 clips rise out.
 * Without motion (reduced motion / no JS) it simply shows the end state.
 */

const HEAT = [14, 20, 26, 22, 18, 30, 54, 92, 86, 38, 26, 22, 28, 34, 26, 20, 40, 66, 96, 88, 46, 28, 24, 20, 26, 32, 28, 38, 60, 90, 94, 50, 30, 26, 22, 28, 44, 82, 76, 34, 26, 22, 30, 58, 88, 80, 38, 24, 20, 28, 36, 70, 91, 64, 28, 22];
const PEAKS = [7, 18, 30, 37, 44, 52];
const HOT = new Set(PEAKS.flatMap((p) => [p - 1, p]));

const OUT = [
  { src: CLIPS.streamer, cap: <>no <span className="text-red">way</span></>, score: 97 },
  { src: CLIPS.podcast, cap: <>he <span className="text-red">did it</span></>, score: 94 },
  { src: CLIPS.creator, cap: <><span className="text-red">listen</span></>, score: 91 },
  { src: CLIPS.interview, cap: <><span className="text-red">insane</span></>, score: 88, pos: "45% 30%" },
];

const STEPS = ["Paste a link", "AI watches it all", "Finds the peaks", "Clips, captioned"];

export default function ClipStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const bars = q("[data-bar-h]");
      const hot = q("[data-hot]");
      const steps = q("[data-step]");

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: el,
          pin: q("[data-stage]")[0],
          start: "top top",
          end: () => `+=${window.innerHeight * (window.innerWidth < 640 ? 2 : 2.6)}`,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const light = (i: number, at: string | number) =>
        tl.to(steps[i], { opacity: 1, color: "#f2f3f7", borderColor: "rgba(255,92,112,0.6)", duration: 0.3 }, at);

      // 1 — the link lands
      light(0, 0);
      tl.from(q("[data-link]"), { y: -40, opacity: 0, scale: 0.9, duration: 0.6 }, 0);
      tl.from(q("[data-link-text]"), { clipPath: "inset(0 100% 0 0)", duration: 0.8, ease: "none" }, 0.2);
      tl.from(q("[data-strip]"), { opacity: 0.25, duration: 0.4 }, 0.3);

      // 2 — the scanner sweeps, the stream's heat rises behind it
      light(1, 1);
      tl.fromTo(q("[data-scan]"), { left: "0%", opacity: 0 }, { left: "100%", opacity: 1, duration: 2.4, ease: "none" }, 1);
      tl.from(bars, { scaleY: 0.08, duration: 0.25, stagger: { each: 2.4 / bars.length } }, 1);
      tl.fromTo(q("[data-tc]"), { innerText: 0 }, { innerText: 192, snap: { innerText: 1 }, duration: 2.4, ease: "none" }, 1);
      tl.to(q("[data-scan]"), { opacity: 0, duration: 0.2 }, 3.4);

      // 3 — peaks turn hot, markers pop
      light(2, 3.5);
      tl.from(hot, { backgroundColor: "#2A2E42", duration: 0.5, stagger: 0.04 }, 3.5);
      tl.from(q("[data-pin]"), { scale: 0, opacity: 0, y: 10, duration: 0.4, stagger: 0.08, ease: "back.out(2.5)" }, 3.7);

      // 4 — clips rise out of the stream
      light(3, 4.6);
      tl.from(
        q("[data-clip]"),
        { y: -160, scale: 0.4, opacity: 0, rotate: (i: number) => (i % 2 ? 8 : -8), duration: 1, stagger: 0.18, ease: "power3.out" },
        4.6,
      );
      tl.from(q("[data-cap]"), { scale: 0, opacity: 0, duration: 0.35, stagger: 0.12, ease: "back.out(2)" }, 5.4);
      tl.from(q("[data-score]"), { scale: 0, duration: 0.3, stagger: 0.1, ease: "back.out(3)" }, 5.6);
      tl.from(q("[data-done]"), { y: 20, opacity: 0, duration: 0.5 }, 6);
      tl.to({}, { duration: 0.6 }); // hold the finished frame
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="new" aria-labelledby="clip-title" className="relative w-full scroll-mt-20 bg-bg">
      <div data-stage className="relative flex min-h-svh flex-col justify-center overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(190,30,52,0.18),transparent_70%)]" />
        <div className="relative mx-auto box-border flex w-full max-w-[1100px] flex-col items-center gap-5 px-5 py-16 sm:gap-6 sm:px-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 font-mono text-[13px] text-red">
              <span className="rounded-full bg-crimson px-2 py-[3px] font-sans text-xs font-semibold text-white">New</span>
              AI CLIPPING
            </span>
            <h2 id="clip-title" className="h-section">
              3 hours in. <span className="text-grad">Viral clips out.</span>
            </h2>
          </div>

          <ol aria-label="How clipping works" className="m-0 flex list-none flex-wrap justify-center gap-1.5 p-0 sm:gap-2">
            {STEPS.map((s, i) => (
              <li
                key={s}
                data-step
                className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[11px] text-muted opacity-60 sm:px-3 sm:text-xs"
              >
                <span className="text-red">0{i + 1}</span> {s}
              </li>
            ))}
          </ol>

          <div aria-hidden className="flex w-full flex-col items-center gap-4 sm:gap-5">
            {/* Link */}
            <div data-link className="flex w-full max-w-[520px] items-center gap-2.5 rounded-2xl border border-line-strong bg-surface px-3.5 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5C70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
              </svg>
              <span data-link-text className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink-2 sm:text-[13px]">
                youtube.com/watch?v=friday_stream
              </span>
              <span className="shrink-0 rounded-lg bg-crimson px-2.5 py-1 text-xs font-semibold text-white">Clip it</span>
            </div>

            {/* Stream heat strip */}
            <div data-strip className="relative w-full rounded-2xl border border-line bg-[#0C0D15] p-3 sm:p-4">
              <div className="mb-2 flex justify-between font-mono text-[10px] text-muted sm:text-[11px]">
                <span>0:00</span>
                <span>
                  scanned <span data-tc className="text-red">192</span> min
                </span>
                <span>3:12:40</span>
              </div>
              <div className="relative h-16 sm:h-[clamp(64px,11vh,96px)]">
                <div className="flex h-full items-end gap-[2px] sm:gap-[3px]">
                  {HEAT.map((h, i) => (
                    <div
                      key={i}
                      data-bar-h
                      {...(HOT.has(i) ? { "data-hot": "" } : {})}
                      className="flex-1 origin-bottom rounded-[2px]"
                      style={{ height: `${h}%`, background: HOT.has(i) ? "#BE1E34" : h > 55 ? "#5A1E30" : "#2A2E42" }}
                    />
                  ))}
                </div>
                {PEAKS.map((p, n) => (
                  <span
                    key={p}
                    data-pin
                    className="absolute -top-3 flex size-5 -translate-x-1/2 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-bold text-bg shadow-[0_0_16px_rgba(255,92,112,0.7)]"
                    style={{ left: `${((p + 0.5) / HEAT.length) * 100}%` }}
                  >
                    {n + 1}
                  </span>
                ))}
                <div
                  data-scan
                  className="pointer-events-none absolute -inset-y-2 w-0.5 bg-red opacity-0 shadow-[0_0_24px_6px_rgba(255,92,112,0.55)]"
                  style={{ left: "100%" }}
                />
              </div>
            </div>

            {/* Clips out */}
            <div className="flex w-full justify-center gap-2.5 sm:gap-4">
              {OUT.map((c, i) => (
                <div
                  key={i}
                  data-clip
                  className={
                    "relative aspect-[9/16] w-[30%] max-w-[170px] overflow-hidden rounded-xl bg-surface sm:h-[clamp(140px,27vh,300px)] sm:w-auto sm:max-w-none " +
                    (i === 3 ? "max-sm:hidden " : "") +
                    (i === 0 ? "border-[1.5px] border-crimson shadow-[0_0_40px_-6px_rgba(255,92,112,0.7)]" : "border border-line-strong")
                  }
                >
                  <Image src={c.src} alt="" fill sizes="(min-width: 640px) 170px, 30vw" className="object-cover" style={{ objectPosition: c.pos ?? "center" }} />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,15,0.35)_0%,transparent_30%,transparent_60%,rgba(8,9,15,0.6)_100%)]" />
                  <span data-score className="absolute top-2 right-2 rounded bg-crimson px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                    {c.score}
                  </span>
                  <span data-cap className="absolute top-[62%] left-1/2 -translate-x-1/2 rounded bg-bg px-1.5 py-[3px] text-[11px] font-bold whitespace-nowrap sm:text-sm">
                    {c.cap}
                  </span>
                </div>
              ))}
            </div>

            <div data-done className="inline-flex items-center gap-2 rounded-full border border-wine-line bg-wine/60 px-3.5 py-1.5 font-mono text-xs text-red">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
              6 clips ready · Shorts · Reels · TikTok
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
