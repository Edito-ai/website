import type { ReactNode } from "react";
import Reveal from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

/**
 * The one way every section opens: a small red eyebrow, a headline, and an
 * optional second line (`voice`) set in the same face but muted — the
 * headline reads as one thought, the grey half carrying the explanation.
 */
export default function SectionHeader({
  eyebrow,
  title,
  voice,
  lede,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  voice?: string;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      <Reveal y={10}>
        <p className="text-sm font-medium text-red">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-display mt-4 text-[clamp(2rem,4.2vw,3.5rem)] text-balance",
            center ? "mx-auto max-w-3xl" : "max-w-3xl",
          )}
        >
          {title}
          {voice && <span className="text-muted"> {voice}</span>}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p className={cn("mt-5 max-w-xl text-lg leading-relaxed text-ink-2/70", center && "mx-auto")}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
