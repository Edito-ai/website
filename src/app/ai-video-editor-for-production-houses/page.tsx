import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/v2/PageShell";
import Faq from "@/components/v2/Faq";
import CtaBand from "@/components/v2/CtaBand";
import Shot, { CLIPS } from "@/components/v2/Shot";
import { ArrowLink, Band, CHAT_URL, PageIntro, Wrap } from "@/components/v2/ui";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { PRODUCTION_HOUSES_FAQS } from "@/lib/faqs";

const TITLE = "AI Video Editor for Production Houses — Broll";
const DESCRIPTION =
  "Broll helps production houses turn raw footage into client-ready cuts — captions, color grading, lip sync and XML export to Premiere Pro, DaVinci Resolve or Final Cut.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/ai-video-editor-for-production-houses" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ai-video-editor-for-production-houses",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({
      path: "/ai-video-editor-for-production-houses",
      name: TITLE,
      description: DESCRIPTION,
    }),
    breadcrumbJsonLd("AI Video Editor for Production Houses", "/ai-video-editor-for-production-houses"),
    faqPageJsonLd(PRODUCTION_HOUSES_FAQS, "/ai-video-editor-for-production-houses"),
  ],
};

const CAMS = [
  { name: "CAM A · WIDE", dur: "2:14:08", bg: "#191B28", note: "Master angle", src: CLIPS.set, pos: "center" },
  { name: "CAM B · HOST", dur: "2:14:08", bg: "#1D2030", note: "Close-up, host", src: CLIPS.interview, pos: "center 30%" },
  { name: "CAM C · GUEST", dur: "2:13:51", bg: "#181A27", note: "Close-up, guest", src: CLIPS.creator, pos: "center 40%" },
  { name: "AUDIO · LAV", dur: "2:15:02", bg: "#1B1D2B", note: "Synced automatically", src: null, pos: "" },
];

export default function ProductionHousesPage() {
  return (
    <PageShell jsonLd={structuredData}>
      <PageIntro
        eyebrow="FOR PRODUCTION HOUSES"
        title={
          <>
            An AI video editor built for <span className="text-red">production houses.</span>
          </>
        }
        lede="Multiple cameras, long shoots, parallel projects. Broll handles the volume and hands your editors a structured story to finish."
        primary={{ href: CHAT_URL, label: "Chat with Broll" }}
      >
        <div aria-hidden className="mt-8 grid grid-cols-1 gap-3 rounded-3xl border border-line bg-surface-2 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAMS.map((c) => (
            <div key={c.name} className="flex flex-col gap-2.5">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-line-2" style={{ background: c.bg }}>
                {c.src ? (
                  <Shot src={c.src} position={c.pos} sizes="(min-width: 1024px) 280px, 50vw" />
                ) : (
                  <div className="absolute inset-x-4 top-1/2 flex h-10 -translate-y-1/2 items-center gap-[3px]">
                    {[30, 55, 40, 80, 62, 35, 90, 48, 70, 38, 58, 84, 44, 66, 30, 52, 76, 40, 60, 34].map((h, i) => (
                      <span key={i} className="flex-1 rounded-[2px] bg-[#41465E]" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                )}
                <span className="absolute top-2 left-2.5 font-mono text-[11px] text-soft">{c.name}</span>
                <span className="absolute right-2.5 bottom-2 font-mono text-[11px] text-soft">{c.dur}</span>
              </div>
              <span className="text-[13px] text-soft">{c.note}</span>
            </div>
          ))}
        </div>
      </PageIntro>

      <Band>
        <Wrap className="grid grid-cols-1 gap-5 py-24 md:grid-cols-3 md:py-28">
          <div className="mb-5 flex max-w-[720px] flex-col gap-3.5 md:col-span-3">
            <span className="eyebrow">TC 00:01 — BUILT FOR TEAMS</span>
            <h2 className="h-section">Built for teams, not just individual creators.</h2>
            <p className="m-0 text-[17px] leading-[1.65] text-soft">
              Hours of multi-camera footage, mismatched audio, several projects at once. Broll&apos;s agent starts there, so
              your team skips manual logging and pre-sorting bins.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-8">
            <span className="mono-label">TC 00:02</span>
            <h3 className="m-0 text-2xl font-semibold tracking-[-0.02em]">From raw footage to client-ready cuts</h3>
            <p className="m-0 text-[15px] leading-[1.65] text-soft">
              Upload and describe the edit. Broll finds the key moments, builds the story, cuts the timeline, and adds
              captions, grading and multilingual lip sync. Share a client’s past video and Broll matches their house
              style. Your team reviews, refines and exports.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-8">
            <span className="mono-label">TC 00:03</span>
            <h3 className="m-0 text-2xl font-semibold tracking-[-0.02em]">Handoff without lock-in</h3>
            <p className="m-0 text-[15px] leading-[1.65] text-soft">
              Edits export as standard timeline XML for Premiere Pro, DaVinci Resolve or Final Cut Pro. Broll does the first
              pass; your editors keep control of the final version.
            </p>
            <div className="mt-auto">
              <ArrowLink href="/ai-video-editor">How the AI video editor works</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] bg-crimson p-8 text-white">
            <span className="font-mono text-xs">TC 00:04 — SCALE</span>
            <h3 className="m-0 text-2xl font-semibold tracking-[-0.02em]">Scale output without scaling headcount</h3>
            <p className="m-0 text-[15px] leading-relaxed">
              Broll does the watching, logging and first assembly, so the same team can take on more projects at once.
            </p>
            <Link href="/about" className="mt-auto inline-flex min-h-11 items-center text-[15px] font-semibold text-white underline">
              Learn more about Broll
            </Link>
          </div>
        </Wrap>
      </Band>

      <Faq eyebrow="TC 00:05 — FAQ" heading="Production houses, answered." items={PRODUCTION_HOUSES_FAQS} />
      <CtaBand heading="Put your next shoot through Broll." secondaryLabel="See pricing" secondaryHref="/pricing" />
    </PageShell>
  );
}
