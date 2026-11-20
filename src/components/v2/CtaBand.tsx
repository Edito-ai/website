import { Btn, CHAT_URL } from "@/components/v2/ui";

export default function CtaBand({
  heading = "Your next first cut is minutes away.",
  secondaryLabel = "Explore the product",
  secondaryHref = "/product",
}: {
  heading?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="w-full bg-bg px-6 py-24 lg:px-10">
      <div
        data-fx="zoom"
        className="relative mx-auto box-border flex max-w-[1440px] flex-col items-center gap-[26px] overflow-hidden rounded-[32px] border border-line-strong bg-surface-2 text-center"
        style={{
          backgroundImage:
            "linear-gradient(#151722 1px, transparent 1px), linear-gradient(90deg, #151722 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          padding: "clamp(48px, 8vw, 112px) clamp(24px, 5vw, 80px) clamp(72px, 9vw, 120px)",
        }}
      >
        <div
          aria-hidden
          className="absolute top-[40%] left-1/2 h-[520px] w-[900px] max-w-[180%] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(closest-side, rgba(190,30,52,0.3), rgba(190,30,52,0) 70%)" }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-10 gap-[3px] pb-3 opacity-60">
          <div className="flex-[0_0_12%] rounded-[3px] bg-[#1D2030]" />
          <div className="flex-[0_0_20%] rounded-[3px] bg-[#232638]" />
          <div className="flex-[0_0_9%] rounded-[3px] bg-[#1D2030]" />
          <div className="flex-[0_0_26%] rounded-[3px] bg-[#232638]" />
          <div className="flex-1 rounded-[3px] bg-[#1D2030]" />
        </div>
        <div aria-hidden className="absolute inset-y-0 right-[22%] w-0.5 bg-crimson" />
        <span data-reveal className="relative font-mono text-[13px] text-red">● TC 00:12 — FIRST CUT</span>
        <h2 className="relative m-0 max-w-[980px] text-[clamp(40px,7vw,100px)] leading-[0.98] font-semibold tracking-[-0.055em] text-balance">
          {heading}
        </h2>
        <p data-reveal className="relative m-0 max-w-[540px] text-lg leading-relaxed text-soft">
          Upload your footage, describe the edit in Chat, and get a first cut back.
        </p>
        <div data-reveal className="relative mb-6 flex flex-wrap justify-center gap-3">
          <Btn href={CHAT_URL} className="min-h-14 px-[30px] shadow-[0_12px_40px_-8px_rgba(190,30,52,0.6)]">
            Chat with Broll
          </Btn>
          <Btn href={secondaryHref} variant="ghost">
            {secondaryLabel}
          </Btn>
        </div>
      </div>
    </section>
  );
}
