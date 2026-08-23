// Blog post registry — data-driven so BlogPost pages, the /blog index, and
// sitemap.ts all read from one source. Content sections render through the
// same ContentSection component the marketing pages use, so a post looks
// and behaves like the rest of the site, not a bolted-on CMS.
export interface BlogSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  publishedAt: string; // ISO date
  sections: BlogSection[];
  relatedSlugs?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-agentic-video-editing",
    title: "What Is Agentic Video Editing?",
    description:
      "Agentic video editing means an AI makes the editorial decisions itself — finding moments and building the story from raw footage, not just automating one step you've already set up.",
    eyebrow: "AI Editing",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "The short definition",
        paragraphs: [
          "Agentic video editing is when an AI system does the upstream editorial work itself — watching raw footage, deciding what matters, and building the cut — rather than applying one automated step (captions, a filter, a template) to footage you've already selected and organized.",
          "The word \"agentic\" is doing real work here: an agent acts toward a goal across multiple steps, not just executing a single function call. A prompt-based caption tool is automation. An agent that watches eight hours of unlabeled footage and decides what the video should be is agentic editing.",
        ],
      },
      {
        heading: "Automated editing vs. agentic editing",
        paragraphs: [
          "Most tools labeled \"AI video editing\" automate a single step of a workflow you've already set up by hand: auto-captions on clips you picked, a color filter, a template you fill in. That's genuinely useful, but it starts after the hardest part — watching the footage and deciding what belongs in the story — is already done.",
          "Agentic editing starts earlier. It begins with raw, unorganized footage — multiple cameras, mismatched audio, hours of unlabeled clips — and does the understanding work itself: finding the moments, sequencing them into a story, then handling captions, color and sound as part of the same pass.",
        ],
      },
      {
        heading: "What an agentic editor actually does",
        paragraphs: [
          "In practice, an agentic AI video editor like Broll indexes every frame of your raw footage so it can be searched the way you'd search text, finds the moments that match the story you describe, sequences them into a timeline, and finishes the pass with captions, color grading and lip sync — before you've touched a timeline yourself.",
        ],
        list: [
          "Understands raw, unlogged footage — no manual pre-selection required",
          "Makes the editorial decisions: what stays, what's cut, what order",
          "Finishes the pass: captions, color, lip sync, in one go",
          "Hands back a publish-ready video, or a standard timeline XML to keep refining",
        ],
      },
    ],
  },
  {
    slug: "ai-vs-manual-video-editing",
    title: "AI Video Editing vs. Manual Editing: What Actually Changes",
    description:
      "A practical comparison of AI video editing and manual editing — where AI genuinely saves time, where a human editor's judgment still matters, and how the two fit together.",
    eyebrow: "AI Editing",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "Where the time actually goes",
        paragraphs: [
          "Manual editing time is dominated less by cutting and more by watching: logging footage, scrubbing through hours of raw clips to find the usable moments, and re-watching takes to compare options. That upstream work — before a single cut is made — is where an agentic AI editor removes the most hours, because it watches and indexes footage in a fraction of the time a human review pass takes.",
        ],
      },
      {
        heading: "What AI handles well",
        paragraphs: ["AI-driven editing is strongest at the mechanical and repetitive layers of a cut:"],
        list: [
          "Finding specific moments across hours of unlabeled footage",
          "Assembling a first-pass story structure from raw material",
          "Captions, color-matching across cameras, and lip sync — consistent, repeatable work",
          "Exporting a standard timeline XML so a human editor can keep refining in Premiere Pro, DaVinci Resolve or Final Cut Pro",
        ],
      },
      {
        heading: "Where human judgment still matters",
        paragraphs: [
          "Tone, pacing choices tied to brand voice, and final creative sign-off are still a human call. The practical pattern that works: let the agent do the first pass — the hours of watching and structuring — and have an editor review, adjust and finish. That's not a replacement for editors; it's removing the part of the job that was never the creative part to begin with.",
        ],
      },
    ],
  },
  {
    slug: "semantic-video-search",
    title: "Semantic Video Search, Explained",
    description:
      "Semantic video search lets you find a moment in your footage by describing it in plain language, instead of scrubbing a timeline. Here's how it works and why it matters for editing.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "What semantic search means for video",
        paragraphs: [
          "Traditional footage search is keyword or filename search: you find a clip if it's labeled correctly. Semantic video search indexes what's actually happening in each frame — objects, actions, dialogue, on-screen context — so you can search your footage the way you'd search text: \"the moment she picks up the microphone,\" not \"clip_047.mp4.\"",
        ],
      },
      {
        heading: "Why this matters for editing speed",
        paragraphs: [
          "The slowest part of editing raw footage is usually finding the right moment across hours of unlabeled clips. When every frame is indexed and searchable by meaning, an editor — human or AI — can go straight to the moments that match a story, instead of scrubbing linearly through everything shot that day.",
          "This is also what makes agentic video editing possible in the first place: an AI editor can only build a story from raw footage if it can find the relevant moments in that footage first. Semantic search is the retrieval layer underneath the editorial decisions.",
        ],
      },
      {
        heading: "How Broll uses it",
        paragraphs: [
          "Broll watches and indexes every frame of your raw footage on import, so both the agent and, eventually, you can search it like text — surfacing the best takes, finding footage that matches a specific beat in the story, and placing the right clip in the right place without manual logging.",
        ],
      },
    ],
  },
  {
    slug: "find-b-roll-with-ai",
    title: "Finding B-Roll With AI (and How It's Different From an AI Editor)",
    description:
      "AI can help you find b-roll footage fast — but finding supplementary clips is a different job from editing a whole video. Here's the distinction, and how Broll's agentic editor relates to both.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "Two different jobs that sound like one",
        paragraphs: [
          "\"B-roll\" is supplementary footage — cutaways, establishing shots, context clips — layered into an edit that's already been built. \"Finding b-roll with AI\" usually means a tool that searches a footage library (yours or stock) and surfaces clips matching a topic, so you can drop them into a timeline you've already assembled.",
          "That's a genuinely useful, narrow job. It's a different job from editing a video end to end — which is what an agentic AI video editor does: starting from raw footage with no pre-built timeline, and producing the entire finished cut, not one supplementary layer of it.",
        ],
      },
      {
        heading: "Where the two overlap",
        paragraphs: [
          "An agentic editor's footage-understanding step naturally does b-roll-finding as part of a larger pass — when Broll indexes your raw footage and builds a story, it's already surfacing the clips that match each beat, including the supplementary shots a separate b-roll tool would search for on its own. You don't need a second tool for that layer if the editor already does the whole edit.",
        ],
      },
      {
        heading: "If you're searching for one and landing on the other",
        paragraphs: [
          "This naming overlap — \"b-roll\" the footage term vs. \"Broll\" the product — is common enough that it's worth stating directly: if you're looking for a full agentic video editor and keep finding tools that only insert supplementary clips, see the full breakdown on the Broll vs. B-roll generators page.",
        ],
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "search-inside-videos",
    title: "How to Search Inside Videos (Not Just Their Titles)",
    description:
      "Searching a video usually means searching its filename or description. Searching inside a video means finding the exact moment something happens. Here's the difference and how it works.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "Two different things people call \"video search\"",
        paragraphs: [
          "Most video search is metadata search: a filename, a title, a description, a tag someone typed in by hand. It finds the file. It can't tell you where in that file something happens, because nothing about the file's metadata describes its contents frame by frame.",
          "Searching inside a video means the system has actually looked at the footage — every frame, every line of dialogue, every on-screen action — and indexed what's there, so a query like \"the part where he explains the pricing\" returns a timestamp, not just a file.",
        ],
      },
      {
        heading: "Why this matters more as footage volume grows",
        paragraphs: [
          "A single interview is easy to scrub through by hand. Eight hours of raw multi-camera footage isn't. Once a library grows past what one person can hold in their head, metadata search stops being enough — you need the system to know what's inside the file, not just what it's called.",
          "This is the same capability that makes agentic editing possible: an AI can't build a story from raw footage unless it can first find the moments that belong in it. Search-inside-video is the retrieval step underneath the editorial one.",
        ],
      },
      {
        heading: "How Broll approaches it",
        paragraphs: [
          "Broll indexes every frame of your raw footage on import — objects, actions, dialogue, on-screen text — so you can search it the way you'd search a document, and the agent can find the moments it needs to build your edit without anyone logging footage by hand first.",
        ],
      },
    ],
    relatedSlugs: ["semantic-video-search", "video-indexing-explained"],
  },
  {
    slug: "ai-clip-finder",
    title: "AI Clip Finder: Finding Any Moment in Hours of Footage",
    description:
      "An AI clip finder locates a specific moment across hours of raw footage from a plain-language description, instead of you scrubbing through every clip by hand.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "What an AI clip finder actually does",
        paragraphs: [
          "An AI clip finder takes a description — \"the take where she laughs at the end,\" \"anywhere the product is shown from the side\" — and returns the matching moments across your entire footage library, not just one file. It works because the footage has already been indexed frame by frame, so the search happens against what's actually in the video, not a filename or folder structure.",
        ],
      },
      {
        heading: "Where it saves the most time",
        paragraphs: [
          "The value scales with footage volume. Finding one clip in twenty minutes of footage is a minor convenience. Finding the three usable takes of a line delivered across four hours of multi-camera footage, shot over several days, is the difference between a project that takes a day to assemble and one that takes a week.",
          "Clip finding is also the step that has to happen before any edit gets built — by a human or an AI. You can't cut a story from moments you haven't found yet.",
        ],
      },
      {
        heading: "Clip finding vs. full editing",
        paragraphs: [
          "A clip finder answers \"where is this moment\" and stops there — you still assemble what it returns. An agentic video editor like Broll does clip finding as one step inside a larger pass: it finds the moments, sequences them into a story, and finishes the edit with captions, color and sound, so you're not doing the assembly work the clip finder left behind.",
        ],
      },
    ],
    relatedSlugs: ["semantic-video-search", "find-b-roll-with-ai"],
  },
  {
    slug: "video-indexing-explained",
    title: "Video Indexing: How Machines Watch Footage",
    description:
      "Video indexing is what lets software search inside footage instead of just around it. Here's what actually gets indexed, and why it's the foundation of AI video editing.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "What indexing means for video",
        paragraphs: [
          "Indexing a video means processing it once, up front, to extract everything searchable inside it — so future queries don't require re-watching the footage from scratch. For text, that's building a lookup of words to documents. For video, it's building a representation of what's happening in each frame: objects, actions, on-screen text, and what's being said.",
        ],
      },
      {
        heading: "What actually gets indexed",
        paragraphs: [
          "A thorough index covers more than one signal, because a single moment can be found several different ways depending on what you remember about it:",
        ],
        list: [
          "Visual content — objects, actions, scenes, framing",
          "Spoken dialogue — what was said, and by whom",
          "On-screen text — captions, slides, graphics burned into the frame",
          "Structure — where one shot or scene ends and the next begins",
        ],
      },
      {
        heading: "Why indexing happens before editing, not during",
        paragraphs: [
          "If a system re-analyzed footage every time you searched it, search would be slow and editing would stall waiting on it. Indexing happens once, on import, so every later search — by you or by an AI agent building an edit — is instant. This is also why Broll indexes raw footage as soon as it's uploaded: the editorial work that follows, finding moments and building a story, depends on the index already being there.",
        ],
      },
    ],
    relatedSlugs: ["semantic-video-search", "video-embeddings-101"],
  },
  {
    slug: "natural-language-video-search",
    title: "Natural-Language Search for Video Libraries",
    description:
      "Natural-language video search lets you type a plain description of a moment and get the moment back, instead of guessing the right keyword or filename.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "The problem with keyword search on video",
        paragraphs: [
          "Keyword search works when someone has already labeled the thing you're looking for with the exact word you'd search. Video libraries rarely have that — footage gets named by date, camera, or project code, not by what's in the shot. So keyword search on a video library mostly searches metadata nobody wrote carefully.",
        ],
      },
      {
        heading: "What natural-language search changes",
        paragraphs: [
          "Instead of matching a keyword to a label, natural-language search matches the meaning of your query to the meaning of what's in the footage. You describe the moment the way you'd describe it to a colleague — \"the shot where the founder walks through the office\" — and the search works even though nobody ever typed that phrase anywhere.",
          "This only works if the footage has already been indexed for meaning, not just tagged. It's the same underlying capability as semantic video search, applied at the scale of a whole library instead of a single project.",
        ],
      },
      {
        heading: "Where this shows up in Broll",
        paragraphs: [
          "Broll indexes footage for meaning on import, so a plain-language description is enough to find the right moment — no tagging system to maintain, and no need to remember what something was called when it was shot.",
        ],
      },
    ],
    relatedSlugs: ["semantic-video-search", "search-inside-videos"],
  },
  {
    slug: "transcript-vs-visual-search",
    title: "Search Footage by What's Said vs. What's Shown",
    description:
      "Some moments are only findable by what's said out loud; others only by what's on screen. A footage search system needs both layers, not just a transcript.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "Two separate signals, two separate gaps",
        paragraphs: [
          "Transcript search finds a moment because of what someone said — useful for interviews, podcasts, and talking-head footage, but blind to anything silent: a reaction shot, an establishing shot, a product close-up. Visual search finds a moment because of what's on screen — useful for exactly the footage transcript search misses, but blind to spoken content that isn't visually distinctive.",
          "A tool that only does one of these will consistently miss moments that only exist in the other layer. \"Find the shot where he's nodding\" is invisible to transcript search. \"Find where she mentions the deadline\" is invisible to visual-only search.",
        ],
      },
      {
        heading: "Why both layers need to be indexed together",
        paragraphs: [
          "The moments that make an edit work are often a combination: what's being said, over what's being shown. Cutting a voiceover to the right visual, or finding a reaction to match a line of dialogue, requires the system to reason across both layers at once — not run two separate searches and merge the results by hand.",
        ],
      },
      {
        heading: "How Broll handles it",
        paragraphs: [
          "Broll indexes both dialogue and visual content for every clip, so a search or an editorial decision can draw on either signal — or both together — without you having to know in advance which one holds the moment you need.",
        ],
      },
    ],
    relatedSlugs: ["semantic-video-search", "video-indexing-explained"],
  },
  {
    slug: "video-embeddings-101",
    title: "Video Embeddings 101",
    description:
      "Embeddings are the underlying technique that makes semantic video search possible. Here's what they are, in plain terms, and why they matter for editing.",
    eyebrow: "Video Search",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "The plain-terms version",
        paragraphs: [
          "An embedding is a way of turning something — a frame, a sentence, a clip — into a list of numbers that captures its meaning, not its exact words or pixels. Two things that mean similar things end up with similar numbers, even if they look or sound completely different on the surface.",
          "That's what makes a search like \"the moment someone opens a gift\" work even if no clip is labeled that way: the system compares the meaning of your query to the meaning of each moment in the footage, not the literal text.",
        ],
      },
      {
        heading: "Why this beats keyword or tag-based search",
        paragraphs: [
          "Tags require someone to predict every way a moment might later be searched for, and label it that way in advance — which doesn't scale past a small library. Embeddings don't require prediction: the meaning is captured once, when the footage is indexed, and any later query gets compared against it, however it's phrased.",
        ],
      },
      {
        heading: "Where this fits into an AI editor",
        paragraphs: [
          "Embeddings are the mechanism, not the product — they're what sits underneath a search bar or an agent's decision-making, not something you interact with directly. When Broll indexes your raw footage, it's building this kind of representation for every frame, which is what lets both you and the editing agent find and use the right moment later.",
        ],
      },
    ],
    relatedSlugs: ["semantic-video-search", "video-indexing-explained"],
  },
  {
    slug: "ai-remove-silences",
    title: "How AI Removes Silences and Dead Air",
    description:
      "Cutting silences and dead air by hand is one of the most repetitive parts of editing. Here's how AI handles it, and where a human pass still needs to review the result.",
    eyebrow: "AI Editing",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "Why this is a bigger job than it sounds",
        paragraphs: [
          "Removing dead air sounds simple — cut the quiet parts — but doing it by hand on a long recording means scrubbing through the entire timeline, listening for gaps, and making a judgment call on each one: is this a pause worth keeping for pacing, or genuinely dead time? On an hour of raw footage, that's a slow, repetitive pass before any of the actual editing starts.",
        ],
      },
      {
        heading: "How AI does it",
        paragraphs: [
          "An AI editor analyzes the audio track directly, detecting gaps below a level or duration threshold and flagging them as candidates for removal. Because it's working from the actual waveform and transcript together, it can distinguish a natural conversational pause from filler silence — and because it's automated, it does this across hours of footage in the time a human would take to review a few minutes.",
        ],
      },
      {
        heading: "Where judgment still applies",
        paragraphs: [
          "Not every silence should go. A pause before a punchline, or a beat after a hard question in an interview, is doing narrative work — cutting it flat can make an edit feel rushed. The practical pattern: let AI do the detection and the first pass of removal, then review the cuts near anything emotionally or narratively significant before finalizing.",
        ],
      },
    ],
    relatedSlugs: ["ai-vs-manual-video-editing", "ai-jump-cut-talking-heads"],
  },
  {
    slug: "prompt-based-video-editing",
    title: "Prompt-Based Video Editing, Explained",
    description:
      "Prompt-based video editing means describing the edit you want in plain language instead of manually placing every cut. Here's what it can and can't do today.",
    eyebrow: "AI Editing",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "What \"prompt-based\" actually means here",
        paragraphs: [
          "Prompt-based editing is an interface, not a separate technology: instead of building an edit by manually placing clips on a timeline, you describe what you want — the story, the tone, the length — and an AI system does the work of finding footage and assembling it to match that description.",
        ],
      },
      {
        heading: "What makes a prompt actually usable for editing",
        paragraphs: [
          "A prompt is only as good as the system's ability to act on it, which depends on two things happening underneath: the footage has to already be searchable by meaning, and the system has to be able to make sequencing decisions, not just retrieve clips. A prompt that returns a pile of matching clips still leaves you with the assembly work. A prompt that returns a built story doesn't.",
        ],
      },
      {
        heading: "How this differs from a template with fill-in-the-blanks",
        paragraphs: [
          "Some tools marketed as \"prompt-based\" are really templates with a text field attached — the structure is fixed, and the prompt only swaps in specific words or clips. Genuine prompt-based editing, the kind Broll does, doesn't start from a fixed structure: the agent decides the structure itself, based on the raw footage available and the story you described.",
        ],
      },
    ],
    relatedSlugs: ["what-is-agentic-video-editing", "ai-vs-manual-video-editing"],
  },
  {
    slug: "ai-captions-guide",
    title: "Auto-Captions That Don't Embarrass You",
    description:
      "Auto-captions are only useful if they're accurate and match your platform's style. Here's what actually determines caption quality, and how to avoid the ones that misfire.",
    eyebrow: "AI Editing",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "Why caption quality varies so much",
        paragraphs: [
          "Not all auto-caption systems work from the same input. Some transcribe audio in isolation, with no visual or contextual signal — which is where you get captions that mishear a product name, a person's name, or industry jargon, because the system has nothing but the raw audio to guess from. Systems that have access to the full video context — what's on screen, who's speaking, the surrounding footage — make fewer of those mistakes.",
        ],
      },
      {
        heading: "What actually makes captions embarrassing",
        paragraphs: ["The failures that get noticed aren't small typos — they're the ones that change meaning or look careless:"],
        list: [
          "Misheard names, brands or technical terms",
          "Timing that lags behind or races ahead of speech",
          "Styling that clashes with the platform — a caption block that doesn't fit vertical video",
          "No distinction between speakers in multi-person footage",
        ],
      },
      {
        heading: "How this fits into a full edit, not a separate step",
        paragraphs: [
          "Treating captions as an isolated add-on step — export video, then run it through a separate captioning tool — is where a lot of the mismatch happens, because that tool has no context on the footage beyond the audio. Broll generates captions as part of the same pass that builds the edit, with access to the full footage and story context, not just an isolated audio file.",
        ],
      },
    ],
    relatedSlugs: ["ai-vs-manual-video-editing", "ai-lip-sync-dubbing"],
  },
  {
    slug: "cost-of-manual-editing",
    title: "The Cost of an 8-Hour Edit (and How to Get It to 12 Minutes)",
    description:
      "An eight-hour manual edit costs more than the editor's time on the clock. Here's where that time actually goes, and what changes when an agentic editor does the first pass.",
    eyebrow: "AI Editing",
    publishedAt: "2026-08-23",
    sections: [
      {
        heading: "Where an eight-hour edit actually goes",
        paragraphs: [
          "An eight-hour edit is rarely eight hours of cutting. Most of it is upstream: importing and organizing footage, watching everything to find the usable takes, re-watching to compare options, and only then building a timeline. The actual creative cutting — the part that needed a human's judgment — is a smaller fraction of the total than people usually assume.",
        ],
      },
      {
        heading: "What changes when an agent does the first pass",
        paragraphs: [
          "An agentic editor removes the upstream hours specifically, because it can watch and index footage far faster than a human review pass, and it can make first-draft editorial decisions about what belongs in the story. In practice, teams using Broll take an edit that took about eight hours by hand down to around twelve minutes of the agent's time, before a human review pass.",
        ],
      },
      {
        heading: "The cost isn't just editor hours",
        paragraphs: [
          "Eight hours per edit also caps how much content a team can realistically produce — every video competes for the same limited editor time, which means projects get queued, deadlines slip, and some footage never gets used at all. Cutting the time-per-edit doesn't just save money on that one video; it changes how much a team can publish in total.",
        ],
      },
    ],
    relatedSlugs: ["ai-vs-manual-video-editing", "what-is-agentic-video-editing"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
