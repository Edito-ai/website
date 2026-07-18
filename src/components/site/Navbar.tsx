"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

const links = [
  { href: "#how", label: "How it thinks" },
  { href: "#features", label: "Features" },
  { href: "#why", label: "Why Broll" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-500 md:px-8",
          scrolled &&
            "mt-3 max-w-4xl rounded-full border border-line bg-surface/70 py-2.5 shadow-sm backdrop-blur-xl",
        )}
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Broll
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <Button size="md">Start Creating</Button>
      </div>
    </motion.header>
  );
}
