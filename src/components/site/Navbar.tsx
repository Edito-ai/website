"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import CtaLink from "@/components/ui/CtaLink";
import BrollLogo from "@/components/site/BrollLogo";

// Absolute anchors so they work from every page, not just the homepage.
const links = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock the page behind the mobile menu; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        style={{ top: "var(--annbar-offset, 0px)" }}
        className="fixed inset-x-0 z-50 transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between px-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8",
            scrolled
              ? "mt-3 h-14 max-w-5xl rounded-full border border-line bg-[#0b0c15]/75 shadow-[var(--shadow-lift)] backdrop-blur-xl max-md:mx-3"
              : "h-20 max-w-6xl",
          )}
        >
          <Link href="/" aria-label="Broll home" className="group/logo flex items-center gap-2.5">
            <BrollLogo className="size-7 text-ink transition-[color,transform,filter] duration-500 group-hover/logo:-rotate-6 group-hover/logo:text-red group-hover/logo:drop-shadow-[0_0_12px_var(--red)]" />
            <span aria-hidden className="font-wordmark text-[15px] uppercase">
              Broll
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-draw flex items-center gap-1.5 text-sm",
                    active ? "text-ink" : "text-ink-2/70",
                  )}
                >
                  {active && (
                    <span className="size-1.5 rounded-full bg-red shadow-[0_0_8px_var(--red)]" />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <CtaLink href="/early-access" size="sm" className="max-sm:hidden">
              Get early access
            </CtaLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-line transition-colors hover:border-red/60 md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-4 bg-ink transition-transform duration-500",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-ink transition-transform duration-500",
                  open ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — full-screen, the film's dark field behind big type */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pt-28 pb-10 md:hidden"
          >
            <div aria-hidden className="hero-glow absolute inset-0" />
            <nav aria-label="Mobile" className="relative flex flex-col">
              {[...links, { href: "/early-access", label: "Get early access" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-line py-5"
                  >
                    <span className="slate">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-4xl transition-colors duration-300 group-hover:text-red">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="slate relative mt-auto">trybroll.com · Your AI editing partner</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
