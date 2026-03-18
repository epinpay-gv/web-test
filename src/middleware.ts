import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from 'next/server';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Math.floor(Date.now() / 1000) >= payload.exp;
  } catch {
    return true;
  }
}

function getTokenPayload(token: string): { role?: string; exp?: number } | null {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const intlMiddleware = createMiddleware(routing);

// Route pattern matchers — locale prefix opsiyonel (localePrefix: "as-needed")
// PRIVATE_ROUTE: (private) altındaki tüm rotalar — /user ve /store
const PRIVATE_ROUTE = /^(\/[a-z]{2})?\/(user|store)(\/|$)/;
const STORE_ROUTE = /^(\/[a-z]{2})?\/store(\/|$)/;
const LOGIN_ROUTE = /^(\/[a-z]{2})?\/login(\/|$)/;

// Pathname'den locale'i çıkar (yoksa defaultLocale kullan)
function getLocaleFromPath(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})\//);
  return match ? match[1] : 'tr';
}

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/.well-known")) return NextResponse.json({}, { status: 404 });
  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  let refreshedResponse: NextResponse | null = null;

  // ── Token Refresh (sadece JWT formatındaki tokenlar için) ──
  if (accessToken && isTokenExpired(accessToken) && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${request.nextUrl.origin}/api/auth/refresh`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        accessToken = data.accessToken;

        refreshedResponse = intlMiddleware(request);
        refreshedResponse.cookies.set('accessToken', data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60,
          path: '/',
        });
        if (data.refreshToken) {
          refreshedResponse.cookies.set('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
        }
      }
    } catch (error) {
      console.error('[Middleware] Refresh Token işlemi başarısız:', error);
    }
  }

  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPath(pathname);
  
  // Güvenli: httpOnly cookie'den token payload'unu al
  const tokenPayload = accessToken ? getTokenPayload(accessToken) : null;
  const isLoggedIn = !!tokenPayload && !isTokenExpired(accessToken!);
  const userRole = tokenPayload?.role || '';

  // ── Auth Guard: Login olmayan kullanıcılar /user veya /store altına erişemez ──
  if (PRIVATE_ROUTE.test(pathname) && !isLoggedIn) return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  
  // ── Role Guard: store rolü olmayan kullanıcılar /store altına erişemez ──
  if (STORE_ROUTE.test(pathname) && isLoggedIn && userRole !== 'store') return NextResponse.redirect(new URL(`/${locale}/user`, request.url));
  
  // ── Login Redirect: Giriş yapmış kullanıcı /login'e gidemez ──
  if (LOGIN_ROUTE.test(pathname) && isLoggedIn) return NextResponse.redirect(new URL(`/${locale}/user`, request.url));
  
  // Eğer token refresh yapıldıysa, o response'u döndür
  if (refreshedResponse) return refreshedResponse;
  
  // Token varsa ama expired ise → Cookie temizleme
  if (accessToken && isTokenExpired(accessToken)) {
    const response = intlMiddleware(request);
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

