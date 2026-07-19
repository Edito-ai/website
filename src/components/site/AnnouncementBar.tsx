"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Message() {
  return (
    <span className="flex items-center gap-1.5 text-[11px] whitespace-nowrap text-white/70 sm:gap-2 sm:text-xs">
      <span aria-hidden>🚀</span>
      <span className="hidden sm:inline">Broll is currently powering</span>
      <span className="sm:hidden">Broll powers</span>
      <strong className="font-semibold text-white">200M+</strong> monthly views
    </span>
  );
}

/**
 * 40px announcement bar above the navbar — a single static statement.
 * Slides in from the top, hides on scroll down and returns on scroll up.
 * Clicking it rides Lenis down to the features section.
 */
export default function AnnouncementBar() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    gsap.fromTo(
      bar,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.9, ease: "power3.out", delay: 0.15 },
    );

    let hidden = false;
    const st = ScrollTrigger.create({
      start: 1,
      end: "max",
      onUpdate(self) {
        const shouldHide = self.direction === 1 && self.scroll() > 80;
        if (shouldHide === hidden) return;
        hidden = shouldHide;
        gsap.to(bar, {
          yPercent: hidden ? -100 : 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        });
        // The navbar reads this var so it rises to fill the space.
        document.documentElement.style.setProperty(
          "--annbar-offset",
          hidden ? "0px" : "40px",
        );
      },
    });

    return () => st.kill();
  }, []);

  function toFeatures() {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: string, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo("#features", { duration: 1.6 });
    else
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      ref={ref}
      onClick={toFeatures}
      aria-label="Broll is currently powering 200M+ monthly views"
      className="fixed inset-x-0 top-0 z-50 flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden border-b border-white/[0.08] bg-black px-4"
    >
      <Message />
    </button>
  );
}
