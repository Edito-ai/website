import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ScheduleDemo from "@/components/site/ScheduleDemo";
import { breadcrumbJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule your demo",
  description: "Pick a time that works for you and we'll walk you through Broll live.",
  alternates: {
    canonical: "/schedule-demo",
  },
  openGraph: {
    title: "Schedule your demo — Broll",
    description: "Pick a time that works for you and we'll walk you through Broll live.",
    url: "/schedule-demo",
  },
};

export default function ScheduleDemoPage() {
  return (
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("Schedule your demo", "/schedule-demo")),
        }}
      />
      <Navbar />
      <main className="relative min-h-screen overflow-hidden px-5 pt-32 pb-24 sm:px-6 sm:pt-36 md:pt-44">
        <div
          aria-hidden
          className="animate-drift absolute -top-1/4 left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Free demo
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Pick a time that <span className="font-serif italic">works for you</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
            30 minutes, live — we&apos;ll walk through Broll for your
            production house. You&apos;ll get a calendar invite and a
            confirmation email right after booking.
          </p>

          <div className="mt-12">
            <ScheduleDemo />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
