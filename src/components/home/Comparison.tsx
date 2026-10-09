import { Check, Minus } from "lucide-react";
import Reveal from "@/components/fx/Reveal";
import SectionHeader from "@/components/site/SectionHeader";

const ROWS = [
  { task: "Watching the footage", manual: "Scrub every clip by hand", broll: "Every frame indexed on upload" },
  { task: "Finding the moments", manual: "Log takes, search by memory", broll: "Search footage like text" },
  { task: "Assembling the first cut", manual: "Drag clips onto a timeline", broll: "Built from one sentence" },
  { task: "Captions", manual: "A separate pass", broll: "Timed to the cut, automatically" },
  { task: "Color across cameras", manual: "Match shots one by one", broll: "One grade, every camera" },
  { task: "Handing off", manual: "Start from raw footage", broll: "Timeline XML for your editor" },
];

/** Manual editing vs Broll — one honest table, numbers only where we have them. */
export default function Comparison() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Why teams switch"
          title="Eight hours of editing."
          voice="About twelve minutes with Broll."
          lede="Broll removes the upstream work — watching, logging, assembling — and leaves the creative calls with your editors."
        />

        <Reveal delay={0.1} className="mt-14 md:mt-16">
          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-line bg-white/[0.02] text-sm">
                  <th scope="col" className="px-5 py-4 font-medium text-muted md:px-7">Task</th>
                  <th scope="col" className="hidden px-5 py-4 font-medium text-muted sm:table-cell md:px-7">Manual editing</th>
                  <th scope="col" className="px-5 py-4 font-medium md:px-7">
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-red" /> With Broll
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.task} className="group border-b border-line transition-colors duration-300 last:border-0 hover:bg-white/[0.02]">
                    <th scope="row" className="px-5 py-4 font-medium md:px-7">{r.task}</th>
                    <td className="hidden px-5 py-4 text-muted sm:table-cell md:px-7">
                      <span className="inline-flex items-center gap-2.5">
                        <Minus className="size-4 shrink-0 text-muted/50" /> {r.manual}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink-2 md:px-7">
                      <span className="inline-flex items-center gap-2.5">
                        <Check className="size-4 shrink-0 text-red" strokeWidth={2.5} /> {r.broll}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[linear-gradient(90deg,transparent,rgb(184_24_44/0.12))]">
                  <th scope="row" className="px-5 py-5 font-semibold md:px-7">Typical first cut</th>
                  <td className="hidden px-5 py-5 font-display text-2xl text-muted sm:table-cell md:px-7">~8 hours</td>
                  <td className="px-5 py-5 font-display text-2xl text-red md:px-7">~12 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">Edit time before human review, as reported by teams using Broll.</p>
        </Reveal>
      </div>
    </section>
  );
}
