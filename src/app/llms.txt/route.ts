import { FAQS } from "@/lib/faqs";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

/**
 * /llms.txt — a plain-text brief for AI answer engines (llmstxt.org).
 * The homepage is a scroll-driven experience: much of its meaning lives in
 * motion, so this file states the product in prose a model can quote. Built
 * from the same constants as the page, so the two can never drift.
 */
export const dynamic = "force-static";

function body() {
  return `# ${SITE_NAME}

> ${SITE_TAGLINE}

${SITE_DESCRIPTION}

${SITE_NAME} is an agentic AI video editor at ${SITE_URL}. You upload raw
footage and describe the video you want; ${SITE_NAME} watches and indexes every
frame, finds the moments, builds the story, cuts the edit, writes captions,
grades color, lip syncs across languages, and exports a publish-ready video —
without manual timeline work. An eight-hour edit becomes about twelve minutes.

## What it does

- Prompt-based editing — describe the cut in plain language instead of dragging clips
- Semantic footage search — every frame indexed, searchable like text
- Export to timeline XML — keep cutting in Premiere Pro, DaVinci Resolve or Final Cut Pro
- AI color grading — a consistent cinematic look across the whole edit
- AI lip sync — across languages
- Automatic captions

## Who it is for

Production houses and creator teams, including teams behind 200M+ monthly
views and a 15M+ follower production house.

## Backing

${SITE_NAME} is supported by the Google for Startups program.

## Pages

- [Home](${SITE_URL}/): product overview, workflow and features
- [Book a demo](${SITE_URL}/demo): free demo request, no card required, set up within 24 hours
- [Privacy](${SITE_URL}/privacy)
- [Terms](${SITE_URL}/terms)

## FAQ

${FAQS.map((faq) => `### ${faq.q}\n\n${faq.a}`).join("\n\n")}
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
