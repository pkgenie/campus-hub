import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const session = await auth()
  const requiresAuth = req.nextUrl.pathname.startsWith('/create') || req.nextUrl.pathname.startsWith('/dashboard')
  if (requiresAuth && !session) {
    const url = new URL('/sign-in', req.url)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/create/:path*', '/dashboard'] }
