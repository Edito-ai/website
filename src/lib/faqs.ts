// Single source for each page's visible FAQ section and its FAQPage JSON-LD —
// Google requires the structured data to match on-page content exactly.
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  { q: "What is Broll?", a: "Broll is an agentic AI video editor. Upload raw footage, describe the video you want, and it builds the cut, captions, color grade and export." },
  { q: "How does Broll find the right moments?", a: "It indexes your footage frame by frame into a searchable map of what is said and what is shown, then picks the moments that match your brief." },
  { q: "Can Broll edit in the style of an existing video?", a: "Yes. Share a reference video and Broll applies the same template to your new footage: pacing, caption style, layout and look." },
  { q: "Can Broll clip YouTube videos and streams?", a: "Yes. Paste a YouTube link and Broll finds the strongest moments and cuts them into captioned short clips. Use it for videos you own or have the rights to use." },
  { q: "Which editors can I export to?", a: "A finished MP4, or a timeline XML that opens in Premiere Pro, DaVinci Resolve and Final Cut Pro." },
  { q: "Does it do captions and lip sync?", a: "Yes. Styled auto-captions that stay synced as the edit changes, and AI lip sync for dubbing into other languages." },
  { q: "Who is Broll for?", a: "Production houses, creator teams, podcasts, real estate, and brands and agencies shipping video every week." },
  { q: "How do I get started?", a: "Download Broll for Windows or Mac from trybroll.com/download, then sign in with your email. You can also use Chat at chat.trybroll.com in your browser." },
  { q: "Which platforms does Broll run on?", a: "There are desktop apps for Windows (64-bit) and Apple Silicon Macs, and a DaVinci Resolve plugin for Mac and Windows. Broll Chat is also live on the web." },
  { q: "How is Broll different from B-roll generators?", a: "B-roll generators add supplementary clips to an edit you already made. Broll is the editor itself, starting from raw footage." },
  { q: "How much does Broll cost?", a: "Pricing will be announced soon." },
];

export const PRODUCT_FAQS: Faq[] = [
  { q: "Can Broll edit in the style of an existing video?", a: "Yes. Share a reference video and Broll applies the same template to your new footage: pacing, caption style, layout and look." },
  { q: "Can Broll clip YouTube videos and streams?", a: "Yes. Paste a YouTube link and Broll cuts the strongest moments into captioned short clips. Use it for videos you own or have the rights to use." },
  { q: "Is Broll AI video editing software?", a: "Yes. Specifically, it is an agentic editor: it makes editorial decisions, not just one automated step." },
  { q: "What is an agentic AI video editor?", a: "One that makes its own editorial choices, such as which moments to use and how to pace them, rather than only automating steps you set up." },
  { q: "How does AI video editing work with Broll?", a: "Upload your footage, describe the video, and receive a finished video or an XML timeline." },
  { q: "Can AI edit raw, unorganized footage?", a: "Yes. Broll needs no manual logging or pre-selection of clips." },
  { q: "How is this different from auto-captioners or template editors?", a: "Those handle one step. Broll also finds the moments and builds the story." },
  { q: "Does it export to Premiere Pro, DaVinci Resolve or Final Cut?", a: "Yes, via standard timeline XML." },
  { q: "Which platforms does Broll run on?", a: "There are desktop apps for Windows (64-bit) and Apple Silicon Macs, and a DaVinci Resolve plugin for Mac and Windows. Broll Chat is also live on the web." },
];

export const PRICING_FAQS: Faq[] = [
  { q: "How much will Broll cost?", a: "Pricing is still being finalized and will be announced soon." },
  { q: "Can I use Broll before pricing is announced?", a: "Yes. Download Broll for Windows or Mac, or use Chat at chat.trybroll.com, and start right away." },
  { q: "Will there be plans for different kinds of teams?", a: "We are planning options for creator teams, production houses and agencies. Details are TBD." },
  { q: "Will it be a subscription or usage-based?", a: "TBD. We will share the details when pricing is announced." },
  { q: "Are the Windows, Mac and Resolve apps available?", a: "Yes. You can download all three from the product page. The Mac app needs an Apple Silicon Mac." },
];

export const ABOUT_FAQS: Faq[] = [
  { q: "What is Broll?", a: "Broll is an agentic AI video editor that turns raw footage into publish-ready videos." },
  { q: "What is trybroll.com?", a: "The official website for Broll." },
  { q: "Is Broll a B-roll generator?", a: "No. Broll is a full agentic editor, not a tool that inserts supplementary clips into an existing edit." },
];

export const AI_VIDEO_EDITOR_FAQS: Faq[] = [
  { q: "Is Broll AI video editing software?", a: "Yes. It is an agentic AI video editor that makes editorial decisions on your footage." },
  { q: "What is an agentic AI video editor?", a: "An editor that makes its own editorial choices, such as which moments to use and in what order, instead of only automating a step." },
  { q: "How does the workflow work, from upload to export?", a: "Upload footage, describe the video, review the first cut, then export an MP4 or a timeline XML." },
  { q: "Can it handle unorganized raw footage?", a: "Yes. No logging or pre-selection is needed." },
  { q: "How is it different from auto-captioners and template tools?", a: "Those handle one step on clips you chose. Broll finds the moments and builds the story too." },
  { q: "Does it work with Premiere Pro, DaVinci Resolve and Final Cut Pro?", a: "Yes, via standard timeline XML export." },
];

export const COMPARISON_FAQS: Faq[] = [
  { q: "What’s the difference?", a: "A B-roll generator is a feature. Broll is the editor itself." },
  { q: "Why does Broll sound like “b-roll”?", a: "It’s a naming coincidence, not the same category of product." },
  { q: "Can a B-roll generator replace a full edit?", a: "No. Those tools assume the main cut is already done." },
  { q: "Does Broll do what B-roll generators do?", a: "Yes. It surfaces matching b-roll as part of its edit pass." },
];

export const PRODUCTION_HOUSES_FAQS: Faq[] = [
  { q: "Can Broll scale to production-house volume?", a: "Yes. It is built for multiple cameras, long shoots and parallel projects." },
  { q: "Does it fit into our existing pipeline?", a: "Yes. Export timeline XML for Premiere Pro, DaVinci Resolve or Final Cut Pro today. There is also a DaVinci Resolve plugin." },
  { q: "Does AI replace our editors?", a: "No. Broll does the first pass; your editors keep creative control of the final cut." },
  { q: "How much time does it save?", a: "It depends on footage volume and cut complexity." },
];

export const AI_VS_MANUAL_FAQS: Faq[] = [
  { q: "Is AI editing better than manual editing?", a: "It depends on the goal. Combining both works best: AI for the upstream hours, people for the judgment calls." },
  { q: "What does AI save time on?", a: "Watching, logging and searching for moments, plus assembling the first cut." },
  { q: "Does AI replace editors?", a: "No. Editors keep tone, brand voice and the final sign-off." },
  { q: "Can I edit an AI cut by hand?", a: "Yes. Export a timeline XML and continue in Premiere Pro, DaVinci Resolve or Final Cut Pro." },
  { q: "What is agentic AI video editing?", a: "Editing where the AI makes editorial decisions itself, not just one automated step." },
  { q: "Who uses it?", a: "Production houses and creator teams." },
];
