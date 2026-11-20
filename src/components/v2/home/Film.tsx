"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SRC = "/film/broll-film.mp4";
const POSTER = "/film/film-poster.webp";

/** The 80-second teaser. Nothing downloads until the first click; pauses off-screen. */
export default function Film() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && v.pause(), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const play = () => {
    setStarted(true);
    void ref.current?.play().catch(() => {});
  };

  return (
    <section id="film" className="mx-auto box-border flex max-w-[1440px] scroll-mt-20 flex-col gap-8 px-6 lg:px-10 pt-24 pb-10 md:pt-[120px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3.5">
          <span className="eyebrow">TC 00:03 — THE TEASER</span>
          <h2 className="h-section">See it in 80 seconds.</h2>
        </div>
        <p data-reveal className="m-0 text-lg text-soft">From shoot to first cut.</p>
      </div>
      <div data-fx="zoom" className="relative aspect-video overflow-hidden rounded-[20px] border border-line bg-[#13151F] will-change-transform">
        <video
          ref={ref}
          src={SRC}
          poster={POSTER}
          preload="none"
          playsInline
          controls={started}
          className="absolute inset-0 size-full object-cover"
        >
          Your browser can&apos;t play this video.
        </video>
        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label="Play the 80-second teaser"
            className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/25"
          >
            <Image src={POSTER} alt="" fill sizes="(min-width: 1200px) 1152px, 100vw" className="-z-10 object-cover" />
            <span className="flex size-20 items-center justify-center rounded-full bg-crimson text-white transition-transform group-hover:scale-105 md:size-24">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="absolute bottom-[18px] left-5 font-mono text-[13px] text-ink-2">broll-film.mp4 · 01:20</span>
          </button>
        )}
      </div>
    </section>
  );
}
