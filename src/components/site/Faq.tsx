import { Plus } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import { FAQS } from "@/lib/faqs";

/** Native details/summary — crawlable text, keyboard accessible, zero JS. */
export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-28 md:py-40">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        FAQ
      </p>
      <WordReveal
        text="Questions, answered."
        className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl"
      />

      <div className="mt-14">
        {FAQS.map((faq, i) => (
          <Reveal key={faq.q} delay={0.08 * i}>
            <details className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent md:text-xl">
                  {faq.q}
                </h3>
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-hover:text-accent"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="max-w-xl pb-7 leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
