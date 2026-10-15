import Link from "next/link";
import BrollLogo from "@/components/site/BrollLogo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "AI Video Editor", href: "/ai-video-editor" },
      { label: "For Production Houses", href: "/ai-video-editor-for-production-houses" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "Broll vs. B-Roll Generators", href: "/broll-vs-b-roll-generators" },
      { label: "AI vs. Manual Editing", href: "/ai-editing-vs-manual-editing" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Get early access", href: "/early-access" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-dark-bg">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" aria-label="Broll home" className="group inline-flex items-center gap-2.5">
              <BrollLogo className="size-8 text-ink transition-colors duration-500 group-hover:text-red" />
              <span className="font-wordmark text-lg uppercase">Broll</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              The agentic AI video editor. Raw footage in, a finished first cut out.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-ink">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted transition-colors duration-300 hover:text-red">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Broll. All rights reserved.</p>
          <p>Backed by Google for Startups</p>
        </div>
      </div>
    </footer>
  );
}
