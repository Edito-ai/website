import Image from "next/image";
import { cn } from "@/lib/utils";

export const CLIPS = {
  // Generated in Gemini (2026-11): 16:9 = interview, set, city · 9:16 = podcast, streamer, creator
  interview: "/clips/gen_interview.webp",
  podcast: "/clips/gen_podcast.webp",
  streamer: "/clips/gen_streamer.webp",
  creator: "/clips/gen_creator.webp",
  set: "/clips/gen_set.webp",
  city: "/clips/gen_city.webp",
  hands: "/clips/cu_hands.webp",
  drone: "/clips/drone_04.webp",
} as const;

/**
 * A real footage frame that fills its (relatively positioned) parent.
 * `tint` lays the ink gradient over it so overlay text stays readable.
 */
export default function Shot({
  src,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  position = "center",
  tint = true,
  priority,
  className,
}: {
  src: string;
  sizes?: string;
  position?: string;
  tint?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        style={{ objectPosition: position }}
      />
      {tint && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,9,15,0.35) 0%, rgba(8,9,15,0) 30%, rgba(8,9,15,0) 60%, rgba(8,9,15,0.55) 100%)" }}
        />
      )}
    </>
  );
}
