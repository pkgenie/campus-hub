import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// Edge Runtime: Cannot use next-auth. Check for session token in cookies instead.
export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__Secure-next-auth.session-token')?.value
  const requiresAuth = req.nextUrl.pathname.startsWith('/create') || req.nextUrl.pathname.startsWith('/dashboard')
  if (requiresAuth && !sessionToken) {
    const url = new URL('/sign-in', req.url)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/create/:path*', '/dashboard'] }
