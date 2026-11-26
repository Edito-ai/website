"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CHAT_URL, DownloadIcon } from "@/components/v2/ui";
import BrandLockup from "@/components/v2/BrandLockup";

const links = [
  { href: "/product", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Reading progress + condensed state. One rAF per frame at most.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      barRef.current?.style.setProperty("--p", String(p));
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-500",
        scrolled
          ? "border-line-2 bg-bg/75 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-bg/40 backdrop-blur-md",
      )}
    >
      <div ref={barRef} aria-hidden className="scroll-progress pointer-events-none absolute inset-x-0 -bottom-px h-[2px]" />
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto box-border flex max-w-[1440px] flex-wrap items-center gap-x-2 gap-y-2 px-4 transition-[padding] duration-500 sm:gap-x-7 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-10",
          scrolled ? "py-2" : "py-3",
        )}
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
          <a
            href={CHAT_URL}
            className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] font-medium text-soft transition-colors hover:text-ink"
          >
            Chat
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1.5 justify-self-end sm:gap-2 md:ml-0">
          <Link
            href="/download"
            aria-current={pathname === "/download" ? "page" : undefined}
            className="btn btn-primary btn-sm min-h-10 gap-1.5 px-3 text-sm shadow-[0_0_0_4px_rgba(190,30,52,0.18),0_10px_30px_-8px_rgba(190,30,52,0.85)] sm:min-h-11 sm:gap-2 sm:px-[22px] sm:text-[15px]"
          >
            <DownloadIcon />
            Download
          </Link>
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
            <a href={CHAT_URL} className="flex min-h-12 items-center border-b border-line-2 text-lg font-medium text-ink">
              Chat
            </a>
            <Link href="/download" onClick={() => setOpen(false)} className="btn btn-primary mt-4 gap-2">
              <DownloadIcon />
              Download Broll
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
