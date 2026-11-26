"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CHAT_URL, DOWNLOAD_CTA, DownloadIcon } from "@/components/v2/ui";

const DEFAULT_EXAMPLES = [
  "Cut a 60s reel in the style of my last video",
  "Find the 5 best moments in this stream and make captioned clips",
  "Turn this 3-hour podcast into a 90s trailer with captions",
  "Make a 9:16 version with bold captions and a warm grade",
];

/**
 * Hero prompt box: shows what you can ask Broll for, one example every 3s, with
 * the download button where a send button would be.
 */
export default function HeroPrompt({ examples: EXAMPLES = DEFAULT_EXAMPLES }: { examples?: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % EXAMPLES.length), 3000);
    return () => window.clearInterval(id);
  }, [EXAMPLES.length]);

  return (
    <div className="flex w-full max-w-[760px] flex-col items-center gap-3">
      <div className="flex w-full items-center gap-2.5 rounded-[20px] border border-line-3 bg-surface-2 py-2 pr-2 pl-5 shadow-[0_0_0_6px_rgba(190,30,52,0.08),0_24px_60px_-20px_rgba(0,0,0,0.8)] max-sm:flex-wrap max-sm:gap-2 max-sm:rounded-2xl max-sm:p-2 max-sm:pl-3.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
          <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
        </svg>
        <p className="m-0 flex min-h-11 min-w-0 flex-1 items-center overflow-hidden text-left text-[15px] text-ink sm:min-h-[52px] sm:text-[17px]">
          <span key={i} className="prompt-swap truncate">
            {EXAMPLES[i % EXAMPLES.length]}
          </span>
        </p>
        <Link
          href={DOWNLOAD_CTA.href}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-crimson px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-[#d22640] max-sm:w-full max-sm:justify-center sm:min-h-[52px] sm:rounded-[14px] sm:text-base"
        >
          <DownloadIcon />
          {DOWNLOAD_CTA.label}
        </Link>
      </div>
      <span className="font-mono text-xs text-muted">Windows 64-bit · Mac (Apple Silicon) · DaVinci Resolve plugin</span>
      <a href={CHAT_URL} className="text-sm text-soft underline underline-offset-4 transition-colors hover:text-ink">
        or start in Chat, right in your browser
      </a>
      <div aria-hidden className="flex justify-center gap-1.5 max-sm:hidden">
        {EXAMPLES.map((_, n) => (
          <span
            key={n}
            className={"h-1 rounded-full transition-all duration-500 " + (n === i ? "w-5 bg-red" : "w-1.5 bg-line-3")}
          />
        ))}
      </div>
    </div>
  );
}
