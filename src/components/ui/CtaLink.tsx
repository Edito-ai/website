"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonClasses, trackLiquid, type Size, type Variant } from "@/components/ui/button";

/** A link styled as a button — same liquid fill, plus an arrow that lifts on hover. */
export default function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onPointerEnter={trackLiquid}
      onPointerMove={trackLiquid}
      className={buttonClasses(variant, size, `group/cta ${className ?? ""}`)}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover/cta:rotate-45"
        />
      )}
    </Link>
  );
}
