"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Check } from "lucide-react";
import Button from "@/components/ui/button";

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors duration-300 focus:border-accent";

const SOURCES = [
  "YouTube",
  "Instagram",
  "X / Twitter",
  "Google search",
  "A friend or colleague",
  "Other",
];

/** Production-house demo request, submitted to Formspree. */
export default function ClaimForm() {
  const [state, handleSubmit] = useForm("mdaqgenb");

  if (state.succeeded) {
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
          We&apos;ll reach out within 24 hours to set up Broll for your
          production house.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
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
        <ValidationError
          field="production_house"
          errors={state.errors}
          className="mt-1 block text-xs text-accent"
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
        <ValidationError
          field="name"
          errors={state.errors}
          className="mt-1 block text-xs text-accent"
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
        <ValidationError
          field="email"
          errors={state.errors}
          className="mt-1 block text-xs text-accent"
        />
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
        <ValidationError
          field="channel_link"
          errors={state.errors}
          className="mt-1 block text-xs text-accent"
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
        <ValidationError
          field="details"
          errors={state.errors}
          className="mt-1 block text-xs text-accent"
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
        <ValidationError
          field="referral_source"
          errors={state.errors}
          className="mt-1 block text-xs text-accent"
        />
      </div>

      <ValidationError errors={state.errors} className="block text-xs text-accent" />

      <Button
        type="submit"
        disabled={state.submitting}
        size="lg"
        className="w-full disabled:cursor-wait disabled:opacity-60"
      >
        {state.submitting ? "Claiming…" : "Claim free demo"}
      </Button>
    </motion.form>
  );
}
