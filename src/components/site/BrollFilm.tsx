"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

const SRC = "/film/broll-film.mp4";
const POSTER = "/film/poster.webp";
const DURATION_LABEL = "1:20";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/**
 * The product film, placed right after the hero: the hero makes the promise,
 * this proves it. Nothing downloads until the first click (preload="none"),
 * playback pauses when the player scrolls out of view, and the poster is the
 * real editor frame so the idle state already sells the product.
 */
export default function BrollFilm() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(80);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    if (v.paused) void v.play().catch(() => setPlaying(false));
    else v.pause();
  }, []);

  // Pause when the film leaves the viewport — never play to an empty screen.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) videoRef.current?.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const seek = (value: number) => {
    const v = videoRef.current;
    if (v) v.currentTime = value;
    setTime(value);
  };

  const fullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <section
      id="film"
      aria-labelledby="film-title"
      className="relative px-5 py-24 sm:px-6 md:py-36"
    >
      {/* Ambient light so the section is never an empty void */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute top-1/2 left-1/2 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_62%)] opacity-40"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              The film · {DURATION_LABEL}
            </p>
          </Reveal>
          <h2 id="film-title" className="mt-5">
            <WordReveal
              as="span"
              text="300 clips."
              className="block text-4xl font-semibold tracking-tighter sm:text-5xl md:text-7xl"
            />
            <WordReveal
              as="span"
              text="12 minutes."
              delay={0.2}
              gradient
              className="mt-1 block font-serif text-5xl italic sm:text-6xl md:text-8xl"
            />
          </h2>
          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted">
              Watch Broll turn a full shoot into a first cut — before anyone
              opens a timeline.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={48} className="mt-12 md:mt-16">
          <div
            ref={frameRef}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-line-strong bg-black shadow-[var(--shadow-lift)] ring-1 ring-white/5 md:rounded-3xl"
          >
            <video
              ref={videoRef}
              src={SRC}
              poster={POSTER}
              preload="none"
              playsInline
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
              className="absolute inset-0 size-full cursor-pointer object-cover"
            >
              Your browser can&apos;t play this video.
            </video>

            {/* Idle state: poster + play button. Gone once playback begins. */}
            <AnimatePresence>
              {!started && (
                <motion.button
                  key="idle"
                  type="button"
                  onClick={toggle}
                  aria-label={`Play the Broll film, ${DURATION_LABEL}`}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 isolate flex cursor-pointer items-center justify-center bg-black/25 transition-colors duration-500 hover:bg-black/10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
                >
                  <Image
                    src={POSTER}
                    alt=""
                    fill
                    sizes="(min-width: 1152px) 1104px, 100vw"
                    className="-z-10 object-cover"
                  />
                                      <span className="flex size-20 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/30 group-hover:shadow-[0_0_48px_var(--accent)] md:size-28">
                      <Play className="ml-1 size-7 fill-current md:size-9" />
                    </span>
                                    <span className="absolute bottom-4 left-5 font-mono text-[11px] tracking-widest text-white/80 uppercase md:bottom-6 md:left-8">
                    Watch the film
                  </span>
                  <span className="absolute right-5 bottom-4 font-mono text-[11px] tracking-widest text-white/80 md:right-8 md:bottom-6">
                    {DURATION_LABEL}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Controls */}
            {started && (
              <div
                className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-3 transition-opacity duration-300 md:gap-4 md:px-6 md:pb-4 ${
                  playing ? "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Pause" : "Play"}
                  className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {playing ? (
                    <Pause className="size-5 fill-current" />
                  ) : (
                    <Play className="ml-0.5 size-5 fill-current" />
                  )}
                </button>

                <span className="w-9 shrink-0 font-mono text-[11px] text-white/80 tabular-nums">
                  {fmt(time)}
                </span>

                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={time}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Seek"
                  aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
                  style={{
                    background: `linear-gradient(to right, var(--accent) ${pct}%, rgb(255 255 255 / 0.25) ${pct}%)`,
                  }}
                  className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />

                <span className="hidden w-9 shrink-0 font-mono text-[11px] text-white/60 tabular-nums sm:block">
                  {fmt(duration)}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const v = videoRef.current;
                    if (v) v.muted = !v.muted;
                  }}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                </button>
                <button
                  type="button"
                  onClick={fullscreen}
                  aria-label="Fullscreen"
                  className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <Maximize className="size-5" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
