import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/v2/PageShell";
import { CHAT_URL } from "@/components/v2/ui";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** One numbered section of a legal document. */
export function LegalSection({ title, n, children }: { title: string; n?: number; children: ReactNode }) {
  return (
    <section id={slug(title)} className="flex scroll-mt-24 flex-col gap-3.5">
      {n !== undefined && <span className="font-mono text-xs text-red">{String(n).padStart(2, "0")}</span>}
      <h2 className="m-0 text-[28px] font-semibold tracking-[-0.025em]">{title}</h2>
      <div className="space-y-4 text-[17px] leading-[1.75] text-soft [&_a]:text-red [&_a]:underline [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

/** Shared shell for /privacy and /terms: contents rail + numbered sections. */
export default function LegalPage({
  eyebrow,
  title,
  kind,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  kind: "privacy" | "terms";
  updated: string;
  children: ReactNode;
}) {
  const sections = Children.toArray(children).filter(
    (c): c is ReactElement<{ title: string; children: ReactNode }> =>
      isValidElement(c) && typeof (c.props as { title?: unknown }).title === "string",
  );
  const other = kind === "privacy" ? { href: "/terms", label: "Terms of Service →" } : { href: "/privacy", label: "Privacy Policy →" };

  return (
    <PageShell>
      <div className="mx-auto box-border flex max-w-[1440px] flex-col gap-14 px-6 lg:px-10 pt-20 pb-28 md:pt-24">
        <div className="flex flex-col gap-[18px] border-b border-line-2 pb-10">
          <span className="eyebrow">{eyebrow.toUpperCase()}</span>
          <h1 className="m-0 text-[clamp(44px,6vw,80px)] leading-none font-semibold tracking-[-0.045em]">{title}</h1>
          <div className="flex flex-wrap gap-2.5 font-mono text-[13px]">
            <span className="rounded-md bg-[#181A27] px-2.5 py-1.5 text-soft">Last updated {updated}</span>
            <Link href={other.href} className="rounded-md border border-line-strong px-2.5 py-1.5 text-ink-2 hover:border-red">
              {other.label}
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-14">
          <nav aria-label="Sections" className="flex flex-[0_1_240px] flex-col gap-0.5 self-start md:sticky md:top-24">
            <span className="mono-label mb-2.5">CONTENTS</span>
            {sections.map((s, i) => (
              <a
                key={s.props.title}
                href={`#${slug(s.props.title)}`}
                className="flex min-h-10 items-center gap-3 text-[15px] text-soft transition-colors hover:text-ink"
              >
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                {s.props.title}
              </a>
            ))}
          </nav>
          <article className="flex max-w-[760px] min-w-0 flex-[999_1_560px] flex-col gap-12">
            {sections.map((s, i) => (
              <LegalSection key={s.props.title} title={s.props.title} n={i + 1}>
                {s.props.children}
              </LegalSection>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-line bg-surface p-7">
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold">
                  {kind === "privacy" ? "Questions about your data?" : "Questions about these terms?"}
                </span>
                <span className="text-[15px] text-soft">Reach us in Chat.</span>
              </div>
              <a href={CHAT_URL} className="btn btn-ghost btn-sm">
                Open Chat
              </a>
            </div>
          </article>
        </div>
      </div>
    </PageShell>
  );
}
