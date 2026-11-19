import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/v2/PageShell";
import ProductMock from "@/components/v2/ProductMock";
import NewFeatures from "@/components/v2/NewFeatures";
import Faq from "@/components/v2/Faq";
import CtaBand from "@/components/v2/CtaBand";
import { ArrowLink, ArrowRight, Band, CHAT_URL, PageIntro, SectionHead, Wrap } from "@/components/v2/ui";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/site";
import { PRODUCT_FAQS } from "@/lib/faqs";
import type { MockKind } from "@/components/v2/ProductMock";

const TITLE = "Product — Broll, the Agentic AI Video Editor";
const DESCRIPTION =
  "Everything Broll does: reference-style editing, YouTube clipping, semantic footage search, prompt-based editing, auto captions, AI color grading, AI lip sync, and XML export to Premiere Pro, DaVinci Resolve or Final Cut.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/product" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/product",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/product", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Product", "/product"),
    faqPageJsonLd(PRODUCT_FAQS, "/product"),
  ],
};

const LINEUP: {
  id: MockKind;
  n: string;
  platform: string;
  name: string;
  live: boolean;
  desc: string;
  specs: [string, string][];
  req: string;
}[] = [
  {
    id: "chat", n: "01", platform: "WEB APP", name: "Broll Chat", live: true,
    desc: "The full Broll agent in your browser. Upload footage or paste a YouTube link, describe the edit or share a reference, and review the first cut in minutes.",
    specs: [["RUNS IN", "Any browser"], ["FOOTAGE", "Uploads + YouTube"], ["OUTPUT", "MP4 or timeline XML"]],
    req: "chat.trybroll.com",
  },
  {
    id: "windows", n: "02", platform: "WINDOWS APP", name: "Broll for Windows", live: false,
    desc: "Broll as a desktop app for Windows. Point it at your footage, describe the edit, and review the first cut on your PC.",
    specs: [["RUNS ON", "Windows"], ["FOOTAGE", "Local drives"], ["OUTPUT", "MP4 or timeline XML"]],
    req: "Release date: TBA",
  },
  {
    id: "mac", n: "03", platform: "MAC APP", name: "Broll for Mac", live: false,
    desc: "The same agent, native on macOS. Built for large local libraries and fast turnarounds, including vertical and square cuts.",
    specs: [["RUNS ON", "macOS"], ["FOOTAGE", "Local libraries"], ["OUTPUT", "MP4 or timeline XML"]],
    req: "Release date: TBA",
  },
  {
    id: "resolve", n: "04", platform: "PLUGIN · MAC + WINDOWS", name: "Broll for DaVinci Resolve", live: false,
    desc: "A Broll chat panel docked inside DaVinci Resolve Studio. Ask for an edit without leaving Resolve, then keep grading and finishing where you already are.",
    specs: [["RUNS ON", "Mac + Windows"], ["LIVES IN", "Resolve Studio"], ["WORKFLOW", "Chat panel"]],
    req: "Release date: TBA",
  },
];

const COMPARE = [
  { k: "STATUS", c: "Live now", w: "Coming soon", m: "Coming soon", r: "Coming soon" },
  { k: "RUNS ON", c: "Any browser", w: "Windows", m: "macOS", r: "Mac and Windows" },
  { k: "WHAT IT IS", c: "Web app", w: "Desktop app", m: "Desktop app", r: "Panel inside DaVinci Resolve Studio" },
  { k: "THE AGENT", c: "Full agent", w: "Full agent", m: "Full agent", r: "Full agent" },
  { k: "OUTPUT", c: "MP4 or timeline XML", w: "MP4 or timeline XML", m: "MP4 or timeline XML", r: "Edits in your Resolve project" },
  { k: "BEST FOR", c: "Starting today, from anywhere", w: "Teams editing on PCs", m: "Teams editing on Macs", r: "Editors who live in Resolve" },
];

const STAGES = [
  { title: "Ingest & index", desc: "Upload footage or paste a YouTube link. Everything is indexed frame by frame." },
  { title: "Understand", desc: "Broll builds a searchable semantic map of your footage." },
  { title: "Generate the edit", desc: "Selects moments, removes silences and assembles the timeline from a prompt or a reference video." },
  { title: "Refine & deliver", desc: "Captions, color and lip sync, then export as a video or XML." },
];

