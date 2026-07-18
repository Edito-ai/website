import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ClaimForm from "@/components/site/ClaimForm";

export const metadata: Metadata = {
  title: "Claim your free demo",
  description:
    "Tell us about your production house and we'll set up Broll for your team within 24 hours.",
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "Claim your free demo — Broll",
    description:
      "Tell us about your production house and we'll set up Broll for your team within 24 hours.",
    url: "/demo",
  },
};

export default function DemoPage() {
  return (
    // No announcement bar on this page, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden px-6 pt-36 pb-28 md:pt-44">
        <div
          aria-hidden
          className="animate-drift absolute -top-1/4 left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Free demo
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Tell us about your{" "}
            <span className="font-serif italic">production house</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
            We&apos;ll set up Broll around the way your team already works —
            and reach out within 24 hours.
          </p>

          <div className="mt-12">
            <ClaimForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
