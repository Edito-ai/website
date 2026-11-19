import { CHAT_URL } from "@/components/v2/ui";
import type { Faq as FaqItem } from "@/lib/faqs";

/**
 * FAQ list on native details/summary: crawlable (answers stay in the DOM for
 * the FAQPage JSON-LD), keyboard accessible, no JS. The first item opens.
 */
export default function Faq({
  id = "faq",
  eyebrow,
  heading,
  items,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  items: FaqItem[];
}) {
  return (
    <section id={id} className="w-full scroll-mt-20 bg-bg">
      <div className="mx-auto box-border flex max-w-[1440px] flex-wrap gap-12 px-6 lg:px-10 pt-24 pb-10 md:pt-[120px]">
        <div className="flex flex-[1_1_300px] flex-col gap-3.5">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="m-0 text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
            {heading}
          </h2>
          <p className="m-0 text-base leading-relaxed text-soft">
            Something else?{" "}
            <a href={CHAT_URL} className="text-red underline">
              Ask us in Chat
            </a>
            .
          </p>
        </div>
        <div className="flex min-w-0 flex-[2_1_520px] flex-col border-t border-line">
          {items.map((it, i) => (
            <details key={it.q} open={i === 0} className="faq group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center gap-5 py-[18px] text-left text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                <span className="w-6 shrink-0 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 flex-1 text-lg font-medium">{it.q}</h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                  className="shrink-0 stroke-soft group-open:stroke-red"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" className="group-open:hidden" />
                </svg>
              </summary>
              <p className="m-0 pr-2 pb-6 pl-11 text-base leading-[1.65] text-soft">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
