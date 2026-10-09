import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import PageHero, { PageBody } from "@/components/site/PageHero";
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

      <main>
        <PageHero
          eyebrow="Product"
          title={
            <>
              Everything Broll does, from{" "}
              <span className="serif-voice text-brand">raw footage to finished video</span>.
            </>
          }
          lede="Broll is an agentic AI video editor — one system that searches your footage, writes the edit, cuts the timeline, captions, grades and lip syncs it, then hands you a publish-ready video or an XML timeline for the editor you already use."
          cta={{ href: "/demo", label: "Try Broll — book a demo" }}
          secondary={{ href: "/#film", label: "Watch the teaser" }}
        />
      </main>

      <ProductStats />
      <ProductPipeline />
      <ProductCapabilities />
      <ProductAudience />

      <PageBody>
        <ContentSection title="Built for production teams">
          <p>
            Broll is built around the volume professional teams actually work
            with — multiple cameras, long shoots, several projects running at
            once. See how it fits a production pipeline on the{" "}
            <Link
              href="/ai-video-editor-for-production-houses"
              className="link-red"
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
            <Link href="/about" className="link-red">
              about Broll
            </Link>{" "}
            or how{" "}
            <Link href="/ai-video-editor" className="link-red">
              Broll&apos;s AI video editor works
            </Link>
            .
          </p>
        </ContentSection>
      </PageBody>

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
