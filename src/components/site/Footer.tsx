import BrollLogo from "@/components/site/BrollLogo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "FAQ", href: "/#faq" },
      { label: "Get a demo", href: "/#demo" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: "/demo" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-dark-line bg-dark-bg pt-20 pb-10 text-dark-ink"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col justify-between gap-14 md:flex-row">
          <BrollLogo className="size-28 shrink-0 text-dark-ink md:size-36" />

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-xs tracking-widest text-dark-muted uppercase">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-dark-muted transition-colors hover:text-dark-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center border-t border-dark-line pt-8 md:justify-start">
          <p className="font-mono text-xs text-dark-muted">
            © {new Date().getFullYear()} Broll. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
