"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Edito", href: "/" },
  { label: "AccessWay", href: "/accessway" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink-950/80 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-linear-to-br from-violet-500/40 to-teal-500/40 text-sm font-bold">
            आ
          </span>
          <span className="text-lg font-semibold tracking-tight group-hover:text-white max-sm:hidden">
            Adarpan <span className="text-violet-400">Labs</span>
          </span>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center rounded-full bg-linear-to-r from-violet-600 to-purple-500 p-1 shadow-lg shadow-violet-600/30">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors sm:px-4 ${
                  active
                    ? "bg-white text-violet-950 shadow"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
