import Link from "next/link";
import Reveal from "@/components/fx/Reveal";
import type { Faq } from "@/lib/faqs";

/** Native details/summary — crawlable text, keyboard accessible, zero JS. */
export default function FaqSection({
  id,
  eyebrow = "FAQ",
  heading,
  faqs,
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  faqs: Faq[];
}) {
  return (
    <section id={id} className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="text-sm font-medium text-red">{eyebrow}</p>
          <h2 className="font-display mt-4 text-4xl text-balance md:text-5xl">{heading}</h2>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted">
            Something we didn&apos;t cover?{" "}
            <Link href="/early-access" className="link-red">
              Ask us when you join early access
            </Link>
            .
          </p>
        </div>

        <div className="border-t border-line">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={0.05 * i} y={20}>
              <details className="faq group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start gap-5 py-7 text-left [&::-webkit-details-marker]:hidden">
                  <span className="slate mt-1.5 w-6 shrink-0 tabular-nums transition-colors duration-300 group-hover:text-red group-open:text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-lg font-medium tracking-tight transition-colors duration-300 group-hover:text-ink md:text-xl">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden
                    className="relative mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-red group-open:rotate-45 group-open:border-red group-open:bg-red"
                  >
                    <span className="absolute h-px w-3 bg-ink" />
                    <span className="absolute h-3 w-px bg-ink" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-8 pl-11 leading-relaxed text-ink-2/75">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
