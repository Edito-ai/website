import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Broll AI | Agentic AI Video Editor (Official Site)",
    template: "%s — Broll",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "AI video editor",
    "AI video editing software",
    "agentic video editing",
    "autonomous video editing",
    "AI video editing software",
    "automatic video editing",
    "AI captions",
    "AI color grading",
    "export XML to Premiere Pro",
    "video editing without timelines",
    "AI video search",
    "semantic video search",
    "AI clip finder",
    "search inside videos",
    "AI b-roll",
  ],
  category: "technology",
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Broll AI | Agentic AI Video Editor (Official Site)",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Broll AI | Agentic AI Video Editor (Official Site)",
    description: SITE_DESCRIPTION,
  },
  // Search Console / Bing Webmaster ownership. Set the env vars in Vercel —
  // undefined values are simply omitted from the head.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="font-sans">
        <div aria-hidden className="bg-grain pointer-events-none fixed inset-0 z-50" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
