/** Timeline ruler with a crimson playhead — the divider between home sections. */
export default function Ruler({ pos = "38%", tc = "00:02:14:08" }: { pos?: string; tc?: string }) {
  const ticks = Array.from({ length: 61 }, (_, i) => i);
  const labels = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00"];
  return (
    <div aria-hidden className="box-border w-full bg-bg px-6 font-mono text-dim lg:px-10">
      <div className="relative mx-auto h-14 max-w-[1440px] overflow-x-clip border-y border-line-2">
        <div className="absolute inset-x-0 top-0 flex h-[22px] items-start justify-between">
          {ticks.map((i) => {
            const big = i % 10 === 0;
            const mid = i % 5 === 0;
            return (
              <span
                key={i}
                className={`w-px ${i % 2 && !mid ? "max-sm:hidden" : ""}`}
                style={{ height: big ? 14 : mid ? 9 : 5, background: big ? "#565B74" : "#33384E" }}
              />
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-2 flex justify-between text-[10px]">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div data-fx="playhead" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-px -bottom-px w-0.5 bg-crimson shadow-[0_0_14px_rgba(255,92,112,0.7)]" style={{ left: pos }} />
          <div className="absolute -top-1.5 h-2.5 w-3 rounded-[2px] bg-crimson" style={{ left: `calc(${pos} - 5px)` }} />
          <span className="absolute top-[18px] text-[10px] whitespace-nowrap text-red" style={{ left: `calc(${pos} + 8px)` }}>
            {tc}
          </span>
        </div>
      </div>
    </div>
  );
}
