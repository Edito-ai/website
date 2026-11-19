import type { Metadata } from "next";
import PageShell from "@/components/v2/PageShell";
import Faq from "@/components/v2/Faq";
import CtaBand from "@/components/v2/CtaBand";
import { ArrowLink, Band, PageIntro, SectionHead, Wrap } from "@/components/v2/ui";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { AI_VS_MANUAL_FAQS } from "@/lib/faqs";

const TITLE = "AI Editing vs. Manual Editing: An Honest Comparison — Broll";
const DESCRIPTION =
  "Where AI video editing actually saves time, where human judgment still matters, and how agentic AI and manual editing combine in a real workflow.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/ai-editing-vs-manual-editing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ai-editing-vs-manual-editing",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/ai-editing-vs-manual-editing", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("AI Editing vs. Manual Editing", "/ai-editing-vs-manual-editing"),
    faqPageJsonLd(AI_VS_MANUAL_FAQS, "/ai-editing-vs-manual-editing"),
  ],
};

const AI_LIST = [
  "Watching all the footage",
  "Logging takes",
  "Finding the right moment",
  "Assembling a first cut with captions and a color grade",
  "Rebuilding a house style for every video",
  "Clipping highlights from long videos and streams",
];
const HUMAN_LIST = ["Creative tone", "Brand voice", "Final sign-off"];
const MANUAL_BAR: [string, string, string][] = [
  ["34%", "#434860", "watch"],
  ["20%", "#3D4259", "log"],
  ["22%", "#373C53", "find"],
  ["1", "#32374D", "assemble"],
];
const FLOW = [
  { k: "BROLL", t: "Builds the story", d: "Moments, cut, captions, grade.", hot: true },
  { k: "TIMELINE XML", t: "Hands off", d: "Premiere Pro, Resolve, Final Cut Pro." },
  { k: "YOUR EDITOR", t: "Reviews and signs off", d: "Tone, brand voice, final call." },
];

export default function AiVsManualPage() {
  return (
    <PageShell jsonLd={structuredData}>
      <PageIntro
        eyebrow="COMPARE · AI VS. MANUAL"
        title={
          <>
            AI editing doesn&apos;t replace human judgment.{" "}
            <span className="text-red">It removes the hours before it.</span>
          </>
        }
        lede="An honest look at where agentic AI editing saves time, where people still decide, and how the two work together."
      />

      <section className="mx-auto box-border max-w-[1440px] px-6 lg:px-10 pb-24 md:pb-[104px]">
        <div className="flex flex-col gap-7 rounded-3xl border border-line bg-surface" style={{ padding: "clamp(24px, 4vw, 48px)" }}>
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow">TC 00:01 — THE SHORT VERSION</span>
            <p className="m-0 max-w-[880px] text-[clamp(20px,2.2vw,28px)] leading-[1.4] tracking-[-0.02em]">
              Most manual editing hours go to upstream work: watching, logging, finding moments. Agentic AI handles that, and
              leaves tone, brand voice and sign-off to a person.
            </p>
          </div>
          <div className="flex flex-col gap-4" aria-label="Manual first cut takes about 8 hours; Broll's first pass about 12 minutes">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-mono text-[13px] text-soft">
                <span>MANUAL FIRST CUT</span>
                <span>~8h</span>
              </div>
              <div className="flex h-9 gap-[3px]">
                {MANUAL_BAR.map(([w, bg, l]) => (
                  <div
                    key={l}
                    className="flex items-center overflow-hidden rounded pl-2.5 font-mono text-[11px] text-ink-2"
                    style={{ flex: w === "1" ? "1" : `0 0 ${w}`, background: bg }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-mono text-[13px] text-red">
                <span>BROLL FIRST PASS</span>
                <span>~12m</span>
              </div>
              <div className="flex h-9">
                <div className="min-w-3 flex-[0_0_2.5%] rounded bg-crimson" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Band>
        <Wrap className="grid grid-cols-1 gap-5 py-24 md:grid-cols-2 md:py-[104px]">
          <div className="flex flex-col gap-[18px] rounded-3xl border border-line bg-surface p-9">
            <span className="eyebrow">TC 00:02 — AI</span>
            <h2 className="m-0 text-[32px] font-semibold tracking-[-0.03em]">Where AI saves real time</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {AI_LIST.map((i) => (
                <li key={i} className="flex gap-3 text-base leading-normal text-ink-2">
                  <span className="mt-2 size-2 shrink-0 rounded-[2px] bg-crimson" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-[18px] rounded-3xl border border-line bg-surface p-9">
            <span className="font-mono text-[13px] text-soft">TC 00:03 — HUMAN</span>
            <h2 className="m-0 text-[32px] font-semibold tracking-[-0.03em]">Where human judgment still matters</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {HUMAN_LIST.map((i) => (
                <li key={i} className="flex gap-3 text-base leading-normal text-ink-2">
                  <span className="mt-2 box-border size-2 shrink-0 rounded-full border-2 border-soft" />
                  {i}
                </li>
              ))}
            </ul>
            <p className="m-0 text-[15px] leading-relaxed text-soft">
              An AI editor can build a strong first pass. It shouldn&apos;t be the last check before anything ships.
            </p>
          </div>
        </Wrap>
      </Band>

      <section className="mx-auto box-border flex max-w-[1440px] flex-col gap-10 px-6 lg:px-10 pt-24 md:pt-[104px]">
        <SectionHead eyebrow="TC 00:04 — IN PRACTICE" title="AI first, human second." />
        <div className="flex flex-wrap items-stretch gap-3">
          {FLOW.map((f, i) => (
            <div key={f.k} className="contents">
              {i > 0 && (
                <div aria-hidden className="flex items-center text-2xl text-muted max-md:hidden">
                  →
                </div>
              )}
              <div
                className={
                  "flex flex-[1_1_220px] flex-col gap-2 rounded-[18px] bg-surface p-6 " +
                  (f.hot ? "border-[1.5px] border-red" : "border border-line")
                }
              >
                <span className={"font-mono text-xs " + (f.hot ? "text-red" : "text-muted")}>{f.k}</span>
                <span className="text-[19px] font-semibold">{f.t}</span>
                <span className="text-sm text-soft">{f.d}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-5">
          <ArrowLink href="/ai-video-editor-for-production-houses">Broll for production houses</ArrowLink>
          <ArrowLink href="/ai-video-editor">The AI video editor</ArrowLink>
        </div>
      </section>

      <Faq eyebrow="TC 00:05 — FAQ" heading="AI editing vs. manual editing, answered." items={AI_VS_MANUAL_FAQS} />
      <CtaBand heading="Keep the judgment. Lose the hours." secondaryLabel="Broll vs. B-roll generators" secondaryHref="/broll-vs-b-roll-generators" />
    </PageShell>
  );
}
