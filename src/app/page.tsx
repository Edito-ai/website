import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaBand from "@/components/v2/CtaBand";
import HeroModes from "@/components/v2/home/HeroModes";
import HeroBackdrop from "@/components/v2/home/HeroBackdrop";
import LayerStack from "@/components/v2/home/LayerStack";
import ClipStory from "@/components/v2/home/ClipStory";
import EditStory from "@/components/v2/home/EditStory";
import ProductTabs from "@/components/v2/home/ProductTabs";
import Film from "@/components/v2/home/Film";
import Ruler from "@/components/v2/Ruler";
import Shot, { CLIPS } from "@/components/v2/Shot";
import { Band, CHAT_CTA, DOWNLOAD_CTA, SectionHead, Wrap } from "@/components/v2/ui";
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
      memberOf: {
        "@type": "Organization",
        name: "Google for Startups",
        url: "https://startup.google.com/",
      },
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
    {
      "@type": "VideoObject",
      name: "Broll — 300 clips, 12 minutes",
      description:
        "Watch Broll turn a full shoot into a first cut — before anyone opens a timeline.",
      thumbnailUrl: `${SITE_URL}/film/film-poster.webp`,
      contentUrl: `${SITE_URL}/film/broll-film.mp4`,
      uploadDate: "2026-10-08",
      duration: "PT1M20S",
    },
  ],
};

