import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
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
