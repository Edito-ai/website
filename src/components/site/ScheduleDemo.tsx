"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "broll/30min";
const CAL_NAMESPACE = "schedule-demo";

export default function ScheduleDemo() {
  useEffect(() => {
    let mounted = true;

    async function setupCal() {
      const cal = await getCalApi({
        namespace: CAL_NAMESPACE,
      });

      if (!mounted) return;

      cal("ui", {
        theme: "dark",
        layout: "month_view",
        hideEventTypeDetails: true,

        styles: {
          branding: {
            brandColor: "#3c5eff",
          },
        },
      });
    }

    setupCal();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-transparent">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{
          width: "100%",
          height: "680px",
          minHeight: "680px",
          overflow: "hidden",
          border: "0",
          outline: "none",
          background: "transparent",
        }}
        config={{
          layout: "month_view",
          theme: "dark",
          hideEventTypeDetails: "true",
        }}
      />
    </div>
  );
}