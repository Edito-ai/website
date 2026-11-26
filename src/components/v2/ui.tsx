import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const CHAT_URL = "https://chat.trybroll.com";

/** The site's main call to action: every big button leads here. */
export const DOWNLOAD_CTA = { href: "/download", label: "Download Broll" };
/** Chat is the second choice: always an outline button or a text link beside Download. */
export const CHAT_CTA = { href: CHAT_URL, label: "Chat with Broll" };

export function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}

/** Section opener: timecode eyebrow → headline → optional lede. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  center,
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  center?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-[720px] flex-col gap-3.5",
        center && "mx-auto items-center text-center",
        className,
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="h-section">
        {title}
      </h2>
      {lede && <p className="m-hide m-0 text-[17px] leading-relaxed text-soft md:text-lg">{lede}</p>}
    </div>
  );
}

/** Link button — internal routes use next/link, external URLs a plain anchor. */
export function Btn({
  href,
  children,
  variant = "primary",
  size,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm";
  className?: string;
}) {
  const cls = cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", size === "sm" && "btn-sm", className);
  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} className="link-arrow">
      {children} →
    </a>
  ) : (
    <Link href={href} className="link-arrow">
      {children} →
    </Link>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF5C70"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("mt-0.5 shrink-0", className)}
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5 text-[15px] leading-normal text-ink-2">
          <Check />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Inner-page hero: eyebrow, H1, lede and the two standard CTAs. */
export function PageIntro({
  eyebrow,
  title,
  lede,
  primary = DOWNLOAD_CTA,
  secondary = { href: "/#film", label: "Watch the teaser", play: true },
  center,
  size = "md",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  primary?: { href: string; label: string } | null;
  secondary?: { href: string; label: string; play?: boolean } | null;
  center?: boolean;
  size?: "md" | "lg";
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "mx-auto box-border flex max-w-[1440px] flex-col gap-[26px] px-6 lg:px-10 pt-20 pb-16 md:pt-[100px] md:pb-[72px]",
        center && "items-center text-center",
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h1
        className={cn(
          "m-0 max-w-[1080px] font-semibold text-balance",
          size === "lg"
            ? "text-[clamp(44px,7vw,104px)] leading-[0.98] tracking-[-0.05em]"
            : "text-[clamp(40px,5.8vw,80px)] leading-[1.02] tracking-[-0.045em]",
        )}
      >
        {title}
      </h1>
      {lede && <p className="m-0 max-w-[680px] text-lg leading-[1.55] text-soft md:text-[19px]">{lede}</p>}
      {(primary || secondary) && (
        <div data-reveal className={cn("flex flex-wrap gap-3", center && "justify-center")}>
          {primary && (
            <Btn href={primary.href}>
              {primary.href === DOWNLOAD_CTA.href && <DownloadIcon />}
              {primary.label}
            </Btn>
          )}
          {primary?.href === DOWNLOAD_CTA.href && (
            <Btn href={CHAT_CTA.href} variant="ghost">
              {CHAT_CTA.label}
            </Btn>
          )}
          {secondary && (
            <Btn href={secondary.href} variant="ghost">
              {secondary.play && <PlayIcon />}
              {secondary.label}
            </Btn>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

/** Full-bleed tinted band with hairlines top and bottom. */
export function Band({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={cn("border-y border-line-2 bg-bg-2", className)}>
      {children}
    </section>
  );
}

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto box-border max-w-[1440px] px-6 lg:px-10", className)}>{children}</div>;
}
