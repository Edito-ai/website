import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import PageHero from "@/components/site/PageHero";
import BlogGrid from "@/components/site/BlogGrid";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/site";
import { BLOG_POSTS, readingMinutes } from "@/lib/blogPosts";

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
  const posts = BLOG_POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    eyebrow: p.eyebrow,
    publishedAt: p.publishedAt,
    minutes: readingMinutes(p),
  }));

  return (
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Blog"
          title={
            <>
              Guides on <span className="serif-voice text-brand">agentic editing</span>.
            </>
          }
          lede="How agentic AI video editing, video search and production workflows actually work."
          cta={null}
          meta={<>{posts.length} guides · Written by the team building Broll</>}
        />
        <section className="px-5 pb-28 sm:px-8 md:pb-40">
          <div className="mx-auto max-w-6xl">
            <BlogGrid posts={posts} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
