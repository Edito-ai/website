"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase";

// Fires a page_view on every route change. The App Router does client-side
// navigation, so there's no full page load for Firebase's default
// auto page-view tracking to hook into.
export default function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname;

    getFirebaseAnalytics().then((analytics) => {
      if (!analytics) return;
      logEvent(analytics, "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    });
  }, [pathname, searchParams]);

  return null;
}
