"use client";

import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import Magnetic from "@/components/fx/Magnetic";
import Button from "@/components/ui/button";

export default function CTA() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-dark-bg py-36 text-dark-ink md:py-52">
      {/* Slowly morphing ambient background — monochrome with a breath of glow. */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-drift absolute -top-1/3 left-1/4 size-[60vw] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.05),transparent_65%)]" />
        <div
          className="animate-drift absolute -right-1/4 -bottom-1/3 size-[55vw] rounded-full bg-[radial-gradient(circle,rgb(139_92_246/0.07),transparent_65%)]"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <WordReveal
          text="Ready to stop editing?"
          className="text-5xl font-semibold tracking-tighter md:text-8xl"
        />
        <WordReveal
          as="p"
          text="Start directing."
          delay={0.25}
          className="mt-2 font-serif text-5xl italic md:text-8xl"
        />

        <Reveal delay={0.4}>
          <div className="mt-14 flex justify-center">
            <Magnetic strength={0.4}>
              <Button size="lg" variant="inverse" className="px-12 py-5 text-lg">
                Start Creating
              </Button>
            </Magnetic>
          </div>
          <p className="mt-6 font-mono text-xs tracking-widest text-dark-muted uppercase">
            No timeline required
          </p>
        </Reveal>
      </div>
    </section>
  );
}
