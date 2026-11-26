import type { MockKind } from "@/components/v2/ProductMock";

export interface Product {
  kind: MockKind;
  short: string;
  platform: string;
  status: string;
  name: string;
  live: boolean;
  desc: string;
  bullets: string[];
}

export const PRODUCTS: Product[] = [
  {
    kind: "windows",
    short: "Windows",
    platform: "WINDOWS APP",
    status: "LIVE NOW",
    name: "Broll for Windows",
    live: true,
    desc: "Broll as a desktop app for Windows, working on footage straight from your drives.",
    bullets: ["Works on footage from your local drives", "The same agent as Chat", "Export an MP4, or XML for your editor"],
  },
  {
    kind: "mac",
    short: "Mac",
    platform: "MAC APP",
    status: "LIVE NOW",
    name: "Broll for Mac",
    live: true,
    desc: "Broll native on macOS, built for large local libraries and fast turnarounds on social formats.",
    bullets: [
      "Works on large local footage libraries",
      "Cut versions for every aspect ratio from one prompt",
      "Export an MP4, or XML for your editor",
    ],
  },
  {
    kind: "resolve",
    short: "DaVinci Resolve",
    platform: "PLUGIN · MAC + WINDOWS",
    status: "LIVE NOW",
    name: "Broll for DaVinci Resolve",
    live: true,
    desc: "A Broll chat panel docked inside DaVinci Resolve Studio. Ask for an edit without leaving Resolve.",
    bullets: [
      "Docks as a panel inside DaVinci Resolve Studio",
      "Runs on both Mac and Windows",
      "Keep grading and finishing in Resolve",
    ],
  },
  {
    kind: "chat",
    short: "Chat",
    platform: "WEB",
    status: "LIVE NOW",
    name: "Broll Chat",
    live: true,
    desc: "The full Broll agent in your browser at chat.trybroll.com. Upload footage or paste a YouTube link, describe the edit, and review the cut.",
    bullets: [
      "Nothing to install, works in any modern browser",
      "Reference-style editing and YouTube clipping included",
      "Export an MP4, or XML for Premiere Pro, Resolve or Final Cut Pro",
    ],
  },
];
