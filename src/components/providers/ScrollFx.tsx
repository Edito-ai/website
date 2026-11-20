"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Keep in sync with the `html.fx main :is(...)` list in globals.css. */
const REVEAL_SELECTOR = [
  "h1",
  "h2",
  ".eyebrow",
  "h1 + p",
  "h2 + p",
  ".m-rail > *",
  ".grid.grid-cols-1 > *",
  "details.faq",
  "table",
  "article",
  "[data-reveal]",
  "[data-stagger] > *",
].join(",");

const STEP = 0.08; // seconds between items entering together
const MAX_STEPS = 6;

/**
 * Scroll choreography for every page:
 * - fades/lifts blocks in as they enter the viewport, staggering the ones
 *   that arrive together (CSS does the motion, this only flips `.is-in`);
 * - scrubbed GSAP effects for elements tagged `data-fx` (tilt, zoom, drift,
 *   playhead);
 * - a cursor spotlight on cards.
 * Does nothing for reduced motion.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const main = document.querySelector("main");
    if (!main) return;

    // If hydration was slow, the CSS fail-safe may already have shown some
    // blocks. Whatever is on screen now counts as revealed, so arming
    // `fx-on` never makes visible content blink out.
    if (!root.classList.contains("fx-on")) {
      main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight && getComputedStyle(el).opacity !== "0") {
          el.classList.add("is-in");
        }
      });
      root.classList.add("fx-on");
    }

    // --- Reveal ------------------------------------------------------------
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        entering.forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.setProperty("--d", `${Math.min(i, MAX_STEPS) * STEP}s`);
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );

    const scan = () => {
      main.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };
    scan();

    // Content that renders later (tabs, filters) must be picked up too, or it
    // would stay hidden.
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(main, { childList: true, subtree: true });

    // --- Scrubbed effects ----------------------------------------------------
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {

      mm.add("(min-width: 768px)", () => {
        // Hero editor window: lies back, then stands up as you scroll.
        gsap.utils.toArray<HTMLElement>("[data-fx='tilt']").forEach((el) => {
          gsap.fromTo(
            el,
            { rotateX: 14, scale: 0.94, transformPerspective: 2400 },
            {
              rotateX: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "top 25%", scrub: 0.6 },
            },
          );
        });
      });

      // Phone: card rails pin mid-screen and slide sideways as you scroll down.
      mm.add("(max-width: 639px)", () => {
        const rails = gsap.utils.toArray<HTMLElement>(".m-rail").filter((r) => r.children.length > 1);
        rails.forEach((rail) => {
          rail.classList.add("m-rail-pin");
          const last = rail.lastElementChild as HTMLElement;
          const dist = () => Math.max(0, last.offsetLeft + last.offsetWidth + 24 - rail.clientWidth);
          if (dist() < 40) return;
          gsap.to(rail, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: rail,
              pin: true,
              pinSpacing: true, // the rails sit in flex columns, where GSAP defaults this off
              start: "center center",
              end: () => `+=${dist() * 1.1}`,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        });
        return () => rails.forEach((r) => r.classList.remove("m-rail-pin"));
      });

      // Media frames grow into place.
      gsap.utils.toArray<HTMLElement>("[data-fx='zoom']").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.92, borderRadius: 36 },
          {
            scale: 1,
            borderRadius: 20,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: 0.6 },
          },
        );
      });

      // Background glows drift slower than the page.
      gsap.utils.toArray<HTMLElement>("[data-fx='drift']").forEach((el) => {
        gsap.to(el, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Ruler playheads scrub across the timeline as the page moves.
      gsap.utils.toArray<HTMLElement>("[data-fx='playhead']").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -14 },
          {
            xPercent: 14,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4 },
          },
        );
      });
    }, main);

    // Pins are created by several components; order triggers by page
    // position so each one accounts for the pin spacing above it.
    ScrollTrigger.sort();

    // Layout shifts after fonts/images settle.
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    // --- Card spotlight -------------------------------------------------------
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(
        ".m-rail > *, .grid.grid-cols-1 > *, [data-stagger] > *, article",
      );
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) main.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      mm.revert();
      ctx.revert();
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      if (fine) main.removeEventListener("pointermove", onMove);
    };
  }, [pathname]);

  return null;
}
