"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLIPS } from "@/components/v2/Shot";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned, scroll-scrubbed diagram of editing: camera files drop in, the brief
 * types itself, clips fly onto a timeline, captions land, the playhead runs
 * and the export formats pop out. Shows the end state without motion.
 */

const CAMS = [
  { name: "CAM A", src: CLIPS.podcast, pos: "50% 40%" },
  { name: "CAM B", src: CLIPS.interview, pos: "45% 30%" },
  { name: "CAM C", src: CLIPS.creator, pos: "50% 30%" },
  { name: "B-ROLL", src: CLIPS.city, pos: "center" },
];

// [start%, width%, cam index]
const V1: [number, number, number][] = [
  [0, 16, 1],
  [16.4, 20, 0],
  [36.8, 22, 1],
  [59.2, 18, 2],
  [77.6, 22.4, 1],
];
const V2: [number, number][] = [
  [12, 12],
  [48, 14],
  [80, 11],
];
const CC: [number, number, string][] = [
  [1, 13, "here's"],
  [15, 14, "the thing"],
  [30, 18, "nobody tells"],
  [49, 14, "you"],
  [64, 16, "everything"],
  [81, 17, "changed"],
];

const STEPS = ["Drop footage", "Describe it", "Agent cuts", "Export"];
const EXPORTS = ["MP4", "Premiere XML", "Resolve XML", "FCP XML"];
const BRIEF = "60s reel · punchy hook · bold captions";

