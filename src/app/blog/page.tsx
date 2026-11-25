import type { Metadata } from "next";
import PageShell from "@/components/v2/PageShell";
import BlogIndex from "@/components/v2/BlogIndex";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/site";
import { BLOG_POSTS, readingMinutes } from "@/lib/blogPosts";

const TITLE = "Blog — Broll";
const DESCRIPTION =
  "Guides on agentic AI video editing, video search and production workflows — from the team building Broll.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog", images: ["/opengraph-image.png"] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({ path: "/blog", name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd("Blog", "/blog"),
  ],
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function BlogPage() {
  const posts = BLOG_POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    eyebrow: p.eyebrow,
    date: fmt(p.publishedAt),
    minutes: readingMinutes(p),
  }));
  return (
    <PageShell jsonLd={structuredData}>
      <div className="mx-auto box-border flex max-w-[1440px] flex-col gap-12 px-6 lg:px-10 pt-20 pb-28 md:pt-24">
        <BlogIndex posts={posts} />
      </div>
    </PageShell>
  );
}
