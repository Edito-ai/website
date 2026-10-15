import { Check } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import Spotlight from "@/components/fx/Spotlight";
import CtaLink from "@/components/ui/CtaLink";
import { cn } from "@/lib/utils";

// No public prices or tiers exist, so none are invented here: each card
// describes how a kind of team typically uses Broll and how much footage
// it generates. Every capability is available to every team.
const PLANS = [
  {
    team: "Creator teams",
    volume: 0.35,
    footage: "Short turnarounds, weekly cadence",
    fit: ["Daily first cuts from raw recordings", "Styled captions on every cut", "Export to the editor you already use"],
  },
  {
    team: "Production houses",
    volume: 0.85,
    footage: "Multi-camera, long shoots, parallel projects",
    fit: ["Search across every shoot", "One grade across all cameras", "Several projects in parallel", "Set up on your footage in 24 hours"],
    featured: true,
  },
  {
    team: "Agencies",
    volume: 0.6,
    footage: "Many clients, many formats",
    fit: ["Client videos in every aspect ratio", "Lip sync across languages", "Cut, captions and grade in one pass"],
  },
];

export default function PricingPlans() {
  return (
    <section className="px-5 pb-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.team} delay={0.08 * i}>
            <Spotlight
              as="article"
              className={cn(
                "group flex h-full flex-col p-7 md:p-8",
                plan.featured && "border-red/40 bg-[linear-gradient(180deg,rgb(184_24_44/0.12),transparent_60%)]",
              )}
            >
              <div className="flex items-center justify-between">
                <p className="slate">{plan.featured ? "Built for this" : "Typical setup"}</p>
              </div>
              <h2 className="font-display mt-6 text-3xl">{plan.team}</h2>
              <p className="mt-2 text-sm text-muted">{plan.footage}</p>

              {/* Footage volume meter */}
              <div className="mt-8">
                <div className="slate flex justify-between">
                  <span>Footage volume</span>
                  <span className="text-ink-2">Set per team</span>
                </div>
                <div className="mt-3 flex h-6 items-end gap-[3px]">
                  {Array.from({ length: 28 }).map((_, b) => (
                    <span
                      key={b}
                      style={{ height: `${30 + ((b * 29) % 70)}%` }}
                      className={cn(
                        "w-full rounded-full transition-colors duration-500",
                        b / 28 < plan.volume ? "bg-red group-hover:bg-coral" : "bg-white/10",
                      )}
                    />
                  ))}
                </div>
              </div>

              <ul className="mt-8 space-y-3 text-[15px]">
                {plan.fit.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-red" strokeWidth={2.5} />
                    <span className="text-ink-2/80">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <CtaLink
                  href="/early-access"
                  variant={plan.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  Get pricing for your team
                </CtaLink>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
      <p className="slate mx-auto mt-6 max-w-6xl text-center">
        Every capability for every team · No card required · Pricing agreed with your team after launch
      </p>
    </section>
  );
}
