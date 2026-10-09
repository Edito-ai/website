import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ClaimForm from "@/components/site/ClaimForm";
import Reveal from "@/components/fx/Reveal";
import { breadcrumbJsonLd } from "@/lib/site";

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

const NEXT_STEPS = [
  { n: "01", title: "We read every request", body: "A real person reviews what you publish and how your team edits." },
  { n: "02", title: "Broll is set up for you", body: "Within 24 hours, on your own footage — no card required." },
  { n: "03", title: "A live walkthrough", body: "From raw footage to a first cut, while you watch." },
];

export default function DemoPage() {
  return (
    // No announcement bar on this page, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("Claim your free demo", "/demo")),
        }}
      />
      <Navbar />
      <main className="relative isolate min-h-screen overflow-hidden">
        <div aria-hidden className="hero-glow absolute inset-x-0 top-0 -z-10 h-[700px]" />
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />

        <div className="mx-auto grid max-w-6xl gap-16 px-5 pt-32 pb-28 sm:px-8 md:pt-44 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-24">
          <div>
            <Reveal y={12}>
              <p className="text-sm font-medium text-red">Free demo · No card required</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.25rem)] text-balance">
                Tell us about your{" "}
                <span className="serif-voice text-brand">production house</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-2/80">
                We&apos;ll set up Broll around the way your team already works —
                and reach out within 24 hours.
              </p>
            </Reveal>

            <ol className="mt-14 max-w-md border-t border-line">
              {NEXT_STEPS.map((step, i) => (
                <li key={step.n}>
                  <Reveal delay={0.2 + i * 0.08} className="group flex gap-6 border-b border-line py-6">
                    <span className="pt-0.5 font-mono text-xs text-muted tabular-nums transition-colors group-hover:text-red">
                      {step.n}
                    </span>
                    <div>
                      <p className="font-medium tracking-tight">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.5}>
              <p className="mt-10 text-sm text-muted">Trusted by teams behind 200M+ monthly views</p>
            </Reveal>
          </div>

          <div className="lg:pt-6">
            <ClaimForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