const WORKS_WITH = ["Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "YouTube", "Windows", "macOS"];

// Relative cost per edit — Broll's own estimate from publicly listed API rates.
const COST = [
  { name: "Broll", mult: 1 },
  { name: "Sonnet 5.5 · GPT 6.1", mult: 17 },
  { name: "Opus 5.5 · GPT Astra", mult: 32 },
  { name: "Fable 5.1", mult: 81 },
];

const MINI_WAVE = [30, 45, 25, 60, 35, 90, 85, 40, 30, 50, 28, 36, 55, 32, 95, 88, 42, 30, 26, 48, 35, 30, 92, 80, 38, 28, 44, 34, 52, 30, 26, 40];
const MINI_HOT = new Set([5, 6, 14, 15, 22, 23]);

const COMPARE = [
  { step: "Watching footage", manual: "Hours of scrubbing every take", broll: "Indexed automatically, frame by frame" },
  { step: "Finding moments", manual: "Manual logs and markers", broll: "Semantic search by description" },
  { step: "First cut assembly", manual: "Built clip by clip on the timeline", broll: "Drafted from a single prompt" },
  { step: "Captions", manual: "Typed and re-synced by hand", broll: "Styled, and stay synced as you edit" },
  { step: "Color", manual: "Graded shot by shot", broll: "One consistent grade across cameras" },
  { step: "House style", manual: "Rebuilt by hand for every video", broll: "Copied from a reference video" },
  { step: "Clipping long videos", manual: "Scrub hours of VOD for highlights", broll: "Paste a link, get captioned clips" },
  { step: "Handoff", manual: "Re-conform for the finishing editor", broll: "Timeline XML for Premiere, Resolve or FCP" },
];

const USE_CASES = [
  { title: "Podcasts & streams", desc: "Long episodes and streams into captioned clips." },
  { title: "Production houses", desc: "Multi-cam shoots, parallel projects." },
  { title: "Creator teams", desc: "Daily videos in your proven format." },
  { title: "Real estate", desc: "Walkthrough footage into listing videos." },
  { title: "Brands & agencies", desc: "Each client’s house style, every format." },
];

const featIcon = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "#FF5C70", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const NewPill = () => <span className="rounded-full bg-crimson px-2 py-[3px] text-[11px] font-semibold text-white">New</span>;

export default function Home() {
  const maxCost = Math.max(...COST.map((c) => c.mult));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="overflow-x-clip">
        {/* HERO */}
        <div className="grid-paper relative overflow-hidden bg-bg">
          <div
            aria-hidden
            data-fx="drift"
            className="absolute top-[560px] left-1/2 h-[760px] w-[1200px] max-w-[160%] -translate-x-1/2"
            style={{ background: "radial-gradient(closest-side, rgba(190,30,52,0.26), rgba(190,30,52,0) 72%)" }}
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-bg" />
          <section className="relative isolate mx-auto box-border flex max-w-[1440px] flex-col items-center gap-6 px-5 pt-8 pb-10 text-center max-sm:min-h-[calc(100svh-64px)] max-sm:justify-center sm:gap-7 sm:px-6 sm:pt-16 sm:pb-[72px] md:pt-[104px] lg:px-10">
            <HeroBackdrop />
            <a
              href="/product#resolve"
              data-reveal
              className="relative z-10 inline-flex max-w-full items-center gap-2 rounded-full border border-line-strong bg-surface py-1 pr-3 pl-1 text-[13px] whitespace-nowrap text-ink-2 transition-colors hover:border-red sm:gap-2.5 sm:py-1.5 sm:pr-3.5 sm:pl-1.5 sm:text-sm"
            >
              <span className="rounded-full bg-crimson px-2 py-0.5 text-[11px] font-semibold text-white sm:px-[9px] sm:py-1 sm:text-xs">New</span>
              <span className="truncate">
                Broll for DaVinci Resolve<span className="hidden sm:inline"> is live on Mac &amp; Windows</span>
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
            <h1 className="relative z-10 m-0 max-w-[1100px] text-[clamp(46px,7.4vw,112px)] leading-[0.96] font-semibold tracking-[-0.055em] text-balance">
              Videos clipped &amp; edited <span className="text-grad">before you do.</span>
            </h1>
            <HeroModes />
          </section>
        </div>

        {/* WORKS WITH */}
        <section aria-label="Works with" className="pt-2 pb-14">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[22px]">
            <span className="font-mono text-xs tracking-[0.08em] text-muted">EXPORTS TO AND WORKS WITH</span>
            <div className="marquee w-full overflow-hidden">
              <ul className="marquee-track m-0 flex w-max list-none gap-x-14 p-0">
                {[...WORKS_WITH, ...WORKS_WITH].map((w, i) => (
                  <li
                    key={i}
                    aria-hidden={i >= WORKS_WITH.length}
                    className="text-[clamp(20px,2.2vw,28px)] font-semibold tracking-[-0.02em] whitespace-nowrap text-dim transition-colors hover:text-ink"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Ruler pos="24%" tc="00:00:42:18" />

        <LayerStack />

        <ClipStory />

        <EditStory />

        {/* PRODUCTS */}
        <section id="products" aria-labelledby="products-title" className="border-t border-line-2 bg-bg-2">
          <Wrap className="flex flex-col items-center gap-10 pt-16 pb-20 sm:pt-24 sm:pb-28 md:pt-28 md:pb-[120px]">
            <SectionHead
              center
              id="products-title"
              eyebrow="TC 00:02 — PRODUCTS"
              title={<>The <span className="text-grad">Broll</span> ecosystem.</>}
              lede="Download Broll for Windows, Mac or DaVinci Resolve, with the same agent inside. It also runs in your browser."
            />
            <ProductTabs />
          </Wrap>
        </section>

        <Ruler pos="42%" tc="00:03:00:00" />

        <Film />

        {/* COST */}
        <section className="mx-auto box-border flex max-w-[1440px] flex-wrap items-center gap-8 px-6 sm:gap-14 lg:px-10 py-16 sm:py-24 md:py-[120px]">
          <div className="flex flex-[1_1_360px] flex-col gap-[18px]">
            <span className="eyebrow">TC 00:04 — WHY BROLL</span>
            <h2 className="h-section">The same quality of edit. At a fraction of the price.</h2>
          </div>
          <div data-reveal className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px] rounded-[20px] border border-line bg-surface p-8">
            <span className="mono-label">ESTIMATED COST PER EDIT · RELATIVE</span>
            {COST.map((c, i) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className="flex justify-between gap-3 text-[15px]">
                  <span className={i === 0 ? "font-semibold" : ""}>{c.name}</span>
                  <span className={"font-mono " + (i === 0 ? "text-red" : "text-soft")}>{i === 0 ? "1×" : `~${c.mult}×`}</span>
                </div>
                <div className="h-3.5 rounded bg-[#1D2030]">
                  <div
                    data-bar
                    className="h-full min-w-2.5 rounded"
                    style={{
                      width: `${(c.mult / maxCost) * 100}%`,
                      background: i === 0 ? "#BE1E34" : "#565B74",
                      ["--bd" as string]: `${0.2 + i * 0.12}s`,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="m-0 text-[13px] text-muted">
              Illustrative estimates from Broll&apos;s own comparison, based on publicly listed API rates. Actual costs vary.
            </p>
          </div>
        </section>

        <Ruler pos="58%" tc="00:06:12:20" />

        {/* FEATURES */}
        <section className="mx-auto box-border flex max-w-[1440px] flex-col gap-12 px-6 lg:px-10 py-16 sm:py-24 md:py-[120px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHead eyebrow="TC 00:06 — FEATURES" title="One agent, the whole edit." />
            <Link href="/product" className="link-arrow text-base">
              Explore the product →
            </Link>
          </div>
          <div className="m-rail flex flex-wrap gap-5">
            <div className="box-border flex min-h-80 min-w-0 flex-[2_1_480px] flex-col gap-3.5 rounded-3xl border border-crimson/70 bg-[#1A0F17] p-8 shadow-[0_30px_80px_-40px_rgba(190,30,52,0.7)]">
              <div className="flex items-center justify-between">
                <svg {...featIcon}>
                  <rect x="2" y="5" width="20" height="14" rx="4" />
                  <path d="M10 9.5v5l4.5-2.5z" />
                </svg>
                <NewPill />
              </div>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">YouTube &amp; stream clipping</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">Link in. Captioned 9:16 clips out.</p>
              <div aria-hidden className="mt-1.5 flex items-end gap-2.5">
                {[
                  { src: CLIPS.streamer, cap: "no way" },
                  { src: CLIPS.podcast, cap: "he did it" },
                  { src: CLIPS.creator, cap: "listen" },
                ].map((c, i) => (
                  <div
                    key={c.cap}
                    className={
                      "relative aspect-[9/16] w-[58px] shrink-0 overflow-hidden rounded-lg bg-[#1E2132] " +
                      (i === 0 ? "border-[1.5px] border-crimson" : "border border-line-strong")
                    }
                  >
                    <Shot src={c.src} position="center" sizes="58px" />
                    <span className="absolute top-[62%] left-1/2 -translate-x-1/2 rounded-[3px] bg-bg px-1 py-px text-[8px] font-bold whitespace-nowrap">
                      {c.cap}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col gap-1.5 font-mono text-[11px] text-ink-2 max-sm:hidden">
                  <span>✓ best moments</span>
                  <span>✓ captions</span>
                  <span>✓ 9:16 reframe</span>
                </div>
              </div>
              <a href="#new" className="link-arrow mt-auto text-sm">
                See how it works →
              </a>
            </div>
            <div className="box-border flex min-h-80 min-w-0 flex-[2_1_480px] flex-col gap-3.5 rounded-3xl border border-wine-line bg-[#1A0F17] p-8">
              <div className="flex items-center justify-between">
                <svg {...featIcon}>
                  <rect x="3" y="4" width="8" height="16" rx="2" />
                  <rect x="13" y="4" width="8" height="16" rx="2" />
                </svg>
                <NewPill />
              </div>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.03em]">Reference-style editing</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">Show a video you love. Get the same edit.</p>
              <div aria-hidden className="mt-1.5 flex items-center gap-3">
                <div className="relative aspect-[9/14] w-16 shrink-0 overflow-hidden rounded-lg border border-line-strong bg-[#1E2132]">
                  <Shot src={CLIPS.podcast} position="center" sizes="64px" />
                  <span className="absolute bottom-2.5 left-1/2 h-1.5 w-3/5 -translate-x-1/2 rounded-[2px] bg-ink" />
                </div>
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="#FF5C70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 7h24M19 1l6 6-6 6" />
                </svg>
                <div className="relative aspect-[9/14] w-16 shrink-0 overflow-hidden rounded-lg border-[1.5px] border-crimson bg-wine">
                  <Shot src={CLIPS.creator} position="center" sizes="64px" />
                  <span className="absolute bottom-2.5 left-1/2 h-1.5 w-3/5 -translate-x-1/2 rounded-[2px] bg-ink" />
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-[11px] text-ink-2 max-sm:hidden">
                  <span>✓ pacing</span>
                  <span>✓ captions</span>
                  <span>✓ look</span>
                </div>
              </div>
              <div aria-hidden className="mt-1.5 flex h-12 items-end gap-[3px]">
                {MINI_WAVE.map((h, i) => (
                  <span key={i} className="flex-1 rounded-[2px]" style={{ height: `${h}%`, background: MINI_HOT.has(i) ? "#BE1E34" : "#33384E" }} />
                ))}
              </div>
              <a href="#new" className="link-arrow mt-auto text-sm">
                See how it works →
              </a>
            </div>
            <div className="box-border flex min-h-[280px] min-w-0 flex-[1_1_250px] flex-col gap-3.5 rounded-3xl border border-line bg-surface p-7">
              <svg {...featIcon}>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Semantic footage search</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">Describe a shot. Get the exact moment.</p>
              <div className="mt-auto rounded-[10px] border border-line-strong px-3 py-2.5 font-mono text-[13px] text-ink-2">
                host laughs, wide angle <span className="text-muted">· 7 matches</span>
              </div>
            </div>
            <div className="box-border flex min-h-[280px] min-w-0 flex-[1_1_250px] flex-col gap-3.5 rounded-3xl border border-line bg-surface p-7">
              <svg {...featIcon}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18M12 12l6.4-6.4" />
              </svg>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">AI color grading</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">One look across every camera.</p>
              <div aria-hidden className="mt-auto flex h-9 overflow-hidden rounded-lg">
                {["#262A3D", "#4B3F36", "#6B5340", "#8E6A4C", "#B58A62"].map((c) => (
                  <div key={c} className="flex-1" style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="box-border flex min-h-[280px] min-w-0 flex-[1_1_250px] flex-col gap-3.5 rounded-3xl border border-line bg-surface p-7">
              <svg {...featIcon}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 15h4M13 15h4M7 11h10" />
              </svg>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Auto captions</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">Styled, synced, always.</p>
              <div className="mt-auto self-start rounded-md bg-bg px-2.5 py-1.5 text-base font-bold">
                this changes <span className="text-red">everything</span>
              </div>
            </div>
            <div className="box-border flex min-h-[280px] min-w-0 flex-[1_1_250px] flex-col gap-3.5 rounded-3xl border border-line bg-surface p-7">
              <svg {...featIcon}>
                <path d="M4 12h2M8 8v8M12 5v14M16 9v6M20 11v2" />
              </svg>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">AI lip sync</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">Dub any language, lips matched.</p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="chip">EN</span>
                <span className="chip chip-hot">HI</span>
                <span className="chip">ES</span>
                <span className="chip">PT</span>
              </div>
            </div>
            <div className="box-border flex min-h-[280px] min-w-0 flex-[1_1_250px] flex-col gap-3.5 rounded-3xl border border-line bg-surface p-7">
              <svg {...featIcon}>
                <path d="M12 3v12M7 10l5 5 5-5M4 19h16" />
              </svg>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Export to any editor</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">MP4, or XML for Premiere, Resolve, FCP.</p>
              <div className="mt-auto font-mono text-[13px] text-muted">ep42_reel_v1.xml → Premiere Pro</div>
            </div>
            <div className="box-border flex min-h-[280px] min-w-0 flex-[2_1_480px] flex-col gap-3.5 rounded-3xl bg-crimson p-8 text-white">
              <span className="font-mono text-[13px]">ALL IN ONE PASS</span>
              <h3 className="m-0 text-[28px] leading-[1.15] font-semibold tracking-[-0.03em]">
                Search, cut, caption, grade and match a style in one agent run.
              </h3>
              <div className="mt-auto flex flex-wrap gap-2.5">
                <Link
                  href={DOWNLOAD_CTA.href}
                  className="inline-flex min-h-11 items-center rounded-full bg-bg px-[18px] text-[15px] font-semibold text-ink"
                >
                  {DOWNLOAD_CTA.label}
                </Link>
                <a
                  href={CHAT_CTA.href}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/50 px-[18px] text-[15px] font-medium text-white hover:border-white"
                >
                  {CHAT_CTA.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WHY TEAMS SWITCH */}
        <section className="mx-auto box-border flex max-w-[1440px] flex-col gap-10 px-6 lg:px-10 pt-4 pb-16 sm:pt-10 sm:pb-24 md:pb-[120px]">
          <SectionHead eyebrow="TC 00:07 — WHY TEAMS SWITCH" title="Manual editing vs. Broll." />
          <ul data-stagger className="m-0 flex list-none flex-col gap-2 p-0 sm:hidden">
            {COMPARE.map((r) => (
              <li key={r.step} className="flex flex-col gap-1 rounded-2xl border border-line bg-surface px-4 py-3.5">
                <span className="text-[15px] font-semibold">{r.step}</span>
                <span className="text-[13px] text-muted line-through decoration-dim">{r.manual}</span>
                <span className="flex gap-2 text-sm text-ink-2">
                  <span className="text-red">→</span>
                  {r.broll}
                </span>
              </li>
            ))}
            <li className="mt-1 flex items-center justify-between rounded-2xl border border-wine-line bg-wine/60 px-4 py-4 font-mono">
              <span className="text-sm text-soft line-through">~8 hours</span>
              <span className="text-xl text-red">~12 min</span>
            </li>
          </ul>
          <div className="hidden overflow-x-auto rounded-[20px] border border-line sm:block">
            <table className="w-full min-w-[640px] border-collapse text-[15px]">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="px-6 py-[18px] text-left font-mono text-xs font-medium text-muted">STEP</th>
                  <th scope="col" className="px-6 py-[18px] text-left font-mono text-xs font-medium text-muted">MANUAL EDITING</th>
                  <th scope="col" className="px-6 py-[18px] text-left font-mono text-xs font-medium text-red">BROLL</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.step} className="border-t border-line-2">
                    <th scope="row" className="px-6 py-[18px] text-left font-semibold">{r.step}</th>
                    <td className="px-6 py-[18px] text-soft">{r.manual}</td>
                    <td className="px-6 py-[18px]">{r.broll}</td>
                  </tr>
                ))}
                <tr className="border-t border-line bg-surface">
                  <th scope="row" className="px-6 py-[22px] text-left font-semibold">Typical first cut</th>
                  <td className="px-6 py-[22px] font-mono text-xl text-soft">~8 hours</td>
                  <td className="px-6 py-[22px] font-mono text-xl text-red">~12 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* USE CASES */}
        <Band>
          <Wrap className="flex flex-col gap-8 py-16 sm:py-24 md:py-[120px]">
            <SectionHead eyebrow="TC 00:08 — USE CASES" title="Built for teams shipping video every week." />
            <div className="m-rail grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {USE_CASES.map((u, i) => (
                <div key={u.title} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface p-[22px]">
                  <span className="mono-label">0{i + 1}</span>
                  <span className="text-lg font-semibold">{u.title}</span>
                </div>
              ))}
            </div>
          </Wrap>
        </Band>

        <CtaBand heading="Your next first cut is minutes away." />
      </main>
      <Footer />
    </>
  );
}
