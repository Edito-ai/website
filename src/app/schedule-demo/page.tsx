import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ScheduleDemo from "@/components/site/ScheduleDemo";
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
    <div
      className="min-h-screen"
      style={{ "--annbar-offset": "0px" } as CSSProperties}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd("Schedule your demo", "/schedule-demo")
          ),
        }}
      />

      <Navbar />

      <main className="relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-48 -top-48 -z-10 size-[600px] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_65%)] opacity-15 blur-3xl"
        />

        {/* Hero */}
        <section className="px-5 pb-0 pt-16 sm:px-6 sm:pt-20 md:pb-0">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-end gap-6 md:grid-cols-[1.5fr_0.5fr]">
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="px-5 pb-16 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-6xl">
            {/* Section heading */}
            <div className="mb-5 flex items-center justify-between border-t border-foreground/10 pt-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  Choose a time
                </p>

                <p className="mt-2 text-sm text-muted">
                  Pick a time that works for you.
                </p>
              </div>

              <p className="hidden font-mono text-[9px] tracking-widest text-muted uppercase sm:block">
                30 minute meeting
              </p>
            </div>

            {/* Calendar */}
            <div className="w-full -mt-45">
              <ScheduleDemo />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}