"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LAUNCH_DATE } from "@/lib/launch";

const LAUNCH_MS = new Date(LAUNCH_DATE).getTime();

function remaining(now: number) {
  const total = Math.max(0, LAUNCH_MS - now);
  return {
    total,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor(total / 3_600_000) % 24,
    minutes: Math.floor(total / 60_000) % 60,
    seconds: Math.floor(total / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Live countdown to launch. Renders placeholders until mounted so the
 *  server and client HTML match (no hydration mismatch). */
export default function Countdown({ className }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const t = now === null ? null : remaining(now);

  if (t && t.total === 0) {
    return (
      <p className={cn("font-display text-3xl text-brand", className)}>
        Broll is live.
      </p>
    );
  }

  const units = [
    { label: "Days", value: t ? pad(t.days) : "--" },
    { label: "Hours", value: t ? pad(t.hours) : "--" },
    { label: "Minutes", value: t ? pad(t.minutes) : "--" },
    { label: "Seconds", value: t ? pad(t.seconds) : "--" },
  ];

  return (
    <div
      role="timer"
      aria-label={
        t
          ? `${t.days} days, ${t.hours} hours, ${t.minutes} minutes until launch`
          : "Countdown to launch"
      }
      className={cn("flex items-stretch justify-center gap-2 sm:gap-3", className)}
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="panel flex min-w-[4.25rem] flex-col items-center px-3 py-3 sm:min-w-[6rem] sm:px-5 sm:py-4"
        >
          <span className="font-display text-3xl tabular-nums sm:text-5xl">{u.value}</span>
          <span className="mt-1 text-[10px] font-medium tracking-widest text-muted uppercase sm:text-xs">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
