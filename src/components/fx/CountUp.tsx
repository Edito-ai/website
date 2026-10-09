"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts the numeric part of a stat up from zero when it scrolls into view
 * ("200M+" → 0M+ … 200M+). The final text is server-rendered, so crawlers
 * and no-JS readers always see the real number.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !inView || reduced || !match) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num);
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${pre}${Math.round(v)}${post}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
