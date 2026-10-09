"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Message() {
  return (
    <span className="flex items-center gap-2.5 text-[11px] whitespace-nowrap text-ink-2/80 sm:gap-3 sm:text-xs">
      <span className="rounded-full bg-red/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-red uppercase">
        New
      </span>
      <span className="hidden sm:inline">Broll is currently powering</span>
      <span className="sm:hidden">Broll powers</span>
      <strong className="font-semibold text-ink">200M+</strong> monthly views
      <span aria-hidden className="h-3 w-px bg-line-strong max-sm:hidden" />
      <span className="flex items-center gap-1 text-ink transition-colors duration-300 group-hover:text-red max-sm:hidden">
        Watch the teaser <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </span>
  );
}

/**
 * 40px announcement bar above the navbar — a single static statement.
 * Slides in from the top, hides on scroll down and returns on scroll up.
 * Clicking it rides Lenis down to the film.
 */
export default function AnnouncementBar() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    // The navbar sits under the bar until it hides.
    document.documentElement.style.setProperty("--annbar-offset", "40px");

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

    return () => {
      st.kill();
      document.documentElement.style.removeProperty("--annbar-offset");
    };
  }, []);

  function toFilm() {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: string, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo("#film", { duration: 1.6 });
    else
      document.getElementById("film")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      ref={ref}
      onClick={toFilm}
      aria-label="Broll is currently powering 200M+ monthly views — watch the teaser"
      className="group fixed inset-x-0 top-0 z-[60] flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden border-b border-line bg-[#06070c] px-4"
    >
      <Message />
    </button>
  );
}
