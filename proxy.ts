import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Legacy URL compatibility:
 * - `/blog?series=…` → `/blog/series/…`
 * - `/blog/<slug>` (old post URLs) → `/blog/post/<slug>` (excluding `post` and `series` segments)
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === "/blog") {
    const series = url.searchParams.get("series");
    if (series !== null && series.trim() !== "") {
      const next = url.clone();
      next.pathname = `/blog/series/${encodeURIComponent(series.trim())}`;
      next.searchParams.delete("series");
      return NextResponse.redirect(next, 308);
    }
    return NextResponse.next();
  }

  const legacyPost = url.pathname.match(/^\/blog\/([^/]+)$/);
  if (legacyPost !== null) {
    const seg = legacyPost[1];
    if (seg !== "post" && seg !== "series") {
      const next = url.clone();
      next.pathname = `/blog/post/${seg}`;
      return NextResponse.redirect(next, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
