"use client";

import { ArrowDownToLine } from "lucide-react";
import { buttonClasses, trackLiquid, type Size, type Variant } from "@/components/ui/button";

/** A plain download link styled like CtaLink (a file, so a real <a>, not a client-side route). */
export default function DownloadButton({
  href,
  children,
  variant = "primary",
  size = "lg",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <a
      href={href}
      download
      onPointerEnter={trackLiquid}
      onPointerMove={trackLiquid}
      className={buttonClasses(variant, size, "group/cta")}
    >
      <ArrowDownToLine
        aria-hidden
        className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-y-0.5"
      />
      {children}
    </a>
  );
}
