import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayload } from "./lib";

const PUBLIC_PATHS = ["/", "/article", "/api/article"];

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Allow public access to /article, /article/[slug], /api/article, /api/article/[slug]
  const isPublicArticlePage =
    url === "/article" || /^\/article\/[^/]+$/.test(url);
  const isPublicArticleApi =
    url === "/api/article" || /^\/api\/article\/[^/]+$/.test(url);

  // Jika akses ke dashboard-pages (private)
  const isDashboardPage = url.startsWith("/add-article");

  // Jika akses ke halaman public, langsung lolos
  if (PUBLIC_PATHS.includes(url) || isPublicArticlePage || isPublicArticleApi) {
    return NextResponse.next();
  }

  // Jika akses ke dashboard-pages, cek token
  if (isDashboardPage) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      // Redirect ke halaman /article jika belum login
      return NextResponse.redirect(new URL("/article", request.url));
    }
    try {
      await readPayload(token.value);
      return NextResponse.next();
    } catch (err) {
      // Token tidak valid, redirect ke /article
      return NextResponse.redirect(new URL("/article", request.url));
    }
  }

  // Untuk API selain /api/article, tetap cek token (jika ada API private lain)
  if (url.startsWith("/api") && !isPublicArticleApi) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      return NextResponse.json(
        { statusCode: 401, error: "Unauthorized" },
        { status: 401 }
      );
    }
    try {
      await readPayload(token.value);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json(
        { statusCode: 401, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // Default: allow
  return NextResponse.next();
}
