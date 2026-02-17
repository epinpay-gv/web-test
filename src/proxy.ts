import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from 'next/server';

// Token'ın süresi dolmuş mu kontrol et
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp;
  } catch {
    return true;
  }
}

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken || !isTokenExpired(accessToken)) {
    return intlMiddleware(request);
  }

  if (refreshToken) {
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

        const response = intlMiddleware(request);

        response.cookies.set('accessToken', data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60,
          path: '/',
        });

        if (data.refreshToken) {
          response.cookies.set('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
        }

        return response;
      }
    } catch (error) {
      console.error('[Proxy] Refresh başarısız:', error);
    }
  }

  const response = intlMiddleware(request);
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};