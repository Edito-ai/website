import type { Metadata } from "next";
import PageShell from "@/components/v2/PageShell";
import Faq from "@/components/v2/Faq";
import CtaBand from "@/components/v2/CtaBand";
import { ArrowLink, Band, PageIntro, SectionHead, Wrap } from "@/components/v2/ui";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { COMPARISON_FAQS } from "@/lib/faqs";

const TITLE = "Broll vs. B-Roll Generators: What's the Difference — Broll";
const DESCRIPTION =
  "Broll is an agentic AI video editor, not a B-roll generator. See how a full raw-footage-to-finished-video editor differs from tools that just add supplementary clips.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/broll-vs-b-roll-generators" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/broll-vs-b-roll-generators",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/broll-vs-b-roll-generators", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Broll vs. B-Roll Generators", "/broll-vs-b-roll-generators"),
    faqPageJsonLd(COMPARISON_FAQS, "/broll-vs-b-roll-generators"),
  ],
};

const ROWS = [
  { d: "Starting point", g: "An edit you’ve already made", b: "Raw, unlogged footage" },
  { d: "What it produces", g: "Supplementary clips to insert", b: "A complete, publish-ready video" },
  { d: "Editorial decisions", g: "Already made by you", b: "Made by the agent, like a human editor" },
  { d: "Output", g: "A clip for your existing timeline", b: "A finished video, or XML for Premiere Pro, DaVinci Resolve or Final Cut Pro" },
];

export default function BrollVsGeneratorsPage() {
  return (
    <PageShell jsonLd={structuredData}>
      <PageIntro
        center
        size="lg"
        eyebrow="COMPARE"
        title={
          <>
            Broll is{" "}
            <span className="text-muted line-through decoration-red decoration-[6px]">not</span> a B-roll generator.
          </>
        }
        lede="Similar name, different kind of product. Here's how an agentic AI video editor compares with B-roll generators."
      />

      <section className="mx-auto box-border grid max-w-[1440px] grid-cols-1 gap-5 px-6 lg:px-10 pb-24 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-3xl border border-line p-9">
          <span className="mono-label">B-ROLL GENERATOR</span>
          <span className="text-[26px] font-semibold tracking-[-0.02em]">Adds clips to an edit that already exists.</span>
          <div aria-hidden className="mt-2 flex h-8 gap-1">
            <div className="flex-[0_0_30%] rounded bg-[#363B52]" />
            <div className="flex-[0_0_12%] rounded border-[1.5px] border-dashed border-muted" />
            <div className="flex-1 rounded bg-[#363B52]" />
          </div>
          <span className="mono-label">your cut + one inserted clip</span>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border-[1.5px] border-red bg-surface p-9">
          <span className="font-mono text-xs text-red">BROLL</span>
          <span className="text-[26px] font-semibold tracking-[-0.02em]">The full editor, from raw footage to finished video.</span>
          <div aria-hidden className="mt-2 flex flex-col gap-1">
            <div className="flex h-3.5 gap-1">
              <div className="flex-[0_0_18%] rounded-[3px] bg-[#41465E]" />
              <div className="flex-[0_0_26%] rounded-[3px] bg-[#363B52]" />
              <div className="flex-1 rounded-[3px] bg-[#41465E]" />
            </div>
            <div className="flex h-3.5 gap-1">
              <div className="flex-[0_0_34%] rounded-[3px] bg-wine-line" />
              <div className="flex-1 rounded-[3px] bg-wine-line" />
            </div>
            <div className="flex h-3.5 gap-1">
              {["10%", "14%", "12%", "9%"].map((w) => (
                <div key={w} className="rounded-[3px] bg-[#8A2238]" style={{ flex: `0 0 ${w}` }} />
              ))}
            </div>
          </div>
          <span className="font-mono text-xs text-soft">story · cuts · captions · color · lip sync</span>
        </div>
      </section>

      <Band>
        <Wrap className="flex flex-col gap-10 py-24 md:py-[104px]">
          <SectionHead eyebrow="TC 00:01 — SIDE BY SIDE" title="Two different jobs." />
          <div className="overflow-x-auto rounded-[20px] border border-line bg-bg">
            <table className="w-full min-w-[640px] border-collapse text-base">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="px-6 py-[18px] text-left font-mono text-xs font-medium text-muted">DIMENSION</th>
                  <th scope="col" className="px-6 py-[18px] text-left font-mono text-xs font-medium text-muted">B-ROLL GENERATORS</th>
                  <th scope="col" className="px-6 py-[18px] text-left font-mono text-xs font-medium text-red">BROLL</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.d} className="border-t border-line-2">
                    <th scope="row" className="px-6 py-[22px] text-left font-semibold">{r.d}</th>
                    <td className="px-6 py-[22px] text-soft">{r.g}</td>
                    <td className="px-6 py-[22px]">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Wrap>
      </Band>

      <section className="mx-auto box-border flex max-w-[1440px] flex-wrap gap-x-16 gap-y-6 px-6 lg:px-10 pt-24 md:pt-[104px]">
        <div className="flex flex-[1_1_320px] flex-col gap-3.5">
          <span className="eyebrow">TC 00:02 — THE NAME</span>
          <h2 className="m-0 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-semibold tracking-[-0.035em]">
            Why the names collide.
          </h2>
        </div>
        <div className="flex flex-[2_1_480px] flex-col gap-[18px]">
          <p className="m-0 text-[17px] leading-[1.75] text-soft">
            &quot;B-roll&quot; is a film term for supplementary footage, and several tools use it as the name for that one
            feature. Broll is a full editor whose name only sounds similar, which is why people sometimes land on the wrong
            tool.
          </p>
          <div className="flex flex-wrap gap-5">
            <ArrowLink href="/about">About Broll</ArrowLink>
            <ArrowLink href="/ai-video-editor">How the editor works</ArrowLink>
          </div>
        </div>
      </section>

      <Faq eyebrow="TC 00:03 — FAQ" heading="Broll vs. B-roll generators, answered." items={COMPARISON_FAQS} />
      <CtaBand
        heading="Skip the generator. Get the whole edit."
        secondaryLabel="AI vs. manual editing"
        secondaryHref="/ai-editing-vs-manual-editing"
      />
    </PageShell>
  );
}
