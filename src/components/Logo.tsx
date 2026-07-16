/**
 * The Adarpan Labs "A" mark: the right leg of the A carries the apex, the left
 * leg is detached and truncated — a vector recreation of the brand logo.
 * Inherits its color from `currentColor`; size it with className.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden fill="currentColor" className={className}>
      <path d="M40 8 L58 8 L92 92 L74 92 Z" />
      <path d="M26 50 L44 38 L30 92 L8 92 Z" />
    </svg>
  );
}
