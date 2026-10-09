import Reveal from "@/components/fx/Reveal";
import CtaLink from "@/components/ui/CtaLink";
import BrollLogo from "@/components/site/BrollLogo";

/** The closing ask — a single card edged with the logo's colours. */
export default function FinalCta() {
  return (
    <section className="px-5 pt-8 pb-28 sm:px-8 md:pb-36">
      <Reveal className="mx-auto max-w-6xl">
        <div className="band-border">
          <div className="relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0b0c14] px-6 py-16 text-center md:py-24">
            <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
            <BrollLogo className="mx-auto size-12 text-ink" />
            <h2 className="font-display mx-auto mt-8 max-w-2xl text-[clamp(2rem,4.6vw,3.75rem)] text-balance">
              Your next first cut is{" "}
              <span className="serif-voice text-brand pr-1">minutes</span> away.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-2/70">
              Join the list and your early-access link lands in your inbox before launch.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <CtaLink href="/early-access" size="lg">
                Get early access
              </CtaLink>
              <CtaLink href="/product" variant="ghost" size="lg" arrow={false}>
                Explore the product
              </CtaLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