export default function EditStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const steps = q("[data-step]");
      const mobile = window.innerWidth < 640;

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

      const light = (i: number, at: number) =>
        tl.to(steps[i], { opacity: 1, color: "#f2f3f7", borderColor: "rgba(255,92,112,0.6)", duration: 0.3 }, at);

      // 1 — footage drops in
      light(0, 0);
      tl.from(q("[data-cam]"), { y: -80, opacity: 0, rotate: (i: number) => (i % 2 ? 10 : -10), duration: 0.7, stagger: 0.15, ease: "back.out(1.6)" }, 0);

      // 2 — the brief types itself
      light(1, 1);
      tl.from(q("[data-brief]"), { scale: 0.85, opacity: 0, duration: 0.4 }, 1);
      tl.from(q("[data-brief-text]"), { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "none" }, 1.2);

      // 3 — clips fly onto the timeline, captions land, playhead runs
      light(2, 2.4);
      tl.from(q("[data-v1]"), { x: mobile ? -60 : -220, y: -60, opacity: 0, scale: 0.6, duration: 0.7, stagger: 0.14, ease: "power3.out" }, 2.4);
      tl.from(q("[data-v2]"), { y: -50, opacity: 0, duration: 0.5, stagger: 0.12 }, 3);
      tl.from(q("[data-cc]"), { scaleX: 0, opacity: 0, transformOrigin: "left center", duration: 0.35, stagger: 0.08 }, 3.3);
      tl.from(q("[data-a1]"), { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "none" }, 2.6);
      tl.fromTo(q("[data-head]"), { left: "0%" }, { left: "100%", duration: 1.6, ease: "none" }, 3.4);
      tl.fromTo(q("[data-clock]"), { innerText: 0 }, { innerText: 60, snap: { innerText: 1 }, duration: 1.6, ease: "none" }, 3.4);

      // 4 — export
      light(3, 5);
      tl.from(q("[data-export]"), { y: 30, opacity: 0, scale: 0.7, duration: 0.45, stagger: 0.1, ease: "back.out(2)" }, 5);
      tl.from(q("[data-done]"), { y: 20, opacity: 0, duration: 0.5 }, 5.5);
      tl.to({}, { duration: 0.6 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="edit-title" className="relative w-full border-t border-line-2 bg-bg-2">
      <div data-stage className="relative flex min-h-svh flex-col justify-center overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_65%,rgba(56,70,107,0.35),transparent_70%)]" />
        <div className="relative mx-auto box-border flex w-full max-w-[1100px] flex-col items-center gap-5 px-5 py-16 sm:gap-6 sm:px-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="eyebrow">AI EDITING</span>
            <h2 id="edit-title" className="h-section">
              Raw footage in. <span className="text-grad">Finished cut out.</span>
            </h2>
          </div>

          <ol aria-label="How editing works" className="m-0 flex list-none flex-wrap justify-center gap-1.5 p-0 sm:gap-2">
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

          <div aria-hidden className="flex w-full flex-col items-center gap-5 sm:gap-6">
            {/* Footage + brief */}
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:justify-center sm:gap-6">
              <div className="grid w-full max-w-[420px] grid-cols-4 gap-2 sm:gap-2.5">
                {CAMS.map((c) => (
                  <div key={c.name} data-cam className="flex min-w-0 flex-col gap-1">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-line-strong bg-surface">
                      <Image src={c.src} alt="" fill sizes="110px" className="object-cover" style={{ objectPosition: c.pos }} />
                    </div>
                    <span className="truncate font-mono text-[9px] text-muted sm:text-[10px]">{c.name}</span>
                  </div>
                ))}
              </div>
              <div
                data-brief
                className="flex max-w-[360px] items-center self-center rounded-[16px_16px_4px_16px] border border-line-strong bg-[#1E2132] px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
              >
                <span data-brief-text className="font-mono text-[12px] whitespace-nowrap text-ink sm:text-[13px]">
                  {BRIEF}
                  <span className="text-red">▍</span>
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative w-full rounded-2xl border border-line bg-[#0C0D15] p-3 sm:p-4">
              <div className="mb-2 flex justify-between font-mono text-[10px] text-muted sm:text-[11px]">
                <span>00:00</span>
                <span>
                  00:<span data-clock className="text-red">60</span>
                </span>
                <span>01:00</span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <Lane label="V2">
                  {V2.map(([at, w]) => (
                    <div key={at} data-v2 className="absolute inset-y-0 overflow-hidden rounded-[4px] border border-[#8A2238]" style={{ left: `${at}%`, width: `${w}%` }}>
                      <div className="absolute inset-0" style={{ backgroundImage: `url(${CLIPS.city})`, backgroundSize: "auto 100%" }} />
                      <div className="absolute inset-0 bg-[#5A1E30]/55" />
                    </div>
                  ))}
                </Lane>
                <Lane label="V1" tall>
                  {V1.map(([at, w, cam]) => (
                    <div key={at} data-v1 className="absolute inset-y-0 overflow-hidden rounded-[4px] border border-[#41465E] bg-[#232638]" style={{ left: `${at}%`, width: `${w}%` }}>
                      <div
                        className="absolute inset-0 opacity-85"
                        style={{ backgroundImage: `url(${CAMS[cam].src})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x", backgroundPosition: CAMS[cam].pos }}
                      />
                      <span className="absolute top-0.5 left-1 hidden font-mono text-[9px] text-white/90 sm:block">{CAMS[cam].name}</span>
                    </div>
                  ))}
                </Lane>
                <Lane label="CC">
                  {CC.map(([at, w, t]) => (
                    <div
                      key={at}
                      data-cc
                      className={
                        "absolute inset-y-0 flex items-center overflow-hidden rounded-[4px] border px-1 " +
                        (t === "everything" ? "border-red bg-crimson" : "border-[#8A2238] bg-[#3A1422]")
                      }
                      style={{ left: `${at}%`, width: `${w}%` }}
                    >
                      <span className="hidden truncate text-[10px] font-semibold text-white sm:block">{t}</span>
                    </div>
                  ))}
                </Lane>
                <Lane label="A1">
                  <div data-a1 className="absolute inset-0 rounded-[4px] border border-[#2F4A5A] bg-[repeating-linear-gradient(90deg,#4F7A8C_0_2px,transparent_2px_5px)] bg-[#13202A] opacity-80" />
                </Lane>
                <div className="pointer-events-none absolute inset-y-[-6px] right-0 left-[34px] sm:left-[42px]">
                  <div data-head className="absolute inset-y-0 w-0.5 bg-red shadow-[0_0_14px_rgba(255,92,112,0.8)]" style={{ left: "100%" }}>
                    <span className="absolute -top-1 left-1/2 h-2.5 w-3 -translate-x-1/2 rounded-b-[3px] bg-crimson" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {EXPORTS.map((e, i) => (
                <span key={e} data-export className={"chip " + (i === 0 ? "chip-hot" : "")}>
                  {e}
                </span>
              ))}
            </div>
            <div data-done className="inline-flex items-center gap-2 rounded-full border border-wine-line bg-wine/60 px-3.5 py-1.5 font-mono text-xs text-red">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
              First cut ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lane({ label, tall, children }: { label: string; tall?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-stretch gap-2">
      <span className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] bg-[#141623] font-mono text-[9px] text-muted sm:w-[34px] sm:text-[10px]">
        {label}
      </span>
      <div className={"relative flex-1 " + (tall ? "h-9 sm:h-11" : "h-6 sm:h-7")}>{children}</div>
    </div>
  );
}
