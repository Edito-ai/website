import { after, NextRequest, NextResponse } from "next/server";
import { recordDownload } from "@/lib/db";
import { APP_INSTALLERS, RESOLVE_INSTALLERS } from "@/lib/downloads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BOTS = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|headless|monitor|curl|wget|python|node-fetch|axios/i;

/** The page that led to the download: the path for our own pages, only the host name for other sites. */
function referrer(request: NextRequest): string | null {
  try {
    const url = new URL(request.headers.get("referer") ?? "");
    return url.host === request.nextUrl.host ? url.pathname.slice(0, 120) : url.host.slice(0, 120);
  } catch {
    return null;
  }
}

/** /dl/<installer id>: counts the download, then sends the browser to the file. Counting never delays or blocks it. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = [...APP_INSTALLERS, ...RESOLVE_INSTALLERS].find((i) => i.id === id);
  if (!item) return NextResponse.redirect(new URL("/download", request.url), 302);

  const agent = request.headers.get("user-agent") ?? "";
  const prefetch = /prefetch|prerender/i.test(request.headers.get("sec-purpose") ?? request.headers.get("purpose") ?? "");
  if (request.method === "GET" && agent && !BOTS.test(agent) && !prefetch) {
    const row = {
      installer: item.id,
      version: item.version,
      country: request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry"),
      referrer: referrer(request),
    };
    after(() => recordDownload(row).catch((err) => console.error("Failed to record a download:", err)));
  }

  const res = NextResponse.redirect(item.file, 302);
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
