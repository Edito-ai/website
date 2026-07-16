"use client";

import { useState } from "react";

const CONTACT_EMAIL = "solankishaab17@gmail.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("General");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[Adarpan Labs] ${topic} — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-frost placeholder:text-mist/60 outline-none transition-colors focus:border-violet-500/60";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-widest text-mist uppercase">
            Your name
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            className={inputClasses}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-widest text-mist uppercase">
            Topic
          </span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={inputClasses}
          >
            <option>General</option>
            <option>Adarpan Cut</option>
            <option>AccessWay</option>
            <option>Collaboration</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-widest text-mist uppercase">
          Message
        </span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what's on your mind…"
          className={inputClasses}
        />
      </label>

      <button
        type="submit"
        className="rounded-full bg-linear-to-r from-violet-600 to-purple-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-[1.04]"
      >
        Send message →
      </button>
      <p className="text-xs text-mist">
        Submitting opens your email app with everything pre-filled — nothing is
        sent behind your back.
      </p>
    </form>
  );
}
