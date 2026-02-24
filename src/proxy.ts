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

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/.well-known")) {
    return NextResponse.json({}, { status: 404 });
  }

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
      console.error('[Middleware] Refresh Token işlemi başarısız:', error);
    }
  }

  const response = intlMiddleware(request);
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
<<<<<<< HEAD
};



// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const intlMiddleware = createMiddleware(routing);

// export default function proxy(request: NextRequest) {
//   const token = request.cookies.get("access_token")?.value;

//   const pathname = request.nextUrl.pathname;
 
//   const isPrivateRoute = pathname.match(/^\/[a-z]{2}\/user/);
//   const isLoginPage = pathname.match(/^\/[a-z]{2}\/login/);

//   if (isPrivateRoute && !token) {
//     const locale = pathname.split("/")[1];
//     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
//   }

//   if (isLoginPage && token) {
//     const locale = pathname.split("/")[1];
//     return NextResponse.redirect(new URL(`/${locale}/user`, request.url));
//   }


//   return intlMiddleware(request);
// }

// export const config = {
//   matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };
=======
};
>>>>>>> development
