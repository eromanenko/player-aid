import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['uk', 'en', 'ru'];
const defaultLocale = 'uk';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, public files)
    '/((?!api|_next/static|_next/image|favicon.ico|icon.*|manifest.json|sw.js|workbox-.*).*)',
  ],
};
