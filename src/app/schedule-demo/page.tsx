import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ScheduleDemo from "@/components/site/ScheduleDemo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/fx/Reveal";
import { breadcrumbJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule your demo",
  description:
    "Book a 30-minute live demo of Broll and see how it can streamline your production workflow.",
  alternates: {
    canonical: "/schedule-demo",
  },
  openGraph: {
    title: "Schedule your demo — Broll",
    description:
      "Book a 30-minute live demo of Broll and see how it can streamline your production workflow.",
    url: "/schedule-demo",
  },
};

export default function ScheduleDemoPage() {
  return (
    <div className="min-h-screen" style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("Schedule your demo", "/schedule-demo")),
        }}
      />

      <Navbar />

      <main>
        <PageHero
          eyebrow="Schedule a demo"
          title={
            <>
              See Broll <span className="serif-voice text-brand">in action.</span>
            </>
          }
          lede="See how Broll fits into your production workflow. We'll walk you through the product and answer your questions live."
          cta={null}
          meta={<>30 min · Live · Free</>}
        />

        <section className="px-5 pb-24 sm:px-8 md:pb-32">
          <Reveal className="mx-auto max-w-6xl">
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <p className="text-sm font-medium">Choose a time</p>
                <p className="hidden text-sm text-muted sm:block">30 minute meeting</p>
              </div>
              <div className="p-2 sm:p-4">
                <ScheduleDemo />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
