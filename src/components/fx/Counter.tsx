"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

/** Numbers count smoothly on entry — spring-driven, not linear. */
export default function Counter({ to, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 42, damping: 24 });

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return spring.on("change", (v) => {
      el.textContent = `${Math.round(v)}${suffix}`;
    });
  }, [spring, suffix]);

  return (
    <span ref={ref} className={className}>
      {reduced || !inView ? `${reduced ? to : 0}${suffix}` : null}
    </span>
  );
}
