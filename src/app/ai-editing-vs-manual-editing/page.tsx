import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ContentSection from "@/components/site/ContentSection";
import FaqSection from "@/components/site/FaqSection";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import type { Faq } from "@/lib/faqs";

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

const AI_VS_MANUAL_FAQS: Faq[] = [
  {
    q: "Is AI video editing better than manual editing?",
    a: "It depends what you mean by \"better.\" AI, like Broll, is dramatically faster at the upstream work — watching footage, logging it, finding the right moments and assembling a first cut. Manual editing is still where final creative judgment, brand voice and sign-off happen. Most teams get the best result by combining both, not by picking one over the other.",
  },
  {
    q: "What does AI video editing actually save time on?",
    a: "The hours spent watching raw footage, logging takes, and searching for the right moment to use. Broll indexes every frame so it can find and assemble those moments automatically, which is how an edit that took about eight hours by hand can take around twelve minutes before human review.",
  },
  {
    q: "Does AI replace human editors?",
    a: "No. Broll removes the hours of watching, logging and assembling raw footage, and hands editors a built story to review and finish. Creative tone, brand voice and the final call on what ships still sit with a person.",
  },
  {
    q: "Can I still edit an AI-generated cut by hand afterward?",
    a: "Yes. Broll exports a standard timeline XML that opens in Premiere Pro, DaVinci Resolve or Final Cut Pro, so a human editor can pick up exactly where the agent left off instead of starting from raw footage.",
  },
  {
    q: "What is agentic AI video editing?",
    a: "Agentic AI video editing means the AI makes editorial decisions itself — finding moments, building a story, cutting a timeline — rather than just applying one automated step, like captioning, to footage you've already chosen by hand. Broll is built this way, working from raw footage to a publish-ready video.",
  },
  {
    q: "Who is already using AI-assisted editing like this?",
    a: "Production houses and creator teams, including teams behind 200M+ monthly views and a 15M+ follower production house, use Broll for the upstream editing work, with human review and finishing still part of the process.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({
      path: "/ai-editing-vs-manual-editing",
      name: TITLE,
      description: DESCRIPTION,
    }),
    breadcrumbJsonLd("AI Editing vs. Manual Editing", "/ai-editing-vs-manual-editing"),
    faqPageJsonLd(AI_VS_MANUAL_FAQS, "/ai-editing-vs-manual-editing"),
  ],
};

export default function AiEditingVsManualEditingPage() {
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
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            AI Editing vs. Manual Editing
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            AI editing doesn&apos;t replace{" "}
            <span className="font-serif italic">human judgment</span>. It removes the hours before it.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            An honest look at where agentic AI video editing actually saves
            time, where a person still needs to make the call, and how the
            two work together in a real production workflow.
          </p>

          <div className="mt-10">
            <Link
              href="/demo"
              className="btn-liquid relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_var(--accent)]"
            >
              Try Broll — book a demo
            </Link>
          </div>

          <div className="mt-16">
            <ContentSection title="The short version">
              <p>
                Manual editing means a person watches every clip, logs the
                good takes, finds the right moment, and assembles the story
                by hand in a timeline. That upstream work — not the creative
                decisions — is where most of the hours go.
              </p>
              <p>
                <strong>Agentic AI editing</strong>, the way Broll does it,
                takes raw footage and does that upstream work automatically:
                watching, indexing, finding moments, building a first cut,
                writing captions, grading color. What&apos;s left for a
                person is the part AI can&apos;t judge — tone, brand voice
                and the final sign-off.
              </p>
            </ContentSection>

            <ContentSection title="Where AI saves real time">
              <ul>
                <li>
                  <strong>Watching footage</strong> — reviewing hours of raw,
                  unorganized clips to know what you actually have.
                </li>
                <li>
                  <strong>Logging takes</strong> — noting which clips are
                  usable, which moments matter, which audio is clean.
                </li>
                <li>
                  <strong>Finding the right moment</strong> — searching
                  through footage for the specific shot or line that fits
                  the story, instead of scrubbing manually.
                </li>
                <li>
                  <strong>Assembling a first cut</strong> — turning found
                  moments into a structured timeline, with captions and a
                  color grade already applied.
                </li>
              </ul>
              <p>
                This is the difference between an eight-hour manual edit and
                a first pass that takes about twelve minutes — the time is
                saved upstream, before anyone reviews a frame.
              </p>
            </ContentSection>

            <ContentSection title="Where human judgment still matters">
              <ul>
                <li>
                  <strong>Creative tone</strong> — whether a cut feels right
                  for the moment, the audience and the platform.
                </li>
                <li>
                  <strong>Brand voice</strong> — the specific style, pacing
                  and language a team or client expects, built up over many
                  projects.
                </li>
                <li>
                  <strong>Final sign-off</strong> — the decision that a video
                  is actually ready to publish, which stays with a person.
                </li>
              </ul>
              <p>
                An AI editor can build a strong first pass. It shouldn&apos;t
                be the last set of eyes on anything that ships.
              </p>
            </ContentSection>

            <ContentSection title="How they combine in practice">
              <p>
                In practice, this isn&apos;t AI or a human editor — it&apos;s
                AI first, human second. Broll takes raw footage and produces
                a built story: cut, captions, color grade and lip sync
                included. An editor then reviews that first pass, adjusts
                tone and brand voice, and makes the final call.
              </p>
              <p>
                Because Broll exports a standard timeline XML, that review
                can happen in Premiere Pro, DaVinci Resolve or Final Cut Pro
                — the same tools a manual edit would have used, just starting
                from a finished first cut instead of raw footage. Production
                teams, including{" "}
                <Link href="/ai-video-editor-for-production-houses" className="text-accent underline underline-offset-4">
                  15M+ follower production houses
                </Link>{" "}
                and creators behind 200M+ monthly views, use this workflow to keep creative
                control while cutting out the hours of manual assembly. See
                how the underlying{" "}
                <Link href="/ai-video-editor" className="text-accent underline underline-offset-4">
                  AI video editor
                </Link>{" "}
                works.
              </p>
            </ContentSection>
          </div>
        </div>
      </main>

      <FaqSection
        id="faq"
        eyebrow="FAQ"
        heading="AI editing vs. manual editing, answered."
        faqs={AI_VS_MANUAL_FAQS}
      />

      <Footer />
    </div>
  );
}
