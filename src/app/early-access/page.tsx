import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import EarlyAccessForm from "@/components/site/EarlyAccessForm";
import Countdown from "@/components/site/Countdown";
import Reveal from "@/components/fx/Reveal";
import { breadcrumbJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get early access",
  description:
    "Join the Broll early-access list and get your link by email before launch.",
  alternates: {
    canonical: "/early-access",
  },
  openGraph: {
    title: "Get early access — Broll",
    description:
      "Join the Broll early-access list and get your link by email before launch.",
    url: "/early-access",
  },
};

const NEXT_STEPS = [
  { n: "01", title: "Join the list", body: "Tell us about your team — it takes a minute, no card required." },
  { n: "02", title: "Your link arrives by email", body: "Early-access links go out by email, ahead of everyone else." },
  { n: "03", title: "Broll launches", body: "From raw footage to a first cut, finished before you are." },
];

export default function EarlyAccessPage() {
  return (
    // No announcement bar on this page, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("Get early access", "/early-access")),
        }}
      />
      <Navbar />
      <main className="relative isolate min-h-screen overflow-hidden">
        <div aria-hidden className="hero-glow absolute inset-x-0 top-0 -z-10 h-[700px]" />
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />

        <div className="mx-auto grid max-w-6xl gap-16 px-5 pt-32 pb-28 sm:px-8 md:pt-44 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-24">
          <div>
            <Reveal y={12}>
              <p className="text-sm font-medium text-red">Early access · No card required</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.25rem)] text-balance">
                Be first in line for{" "}
                <span className="serif-voice text-brand">Broll</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-2/80">
                Join the list and your early-access link lands in your
                inbox before launch.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <Countdown className="mt-10 max-w-md !justify-start" />
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
            <EarlyAccessForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
