"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import BrollLogo from "@/components/site/BrollLogo";
import Magnetic from "@/components/fx/Magnetic";

// Absolute anchors so they work from /demo as well as the homepage.
const links = [
  { href: "/#features", label: "Product" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{ top: "var(--annbar-offset, 40px)" }}
      className="fixed inset-x-0 z-40 transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 py-4 transition-all duration-500 sm:px-6 md:px-8",
          // Transparent at rest; glass only once scrolling begins.
          scrolled &&
            "mx-3 mt-3 max-w-4xl rounded-full border border-line bg-surface/70 py-2.5 shadow-sm backdrop-blur-xl md:mx-auto",
        )}
      >
        <Link href="/" aria-label="Broll home" className="group/logo">
          <Magnetic strength={0.25}>
            <motion.span
              whileHover={{ rotate: 5, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="block text-ink transition-[filter] duration-500 group-hover/logo:drop-shadow-[0_0_10px_var(--accent)]"
            >
              <BrollLogo className="size-[34px]" />
            </motion.span>
          </Magnetic>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="md" onClick={() => router.push("/demo")}>
            Book Demo
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:text-accent md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-3 mt-2 rounded-2xl border border-line bg-surface/90 p-2 shadow-[var(--shadow-lift)] backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
