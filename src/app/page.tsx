import type { Metadata } from "next";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import WhyTheySwitched from "@/components/site/WhyTheySwitched";
import StackedFeatures from "@/components/site/StackedFeatures";
import GetDemo from "@/components/site/GetDemo";
import Footer from "@/components/site/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

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
        <WhyTheySwitched />
        <StackedFeatures />
        <GetDemo />
      </main>
      <Footer />
    </>
  );
}
