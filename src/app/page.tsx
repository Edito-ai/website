import type { Metadata } from "next";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import BackedBy from "@/components/site/BackedBy";
import BrollFilm from "@/components/site/BrollFilm";
import WhyTheySwitched from "@/components/site/WhyTheySwitched";
import WorkAnywhere from "@/components/site/WorkAnywhere";
import StackedFeatures from "@/components/site/StackedFeatures";
import HowItWorks from "@/components/site/HowItWorks";
import Faq from "@/components/site/Faq";
import GetDemo from "@/components/site/GetDemo";
import Footer from "@/components/site/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, faqPageJsonLd } from "@/lib/site";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/broll-logo.png`,
      slogan: SITE_TAGLINE,
      memberOf: {
        "@type": "Organization",
        name: "Google for Startups",
        url: "https://startup.google.com/",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "VideoObject",
      name: "Broll — 300 clips, 12 minutes",
      description:
        "Watch Broll turn a full shoot into a first cut — before anyone opens a timeline.",
      thumbnailUrl: `${SITE_URL}/film/poster.webp`,
      contentUrl: `${SITE_URL}/film/broll-film.mp4`,
      uploadDate: "2026-10-08",
      duration: "PT1M20S",
    },
    faqPageJsonLd(FAQS, "/"),
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <BrollFilm />
        <WhyTheySwitched />
        <WorkAnywhere />
        <StackedFeatures />
        <HowItWorks />
        <BackedBy />
        <Faq />
        <GetDemo />
      </main>
      <Footer />
    </>
  );
}
