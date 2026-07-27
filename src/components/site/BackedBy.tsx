import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";

/** Official four-colour Google mark — never recolour it. */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/**
 * A single quiet credibility beat between the hero and the workflow story:
 * hairline-ruled band, the Google for Startups lockup, one supporting line.
 * No logo wall — one real badge carries more weight than six.
 */
export default function BackedBy() {
  return (
    <section
      id="backed-by"
      className="relative border-y border-line px-5 py-20 sm:px-6 md:py-28"
    >
      {/* Barely-there light behind the badge so the band is never flat */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute top-1/2 left-1/2 size-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_65%)] opacity-40"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Backed by
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-3 shadow-[var(--shadow-lift)] transition-colors duration-300 hover:border-line-strong sm:gap-4 sm:px-7 sm:py-4">
            <GoogleMark className="size-6 shrink-0 sm:size-7" />
            <span className="text-base font-medium tracking-tight sm:text-xl">
              Google for Startups
            </span>
          </div>
        </Reveal>

        <h2 className="mt-10">
          <WordReveal
            as="span"
            text="Building Broll with"
            delay={0.15}
            className="block text-3xl font-semibold tracking-tighter sm:text-4xl md:text-6xl"
          />
          <WordReveal
            as="span"
            text="Google behind us."
            delay={0.3}
            className="mt-1 block font-serif text-4xl italic sm:text-5xl md:text-7xl"
          />
        </h2>
      </div>
    </section>
  );
}
