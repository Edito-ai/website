"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type Variant = "primary" | "ghost" | "inverse";
export type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // White pill; a red pool spreads from the cursor and the label turns white.
  primary: "bg-ink text-bg hover:text-white hover:shadow-[var(--shadow-red)]",
  // Glass outline; the border warms to red.
  ghost:
    "border border-line-strong bg-white/[0.03] text-ink backdrop-blur-md hover:border-red/60 hover:text-white",
  // For use on the full-strength logo band.
  inverse: "bg-white text-[#10121f] hover:text-white hover:shadow-[0_20px_60px_-20px_rgb(0_0_0/0.6)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-9 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "btn-liquid relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight whitespace-nowrap transition-[color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    sizes[size],
    variants[variant],
    className,
  );
}

/** Tracks the cursor so the liquid fill pools out from where it entered. */
export function trackLiquid(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--lx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--ly", `${e.clientY - rect.top}px`);
}

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
}

/**
 * Buttons inflate slightly on hover, compress on press, and carry a red
 * liquid fill that pools out from wherever the cursor entered.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", onPointerMove, onPointerEnter, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onPointerEnter={(e) => {
        trackLiquid(e);
        onPointerEnter?.(e);
      }}
      onPointerMove={(e) => {
        trackLiquid(e);
        onPointerMove?.(e);
      }}
      className={buttonClasses(variant, size, className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export default Button;
