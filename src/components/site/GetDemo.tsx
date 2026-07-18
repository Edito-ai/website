"use client";

import { useRouter } from "next/navigation";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import Magnetic from "@/components/fx/Magnetic";
import Button from "@/components/ui/button";

export default function GetDemo() {
  const router = useRouter();

  return (
    <section id="demo" className="relative overflow-hidden px-6 py-36 md:py-52">
      {/* Quiet moving light behind the ask */}
      <div
        aria-hidden
        className="animate-drift absolute top-1/4 left-1/3 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <WordReveal
          text="Get your"
          className="text-5xl font-semibold tracking-tighter md:text-8xl"
        />
        <WordReveal
          as="p"
          text="free demo."
          delay={0.2}
          className="mt-2 font-serif text-6xl italic md:text-9xl"
        />

        <Reveal delay={0.4}>
          <div className="mt-14 flex justify-center">
            <Magnetic strength={0.4}>
              <Button
                size="lg"
                className="px-14 py-5 text-lg"
                onClick={() => router.push("/demo")}
              >
                Claim
              </Button>
            </Magnetic>
          </div>
          <p className="mt-6 font-mono text-xs tracking-widest text-muted uppercase">
            No card required
          </p>
        </Reveal>
      </div>
    </section>
  );
}
