// Single source of truth for absolute URLs (metadata, sitemap, JSON-LD).
// NEXT_PUBLIC_SITE_URL overrides for preview/staging deployments.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trybroll.com";

export const SITE_NAME = "Broll";

export const SITE_TAGLINE =
  "The AI editor that finishes videos before you do.";

export const SITE_DESCRIPTION =
  "From raw footage to publish-ready videos. Broll understands every frame, builds the story, edits, captions, color grades and exports — without timelines.";

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
