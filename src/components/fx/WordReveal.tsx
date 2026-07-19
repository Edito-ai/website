"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/** Section titles reveal word by word, rising out of a clipped line. */
export default function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    // aria-label is prohibited on generic elements (span), so the accessible
    // text lives in a visually hidden span instead.
    <Tag className={cn(className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            aria-hidden
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
