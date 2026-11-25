import type { Metadata } from "next";
import PageShell from "@/components/v2/PageShell";
import Faq from "@/components/v2/Faq";
import { Btn, CHAT_URL, CheckList, PageIntro } from "@/components/v2/ui";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { PRICING_FAQS } from "@/lib/faqs";

const TITLE = "Pricing — Broll AI Video Editor";
const DESCRIPTION =
  "Broll pricing will be announced soon. Broll Chat is live today, so you can start using the agentic AI video editor right away.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/pricing",
    images: ["/opengraph-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/pricing", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Pricing", "/pricing"),
    faqPageJsonLd(PRICING_FAQS, "/pricing"),
  ],
};

const PLANS = [
  {
    name: "Creator teams",
    tag: "Short turnarounds, weekly cadence",
    features: ["Daily first cuts from raw recordings", "Clips from YouTube videos and streams", "Styled captions on every cut", "Export to your existing editor"],
    featured: false,
  },
  {
    name: "Production houses",
    tag: "Multi-camera, long shoots, parallel projects",
    features: ["Search across every shoot", "One grade across all cameras", "Several parallel projects", "Setup on your footage within 24 hours"],
    featured: true,
  },
  {
    name: "Agencies",
    tag: "Many clients, many formats",
    features: ["Match each client’s style from a reference video", "Client videos in every aspect ratio", "Lip sync across languages", "Cut, captions and grade in one pass"],
    featured: false,
  },
];

const STATUS_ROW = "flex items-center justify-between rounded-xl bg-[#161824] px-4 py-3.5";

export default function PricingPage() {
  return (
    <PageShell jsonLd={structuredData}>
      <PageIntro
        center
        eyebrow="PRICING"
        title={
          <>
            Pricing is <span className="text-grad">coming soon.</span>
          </>
        }
        lede="Pricing will be announced soon. Chat is live today, so you can start using Broll right away."
        primary={{ href: CHAT_URL, label: "Start in Chat" }}
      />

      <section aria-label="Plans" className="mx-auto box-border max-w-[1440px] px-6 lg:px-10 pt-0">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <article
              key={p.name}
              className={
                "flex flex-col gap-[22px] rounded-3xl p-8 " +
                (p.featured ? "border-[1.5px] border-red bg-[#141620]" : "border border-line bg-surface")
              }
            >
              <div className="flex items-center justify-between gap-3">
                <span className="mono-label">0{i + 1}</span>
                {p.featured && (
                  <span className="rounded-md bg-crimson px-2 py-1 font-mono text-[11px] text-white">MULTI-CAM</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="m-0 text-[28px] font-semibold tracking-[-0.03em]">{p.name}</h2>
                <span className="text-[15px] text-soft">{p.tag}</span>
              </div>
              <div className="flex flex-col gap-1 border-y border-line py-5">
                <span className="font-mono text-[30px] font-medium tracking-[-0.02em]">TBD</span>
                <span className="text-[13px] text-muted">Announcing soon</span>
              </div>
              <CheckList items={p.features} />
              <Btn href={CHAT_URL} variant={p.featured ? "primary" : "ghost"} className="mt-auto font-semibold">
                Start in Chat
              </Btn>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 rounded-2xl border border-line px-6 py-[18px] font-mono text-[13px] text-soft">
          <span>✓ All capabilities for every team</span>
          <span>✓ Chat is live now</span>
          <span>✓ Pricing announced soon</span>
        </div>
      </section>

      <section className="mx-auto box-border max-w-[1440px] px-6 lg:px-10 py-24 md:py-28">
        <div
          className="relative flex flex-wrap items-center gap-10 overflow-hidden rounded-[28px] border border-line-strong bg-surface-2"
          style={{ padding: "clamp(32px, 5vw, 64px)" }}
        >
          <div
            aria-hidden
            className="absolute -top-[120px] -right-[120px] size-[460px]"
            style={{ background: "radial-gradient(closest-side, rgba(190,30,52,0.28), rgba(190,30,52,0) 70%)" }}
          />
          <div className="relative flex flex-[2_1_420px] flex-col gap-4">
            <span className="eyebrow">TC 00:01 — STATUS</span>
            <h2 className="m-0 text-[clamp(30px,3.6vw,48px)] leading-[1.06] font-semibold tracking-[-0.04em]">
              We&apos;re finalizing plans. You can start today.
            </h2>
            <p className="m-0 text-[17px] leading-[1.7] text-soft">
              Plans for creator teams, production houses and agencies are being finalized and will be announced soon.
              Broll Chat is already live, so you can try it on your own footage now.
            </p>
          </div>
          <div className="relative flex flex-[1_1_280px] flex-col gap-2.5 font-mono text-[13px]">
            <div className={STATUS_ROW}>
              <span>Broll Chat</span>
              <span className="inline-flex items-center gap-1.5 text-red">
                <span className="size-[7px] rounded-full bg-red" />
                LIVE
              </span>
            </div>
            <div className={STATUS_ROW}>
              <span>Pricing</span>
              <span className="text-soft">TBD</span>
            </div>
            <div className={STATUS_ROW}>
              <span>Windows · Mac · Resolve</span>
              <span className="text-soft">SOON</span>
            </div>
            <Btn href={CHAT_URL} className="mt-1.5 font-sans">
              Start in Chat
            </Btn>
          </div>
        </div>
      </section>

      <section className="mx-auto box-border max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-line bg-surface p-8">
          <div className="flex flex-col gap-1.5">
            <span className="text-xl font-semibold">Not ready to talk pricing yet?</span>
            <span className="text-[15px] text-soft">Learn how the editor works first.</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Btn href="/ai-video-editor" variant="ghost" size="sm">
              The AI video editor
            </Btn>
            <Btn href="/about" variant="ghost" size="sm">
              About Broll
            </Btn>
          </div>
        </div>
      </section>

      <Faq eyebrow="TC 00:03 — PRICING FAQ" heading="Pricing questions, answered honestly." items={PRICING_FAQS} />
    </PageShell>
  );
}
