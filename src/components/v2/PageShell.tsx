import type { ReactNode } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

/** Nav + main + footer, with the page's JSON-LD. */
export default function PageShell({ jsonLd, children }: { jsonLd?: object; children: ReactNode }) {
  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <Navbar />
      <main className="overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
