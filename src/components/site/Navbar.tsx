"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import BrollLogo from "@/components/site/BrollLogo";
import Magnetic from "@/components/fx/Magnetic";

// Absolute anchors so they work from /demo as well as the homepage.
const links = [
  { href: "/#features", label: "Product" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

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
          "mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-500 md:px-8",
          // Transparent at rest; glass only once scrolling begins.
          scrolled &&
            "mt-3 max-w-4xl rounded-full border border-line bg-surface/70 py-2.5 shadow-sm backdrop-blur-xl",
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

        <Button size="md" onClick={() => router.push("/demo")}>
          Book Demo
        </Button>
      </div>
    </motion.header>
  );
}
