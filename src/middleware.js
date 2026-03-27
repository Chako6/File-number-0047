import { NextResponse } from 'next/server'

const LOCALES = ['en', 'tr']

export function middleware(request) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|.*\\..*).*)'],
}
