import { cn } from "@/lib/utils";

// The uploaded mark is pure white on transparency, so it's applied as a
// CSS mask filled with currentColor — the one asset adapts to any surface
// (ink on light, white on dark) without ever being redrawn.
const maskStyle: React.CSSProperties = {
  maskImage: "url(/broll-logo.png)",
  WebkitMaskImage: "url(/broll-logo.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

export default function BrollLogo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Broll"
      style={maskStyle}
      className={cn("inline-block aspect-square bg-current", className)}
    />
  );
}
