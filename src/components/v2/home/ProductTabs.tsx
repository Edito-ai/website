"use client";

import { useState } from "react";
import Link from "next/link";
import ProductMock from "@/components/v2/ProductMock";
import { ArrowRight, CHAT_URL, CheckList } from "@/components/v2/ui";
import { PRODUCTS } from "@/lib/products";

export default function ProductTabs() {
  const [tab, setTab] = useState(PRODUCTS[0].kind);
  const active = PRODUCTS.find((p) => p.kind === tab) ?? PRODUCTS[0];

  return (
    <>
      <div
        role="tablist"
        aria-label="Broll products"
        className="flex flex-wrap justify-center gap-1.5 rounded-[20px] border border-line bg-surface p-1.5"
      >
        {PRODUCTS.map((p) => {
          const on = p.kind === tab;
          return (
            <button
              key={p.kind}
              type="button"
              role="tab"
              id={`tab-${p.kind}`}
              aria-controls="product-panel"
              aria-selected={on}
              onClick={() => setTab(p.kind)}
              className={
                "inline-flex min-h-14 cursor-pointer items-center rounded-[14px] border-0 px-[22px] text-left transition-colors " +
                (on ? "bg-ink text-bg" : "bg-transparent text-ink-2 hover:bg-[#181A27]")
              }
            >
              <span className="flex flex-col items-start gap-0.5">
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
                  {p.short}
                  <span
                    className={
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold " +
                      (p.live ? "bg-crimson text-white" : on ? "border border-line-3 text-[#41465E]" : "border border-line-3 text-soft")
                    }
                  >
                    {p.live ? "Live" : "Soon"}
                  </span>
                </span>
                <span className="font-mono text-[11px] opacity-75">{p.platform}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="product-panel"
        aria-labelledby={`tab-${active.kind}`}
        className="box-border flex w-full flex-wrap items-center gap-10 rounded-[28px] border border-line bg-surface-2"
        style={{ padding: "clamp(20px, 3vw, 40px)" }}
      >
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
          <span className="self-start rounded-md bg-wine px-2.5 py-[5px] font-mono text-[11px] text-red">
            {active.platform} · {active.status}
          </span>
          <h3 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.08] font-semibold tracking-[-0.035em]">{active.name}</h3>
          <p className="m-0 text-base leading-[1.65] text-soft">{active.desc}</p>
          <CheckList items={active.bullets} />
          <div className="mt-1 flex flex-wrap gap-2.5">
            {active.live ? (
              <a href={CHAT_URL} className="btn btn-primary min-h-12 px-[22px] text-[15px]">
                Open Chat
                <ArrowRight />
              </a>
            ) : (
              <>
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-12 items-center rounded-full border border-dashed border-line-3 px-5 text-[15px] font-medium text-soft"
                >
                  Coming soon
                </span>
                <a href={CHAT_URL} className="btn btn-primary min-h-12 px-[22px] text-[15px]">
                  Use Chat now
                </a>
              </>
            )}
          </div>
          <Link href="/product#compare" className="link-arrow self-start text-sm">
            Compare all products →
          </Link>
        </div>
        <div className="min-w-0 flex-[999_1_560px]">
          <ProductMock kind={active.kind} />
        </div>
      </div>
    </>
  );
}
