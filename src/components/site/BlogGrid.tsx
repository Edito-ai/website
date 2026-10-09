"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogCard {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  publishedAt: string;
  minutes: number;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** Generated cover art — each post gets a frame of the logo band, never a stock image. */
export function Cover({ index, eyebrow, large = false }: { index: number; eyebrow: string; large?: boolean }) {
  const search = eyebrow === "Video Search";
  return (
    <div className="relative isolate aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2">
      <div
        aria-hidden
        className="field-band absolute -inset-[70%] -z-10 opacity-70 transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        style={{ rotate: `${(index * 47) % 360}deg` }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent" />
      {search ? (
        // a grid of frames, one highlighted — "the moment found"
        <div aria-hidden className="absolute inset-x-[12%] top-[18%] grid grid-cols-5 gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "aspect-video rounded-[4px] border border-white/15 bg-white/10",
                i === (index * 3) % 10 && "border-white bg-white/70 shadow-[0_0_20px_rgb(255_255_255/0.5)]",
              )}
            />
          ))}
        </div>
      ) : (
        // a little timeline being assembled
        <div aria-hidden className="absolute inset-x-[12%] top-[26%] space-y-1.5">
          {[0, 1].map((row) => (
            <div key={row} className="flex gap-1">
              {[28, 14, 22, 18, 12].map((w, i) => (
                <span
                  key={i}
                  style={{ width: `${(w + ((index + row + i) % 4) * 3)}%` }}
                  className={cn("h-3 rounded-[3px] bg-white/25", row === 0 && i === 1 && "bg-white/80")}
                />
              ))}
            </div>
          ))}
          <div className="flex h-5 items-center gap-[2px] pt-2">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                style={{ height: `${20 + ((i * 37 + index * 11) % 80)}%` }}
                className="w-full rounded-full bg-white/40"
              />
            ))}
          </div>
        </div>
      )}
      <span
        className={cn(
          "font-display absolute bottom-3 left-4 text-white/90",
          large ? "text-6xl md:text-7xl" : "text-4xl",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="slate absolute right-4 bottom-4 text-white/70">{eyebrow}</span>
    </div>
  );
}

/** Filterable index of guides. Every post link is in the server HTML too. */
export default function BlogGrid({ posts }: { posts: BlogCard[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.eyebrow)))], [posts]);
  const [active, setActive] = useState("All");
  const visible = active === "All" ? posts : posts.filter((p) => p.eyebrow === active);
  const [featured, ...rest] = visible;

  return (
    <div>
      <div role="tablist" aria-label="Filter posts" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "relative h-9 cursor-pointer rounded-full border px-4 text-[13px] transition-colors duration-300",
              active === c
                ? "border-red text-white"
                : "border-line text-ink-2/70 hover:border-line-strong hover:text-ink",
            )}
          >
            {active === c && (
              <motion.span
                layoutId="blog-filter"
                className="absolute inset-0 -z-10 rounded-full bg-red"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {c}
            <span className="ml-1.5 tabular-nums opacity-60">
              {c === "All" ? posts.length : posts.filter((p) => p.eyebrow === c).length}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {featured && (
          <motion.div
            key={`f-${featured.slug}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-10 grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-12"
            >
              <Cover index={posts.indexOf(featured)} eyebrow={featured.eyebrow} large />
              <div>
                <p className="slate">
                  Featured · {fmtDate(featured.publishedAt)} · {featured.minutes} min read
                </p>
                <h2 className="font-display mt-5 text-3xl text-balance transition-colors duration-300 group-hover:text-red md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 leading-relaxed text-ink-2/75">{featured.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium">
                  Read the guide
                  <ArrowUpRight className="size-4 text-red transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul layout className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {rest.map((post) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <Cover index={posts.indexOf(post)} eyebrow={post.eyebrow} />
                <p className="slate mt-5">
                  {fmtDate(post.publishedAt)} · {post.minutes} min read
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance transition-colors duration-300 group-hover:text-red">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-2/65">
                  {post.description}
                </p>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
