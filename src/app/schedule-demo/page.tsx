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
        {/* Very subtle ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-48 -top-48 -z-10 size-[600px] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_65%)] opacity-15 blur-3xl"
        />

        {/* Hero */}
        <section className="px-5 pb-12 pt-32 sm:px-6 sm:pt-40 md:pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-end gap-10 md:grid-cols-[1.5fr_0.5fr]">
              <div>
                <p className="mb-6 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  Schedule a demo
                </p>

                <h1 className="max-w-4xl text-[3.5rem] font-semibold leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[6rem]">
                  See Broll{" "}
                  <span className="font-serif font-normal italic">
                    in action.
                  </span>
                </h1>
              </div>

              <div className="max-w-xs pb-1 md:ml-auto">
                <p className="text-sm leading-6 text-muted">
                  See how Broll fits into your production workflow. We&apos;ll
                  walk you through the product and answer your questions live.
                </p>

                <div className="mt-5 h-px w-10 bg-foreground/20" />

                <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  30 min · Live · Free
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="px-5 pb-24 sm:px-6 md:pb-32">
          <div className="mx-auto max-w-6xl">
            {/* Section heading */}
            <div className="mb-7 flex items-center justify-between border-t border-foreground/10 pt-7">
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
            <div className="w-full">
              <ScheduleDemo />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}