import Image from "next/image";

/** App icon + white wordmark, as on the brand sheet. Decorative: the parent link carries the label. */
export default function BrandLockup({ icon = 28 }: { icon?: number }) {
  const wordH = Math.round(icon * 0.72);
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/brand/broll-icon.png"
        alt=""
        width={icon}
        height={icon}
        priority
        style={{ width: icon, height: icon, borderRadius: icon / 4 }}
      />
      <Image
        src="/brand/broll-wordmark.png"
        alt=""
        width={Math.round(wordH * 3.65)}
        height={wordH}
        priority
        style={{ width: Math.round(wordH * 3.65), height: wordH }}
      />
    </span>
  );
}
