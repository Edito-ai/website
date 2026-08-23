import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ContentSection from "@/components/site/ContentSection";
import FaqSection from "@/components/site/FaqSection";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import type { Faq } from "@/lib/faqs";

const TITLE = "Pricing — Broll AI Video Editor";
const DESCRIPTION =
  "Broll doesn't have public self-serve pricing. Production houses and creator teams have very different footage volumes, so we set up pricing per team after a free demo — no card required.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/pricing",
  },
};

const PRICING_FAQS: Faq[] = [
  {
    q: "How much does Broll cost?",
    a: "Broll doesn't have public self-serve pricing yet. Book a free demo and we'll set up a plan for your team within 24 hours — no card required.",
  },
  {
    q: "Why doesn't Broll publish a pricing table?",
    a: "Production houses and creator teams have very different footage volumes — a production house shooting multiple cameras across long shoots isn't the same workload as a creator team publishing shorter turnarounds. A flat per-seat or one-size-fits-all tier doesn't fit either well, so pricing is set up per team after we understand how you actually shoot and edit.",
  },
  {
    q: "Is Broll subscription-based or usage-based?",
    a: "We don't have a public answer to that yet — it's part of what gets set up on your demo call, based on your team's footage volume and workflow. Book a demo and we'll walk through what makes sense for you.",
  },
  {
    q: "Is there a free trial?",
    a: "There's no public self-serve free trial right now. Book a free demo and we'll set Broll up for your team within 24 hours, no card required, so you can see it work on your own footage before committing to anything.",
  },
  {
    q: "How is Broll's pricing determined?",
    a: "After a demo, we look at your footage volume, team size, and how you work — production house or creator team — and set up a plan around that, rather than forcing everyone into the same tier.",
  },
  {
    q: "Do I need a credit card to book a demo?",
    a: "No. Booking a demo requires no card — you tell us about your team, and we set Broll up for you within 24 hours.",
  },
  {
    q: "Is pricing different for production houses vs. creator teams?",
    a: "It can be. Production houses and creator teams work with different footage volumes and different pipelines, so pricing is set up per team on the demo call rather than a single shared rate for everyone.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/pricing", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Pricing", "/pricing"),
    faqPageJsonLd(PRICING_FAQS, "/pricing"),
  ],
};

export default function PricingPage() {
  return (
    // No announcement bar on this page, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="relative overflow-hidden px-5 pt-32 pb-24 sm:px-6 sm:pt-36 md:pt-44">
        <div
          aria-hidden
          className="animate-drift absolute -top-1/4 left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
        />

        <div className="relative mx-auto max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Pricing built{" "}
            <span className="font-serif italic">around your footage</span>, not a
            tier.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Broll doesn&apos;t have a public self-serve pricing page. A
            production house shooting multiple cameras across a long shoot and
            a creator team turning around shorter videos every week don&apos;t
            fit the same tier — so we set up pricing per team, after a demo.
          </p>

          <div className="mt-10">
            <Link
              href="/demo"
              className="btn-liquid relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_var(--accent)]"
            >
              Book a demo — no card required
            </Link>
          </div>

          <div className="mt-16">
            <ContentSection title="Why Broll doesn't publish a pricing table">
              <p>
                Most editing tools price by seat, because most editing tools
                are applied to footage one person already selected. Broll is
                different: it works from raw footage, and how much raw
                footage a team generates varies enormously. A production
                house running several shoots a month has a very different
                footage footprint than a solo creator or a small creator
                team — so a flat per-seat or per-export price doesn&apos;t
                map cleanly to the value either kind of team actually gets.
              </p>
              <p>
                Instead of forcing every team into the same tier, we set up
                pricing after understanding how you shoot and edit —
                footage volume, team size, and turnaround needs — on a demo
                call.
              </p>
            </ContentSection>

            <ContentSection title="How to get pricing for your team">
              <p>
                Book a free demo and tell us about your team. We&apos;ll set
                Broll up for you within 24 hours — no card required — and
                talk through a plan that fits your footage volume, whether
                you&apos;re a{" "}
                <Link
                  href="/ai-video-editor-for-production-houses"
                  className="text-accent underline underline-offset-4"
                >
                  production house
                </Link>{" "}
                or a creator team.
              </p>
            </ContentSection>

            <ContentSection title="Not ready to talk pricing yet?">
              <p>
                Read more about how Broll&apos;s{" "}
                <Link
                  href="/ai-video-editor"
                  className="text-accent underline underline-offset-4"
                >
                  agentic AI video editor
                </Link>{" "}
                works, or learn more{" "}
                <Link href="/about" className="text-accent underline underline-offset-4">
                  about Broll
                </Link>{" "}
                first — pricing is only a conversation away when you are.
              </p>
            </ContentSection>
          </div>
        </div>
      </main>

      <FaqSection
        id="faq"
        eyebrow="FAQ"
        heading="Pricing questions, answered honestly."
        faqs={PRICING_FAQS}
      />

      <Footer />
    </div>
  );
}
