import type { Metadata } from "next";
import PageShell from "@/components/v2/PageShell";
import Faq from "@/components/v2/Faq";
import CtaBand from "@/components/v2/CtaBand";
import { ArrowLink, Btn, CHAT_URL, DOWNLOAD_CTA, DownloadIcon, PlayIcon } from "@/components/v2/ui";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { AI_VIDEO_EDITOR_FAQS } from "@/lib/faqs";

const TITLE = "AI Video Editor & AI Video Editing Software — Broll";
const DESCRIPTION =
  "Broll is an agentic AI video editor and AI video editing software: it understands raw footage, finds the moments, builds the story, edits the timeline, and exports a finished video.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/ai-video-editor" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ai-video-editor",
    images: ["/opengraph-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/ai-video-editor", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("AI Video Editor", "/ai-video-editor"),
    faqPageJsonLd(AI_VIDEO_EDITOR_FAQS, "/ai-video-editor"),
  ],
};

const TOC = [
  { href: "#how", label: "How it works" },
  { href: "#agentic", label: "What is agentic editing?" },
  { href: "#raw", label: "Raw footage to finished video" },
  { href: "#teams", label: "Built for pro teams" },
];

const LOG: [string, string, boolean][] = [
  ["Indexing 6h 40m", "done", true],
  ['Search "best answer on pricing"', "3 hits", true],
  ["Cut timeline · 2:30", "done", true],
  ["Captions · grade · lip sync", "running", false],
];

const h2 = "m-0 text-[clamp(28px,3.2vw,42px)] leading-[1.1] font-semibold tracking-[-0.035em]";
const p = "m-0 text-[17px] leading-[1.75] text-soft";

export default function AiVideoEditorPage() {
  return (
    <PageShell jsonLd={structuredData}>
      <section className="mx-auto box-border flex max-w-[1440px] flex-wrap items-center gap-12 px-6 lg:px-10 pt-20 pb-16 md:pt-24 md:pb-[72px]">
        <div className="flex flex-[1_1_520px] flex-col gap-[26px]">
          <span className="eyebrow">AI VIDEO EDITOR</span>
          <h1 className="m-0 text-[clamp(40px,5.4vw,76px)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
            An AI video editor built to <span className="text-red">understand raw footage.</span>
          </h1>
          <p className="m-0 max-w-[560px] text-[19px] leading-[1.55] text-soft">
            Broll analyzes unedited footage, finds the moments that matter and assembles the edit, like a human editor would.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn href={DOWNLOAD_CTA.href}>
              <DownloadIcon />
              {DOWNLOAD_CTA.label}
            </Btn>
            <Btn href={CHAT_URL} variant="ghost">
              Try Broll in Chat
            </Btn>
            <Btn href="/#film" variant="ghost">
              <PlayIcon />
              Watch the teaser
            </Btn>
          </div>
        </div>
        <div aria-hidden className="flex flex-[1_1_380px] flex-col gap-3 rounded-3xl border border-line bg-surface p-7 font-mono text-[13px]">
          <span className="text-muted">AGENT LOG · interview_day2</span>
          {LOG.map(([a, b, done]) => (
            <div key={a} className="flex justify-between gap-3 rounded-[10px] bg-[#181A27] px-3.5 py-3">
              <span>{a}</span>
              <span className={done ? "text-red" : "text-soft"}>{b}</span>
            </div>
          ))}
          <div className="h-1.5 rounded-[3px] bg-[#1D2030]">
            <div className="h-full w-[78%] rounded-[3px] bg-crimson" />
          </div>
        </div>
      </section>

      <section className="border-t border-line-2">
        <div className="mx-auto box-border flex max-w-[1440px] flex-wrap gap-14 px-6 lg:px-10 pt-20 pb-10">
          <nav aria-label="On this page" className="flex flex-[0_1_240px] flex-col gap-1 self-start md:sticky md:top-24">
            <span className="mono-label mb-2.5">ON THIS PAGE</span>
            {TOC.map((t, i) => (
              <a
                key={t.href}
                href={t.href}
                className={
                  "flex min-h-10 items-center border-l-2 pl-3.5 text-[15px] transition-colors hover:text-ink " +
                  (i === 0 ? "border-red text-ink" : "border-line text-soft")
                }
              >
                {t.label}
              </a>
            ))}
          </nav>
          <article className="flex max-w-[760px] min-w-0 flex-[999_1_560px] flex-col gap-[72px]">
            <div id="how" className="flex scroll-mt-24 flex-col gap-[18px]">
              <span className="eyebrow">TC 00:01</span>
              <h2 className={h2}>How Broll&apos;s AI video editor works</h2>
              <p className={p}>
                Upload raw footage and describe the edit you want. Broll indexes the footage so it can be searched like text,
                picks the moments that match, cuts the timeline, and handles captions, color grading and lip sync.
              </p>
              <p className={p}>
                The output is a publish-ready video, or a timeline XML for Premiere Pro, DaVinci Resolve or Final Cut Pro.
              </p>
              <p className={p}>
                Two shortcuts: share a <span className="font-medium text-ink">reference video</span> and Broll cuts your
                footage to the same template, or paste a <span className="font-medium text-ink">YouTube link</span> and get
                the best moments back as short clips.
              </p>
            </div>
            <div id="agentic" className="flex scroll-mt-24 flex-col gap-[18px]">
              <span className="eyebrow">TC 00:02</span>
              <h2 className={h2}>What is agentic AI video editing?</h2>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="flex flex-col gap-2 rounded-2xl border border-line p-[22px]">
                  <span className="mono-label">SINGLE-STEP AUTOMATION</span>
                  <span className="text-[15px] leading-relaxed text-soft">
                    Auto-captions, filters or templates, applied to clips you&apos;ve already picked.
                  </span>
                </div>
                <div className="flex flex-col gap-2 rounded-2xl border-[1.5px] border-red bg-surface p-[22px]">
                  <span className="font-mono text-xs text-red">AGENTIC EDITING</span>
                  <span className="text-[15px] leading-relaxed">
                    Reviews the raw footage and decides what goes into the cut, upstream of everything else.
                  </span>
                </div>
              </div>
            </div>
            <div id="raw" className="flex scroll-mt-24 flex-col gap-[18px]">
              <span className="eyebrow">TC 00:03</span>
              <h2 className={h2}>From raw footage to finished video</h2>
              <p className={p}>
                No pre-logging clips, no organizing bins, no timeline setup. The agent does the editing. You review, refine
                if you want, and export.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[13px]">
                {["Pre-logging", "Bin organization", "Timeline setup"].map((s) => (
                  <span key={s} className="rounded-lg bg-[#181A27] px-3 py-2 text-muted line-through">
                    {s}
                  </span>
                ))}
                <span className="rounded-lg bg-wine px-3 py-2 text-red">Review → Export</span>
              </div>
            </div>
            <div id="teams" className="flex scroll-mt-24 flex-col gap-[18px]">
              <span className="eyebrow">TC 00:04</span>
              <h2 className={h2}>Built for professional video teams</h2>
              <p className={p}>Multiple cameras, long shoots and tight deadlines are where Broll is built to work.</p>
              <div className="flex flex-wrap gap-5">
                <ArrowLink href="/ai-video-editor-for-production-houses">AI video editor for production houses</ArrowLink>
                <ArrowLink href="/about">About Broll</ArrowLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Faq eyebrow="TC 00:05 — FAQ" heading="AI video editing, answered." items={AI_VIDEO_EDITOR_FAQS} />
      <CtaBand heading="Let the agent make the first cut." secondaryLabel="See all capabilities" secondaryHref="/product" />
    </PageShell>
  );
}
