import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Adarpan Labs — questions, feedback, or collaboration ideas for Adarpan Cut and AccessWay.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgb(139_92_246/0.16),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            Talk to the{" "}
            <span className="animate-gradient-x bg-linear-to-r from-violet-400 via-fuchsia-400 to-teal-400 bg-size-[200%_auto] bg-clip-text text-transparent">
              lab
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-mist">
            Bug reports, feature ideas, accessibility feedback, collaboration —
            all of it lands in the same inbox, and all of it gets read.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1fr_20rem]">
        <div className="card-surface p-8">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card-surface p-6">
            <p className="text-xs font-semibold tracking-widest text-mist uppercase">
              Email
            </p>
            <a
              href="mailto:solankishaab17@gmail.com"
              className="mt-2 block break-all text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              solankishaab17@gmail.com
            </a>
          </div>
          <div className="card-surface p-6">
            <p className="text-xs font-semibold tracking-widest text-mist uppercase">
              Try the products
            </p>
            <a
              href="https://www.accessway.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm font-medium text-teal-300 hover:text-teal-200"
            >
              accessway.xyz ↗
            </a>
            <p className="mt-2 text-xs text-mist">
              Adarpan Cut is a desktop app — reach out for a build.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
