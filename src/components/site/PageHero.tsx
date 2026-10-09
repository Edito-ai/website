import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import CtaLink from "@/components/ui/CtaLink";

/**
 * The opener for every inner page: breadcrumb, headline, lede and CTA over a
 * quiet glow of the logo's colours. Titles can carry one
 * `serif-voice text-brand` span for the accent phrase.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  cta = { href: "/demo", label: "Book a demo" },
  secondary,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  cta?: { href: string; label: string } | null;
  secondary?: { href: string; label: string };
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden className="hero-glow absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-5 pt-36 pb-20 sm:px-8 md:pt-44 md:pb-24">
        <Reveal y={12}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <ChevronRight aria-hidden className="size-3.5" />
            <span className="text-ink-2">{eyebrow}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,4.5rem)] text-balance">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2/75">{lede}</p>
          </Reveal>
        )}

        {(cta || secondary) && (
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {cta && <CtaLink href={cta.href}>{cta.label}</CtaLink>}
              {secondary && (
                <CtaLink href={secondary.href} variant="ghost" arrow={false}>
                  {secondary.label}
                </CtaLink>
              )}
            </div>
          </Reveal>
        )}

        {meta && (
          <Reveal delay={0.22}>
            <p className="mt-10 text-sm text-muted">{meta}</p>
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}

/** Body wrapper for prose sections under a PageHero. */
export function PageBody({ children }: { children: ReactNode; scene?: string }) {
  return <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8 md:pt-20">{children}</div>;
}
