const colors = {
  violet: "border-violet-500/25 bg-violet-500/10 text-violet-300",
  teal: "border-teal-500/25 bg-teal-500/10 text-teal-300",
} as const;

const dots = {
  violet: "bg-violet-400",
  teal: "bg-teal-400",
} as const;

export default function Eyebrow({
  children,
  color,
}: {
  children: React.ReactNode;
  color: keyof typeof colors;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-widest uppercase ${colors[color]}`}
    >
      <span aria-hidden className={`size-1.5 shrink-0 animate-pulse rounded-full ${dots[color]}`} />
      {children}
    </span>
  );
}
