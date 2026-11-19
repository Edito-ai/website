import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageShell from "@/components/v2/PageShell";
import Faq from "@/components/v2/Faq";
import CtaBand from "@/components/v2/CtaBand";
import { ArrowLink, CHAT_URL, PageIntro } from "@/components/v2/ui";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { ABOUT_FAQS } from "@/lib/faqs";

const TITLE = "About Broll — Agentic AI Video Editor";
const DESCRIPTION =
  "Broll is an agentic AI video editor that turns raw footage into finished videos. Learn what Broll does, who it's for, and how it's different.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/about", name: TITLE, description: DESCRIPTION, type: "AboutPage" }),
    breadcrumbJsonLd("About", "/about"),
    faqPageJsonLd(ABOUT_FAQS, "/about"),
  ],
};

const DOES = [
  "Prompt-based editing",
  "Reference-style editing",
  "YouTube & stream clipping",
  "Semantic footage search",
  "Automatic captions",
  "AI color grading",
  "AI lip sync",
  "Timeline XML export",
];

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-x-16 gap-y-6 border-b border-line-2 py-16">
      <span className="flex-[0_0_220px] font-mono text-[13px] text-muted">{label}</span>
      {children}
    </div>
  );
}

const h2 = "m-0 text-[clamp(26px,3vw,38px)] leading-[1.15] font-semibold tracking-[-0.03em] text-balance";

export default function AboutPage() {
  return (
    <PageShell jsonLd={structuredData}>
      <PageIntro
        size="lg"
        eyebrow="ABOUT"
        title={
          <>
            Broll is an agentic <span className="text-red">AI video editor.</span>
          </>
        }
        lede="trybroll.com is the official home of the software that turns raw footage into publish-ready videos for production houses and creator teams."
        primary={{ href: CHAT_URL, label: "Chat with Broll" }}
        secondary={{ href: "/product", label: "Explore the product" }}
      />

      <section className="border-t border-line-2">
        <div className="mx-auto box-border flex max-w-[1440px] flex-col px-6 lg:px-10">
          <Row label="01 · WHAT BROLL IS">
            <div className="flex flex-[1_1_520px] flex-col gap-4">
              <h2 className={h2}>An agent that watches your footage and makes the editorial calls.</h2>
              <p className="m-0 text-[17px] leading-[1.7] text-soft">
                Give it raw footage or a YouTube link, and a brief or a reference video. It delivers a finished video, or
                an XML timeline for Premiere Pro, DaVinci Resolve or Final Cut Pro.
              </p>
            </div>
          </Row>
          <Row label="02 · WHAT BROLL DOES">
            <div className="grid flex-[1_1_520px] grid-cols-1 gap-3 sm:grid-cols-2">
              {DOES.map((d) => (
                <div key={d} className="flex items-center gap-3 rounded-[14px] border border-line bg-surface p-[18px] text-base font-medium">
                  <span className="size-2 shrink-0 rounded-[2px] bg-crimson" />
                  {d}
                </div>
              ))}
            </div>
          </Row>
          <Row label="03 · WHO IT'S FOR">
            <div className="flex flex-[1_1_520px] flex-col gap-6">
              <h2 className={h2}>Production houses and creator teams.</h2>
              <div>
                <ArrowLink href="/ai-video-editor-for-production-houses">Broll for production houses</ArrowLink>
              </div>
            </div>
          </Row>
          <Row label="04 · WHY IT'S DIFFERENT">
            <div className="grid flex-[1_1_520px] grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2.5 rounded-2xl border border-line p-6">
                <span className="mono-label">OTHER TOOLS</span>
                <span className="text-[17px] leading-normal text-soft">Automate one step, on clips you&apos;ve already organized.</span>
              </div>
              <div className="flex flex-col gap-2.5 rounded-2xl border-[1.5px] border-red bg-surface p-6">
                <span className="font-mono text-xs text-red">BROLL</span>
                <span className="text-[17px] leading-normal">Starts from raw, unorganized footage and does the whole edit.</span>
              </div>
              <div>
                <ArrowLink href="/ai-video-editor">How the AI video editor works</ArrowLink>
              </div>
            </div>
          </Row>
          <div className="grid grid-cols-1 gap-5 py-16 md:grid-cols-2">
            <div className="flex flex-col gap-3.5 rounded-3xl border border-line bg-surface p-9">
              <span className="font-mono text-[13px] text-muted">05 · OFFICIAL SITE</span>
              <h2 className="m-0 text-[28px] font-semibold tracking-[-0.03em]">Broll and trybroll.com</h2>
              <p className="m-0 text-base leading-[1.65] text-soft">
                trybroll.com is the only official Broll site. Start a conversation with Broll in Chat.
              </p>
              <div className="mt-auto">
                <ArrowLink href={CHAT_URL}>Chat with Broll</ArrowLink>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 rounded-3xl border border-line bg-surface p-9">
              <span className="font-mono text-[13px] text-muted">06 · AVAILABLE ON</span>
              <h2 className="m-0 text-[28px] font-semibold tracking-[-0.03em]">Live on the web. Apps coming soon.</h2>
              <p className="m-0 text-base leading-[1.65] text-soft">
                Broll Chat is live on the web today. Windows and Mac apps and a DaVinci Resolve plugin for both are coming soon.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="chip">Windows</span>
                <span className="chip">macOS</span>
                <span className="chip chip-hot">DaVinci plugin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq eyebrow="TC 00:07 — ABOUT FAQ" heading="About Broll, answered." items={ABOUT_FAQS} />
      <CtaBand heading="See Broll on your own footage." />
    </PageShell>
  );
}
