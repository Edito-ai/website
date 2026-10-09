import type { ReactNode } from "react";

/**
 * Shared H2 + prose block for content pages (legal docs, marketing pages,
 * blog posts). Laid out like a script page: the heading sits in a narrow
 * left column on wide screens, the prose reads in a comfortable measure.
 */
export default function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="group grid gap-4 border-t border-line py-12 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-12">
      <h2 className="text-xl font-semibold tracking-tight text-balance transition-colors duration-500 group-hover:text-ink md:text-[1.35rem] md:leading-snug">
        <span
          aria-hidden
          className="mb-3 block h-px w-8 bg-red transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16"
        />
        {title}
      </h2>
      <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-2/80 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:space-y-2.5 [&_ul>li]:relative [&_ul>li]:pl-5 [&_ul>li]:before:absolute [&_ul>li]:before:top-[0.7em] [&_ul>li]:before:left-0 [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-red">
        {children}
      </div>
    </section>
  );
}
