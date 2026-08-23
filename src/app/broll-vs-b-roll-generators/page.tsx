import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ContentSection from "@/components/site/ContentSection";
import FaqSection from "@/components/site/FaqSection";
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
    webPageJsonLd({
      path: "/broll-vs-b-roll-generators",
      name: TITLE,
      description: DESCRIPTION,
    }),
    breadcrumbJsonLd("Broll vs. B-Roll Generators", "/broll-vs-b-roll-generators"),
    faqPageJsonLd(COMPARISON_FAQS, "/broll-vs-b-roll-generators"),
  ],
};

export default function ComparisonPage() {
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
            Broll vs. B-Roll Generators
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Broll is not a{" "}
            <span className="font-serif italic">B-roll generator</span>.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Same-sounding name, different category. Here&apos;s the actual
            difference between Broll — an agentic AI video editor — and the
            B-roll generators that add supplementary footage to an edit you&apos;ve
            already made.
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
                A <strong>B-roll generator</strong> is a feature: it finds or
                creates supplementary footage — cutaways, stock clips,
                establishing shots — and drops it into an edit you&apos;ve
                already assembled elsewhere. It assumes your main cut already
                exists.
              </p>
              <p>
                <strong>Broll</strong> is the editor itself. You hand it raw,
                unorganized footage, and it builds the story, cuts the
                timeline, writes captions, grades color and lip syncs — the
                entire finished video, not one layer of it.
              </p>
            </ContentSection>

            <ContentSection title="Side by side">
              <ul>
                <li>
                  <strong>Starting point</strong> — B-roll generators: an
                  edit you&apos;ve already made. Broll: raw, unlogged footage.
                </li>
                <li>
                  <strong>What it produces</strong> — B-roll generators:
                  supplementary clips to insert. Broll: a complete,
                  publish-ready video.
                </li>
                <li>
                  <strong>Editorial decisions</strong> — B-roll generators:
                  you&apos;ve already made them. Broll: the agent makes them,
                  the way a human editor would.
                </li>
                <li>
                  <strong>Output</strong> — B-roll generators: a clip to drop
                  into your existing timeline. Broll: a finished video, or a
                  standard XML timeline for Premiere Pro, DaVinci Resolve or
                  Final Cut Pro.
                </li>
              </ul>
            </ContentSection>

            <ContentSection title="Why the names collide">
              <p>
                &ldquo;B-roll&rdquo; is a decades-old film-production term for
                supplementary footage, and several tools have taken it as a
                product name for exactly that one feature. Broll (one word,
                no hyphen) is a different kind of product — a full agentic
                video editor — that happens to share the sound of the name.
                If you searched for an AI video editor and landed on a
                B-roll-clip tool instead, this is why. Read more{" "}
                <Link href="/about" className="text-accent underline underline-offset-4">
                  about Broll
                </Link>{" "}
                or see{" "}
                <Link href="/ai-video-editor" className="text-accent underline underline-offset-4">
                  how Broll&apos;s AI video editor works
                </Link>
                .
              </p>
            </ContentSection>
          </div>
        </div>
      </main>

      <FaqSection
        id="faq"
        eyebrow="FAQ"
        heading="Broll vs. B-roll generators, answered."
        faqs={COMPARISON_FAQS}
      />

      <Footer />
    </div>
  );
}
