import type { CSSProperties, ReactNode } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export { default as LegalSection } from "@/components/site/ContentSection";

/** Shared shell for /privacy and /terms: quiet, readable, on-brand. */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  updated: string;
  children: ReactNode;
}) {
  return (
    // No announcement bar on legal pages, so the navbar sits flush at the top.
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pt-36 pb-28 md:pt-44">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-mono text-xs text-muted">Last updated: {updated}</p>
        <div className="mt-14">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
