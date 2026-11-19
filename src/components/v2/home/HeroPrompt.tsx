"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CHAT_URL } from "@/components/v2/ui";

const EXAMPLES = [
  "Cut a 60s reel in the style of my last video",
  "Find the 5 best moments in this stream and make captioned clips",
  "Turn this 3-hour podcast into a 90s trailer with captions",
  "Make a 9:16 version with bold captions and a warm grade",
];

/**
 * Hero prompt box. Until the visitor touches it, the example prompt rotates
 * every 3s inside the field; once they focus it, rotation stops and the
 * field is theirs to edit.
 */
export default function HeroPrompt() {
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % EXAMPLES.length), 3000);
    return () => window.clearInterval(id);
  }, [touched]);

  return (
    <div className="mt-1 flex w-full max-w-[760px] flex-col gap-3 sm:mt-2">
      <form
        action={CHAT_URL}
        method="get"
        className="flex items-center gap-2.5 rounded-[20px] border border-line-3 bg-surface-2 py-2 pr-2 pl-5 shadow-[0_0_0_6px_rgba(190,30,52,0.08),0_24px_60px_-20px_rgba(0,0,0,0.8)] max-sm:flex-wrap max-sm:gap-2 max-sm:rounded-2xl max-sm:p-2 max-sm:pl-3.5"
      >
        <label htmlFor="hero-prompt" className="sr-only">
          Describe the video you want
        </label>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
          <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
        </svg>
        <div className="relative min-w-0 flex-1">
          <input
            id="hero-prompt"
            type="text"
            value={value}
            onFocus={() => {
              if (!touched) {
                setTouched(true);
                setValue(EXAMPLES[i]);
              }
            }}
            onChange={(e) => setValue(e.target.value)}
            placeholder={touched ? "Describe the video you want…" : ""}
            className="min-h-11 w-full border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted sm:min-h-[52px] sm:text-[17px]"
          />
          {!touched && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center overflow-hidden text-[15px] text-ink sm:text-[17px]"
            >
              <span key={i} className="prompt-swap truncate">
                {EXAMPLES[i]}
              </span>
            </span>
          )}
        </div>
        <a
          href={CHAT_URL}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-crimson px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-[#d22640] max-sm:w-full max-sm:justify-center sm:min-h-[52px] sm:rounded-[14px] sm:text-base"
        >
          Start in Chat
          <ArrowRight />
        </a>
      </form>
      {!touched && (
        <div aria-hidden className="flex justify-center gap-1.5">
          {EXAMPLES.map((_, n) => (
            <span
              key={n}
              className={"h-1 rounded-full transition-all duration-500 " + (n === i ? "w-5 bg-red" : "w-1.5 bg-line-3")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
