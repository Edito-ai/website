"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CLIPS } from "@/components/v2/Shot";

/**
 * Desktop hero backdrop: a wide, softly lit fan of captioned clips behind the
 * headline, floating and leaning toward the cursor. A dark halo keeps the
 * headline readable. Hidden on phones (they get HeroFan instead).
 */

const CARDS = [
  { src: CLIPS.set, x: -560, y: 40, r: -16, s: 0.78, o: 0.32, d: 0.35, delay: -1 },
  { src: CLIPS.podcast, x: -310, y: 0, r: -8, s: 0.9, o: 0.42, d: 0.6, delay: -3, cap: <>he <span className="text-red">did it</span></> },
  { src: CLIPS.streamer, x: 0, y: -20, r: 0, s: 1, o: 0.55, d: 1, delay: 0, cap: <>no <span className="text-red">way</span></>, hot: true },
  { src: CLIPS.creator, x: 310, y: 0, r: 8, s: 0.9, o: 0.42, d: 0.6, delay: -2, cap: <><span className="text-red">listen</span></> },
  { src: CLIPS.interview, x: 560, y: 40, r: 16, s: 0.78, o: 0.32, d: 0.35, delay: -4, pos: "45% 30%" },
];

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(3));
      el.style.setProperty("--my", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-fx="drift"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] max-sm:hidden md:top-6"
    >
      <div ref={ref} className="hero-backdrop absolute inset-0">
        {/* light behind the fan */}
        <div className="absolute top-[52%] left-1/2 h-[520px] w-[1100px] max-w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(190,30,52,0.42),rgba(190,30,52,0.12)_55%,transparent)]" />
        {CARDS.map((c, i) => (
          <div
            key={i}
            className="bd-card absolute top-[52%] left-1/2"
            style={
              {
                "--x": `${c.x}px`,
                "--y": `${c.y}px`,
                "--r": `${c.r}deg`,
                "--s": c.s,
                "--d": c.d,
                opacity: c.o,
                zIndex: c.hot ? 2 : 1,
                animationDelay: `${c.delay}s`,
              } as React.CSSProperties
            }
          >
            <div
              className={
                "relative aspect-[9/16] w-[clamp(170px,15vw,230px)] overflow-hidden rounded-3xl bg-surface " +
                (c.hot
                  ? "border-[1.5px] border-crimson shadow-[0_0_80px_10px_rgba(190,30,52,0.55)]"
                  : "border border-line-strong shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]")
              }
            >
              <Image src={c.src} alt="" fill sizes="230px" priority={c.hot} className="object-cover" style={{ objectPosition: c.pos ?? "center" }} />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,15,0.2)_0%,transparent_35%,rgba(8,9,15,0.55)_100%)]" />
              {c.cap && (
                <span className="absolute top-[66%] left-1/2 -translate-x-1/2 rounded-md bg-bg px-2 py-1 text-base font-bold whitespace-nowrap">
                  {c.cap}
                </span>
              )}
            </div>
          </div>
        ))}
        {/* halo that keeps the headline legible, plus a fade into the page */}
        <div className="absolute top-[46%] left-1/2 h-[420px] w-[1000px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(8,9,15,0.88),rgba(8,9,15,0.6)_55%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>
    </div>
  );
}
