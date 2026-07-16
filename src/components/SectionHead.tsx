import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/fx/Reveal";

/** Standardized section header: eyebrow → display title → one-sentence lede. */
export default function SectionHead({
  eyebrow,
  title,
  lede,
  color = "violet",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  color?: "violet" | "teal";
}) {
  return (
    <Reveal variant="left">
      {eyebrow && <Eyebrow color={color}>{eyebrow}</Eyebrow>}
      <h2 className={`${eyebrow ? "mt-4" : ""} max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl`}>
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-2xl leading-relaxed text-mist">{lede}</p>}
    </Reveal>
  );
}
