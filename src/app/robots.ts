import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Wildcard allow already covers every crawler, but AI answer engines are
 * named explicitly: their operators check for an explicit rule, and being
 * quotable in ChatGPT / Claude / Perplexity / AI Overviews is a distribution
 * channel we want. `host` declares the canonical hostname so the www and
 * non-www variants are not treated as two sites.
 */
const AI_CRAWLERS = [
  // OpenAI — training, search index, and live user fetches
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / AI Overviews (separate from Googlebot)
  "Google-Extended",
  // Apple Intelligence, Meta AI, Amazon, Common Crawl
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
