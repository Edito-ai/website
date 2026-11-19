"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CHAT_URL } from "@/components/v2/ui";
import BrandLockup from "@/components/v2/BrandLockup";

const links = [
  { href: "/product", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function ChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line-2 bg-bg/90 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto box-border flex max-w-[1440px] flex-wrap items-center gap-x-7 gap-y-2 px-6 py-3 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-10"
      >
        <Link href="/" aria-label="Broll home" className="flex min-h-11 items-center justify-self-start">
          <BrandLockup />
        </Link>

        <div className="hidden flex-wrap justify-center gap-0.5 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] font-medium transition-colors",
                  active ? "bg-[#181A27] text-ink" : "text-soft hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 justify-self-end md:ml-0">
          <a href={CHAT_URL} className="btn btn-primary btn-sm min-h-10 gap-2 px-4 text-sm sm:min-h-11 sm:px-[18px] sm:text-[15px]">
            <ChatIcon />
            <span className="sm:hidden">Chat</span>
            <span className="hidden sm:inline">Chat with Broll</span>
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-10 cursor-pointer items-center justify-center rounded-full border border-line-strong md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-ink transition-transform",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-ink transition-transform",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </div>

        {open && (
          <div id="mobile-menu" className="col-span-full flex w-full flex-col border-t border-line-2 pt-2 pb-3 md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line-2 text-lg font-medium text-ink"
              >
                {l.label}
              </Link>
            ))}
            <a href={CHAT_URL} className="btn btn-primary mt-4 gap-2">
              <ChatIcon />
              Chat with Broll
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
