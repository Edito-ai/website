"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bg hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_var(--accent)]",
  ghost:
    "border border-line-strong text-ink hover:border-accent hover:text-accent",
  inverse:
    "bg-dark-ink text-dark-bg hover:shadow-[0_0_0_1px_var(--accent),0_8px_40px_-8px_var(--glow)]",
};

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: "md" | "lg";
}

/**
 * Buttons inflate slightly on hover, compress on press, glow only on hover,
 * and carry a liquid fill that pools out from wherever the cursor entered.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", onPointerMove, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--lx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--ly", `${e.clientY - rect.top}px`);
        onPointerMove?.(e);
      }}
      className={cn(
        "btn-liquid relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-shadow duration-300",
        size === "md" ? "px-6 py-3 text-sm" : "px-9 py-4 text-base",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export default Button;
