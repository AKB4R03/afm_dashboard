import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayload } from "./lib";

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // ✅ Redirect user yang udah login dari /login ke /dashboard
  if (pathname === "/") {
    const token = (await cookies()).get("token");
    if (token) {
      try {
        await readPayload(token.value);
        return NextResponse.redirect(new URL("/article", request.url));
      } catch (err) {
        // Token invalid, biarin aja ke login
      }
    }
  }

  const isApi = pathname.startsWith("/api");
  const isAuthRoute =
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/register");

  if (isApi && !isAuthRoute) {
    const token = (await cookies()).get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const tokenData = await readPayload<{ id: string; email: string }>(
        token.value
      );

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", tokenData.id);
      requestHeaders.set("x-user-email", tokenData.email);

      return NextResponse.next({ headers: requestHeaders });
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
};

export default middleware;
