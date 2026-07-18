import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

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
  title: {
    default: "Broll — The AI editor that finishes videos before you do",
    template: "%s — Broll",
  },
  description:
    "Broll understands your footage, builds the narrative, edits every scene, creates captions, transitions, sound design and exports production-ready videos — without timelines.",
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
