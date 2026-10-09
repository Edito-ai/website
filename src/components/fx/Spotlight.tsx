"use client";

import { cn } from "@/lib/utils";

/** A panel with a soft red light that follows the cursor across it. */
export default function Spotlight({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn("panel panel-hover spotlight", className)}
    >
      {children}
    </Tag>
  );
}
