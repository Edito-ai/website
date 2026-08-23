import { FAQS } from "@/lib/faqs";
import { BLOG_POSTS } from "@/lib/blogPosts";
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

${SITE_NAME} is an agentic AI video editor and AI video editing software at
${SITE_URL}. You upload raw footage and describe the video you want;
${SITE_NAME} watches and indexes every frame, finds the moments, builds the
story, cuts the edit, writes captions, grades color, lip syncs across
languages, and exports a publish-ready video — without manual timeline work.
An eight-hour edit becomes about twelve minutes.

Not to be confused with: a "B-roll generator." B-roll generators add
supplementary footage to an edit you've already made. ${SITE_NAME} is the
editor itself — it builds the entire finished video from raw footage. See
${SITE_URL}/broll-vs-b-roll-generators for the full comparison.

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
- [AI Video Editor](${SITE_URL}/ai-video-editor): how the agentic AI video editor works
- [AI Video Editor for Production Houses](${SITE_URL}/ai-video-editor-for-production-houses): fit for production teams and pipelines
- [Broll vs. B-Roll Generators](${SITE_URL}/broll-vs-b-roll-generators): disambiguation from B-roll generator tools
- [About](${SITE_URL}/about): what Broll is, who it's for, why it's different
- [Blog](${SITE_URL}/blog): guides on agentic editing, video search and production workflows
- [Book a demo](${SITE_URL}/demo): free demo request, no card required, set up within 24 hours
- [Privacy](${SITE_URL}/privacy)
- [Terms](${SITE_URL}/terms)

## Blog posts

${BLOG_POSTS.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`).join("\n")}

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
