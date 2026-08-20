// Single source for the visible FAQ section and the FAQPage JSON-LD —
// Google requires the structured data to match on-page content exactly.
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What is Broll?",
    a: "Broll is an agentic AI video editor. You hand it raw footage, and it builds the story, cuts the edit, writes captions, grades color and exports a publish-ready video — no timeline work required.",
  },
  {
    q: "How does Broll find the right moments in my footage?",
    a: "Broll watches and indexes every frame, so it can search your footage the way you'd search text — surface the best takes, find b-roll that matches the story, and put the right clip in the right place.",
  },
  {
    q: "Can I open Broll's edits in Premiere Pro, DaVinci Resolve or Final Cut?",
    a: "Yes. Broll exports a standard timeline XML, so you can take any edit into Premiere Pro, DaVinci Resolve or Final Cut Pro and keep cutting exactly where the agent left off.",
  },
  {
    q: "Does Broll handle captions, color grading and lip sync?",
    a: "Yes — captions, AI color grading and lip sync across languages are part of the same pass. The goal is a video you can publish, not a rough assembly.",
  },
  {
    q: "Who uses Broll?",
    a: "Production houses and creator teams — including teams behind 200M+ monthly views — use Broll to turn an eight-hour edit into about twelve minutes.",
  },
  {
    q: "How do I get started?",
    a: "Claim a free demo below — tell us about your team and we'll set Broll up for you within 24 hours. No card required.",
  },
];

export const ABOUT_FAQS: Faq[] = [
  {
    q: "What is Broll?",
    a: "Broll is an agentic AI video editor that turns raw footage into finished videos. It understands your footage, finds the moments, builds the story, edits the timeline, writes captions, grades color, lip syncs and exports — without manual timeline work.",
  },
  {
    q: "What is trybroll.com?",
    a: "trybroll.com is the official website of Broll. It's where you can learn about the product and request a free demo — there is no other official Broll site.",
  },
];

export const AI_VIDEO_EDITOR_FAQS: Faq[] = [
  {
    q: "What is an agentic AI video editor?",
    a: "An agentic AI video editor doesn't just apply automation to footage you've already selected — it makes the editorial decisions itself. Broll watches your raw footage, understands what's in it, finds the moments that matter, and builds the story, rather than handing you a set of tools to apply by hand.",
  },
  {
    q: "How does AI video editing work with Broll?",
    a: "You upload raw footage and describe the video you want. Broll indexes every frame, finds the relevant moments, builds the story, edits the timeline, writes captions, grades color and lip syncs across languages — then exports a publish-ready video or a timeline XML.",
  },
  {
    q: "Can AI really edit raw, unorganized footage?",
    a: "Yes. Broll is built to start from raw footage — multiple cameras, mismatched audio, hours of unlabeled clips — with no manual logging or pre-selecting required. That's the difference between an agentic editor and a tool that automates one step of a workflow you've already set up.",
  },
  {
    q: "How is this different from automated video editing tools like auto-captioners or template editors?",
    a: "Most automated video editing tools apply one step — captions, a filter, a template — to clips you've already chosen. Broll's agent does the upstream work too: it finds the moments and builds the story, then handles captions, color and lip sync as part of the same pass.",
  },
  {
    q: "Does Broll's AI video editor export to Premiere Pro, DaVinci Resolve or Final Cut?",
    a: "Yes. Every edit can be exported as a standard timeline XML, so editors can open it in Premiere Pro, DaVinci Resolve or Final Cut Pro and keep working exactly where the agent left off.",
  },
];

export const PRODUCTION_HOUSES_FAQS: Faq[] = [
  {
    q: "Can production houses use AI video editing at scale?",
    a: "Yes. Broll is built for the volume production teams actually work with — multiple cameras, long shoots, several projects in parallel — not single clips. Production houses use Broll to move from raw footage to a client-ready cut without a full manual assembly pass on every project.",
  },
  {
    q: "Does Broll fit into an existing post-production pipeline?",
    a: "Yes. Broll exports a standard timeline XML that opens in Premiere Pro, DaVinci Resolve or Final Cut Pro, so your finishing editors keep working in the tools they already use — Broll handles the first pass, not a replacement for your pipeline.",
  },
  {
    q: "Does AI editing replace our editors?",
    a: "No — Broll removes the hours of watching, logging and assembling raw footage, and hands your editors a built story to review and finish. The creative judgment calls stay with your team.",
  },
  {
    q: "How much time does an AI video editor save a production team?",
    a: "In practice, an edit that took about eight hours by hand can take around twelve minutes of Broll's time before human review — the exact savings depend on footage volume and the complexity of the cut.",
  },
];
