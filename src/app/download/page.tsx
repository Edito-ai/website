import type { Metadata } from "next";
import PageShell from "@/components/v2/PageShell";
import { ArrowLink, ArrowRight, CHAT_URL, Wrap } from "@/components/v2/ui";
import { APP_INSTALLERS, RESOLVE_INSTALLERS, type Installer } from "@/lib/downloads";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/site";

const TITLE = "Download Broll — Windows, Mac and DaVinci Resolve";
const DESCRIPTION =
  "Download Broll for Windows, Apple Silicon Macs, or the DaVinci Resolve Studio plugin for Mac and Windows. All installers on one page.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/download" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/download",
    images: ["/opengraph-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/download", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Download", "/download"),
  ],
};

const GROUPS = [
  { id: "desktop", title: "Desktop apps", items: APP_INSTALLERS },
  { id: "resolve", title: "DaVinci Resolve plugin", items: RESOLVE_INSTALLERS },
];

function InstallerCard({ item }: { item: Installer }) {
  return (
    <li
      id={item.id}
      className="flex scroll-mt-24 flex-col gap-4 rounded-[20px] border border-line bg-surface p-6 transition-colors hover:border-wine-line md:p-8"
    >
      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{item.name}</h3>
        <span className="mono-label">
          v{item.version} · {item.requires} · {item.size}
        </span>
      </div>
      <a href={item.href} rel="nofollow" className="btn btn-primary min-h-12 self-stretch px-[22px] text-[15px] sm:self-start">
        {item.label}
        <ArrowRight />
      </a>
      <p className="m-0 mt-auto text-sm leading-relaxed text-soft">{item.note}</p>
    </li>
  );
}

export default function DownloadPage() {
  return (
    <PageShell jsonLd={structuredData}>
      {/* A shorter intro than PageIntro, so the buttons show without much scrolling. */}
      <Wrap className="flex flex-col gap-10 pt-12 pb-24 md:pt-16 md:pb-28">
        <div className="flex max-w-[720px] flex-col gap-3.5">
          <span className="eyebrow">DOWNLOADS</span>
          <h1 className="h-section">
            Download <span className="text-red">Broll.</span>
          </h1>
          <p className="m-0 text-[17px] leading-relaxed text-soft md:text-lg">
            Every installer in one place. Pick your platform and the download starts.
          </p>
        </div>

        {GROUPS.map((g) => (
          <section key={g.id} aria-labelledby={`${g.id}-title`} className="flex flex-col gap-4">
            <h2 id={`${g.id}-title`} className="m-0 font-mono text-xs font-medium tracking-[0.04em] text-muted uppercase">
              {g.title}
            </h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
              {g.items.map((item) => (
                <InstallerCard key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-wine-line bg-surface-2 p-6 md:p-8">
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Nothing to install?</h2>
            <p className="m-0 text-[15px] text-soft">Broll Chat runs the full agent in your browser.</p>
          </div>
          <a href={CHAT_URL} className="btn btn-ghost min-h-12 text-[15px]">
            Open Chat
            <ArrowRight />
          </a>
        </div>

        <ArrowLink href="/product#compare">Not sure which one? Compare them</ArrowLink>
      </Wrap>
    </PageShell>
  );
}
