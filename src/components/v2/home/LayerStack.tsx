"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLIPS } from "@/components/v2/Shot";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Exploded frame": one finished video frame pulled apart into the layers the
 * agent builds — footage, cuts, b-roll, grade, captions — then snapped back
 * together, scrubbed by scroll. Static fallback shows the finished frame.
 */

const LAYERS = ["Footage", "Cuts", "B-roll", "Grade", "Captions"];

export default function LayerStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const planes = q("[data-plane]");
      const labels = q("[data-label]");
      const mobile = window.innerWidth < 640;
      const gap = mobile ? 40 : 72;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          pin: q("[data-stage]")[0],
          start: "top top",
          end: () => `+=${window.innerHeight * (window.innerWidth < 640 ? 2 : 2.6)}`,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(planes, { z: 0 });
      gsap.set(labels, { opacity: 0 });

      // Tilt the finished frame into 3D…
      tl.fromTo(
        q("[data-rig]"),
        { rotateX: 0, rotateY: 0, scale: 1 },
        { rotateX: 52, rotateY: 0, rotateZ: -28, scale: mobile ? 0.8 : 0.8, y: mobile ? 30 : 60, duration: 1.2 },
        0,
      );
      // …pull the layers apart, one by one.
      tl.to(planes, { z: (i: number) => i * gap, duration: 1.4, stagger: 0.12 }, 0.6);
      tl.to(q("[data-ghost]"), { opacity: 1, duration: 0.6 }, 0.9);
      tl.to(labels, { opacity: 1, duration: 0.4, stagger: 0.15 }, 1.2);
      tl.fromTo(q("[data-scan]"), { top: "0%", opacity: 1 }, { top: "100%", duration: 1.2, ease: "none" }, 1.4);
      tl.to(q("[data-scan]"), { opacity: 0, duration: 0.2 }, ">");
      tl.to({}, { duration: 0.8 });
      // Snap back together into the finished frame.
      tl.to(labels, { opacity: 0, duration: 0.3 }, ">");
      tl.to(planes, { z: 0, duration: 1, stagger: { each: 0.08, from: "end" } }, "<");
      tl.to(q("[data-ghost]"), { opacity: 0, duration: 0.4 }, "<0.4");
      tl.to(q("[data-rig]"), { rotateX: 0, rotateZ: 0, scale: 1, y: 0, duration: 1 }, "<0.3");
      tl.from(q("[data-final]"), { opacity: 0, y: 16, duration: 0.5 }, ">-0.2");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="layers-title" className="relative w-full bg-bg">
      <div data-stage className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
        <div className="relative mx-auto box-border flex w-full max-w-[1200px] flex-col items-center gap-10 px-5 py-20 text-center sm:gap-14 sm:px-6">
          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="eyebrow">ONE AGENT</span>
            <h2 id="layers-title" className="h-section">
              Every layer of the edit. <span className="text-grad">Done for you.</span>
            </h2>
          </div>

          <div aria-hidden className="relative w-[min(86vw,620px)] [perspective:2200px]">
            <div data-rig className="relative aspect-video w-full [transform-style:preserve-3d]">
              {/* 0 — footage */}
              <Plane label={LAYERS[0]} i={0}>
                <Image src={CLIPS.interview} alt="" fill sizes="620px" className="object-cover" style={{ objectPosition: "center 30%" }} />
              </Plane>
              {/* 1 — cuts */}
              <Plane label={LAYERS[1]} i={1} ghost>
                {[18, 41, 63, 82].map((x) => (
                  <span key={x} className="absolute inset-y-[8%] w-px border-l border-dashed border-white/70" style={{ left: `${x}%` }} />
                ))}
                <span className="absolute bottom-[6%] left-[3%] font-mono text-[9px] text-white/80 sm:text-[11px]">✂ 6 cuts</span>
              </Plane>
              {/* 2 — b-roll */}
              <Plane label={LAYERS[2]} i={2} ghost>
                <div className="absolute top-[8%] right-[5%] aspect-video w-[34%] overflow-hidden rounded-md border border-white/80">
                  <Image src={CLIPS.city} alt="" fill sizes="220px" className="object-cover" />
                </div>
              </Plane>
              {/* 3 — grade */}
              <Plane label={LAYERS[3]} i={3} ghost>
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,150,90,0.28),rgba(190,30,52,0.12)_50%,rgba(56,70,107,0.25))] mix-blend-screen" />
                <div className="absolute bottom-[8%] right-[4%] flex h-2 w-[30%] overflow-hidden rounded-full">
                  {["#262A3D", "#4B3F36", "#6B5340", "#8E6A4C", "#B58A62"].map((c) => (
                    <span key={c} className="flex-1" style={{ background: c }} />
                  ))}
                </div>
              </Plane>
              {/* 4 — captions */}
              <Plane label={LAYERS[4]} i={4} ghost>
                <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 rounded-md bg-bg px-2.5 py-1 text-[clamp(11px,2.2vw,20px)] font-bold whitespace-nowrap">
                  and that&apos;s when <span className="text-red">everything</span> changed
                </div>
              </Plane>
              <div data-scan className="pointer-events-none absolute inset-x-0 top-0 h-px bg-red shadow-[0_0_18px_4px_rgba(255,92,112,0.5)] [transform:translateZ(200px)]" style={{ opacity: 0 }} />
            </div>
          </div>

          <p data-final className="m-0 font-mono text-xs text-soft sm:text-sm">
            Footage <span className="text-red">→</span> cuts <span className="text-red">→</span> b-roll <span className="text-red">→</span> grade{" "}
            <span className="text-red">→</span> captions
          </p>
        </div>
      </div>
    </section>
  );
}

function Plane({ label, i, ghost, children }: { label: string; i: number; ghost?: boolean; children: React.ReactNode }) {
  return (
    <div
      data-plane
      className={
        "absolute inset-0 rounded-xl [transform-style:preserve-3d] " +
        (ghost ? "" : "overflow-hidden border border-line-strong shadow-[0_40px_120px_-30px_rgba(190,30,52,0.5)]")
      }
    >
      {ghost && <div data-ghost className="absolute inset-0 rounded-xl border border-white/50 bg-white/[0.03] opacity-0" />}
      <div className={"absolute inset-0 " + (ghost ? "" : "overflow-hidden rounded-xl")}>{children}</div>
      <span
        data-label
        className="absolute top-1/2 left-full flex -translate-y-1/2 items-center gap-1.5 pl-1 font-mono text-[10px] whitespace-nowrap text-ink opacity-0 sm:text-sm"
      >
        <span className="h-px w-5 border-t border-dotted border-red sm:w-10" />
        <span className="rounded bg-surface px-1.5 py-0.5">
          <span className="text-red">0{i + 1}</span> {label}
        </span>
      </span>
    </div>
  );
}
