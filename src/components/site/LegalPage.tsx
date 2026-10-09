import type { CSSProperties, ReactNode } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import PageHero, { PageBody } from "@/components/site/PageHero";

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
      <main>
        <PageHero eyebrow={eyebrow} title={title} cta={null} meta={<>Last updated · {updated}</>} />
        <PageBody>{children}</PageBody>
      </main>
      <Footer />
    </div>
  );
}
