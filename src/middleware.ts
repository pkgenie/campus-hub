import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// Edge Runtime: Cannot use next-auth. Check for session token in cookies instead.
export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__Secure-next-auth.session-token')?.value
  const isAuthPage = req.nextUrl.pathname === '/sign-in'
  const requiresAuth = req.nextUrl.pathname.startsWith('/create') || req.nextUrl.pathname.startsWith('/dashboard')
  
  // Redirect authenticated users away from auth pages
  if (isAuthPage && sessionToken) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
  
  // Redirect unauthenticated users to sign-in
  if (requiresAuth && !sessionToken) {
    const url = new URL('/sign-in', req.url)
    url.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = { matcher: ['/create/:path*', '/dashboard', '/sign-in'] }
