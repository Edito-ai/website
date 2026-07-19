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
