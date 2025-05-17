import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayload } from "./lib";

const middleware = async (request: NextRequest) => {
  const url = request.nextUrl.pathname;

  // Allow public access to /api/article and /api/article/[slug]
  const isPublicArticleApi =
    url === "/api/article" || /^\/api\/article\/[^/]+$/.test(url);

  if (request.url.includes("/api") && !isPublicArticleApi) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = await readPayload<{ id: string; email: string }>(
      token.value
    );

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};

export default middleware;
