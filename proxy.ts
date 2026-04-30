import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxy, Security & Middleware (renamed from middleware in Next.js 16)
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Simple request logging
  console.log(`[Middleware] ${request.method} ${request.nextUrl.pathname}`);

  return response;
}

// Apply to all routes except static files and api
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
