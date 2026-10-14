import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Check, Monitor, MousePointerClick, UserRound, Wrench } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/fx/Reveal";
import DownloadButton from "@/components/site/DownloadButton";
import CtaLink from "@/components/ui/CtaLink";
import { INSTALLER, breadcrumbJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download Broll for DaVinci Resolve",
  description:
    "Download the Broll plugin for DaVinci Resolve Studio on Windows. One installer, a free credit when you sign up, and updates that arrive by themselves.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download Broll for DaVinci Resolve",
    description: "One Windows installer. Broll opens as a chat panel inside DaVinci Resolve Studio.",
    url: "/download",
  },
};

const STEPS = [
  {
    icon: Wrench,
    title: "Run the installer",
    body: "Double-click the file and follow the prompts. It needs administrator rights because Resolve reads plugins from a system folder.",
  },
  {
    icon: Monitor,
    title: "Turn on scripting, once",
    body: (
      <>
        In Resolve: <strong>Preferences › System › General › External scripting using</strong> set to{" "}
        <strong>Local</strong>, then Save. On Resolve 19 it sits under Preferences › General.
      </>
    ),
  },
  {
    icon: MousePointerClick,
    title: "Open Broll inside Resolve",
    body: (
      <>
        <strong>Workspace › Workflow Integrations › Broll AI</strong>. It opens as a chat panel next to your timeline.
      </>
    ),
  },
  {
    icon: UserRound,
    title: "Create your account",
    body: "Name, email and phone number, then the 6-digit code we email you. Your free credit is added straight away.",
  },
];

const REQUIREMENTS = [
  "Windows 10 or 11, 64-bit",
  "DaVinci Resolve Studio 19 (the free edition does not allow plugins)",
  "An internet connection: Broll's AI runs in the cloud",
];

export default function DownloadPage() {
  return (
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("Download", "/download")),
        }}
      />
      <Navbar />
      <main className="relative isolate overflow-hidden">
        <div aria-hidden className="hero-glow absolute inset-x-0 top-0 -z-10 h-[640px]" />
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-36 pb-16 sm:px-8 md:pt-44 md:pb-20">
          <Reveal y={12}>
            <p className="text-sm font-medium text-red">Download · Windows · Free credit included</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,4.5rem)] text-balance">
              Put Broll inside <span className="serif-voice text-brand">DaVinci Resolve</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2/75">
              Ask for a cut, captions, a grade or an export in plain words and watch it happen on your own
              timeline. One installer, no setup scripts.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="band-border mt-12 rounded-[1.5rem] p-px">
              <div className="flex flex-col items-start gap-8 rounded-[calc(1.5rem-1px)] bg-surface p-7 sm:p-9 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="slate">Broll AI for DaVinci Resolve</p>
                  <p className="font-display mt-3 text-2xl sm:text-3xl">Windows installer</p>
                  <p className="mt-2 text-sm text-muted">
                    Version {INSTALLER.version} · {INSTALLER.sizeLabel} · .exe · 64-bit
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <DownloadButton href={INSTALLER.url}>Download for Windows</DownloadButton>
                  <p className="text-xs text-muted">macOS and Linux are not supported yet.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Steps */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
            <Reveal>
              <p className="text-sm font-medium text-red">Set up</p>
              <h2 className="font-display mt-4 max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] text-balance">
                Four steps, about five minutes.
              </h2>
            </Reveal>

            <ol className="mt-12 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <li key={s.title} className="min-w-0">
                  <Reveal delay={i * 0.06}>
                    <div className="panel panel-hover h-full p-7">
                      <div className="flex items-center justify-between">
                        <span className="flex size-11 items-center justify-center rounded-full border border-line bg-white/[0.03]">
                          <s.icon aria-hidden className="size-5 text-red" />
                        </span>
                        <span className="slate">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="font-display mt-6 text-xl">{s.title}</h3>
                      <p className="mt-3 leading-relaxed text-ink-2/75 [&_strong]:font-medium [&_strong]:text-ink">
                        {s.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Requirements + updates */}
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-6xl min-w-0 gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-24">
            <div className="min-w-0">
              <h2 className="font-display text-2xl">What you need</h2>
              <ul className="mt-6 space-y-3">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-ink-2/80">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-red" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl">Stays up to date</h2>
              <p className="mt-6 leading-relaxed text-ink-2/80">
                When a new version is ready, a banner inside the plugin offers{" "}
                <strong className="font-medium text-ink">Update now</strong>. One click, no reinstalling.
              </p>
              <p className="mt-4 leading-relaxed text-ink-2/80">
                Stuck on anything? Write to{" "}
                <a
                  href="mailto:hello@trybroll.com"
                  className="text-ink underline decoration-red/60 underline-offset-4 transition-colors hover:text-red"
                >
                  hello@trybroll.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Closing nudge */}
        <section className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
            <p className="font-display max-w-xl text-2xl text-balance">
              Not on Resolve Studio yet? See what Broll does first.
            </p>
            <CtaLink href="/product" variant="ghost">
              Explore the product
            </CtaLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
