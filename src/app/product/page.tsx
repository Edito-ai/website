import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductStats from "@/components/site/ProductStats";
import ProductPipeline from "@/components/site/ProductPipeline";
import ProductCapabilities from "@/components/site/ProductCapabilities";
import ProductAudience from "@/components/site/ProductAudience";
import ContentSection from "@/components/site/ContentSection";
import FaqSection from "@/components/site/FaqSection";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { AI_VIDEO_EDITOR_FAQS } from "@/lib/faqs";

const TITLE = "Product — Broll, the Agentic AI Video Editor";
const DESCRIPTION =
  "Everything Broll does: semantic footage search, prompt-based editing, auto captions, AI color grading, AI lip sync, and XML export to Premiere Pro, DaVinci Resolve or Final Cut.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/product" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/product",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/product", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Product", "/product"),
    faqPageJsonLd(AI_VIDEO_EDITOR_FAQS, "/product"),
  ],
};

export default function ProductPage() {
  return (
    // No announcement bar on this page, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      <main className="relative overflow-hidden px-5 pt-32 pb-16 sm:px-6 sm:pt-36 md:pt-44">
        <div
          aria-hidden
          className="animate-drift absolute -top-1/4 left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
        />

        <div className="relative mx-auto max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Product
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Everything Broll does, from{" "}
            <span className="font-serif italic">raw footage to finished video</span>.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Broll is an agentic AI video editor — one system that searches
            your footage, writes the edit, cuts the timeline, captions,
            grades and lip syncs it, then hands you a publish-ready video or
            an XML timeline for the editor you already use.
          </p>

          <div className="mt-10">
            <Link
              href="/demo"
              className="btn-liquid relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_var(--accent)]"
            >
              Try Broll — book a demo
            </Link>
          </div>
        </div>
      </main>

      <ProductStats />
      <ProductPipeline />
      <ProductCapabilities />
      <ProductAudience />

      <div className="mx-auto max-w-2xl px-5 sm:px-6 md:px-8 md:py-8">
        <ContentSection title="Built for production teams">
          <p>
            Broll is built around the volume professional teams actually work
            with — multiple cameras, long shoots, several projects running at
            once. See how it fits a production pipeline on the{" "}
            <Link
              href="/ai-video-editor-for-production-houses"
              className="text-accent underline underline-offset-4"
            >
              AI video editor for production houses
            </Link>{" "}
            page.
          </p>
        </ContentSection>

        <ContentSection title="Never locked in">
          <p>
            Every Broll edit exports as a standard timeline XML, so your
            finishing editors keep working in Premiere Pro, DaVinci Resolve
            or Final Cut Pro — exactly where the agent left off. Read more{" "}
            <Link href="/about" className="text-accent underline underline-offset-4">
              about Broll
            </Link>{" "}
            or how{" "}
            <Link href="/ai-video-editor" className="text-accent underline underline-offset-4">
              Broll&apos;s AI video editor works
            </Link>
            .
          </p>
        </ContentSection>
      </div>

      <FaqSection
        id="faq"
        eyebrow="FAQ"
        heading="Broll, in full."
        faqs={AI_VIDEO_EDITOR_FAQS}
      />

      <Footer />
    </div>
  );
}
