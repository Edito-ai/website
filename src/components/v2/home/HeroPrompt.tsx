"use client";

import { useState } from "react";
import { ArrowRight, CHAT_URL } from "@/components/v2/ui";

const EXAMPLES = [
  { label: "Reel in my style", text: "Cut a 60s reel in the style of my last video" },
  { label: "Clip a stream", text: "Find the 5 best moments in this YouTube stream and make captioned clips" },
  { label: "Podcast trailer", text: "Turn this 3-hour podcast into a 90s trailer with captions" },
  { label: "Vertical + captions", text: "Make a 9:16 version with bold captions and a warm grade" },
];

export default function HeroPrompt() {
  const [prompt, setPrompt] = useState(EXAMPLES[0].text);
  const [ex, setEx] = useState(0);

  return (
    <div className="mt-2 flex w-full max-w-[760px] flex-col gap-3.5">
      <form
        action={CHAT_URL}
        method="get"
        className="flex items-center gap-2.5 rounded-[20px] border border-line-3 bg-surface-2 py-2 pr-2 pl-5 shadow-[0_0_0_6px_rgba(190,30,52,0.08),0_24px_60px_-20px_rgba(0,0,0,0.8)] max-sm:flex-wrap max-sm:pl-4"
      >
        <label htmlFor="hero-prompt" className="sr-only">
          Describe the video you want
        </label>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
          <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
        </svg>
        <input
          id="hero-prompt"
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setEx(-1);
          }}
          placeholder="Describe the video you want…"
          className="min-h-[52px] min-w-0 flex-1 border-0 bg-transparent text-[17px] text-ink outline-none placeholder:text-muted"
        />
        <a
          href={CHAT_URL}
          className="inline-flex min-h-[52px] shrink-0 items-center gap-2 rounded-[14px] bg-crimson px-[22px] font-semibold text-white transition-colors hover:bg-[#d22640] max-sm:w-full max-sm:justify-center"
        >
          Start in Chat
          <ArrowRight />
        </a>
      </form>
      <div role="group" aria-label="Example prompts" className="flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((x, i) => {
          const on = ex === i;
          return (
            <button
              key={x.label}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setPrompt(x.text);
                setEx(i);
              }}
              className={
                "min-h-10 cursor-pointer rounded-full border px-3.5 text-sm transition-colors " +
                (on ? "border-crimson bg-wine text-red" : "border-line bg-[rgba(20,17,17,0.8)] text-ink-2 hover:border-line-3")
              }
            >
              {x.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
