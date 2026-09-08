"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import Button from "@/components/ui/button";
import { COUNTRY_CODES, DEFAULT_COUNTRY_ISO } from "@/lib/countryCodes";

// text-base on mobile keeps iOS Safari from auto-zooming focused inputs (<16px triggers it).
const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 outline-none transition-colors duration-300 focus:border-accent sm:text-sm";

const SOURCES = [
  "YouTube",
  "Instagram",
  "X / Twitter",
  "Google search",
  "A friend or colleague",
  "Other",
];

type SubmitState = "idle" | "submitting" | "succeeded" | "error";

/** Production-house demo request. Submits to our own `/api/submit-demo`
 *  route (own inbuilt backend — not Formspree): it emails the submitter a
 *  confirmation and notifies the team, replacing what Formspree did. */
export default function ClaimForm() {
  const router = useRouter();
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);

  const selectedCountry =
    COUNTRY_CODES.find((c) => c.iso === countryIso) ?? COUNTRY_CODES[0];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage(null);

    const data = new FormData(event.currentTarget);
    const phoneNumber = String(data.get("phone_number") ?? "").trim();

    try {
      const res = await fetch("/api/submit-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: phoneNumber ? `${selectedCountry.dial} ${phoneNumber}` : "",
          production_house: data.get("production_house"),
          channel_link: data.get("channel_link"),
          details: data.get("details"),
          referral_source: data.get("referral_source"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setState("succeeded");
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "succeeded") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-10 text-center shadow-[var(--shadow-lift)]"
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-soft">
          <Check className="size-5 text-accent" strokeWidth={2.5} />
        </span>
        <p className="mt-6 text-2xl font-semibold tracking-tight">Demo claimed.</p>
        <p className="mt-3 leading-relaxed text-muted">
          Want to skip the wait? Pick a time now and we&apos;ll walk you
          through Broll live.
        </p>
        <Button
          size="lg"
          className="mt-6 w-full"
          onClick={() => router.push("/schedule-demo")}
        >
          Schedule your demo
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-line bg-surface p-7 text-left shadow-[var(--shadow-lift)] md:p-9"
    >
      <div>
        <label htmlFor="production-house" className="mb-1.5 block text-sm font-medium">
          Production house
        </label>
        <input
          id="production-house"
          type="text"
          name="production_house"
          required
          placeholder="Studio or channel name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Your name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="Who should we ask for?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Work email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="you@studio.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone-number" className="mb-1.5 block text-sm font-medium">
          Phone number
        </label>
        <div className="flex gap-2">
          <select
            id="phone-country"
            value={countryIso}
            onChange={(e) => setCountryIso(e.target.value)}
            aria-label="Country code"
            className="w-[5.5rem] shrink-0 appearance-none rounded-xl border border-line bg-surface px-2 py-3 text-base text-ink outline-none transition-colors duration-300 focus:border-accent sm:text-sm"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.iso} {c.dial}
              </option>
            ))}
          </select>
          <input
            id="phone-number"
            type="tel"
            name="phone_number"
            required
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="Phone number"
            className={`${inputClass} min-w-0 flex-1`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="channel" className="mb-1.5 block text-sm font-medium">
          Channel or page link
        </label>
        <input
          id="channel"
          type="url"
          name="channel_link"
          placeholder="YouTube / Instagram URL"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="details" className="mb-1.5 block text-sm font-medium">
          What do you publish?
        </label>
        <textarea
          id="details"
          name="details"
          rows={3}
          placeholder="Formats, volume per week, team size…"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="referral" className="mb-1.5 block text-sm font-medium">
          How did you get to know about us?
        </label>
        <select
          id="referral"
          name="referral_source"
          required
          defaultValue=""
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            Select one…
          </option>
          {SOURCES.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      {state === "error" && errorMessage && (
        <p className="block text-xs text-accent">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={state === "submitting"}
        size="lg"
        className="w-full disabled:cursor-wait disabled:opacity-60"
      >
        {state === "submitting" ? "Claiming…" : "Claim free demo"}
      </Button>
    </motion.form>
  );
}
