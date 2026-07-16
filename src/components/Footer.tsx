import Link from "next/link";
import LogoMark from "@/components/Logo";
import { projects } from "@/lib/projects";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/8">
      <div
        aria-hidden
        className="h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2.5 text-lg font-semibold">
            <LogoMark className="size-5 text-frost" />
            <span>
              Adarpan <span className="text-violet-400">Labs</span>
            </span>
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">
            आदर्पण — a mirror to the things we build. A creative tools studio
            shipping software that actually works.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-mist uppercase">
            Products
          </p>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className="hover:text-frost">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.accessway.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-frost"
              >
                accessway.xyz ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-mist uppercase">
            About
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
            <em>Darpan</em> (दर्पण) is Hindi for mirror — Adarpan Labs is where
            our work is reflected honestly: what it does and who it&apos;s for.
          </p>
          <p className="mt-3 text-sm">
            <Link href="/contact" className="text-violet-300 hover:text-violet-200">
              Contact us →
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-mist/70">
        © {new Date().getFullYear()} Adarpan Labs. Built with Next.js.
      </div>
    </footer>
  );
}
