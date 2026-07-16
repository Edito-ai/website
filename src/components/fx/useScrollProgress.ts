"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 0→1 progress of a tall wrapper scrolling past its pinned viewport,
 * rAF-throttled. The returned value is the single time axis for a scene:
 * deriving every transform from it means scrolling up literally reverses time.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setP(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, p };
}

/** Remaps p onto the [a, b] window, clamped to 0–1: an act within the film. */
export function seg(p: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

export function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Overshoots slightly then settles — the feel of a clip snapping magnetically. */
export function easeOutBack(t: number) {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
}