const CAPS = [
  { title: "Reference-style editing", desc: "Share a video you like and get your new footage cut to the same template." },
  { title: "YouTube & stream clipping", desc: "Paste a link and get the best moments back as captioned short clips." },
  { title: "Semantic footage search", desc: "Find clips by describing the shot." },
  { title: "Prompt-based editing", desc: "A cut drafted from one sentence, including silence removal and pacing." },
  { title: "Auto captions", desc: "Styled captions that stay synced when the edit changes." },
  { title: "AI color grading", desc: "One consistent grade across cameras and lighting, matched to your brand look." },
  { title: "AI lip sync", desc: "Dub into other languages with matched lip movement." },
  { title: "Export to any platform", desc: "Standard timeline XML for Premiere Pro, DaVinci Resolve or Final Cut Pro." },
];

const JUMP = [
  { href: "#chat", label: "Chat · Live", dot: true },
  { href: "#windows", label: "Windows app · Soon" },
  { href: "#mac", label: "Mac app · Soon" },
  { href: "#resolve", label: "DaVinci Resolve plugin · Soon" },
];

export default function ProductPage() {
  return (
    <PageShell jsonLd={structuredData}>
      <PageIntro
        eyebrow="PRODUCTS · OVERVIEW"
        title={
          <>
            Everything Broll does, from raw footage to <span className="text-red">finished video.</span>
          </>
        }
        lede="An agentic AI video editor. It searches your footage or a YouTube link, cuts the edit, follows a reference style when you give one, and adds captions, grading and lip sync. You get a finished video or an XML timeline."
        secondary={{ href: "#download", label: "See what's coming" }}
      >
        <nav aria-label="Jump to product" className="mt-2 flex flex-wrap gap-2">
          {JUMP.map((j) => (
            <a
              key={j.href}
              href={j.href}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm text-ink-2 hover:border-line-3"
            >
              {j.dot && <span className="size-[7px] rounded-full bg-red" />}
              {j.label}
            </a>
          ))}
          <a href="#compare" className="inline-flex min-h-10 items-center px-3.5 text-sm text-red">
            Compare →
          </a>
        </nav>
      </PageIntro>

      {/* LINEUP */}
      <section id="download" aria-labelledby="lineup-title" className="border-t border-line-2">
        <Wrap className="flex flex-col gap-14 py-24 md:py-28">
          <SectionHead
            id="lineup-title"
            eyebrow="THE LINEUP"
            title="Chat is live. Apps are on the way."
            lede="Use the full agent in your browser today. Desktop apps for Windows and Mac, and a plugin for DaVinci Resolve, are coming soon."
          />
          {LINEUP.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              className={
                "flex scroll-mt-24 flex-wrap items-center gap-12 rounded-[28px] border bg-surface-2 p-6 md:p-10 " +
                (i % 2 ? "flex-row-reverse " : "") +
                (p.live ? "border-wine-line" : "border-line")
              }
            >
              <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="mono-label">{p.n} / 04</span>
                  <span className="rounded-md bg-wine px-2.5 py-[5px] font-mono text-[11px] text-red">{p.platform}</span>
                  {p.live ? (
                    <span className="rounded-md bg-crimson px-2.5 py-[5px] font-mono text-[11px] text-white">LIVE NOW</span>
                  ) : (
                    <span className="rounded-md border border-dashed border-line-3 px-[9px] py-1 font-mono text-[11px] text-soft">COMING SOON</span>
                  )}
                </div>
                <h3 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.08] font-semibold tracking-[-0.035em]">{p.name}</h3>
                <p className="m-0 text-base leading-[1.65] text-soft">{p.desc}</p>
                <dl className="m-0 grid grid-cols-3 gap-px overflow-hidden rounded-[14px] border border-line bg-line">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="flex min-w-0 flex-col gap-1 bg-surface-2 p-3.5">
                      <dt className="font-mono text-[10px] text-muted">{k}</dt>
                      <dd className="m-0 text-sm leading-[1.35] font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-2.5">
                  {p.live ? (
                    <a href={CHAT_URL} className="btn btn-primary min-h-12 px-[22px] text-[15px]">
                      Open Chat
                      <ArrowRight />
                    </a>
                  ) : (
                    <>
                      <span
                        aria-disabled="true"
                        className="inline-flex min-h-12 items-center rounded-full border border-dashed border-line-3 px-5 text-[15px] font-medium text-soft"
                      >
                        Coming soon
                      </span>
                      <a href={CHAT_URL} className="btn btn-primary min-h-12 px-[22px] text-[15px]">
                        Use Chat now
                      </a>
                    </>
                  )}
                </div>
                <span className="mono-label">{p.req}</span>
              </div>
              <div className="min-w-0 flex-[999_1_560px]">
                <ProductMock kind={p.id} />
              </div>
            </article>
          ))}
        </Wrap>
      </section>

      {/* COMPARE */}
      <Band id="compare" className="scroll-mt-20">
        <Wrap className="flex flex-col gap-10 py-24 md:py-28">
          <SectionHead eyebrow="COMPARE" title="Which Broll is right for you?" />
          <div className="overflow-x-auto rounded-[20px] border border-line bg-bg">
            <table className="w-full min-w-[860px] border-collapse text-[15px]">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="w-[18%] px-6 py-5 text-left">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-[17px] font-semibold text-red">
                    Chat{" "}
                    <span className="rounded-full bg-crimson px-1.5 py-0.5 align-middle font-mono text-[10px] text-white">LIVE</span>
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-[17px] font-semibold">Windows app</th>
                  <th scope="col" className="px-6 py-5 text-left text-[17px] font-semibold">Mac app</th>
                  <th scope="col" className="px-6 py-5 text-left text-[17px] font-semibold">Resolve plugin</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.k} className="border-t border-line-2">
                    <th scope="row" className="px-6 py-[18px] text-left font-mono text-xs font-medium text-muted">{r.k}</th>
                    <td className="bg-[rgba(190,30,52,0.06)] px-6 py-[18px]">{r.c}</td>
                    <td className="px-6 py-[18px] text-ink-2">{r.w}</td>
                    <td className="px-6 py-[18px] text-ink-2">{r.m}</td>
                    <td className="px-6 py-[18px] text-ink-2">{r.r}</td>
                  </tr>
                ))}
                <tr className="border-t border-line">
                  <th scope="row" className="px-6 py-5 text-left font-mono text-xs font-medium text-muted">GET IT</th>
                  <td className="bg-[rgba(190,30,52,0.06)] px-6 py-5">
                    <a href={CHAT_URL} className="btn btn-primary min-h-11 px-4 text-sm">
                      Open Chat
                    </a>
                  </td>
                  <td className="px-6 py-5 font-mono text-xs text-muted">COMING SOON</td>
                  <td className="px-6 py-5 font-mono text-xs text-muted">COMING SOON</td>
                  <td className="px-6 py-5 font-mono text-xs text-muted">COMING SOON</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Wrap>
      </Band>

      <NewFeatures />

      {/* PIPELINE */}
      <Band>
        <Wrap className="flex flex-col gap-12 py-24 md:py-28">
          <SectionHead eyebrow="TC 00:01 — THE PIPELINE" title="From raw footage to a finished cut." lede="Four stages, one pass." />
          <div className="relative">
            <div aria-hidden className="absolute inset-x-0 top-[19px] hidden h-0.5 bg-line lg:block" />
            <div aria-hidden className="absolute top-[19px] left-0 hidden h-0.5 w-[72%] bg-crimson lg:block" />
            <ol className="relative m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {STAGES.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-3.5">
                  <span className="flex size-10 items-center justify-center self-start rounded-xl border-[1.5px] border-red bg-bg font-mono text-sm text-red">
                    0{i + 1}
                  </span>
                  <h3 className="m-0 text-[21px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-soft">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </Band>

      {/* CAPABILITIES */}
      <section className="mx-auto box-border flex max-w-[1440px] flex-col gap-12 px-6 lg:px-10 py-24 md:py-28">
        <SectionHead eyebrow="TC 00:02 — CAPABILITIES" title="One agent, the whole edit." />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CAPS.map((c, i) => (
            <div key={c.title} className="flex min-h-[200px] flex-col gap-3 bg-[#0C0D15] p-8">
              <span className="mono-label">0{i + 1}</span>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{c.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-soft">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto box-border flex max-w-[1440px] flex-col gap-10 px-6 lg:px-10 pb-24 md:pb-28">
        <SectionHead eyebrow="TC 00:03 — WHO IT'S FOR" title="Built for teams shipping video every week." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Link
            href="/ai-video-editor-for-production-houses"
            className="flex min-h-60 flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-8 text-ink transition-colors hover:border-wine-line"
          >
            <span className="mono-label">01</span>
            <span className="text-2xl font-semibold tracking-[-0.02em]">Production houses</span>
            <span className="text-[15px] leading-relaxed text-soft">Faster client-ready cuts, with several projects running in parallel.</span>
            <span className="mt-auto text-[15px] font-medium text-red">For production houses →</span>
          </Link>
          <div className="flex min-h-60 flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-8">
            <span className="mono-label">02</span>
            <span className="text-2xl font-semibold tracking-[-0.02em]">Creator teams</span>
            <span className="text-[15px] leading-relaxed text-soft">Daily publish-ready videos, without a dedicated editor for every format.</span>
          </div>
          <div className="flex min-h-60 flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-8">
            <span className="mono-label">03</span>
            <span className="text-2xl font-semibold tracking-[-0.02em]">Agencies</span>
            <span className="text-[15px] leading-relaxed text-soft">Faster client delivery, with captions, grading and lip sync in the same pass.</span>
          </div>
        </div>
      </section>

      {/* TWO PANELS */}
      <Band>
        <Wrap className="grid grid-cols-1 gap-5 py-24 md:grid-cols-2 md:py-28">
          <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-8 md:p-10">
            <span className="eyebrow">TC 00:04 — PRODUCTION TEAMS</span>
            <h2 className="m-0 text-[34px] leading-[1.1] font-semibold tracking-[-0.03em]">Built for production teams.</h2>
            <p className="m-0 text-base leading-[1.65] text-soft">
              Multiple cameras, long shoots and parallel projects are the starting point, not an edge case. Broll handles
              the volume so your editors start from a built story.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="chip">4+ cameras</span>
              <span className="chip">Long shoots</span>
              <span className="chip">Parallel projects</span>
            </div>
            <div className="mt-auto">
              <ArrowLink href="/ai-video-editor-for-production-houses">AI video editor for production houses</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-8 md:p-10">
            <span className="eyebrow">TC 00:05 — NO LOCK-IN</span>
            <h2 className="m-0 text-[34px] leading-[1.1] font-semibold tracking-[-0.03em]">Never locked in.</h2>
            <p className="m-0 text-base leading-[1.65] text-soft">
              Every edit exports as standard timeline XML, so your finishing editors keep working in the NLE they already use.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[13px]">
              {[
                ["ep42_reel_v1.xml", "Premiere Pro", true],
                ["ep42_reel_v1.xml", "DaVinci Resolve", false],
                ["ep42_reel_v1.fcpxml", "Final Cut Pro", false],
              ].map(([f, app, hot]) => (
                <div key={app as string} className="flex justify-between gap-3 rounded-lg bg-[#181A27] px-3.5 py-2.5">
                  <span className="truncate">{f}</span>
                  <span className={hot ? "text-red" : "text-soft"}>{app}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-5">
              <ArrowLink href="/about">About Broll</ArrowLink>
              <ArrowLink href="/ai-video-editor">How the editor works</ArrowLink>
            </div>
          </div>
        </Wrap>
      </Band>

      <Faq eyebrow="TC 00:06 — FAQ" heading="Broll, in full." items={PRODUCT_FAQS} />
      <CtaBand heading="Raw footage in. A first cut out." secondaryLabel="Read how it works" secondaryHref="/ai-video-editor" />
    </PageShell>
  );
}
