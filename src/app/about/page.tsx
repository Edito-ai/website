import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ContentSection from "@/components/site/ContentSection";
import FaqSection from "@/components/site/FaqSection";
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

export default function AboutPage() {
  return (
    // No announcement bar on this page, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="relative overflow-hidden px-5 pt-32 pb-24 sm:px-6 sm:pt-36 md:pt-44">
        <div
          aria-hidden
          className="animate-drift absolute -top-1/4 left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
        />

        <div className="relative mx-auto max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">About</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Broll is an <span className="font-serif italic">agentic AI video editor</span>.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            trybroll.com is the official website of Broll — AI video editing
            software that turns raw footage into finished, publish-ready
            videos for production houses and creator teams.
          </p>

          <div className="mt-10">
            <Link
              href="/demo"
              className="btn-liquid relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_var(--accent)]"
            >
              Book a demo
            </Link>
          </div>

          <div className="mt-16">
            <ContentSection title="What Broll is">
              <p>
                Broll is an agentic AI video editor: rather than a set of
                tools you apply by hand, it&apos;s an agent that watches your
                raw footage, understands it, and makes the editorial
                decisions a human editor would. It finds the moments, builds
                the story, cuts the timeline, writes captions, grades color
                and lip syncs across languages — then hands you a
                publish-ready video, or an XML timeline to keep refining in
                Premiere Pro, DaVinci Resolve or Final Cut Pro.
              </p>
            </ContentSection>

            <ContentSection title="What Broll does">
              <ul>
                <li>Prompt-based editing — describe the cut in plain language instead of dragging clips on a timeline</li>
                <li>Semantic footage search — every frame indexed, so you can find any moment the way you&apos;d search text</li>
                <li>Automatic captions</li>
                <li>AI color grading — a consistent, cinematic look across cameras and takes</li>
                <li>AI lip sync — dub across languages with lips that match</li>
                <li>Export to timeline XML — keep cutting in Premiere Pro, DaVinci Resolve or Final Cut Pro</li>
              </ul>
            </ContentSection>

            <ContentSection title="Who Broll is for">
              <p>
                Production houses and creator teams — including teams behind
                200M+ monthly views and a 15M+ follower production house —
                use Broll to turn hours of raw footage into a finished cut.
                See how it fits a production team&apos;s pipeline on the{" "}
                <Link
                  href="/ai-video-editor-for-production-houses"
                  className="text-accent underline underline-offset-4"
                >
                  AI video editor for production houses
                </Link>{" "}
                page.
              </p>
            </ContentSection>

            <ContentSection title="Why Broll is different">
              <p>
                Most tools described as an &ldquo;AI video editor&rdquo;
                automate a single step — auto-captions, a filter, a template —
                applied to clips you&apos;ve already selected and organized.
                Broll starts earlier: it begins with raw, unorganized
                footage — multiple cameras, mismatched audio, hours of
                unlabeled clips — and does the understanding work itself. Read
                more about{" "}
                <Link href="/ai-video-editor" className="text-accent underline underline-offset-4">
                  how Broll&apos;s AI video editor works
                </Link>
                .
              </p>
            </ContentSection>

            <ContentSection title="Broll and trybroll.com">
              <p>
                Broll is the product. trybroll.com is Broll&apos;s official
                website — the place to learn what Broll does and request a
                free demo. There is no other official Broll site.
              </p>
            </ContentSection>

            <ContentSection title="Backed by Google for Startups">
              <p>
                Broll is built with the support of the Google for Startups
                program.
              </p>
            </ContentSection>
          </div>
        </div>
      </main>

      <FaqSection id="faq" eyebrow="FAQ" heading="About Broll." faqs={ABOUT_FAQS} />

      <Footer />
    </div>
  );
}
