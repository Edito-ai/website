import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import PageHero, { PageBody } from "@/components/site/PageHero";
import ContentSection from "@/components/site/ContentSection";
import FaqSection from "@/components/site/FaqSection";
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

export default function AiVideoEditorPage() {
  return (
    // No announcement bar on this page, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow="AI Video Editor"
          title={
            <>
              An AI video editor built to{" "} <span className="serif-voice text-brand">understand raw footage</span>.
            </>
          }
          lede={
            <>
              Broll is an agentic AI video editor — it doesn&apos;t just apply automation to clips you&apos;ve already picked. It watches raw footage, finds the moments, and builds the edit.
            </>
          }
          cta={{ href: "/demo", label: "Try Broll — book a demo" }}
          secondary={{ href: "/#film", label: "Watch the teaser" }}
        />
        <PageBody>
          <ContentSection title="How Broll's AI video editor works">
            <p>
              Upload raw footage and describe the edit you want. Broll
              indexes every frame so it can search your footage like text,
              finds the moments that match the story, and cuts the
              timeline. Captions, AI color grading and AI lip sync happen
              in the same pass, and the result exports as a publish-ready
              video or a timeline XML for Premiere Pro, DaVinci Resolve or
              Final Cut Pro.
            </p>
          </ContentSection>

          <ContentSection title="What is agentic AI video editing?">
            <p>
              Most software labeled &ldquo;AI video editing&rdquo; automates
              a single step of a workflow you&apos;ve already set up — auto
              captions on clips you selected, a filter, a template. That&apos;s
              automated video editing: useful, but it starts after the hard
              part is done.
            </p>
            <p>
              Agentic video editing starts earlier. An agentic AI video
              editor does the upstream work itself — watching hours of raw,
              unorganized footage, understanding what&apos;s in it, and
              deciding what belongs in the cut — the way a human editor
              would, before any manual assembly happens.
            </p>
          </ContentSection>

          <ContentSection title="From raw footage to finished video">
            <p>
              Broll&apos;s positioning is specific: raw footage in, finished
              video out. No pre-logging your clips, no manual bin
              organization, no timeline required to get started. The agent
              does the editing; you review, refine if you like, and export.
            </p>
          </ContentSection>

          <ContentSection title="Built for professional video teams">
            <p>
              Broll is built around the volume and structure professional
              video teams actually work with — multiple cameras, long
              shoots, tight turnarounds. See how it fits a production
              team&apos;s pipeline on the{" "}
              <Link
                href="/ai-video-editor-for-production-houses"
                className="link-red"
              >
                AI video editor for production houses
              </Link>{" "}
              page, or read more{" "}
              <Link href="/about" className="link-red">
                about Broll
              </Link>
              .
            </p>
          </ContentSection>
        </PageBody>
      </main>

      <FaqSection
        id="faq"
        eyebrow="FAQ"
        heading="AI video editing, answered."
        faqs={AI_VIDEO_EDITOR_FAQS}
      />

      <Footer />
    </div>
  );
}
