import Image from "next/image";
import Link from "next/link";
import BrandLockup from "@/components/v2/BrandLockup";
import { CHAT_URL } from "@/components/v2/ui";

const COLUMNS = [
  {
    title: "PRODUCT",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Broll Chat · Live", href: CHAT_URL },
      { label: "Windows app · Soon", href: "/product#windows" },
      { label: "Mac app · Soon", href: "/product#mac" },
      { label: "Resolve plugin · Soon", href: "/product#resolve" },
      { label: "AI Video Editor", href: "/ai-video-editor" },
      { label: "For Production Houses", href: "/ai-video-editor-for-production-houses" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "COMPARE",
    links: [
      { label: "Broll vs. B-Roll Generators", href: "/broll-vs-b-roll-generators" },
      { label: "AI vs. Manual Editing", href: "/ai-editing-vs-manual-editing" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Chat", href: CHAT_URL },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const linkCls = "flex min-h-9 items-center text-[15px] text-ink-2 transition-colors hover:text-red";

export default function Footer() {
  return (
    <footer id="contact" className="w-full overflow-hidden border-t border-line-2 bg-bg">
      <div className="mx-auto box-border flex max-w-[1440px] flex-col gap-12 px-6 lg:px-10 pt-16 pb-8">
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-[2_1_280px] flex-col gap-4">
            <Link href="/" aria-label="Broll home" className="flex min-h-11 items-center">
              <BrandLockup />
            </Link>
            <p className="m-0 max-w-[300px] text-[15px] leading-relaxed text-soft">
              The agentic AI video editor. Raw footage in, a finished first cut out.
            </p>
            <span className="self-start rounded-full border border-line px-3 py-1.5 font-mono text-xs text-soft">
              Chat live · Apps coming soon
            </span>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title} className="flex flex-[1_1_160px] flex-col gap-1">
              <h2 className="mt-0 mb-2 font-mono text-xs font-medium tracking-[0.04em] text-muted">{c.title}</h2>
              {c.links.map((l) =>
                l.href.startsWith("http") ? (
                  <a key={l.label} href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
        <Image
          src="/brand/broll-wordmark.png"
          alt=""
          aria-hidden
          width={1473}
          height={406}
          className="block h-auto w-full opacity-[0.07]"
        />
        <div className="flex flex-wrap justify-between gap-3 border-t border-line-2 pt-5 text-[13px] text-muted">
          <span>© {new Date().getFullYear()} Broll. All rights reserved.</span>
          <span className="font-mono">trybroll.com</span>
        </div>
      </div>
    </footer>
  );
}
