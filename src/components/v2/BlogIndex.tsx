"use client";

import { useState } from "react";
import Link from "next/link";

export interface PostCard {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  date: string;
  minutes: number;
}

/** Category filter + featured post + grid for /blog. */
export default function BlogIndex({ posts }: { posts: PostCard[] }) {
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.eyebrow)))];
  const [cat, setCat] = useState("All");
  const [featured, ...rest] = posts;
  const showFeatured = cat === "All" || featured.eyebrow === cat;
  const list = rest.filter((p) => cat === "All" || p.eyebrow === cat);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[720px] flex-col gap-[18px]">
          <span className="eyebrow">BLOG</span>
          <h1 className="m-0 text-[clamp(44px,6vw,84px)] leading-none font-semibold tracking-[-0.045em]">
            Guides on agentic editing.
          </h1>
          <p className="m-0 text-lg leading-relaxed text-soft">
            How AI finds moments, builds stories and finishes edits. Written by the team building Broll.
          </p>
        </div>
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const on = c === cat;
            const count = c === "All" ? posts.length : posts.filter((p) => p.eyebrow === c).length;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c)}
                className={
                  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[15px] font-medium transition-colors " +
                  (on ? "border-ink bg-ink text-bg" : "border-line-strong bg-transparent text-ink-2 hover:border-line-3")
                }
              >
                {c} <span className="font-mono text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showFeatured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group flex flex-wrap overflow-hidden rounded-3xl border border-line bg-surface text-ink transition-colors hover:border-wine-line"
        >
          <div aria-hidden className="relative min-h-[260px] flex-[1_1_420px] overflow-hidden bg-[#141620] md:min-h-80">
            <div className="absolute inset-x-8 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              <div className="flex h-[30px] gap-1">
                <div className="flex-[0_0_18%] rounded bg-[#41465E]" />
                <div className="flex-[0_0_30%] rounded bg-[#363B52]" />
                <div className="flex-1 rounded bg-[#41465E]" />
              </div>
              <div className="flex h-[30px] gap-1">
                <div className="flex-[0_0_40%] rounded bg-wine-line" />
                <div className="flex-1 rounded bg-[#1E2132]" />
              </div>
              <div className="flex h-[30px] gap-1">
                <div className="flex-[0_0_12%] rounded bg-[#8A2238]" />
                <div className="flex-[0_0_14%] rounded bg-[#8A2238]" />
                <div className="flex-[0_0_10%] rounded bg-[#8A2238]" />
              </div>
            </div>
            <div className="absolute inset-y-0 left-[46%] w-0.5 bg-crimson" />
          </div>
          <div className="flex flex-[1_1_420px] flex-col justify-center gap-4 p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <span className="rounded-md bg-crimson px-2 py-1 text-white">FEATURED</span>
              <span className="text-muted">
                {featured.eyebrow.toUpperCase()} · {featured.date} · {featured.minutes} min
              </span>
            </div>
            <h2 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">{featured.title}</h2>
            <p className="m-0 text-base leading-[1.65] text-soft">{featured.description}</p>
            <span className="text-[15px] font-medium text-red group-hover:underline">Read the guide →</span>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="flex min-h-[250px] flex-col gap-3.5 rounded-[20px] border border-line bg-[#0C0D15] p-7 text-ink transition-colors hover:border-wine-line"
          >
            <div className="flex justify-between font-mono text-xs text-muted">
              <span>{p.eyebrow.toUpperCase()}</span>
              <span>{String(posts.indexOf(p) + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="m-0 text-[21px] leading-[1.25] font-semibold tracking-[-0.02em]">{p.title}</h3>
            <p className="m-0 text-[15px] leading-relaxed text-soft">{p.description}</p>
            <span className="mt-auto font-mono text-xs text-muted">
              {p.date} · {p.minutes} min read
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
