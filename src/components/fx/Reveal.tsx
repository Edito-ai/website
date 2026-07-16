"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "up" | "left" | "right" | "zoom" | "blur";

const hidden: Record<Variant, string> = {
  up: "translate-y-10 opacity-0",
  left: "-translate-x-14 opacity-0",
  right: "translate-x-14 opacity-0",
  zoom: "scale-90 opacity-0",
  blur: "opacity-0 blur-md",
};

/** Reveals its children with a staggered transition the first time they scroll into view. */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        // The observer always reports once right after observe(), so reduced-motion
        // users get revealed immediately regardless of scroll position.
        if (reduce || entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        shown ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-none" : hidden[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
