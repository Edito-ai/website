import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blogPosts";

const TITLE = "Blog — Broll";
const DESCRIPTION =
  "Guides on agentic AI video editing, video search and production workflows — from the team building Broll.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/blog", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Blog", "/blog"),
  ],
};

export default function BlogIndexPage() {
  return (
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="relative overflow-hidden px-5 pt-32 pb-24 sm:px-6 sm:pt-36 md:pt-44">
        <div
          aria-hidden
          className="animate-drift absolute -top-1/4 left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
        />

        <div className="relative mx-auto max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">Blog</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Guides on <span className="font-serif italic">agentic editing</span>.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            How agentic AI video editing, video search and production workflows actually work.
          </p>

          <div className="mt-16 space-y-10">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <p className="font-mono text-xs tracking-widest text-muted uppercase">
                  {post.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
