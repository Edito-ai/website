// Single source of truth for absolute URLs (metadata, sitemap, JSON-LD).
// Set NEXT_PUBLIC_SITE_URL to the production domain when deploying.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Broll";

export const SITE_TAGLINE =
  "The AI editor that finishes videos before you do.";

export const SITE_DESCRIPTION =
  "From raw footage to publish-ready videos. Broll understands every frame, builds the story, edits, captions, color grades and exports — without timelines.";
