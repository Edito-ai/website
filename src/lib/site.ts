// Single source of truth for absolute URLs (metadata, sitemap, JSON-LD).
// NEXT_PUBLIC_SITE_URL overrides for preview/staging deployments.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.trybroll.com";

export const SITE_NAME = "Broll";

export const SITE_TAGLINE =
  "The AI editor that finishes videos before you do.";

export const SITE_DESCRIPTION =
  "Transform raw footage into publish-ready videos automatically with Broll AI. Try the official timeline-free agentic AI video editor today.";

/** BreadcrumbList JSON-LD for a subpage (Home → page). */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

/** FAQPage JSON-LD for a subpage — must mirror the visible FAQ section exactly. */
export function faqPageJsonLd(faqs: { q: string; a: string }[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** WebPage (or AboutPage) JSON-LD tying a subpage back to the Organization/WebSite entities. */
export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}
