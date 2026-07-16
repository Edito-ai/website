"use client";

import Link from "next/link";
import LogoMark from "@/components/Logo";
import { useScrollProgress, seg, easeOut } from "./useScrollProgress";

/**
 * The closing shot: the editor you've been driving all page shrinks away and
 * the whole experience resolves into the Adarpan mark — then, and only then,
 * the ask. Scroll-scrubbed like everything else, so backing up re-opens the
 * editor.
 */
export default function LogoCollapse() {
  const { ref, p } = useScrollProgress<HTMLDivElement>();

  const collapse = easeOut(seg(p, 0.05, 0.5));
  const mark = easeOut(seg(p, 0.35, 0.65));
  const ask = easeOut(seg(p, 0.62, 0.85));

  return (
    <div ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* The editor, leaving. */}
        <div
          aria-hidden
          style={{
            transform: `scale(${1 - collapse * 0.85})`,
            opacity: 1 - collapse,
          }}
          className="absolute w-full max-w-2xl will-change-transform"
        >
          <div className="card-surface overflow-hidden bg-ink-950">
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] text-mist">
                adarpan cut — sequence_01 · exported
              </span>
            </div>
            <div className="space-y-1.5 p-4 font-mono text-[8px] text-white/50">
              {[
                [{ l: 4, w: 20 }, { l: 30, w: 30 }],
                [{ l: 0, w: 44 }],
                [{ l: 0, w: 60 }],
                [{ l: 12, w: 40 }],
              ].map((clips, lane) => (
                <div key={lane} className="h-5 rounded bg-ink-800">
                  {clips.map((c, i) => (
                    <span
                      key={i}
                      style={{ marginLeft: `${c.l}%`, width: `${c.w}%` }}
                      className={`inline-block h-4 translate-y-0.5 rounded-sm ${
                        lane < 2 ? "bg-violet-500/30" : "bg-sky-500/25"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The mark, arriving through it. */}
        <div
          style={{
            transform: `scale(${0.5 + mark * 0.5})`,
            opacity: mark,
          }}
          className="relative flex flex-col items-center will-change-transform"
        >
          <LogoMark className="size-24 text-frost sm:size-32" />
          <p className="mt-5 text-xl font-semibold tracking-tight">
            Adarpan <span className="text-violet-400">Labs</span>
          </p>
        </div>

        {/* The ask. */}
        <div
          style={{
            opacity: ask,
            transform: `translateY(${(1 - ask) * 20}px)`,
          }}
          className="relative mt-10 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Try it on your own footage.
          </h2>
          <div className="mt-7">
            <Link
              href="/contact"
              tabIndex={ask > 0.5 ? undefined : -1}
              className="inline-block rounded-full bg-violet-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-400"
            >
              Request early access →
            </Link>
          </div>
          <p className="mt-5 text-sm text-mist">
            Free during early access · native desktop build · your media never
            leaves your machine.
          </p>
          <div className="mt-8">
            <Link
              href="/accessway"
              tabIndex={ask > 0.5 ? undefined : -1}
              className="text-sm text-mist transition-colors hover:text-frost"
            >
              Next project: AccessWay →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
