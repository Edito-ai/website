// Every installer link, shared by /download and /product so a new release is
// changed in one place.

const RELEASES = "https://github.com/Edito-ai/broll-downloads";
const APP_RELEASE = `${RELEASES}/releases/download/v1.0.0`;

export interface Installer {
  id: "windows" | "mac" | "resolve-windows" | "resolve-mac";
  /** Card heading on /download. */
  name: string;
  /** Button text. */
  label: string;
  /** Where the button points: the counting redirect. */
  href: string;
  /** The installer file itself. */
  file: string;
  version: string;
  requires: string;
  size: string;
  /** What to do if the OS warns about the installer. */
  note: string;
}

/** A button points at /dl/<id> (src/app/dl/[id]/route.ts), which counts the download and redirects to `file`. */
const tracked = (items: Omit<Installer, "href">[]): Installer[] => items.map((i) => ({ ...i, href: `/dl/${i.id}` }));

export const APP_INSTALLERS: Installer[] = tracked([
  {
    id: "windows",
    name: "Broll for Windows",
    label: "Download for Windows",
    file: `${APP_RELEASE}/Broll-1.0.0-win-x64.exe`,
    version: "1.0.0",
    requires: "Windows 64-bit",
    size: "360 MB",
    note: "Windows may show a SmartScreen notice. Click More info, then Run anyway.",
  },
  {
    id: "mac",
    name: "Broll for Mac",
    label: "Download for Mac",
    file: `${APP_RELEASE}/Broll-1.0.0-mac-arm64.dmg`,
    version: "1.0.0",
    requires: "Apple Silicon (M1 or later)",
    size: "464 MB",
    note: "If macOS blocks the app, open System Settings, go to Privacy & Security, and click Open Anyway.",
  },
]);

export const RESOLVE_INSTALLERS: Installer[] = tracked([
  {
    id: "resolve-windows",
    name: "Resolve plugin for Windows",
    label: "Download for Windows",
    file: `${RELEASES}/raw/main/BrollAI-Setup-0.3.1.exe`,
    version: "0.3.1",
    requires: "DaVinci Resolve Studio",
    size: "44 MB",
    note: "Windows may show a SmartScreen notice. Click More info, then Run anyway.",
  },
  {
    id: "resolve-mac",
    name: "Resolve plugin for Mac",
    label: "Download for Mac",
    file: `${RELEASES}/releases/download/v0.3.1/BrollAI-0.3.1.pkg`,
    version: "0.3.1",
    requires: "DaVinci Resolve Studio",
    size: "475 MB",
    note: "If macOS blocks it, right-click the file and choose Open.",
  },
]);
