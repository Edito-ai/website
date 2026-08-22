"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Falls back to a placeholder link if NEXT_PUBLIC_CAL_LINK isn't set yet.
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "broll/30min";
const CAL_NAMESPACE = "schedule-demo";

/** Inline Cal.com booking widget — picks a real open slot, no back-and-forth email. */
export default function ScheduleDemo() {
  useEffect(() => {
    (async function run() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: {
          branding: { brandColor: "#3c5eff" },
        },
      });
    })();
  }, []);

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lift)]">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", minHeight: "680px", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
