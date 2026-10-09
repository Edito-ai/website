import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import PageHero, { PageBody } from "@/components/site/PageHero";
import ContentSection from "@/components/site/ContentSection";
import FaqSection from "@/components/site/FaqSection";
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
    breadcrumbJsonLd(
      "AI Video Editor for Production Houses",
      "/ai-video-editor-for-production-houses",
    ),
    faqPageJsonLd(PRODUCTION_HOUSES_FAQS, "/ai-video-editor-for-production-houses"),
  ],
};

export default function ProductionHousesPage() {
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
          eyebrow="For Production Houses"
          title={
            <>
              An AI video editor built for{" "} <span className="serif-voice text-brand">production houses</span>.
            </>
          }
          lede={
            <>
              Broll handles the volume production teams actually work with — multiple cameras, long shoots, several projects at once — and hands your editors a built story to finish.
            </>
          }
          cta={{ href: "/demo", label: "Tell us about your production house" }}
          secondary={{ href: "/#film", label: "Watch the teaser" }}
        />
        <PageBody>
          <ContentSection title="Built for teams, not just individual creators">
            <p>
              Production houses don&apos;t work with a single clip — they
              work with hours of multi-camera footage, mismatched audio,
              and several projects moving at once. Broll&apos;s agent is
              built to start there: no manual logging, no pre-organizing
              bins before the editing can begin.
            </p>
          </ContentSection>

          <ContentSection title="From raw footage to client-ready cuts">
            <p>
              Upload the footage and describe the edit. Broll finds the
              moments, builds the story, cuts the timeline, writes
              captions, grades color and lip syncs across languages in one
              pass. Your team reviews the cut, refines what needs a human
              eye, and exports.
            </p>
          </ContentSection>

          <ContentSection title="Handoff without lock-in">
            <p>
              Every edit exports as a standard timeline XML, so your
              finishing editors keep working in Premiere Pro, DaVinci
              Resolve or Final Cut Pro — the tools your pipeline already
              runs on. Broll handles the first pass; your team keeps
              creative control over the final one. Read more about{" "}
              <Link href="/ai-video-editor" className="link-red">
                how Broll&apos;s AI video editor works
              </Link>
              .
            </p>
          </ContentSection>

          <ContentSection title="Scale output without scaling headcount">
            <p>
              Production houses and creator teams — including teams behind
              200M+ monthly views and a 15M+ follower production house —
              use Broll to take an edit that used to run about eight hours
              down to around twelve minutes of agent time before human
              review. Learn more{" "}
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
        heading="Production houses, answered."
        faqs={PRODUCTION_HOUSES_FAQS}
      />

      <Footer />
    </div>
  );
}
