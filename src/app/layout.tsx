import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import Link from 'next/link'
import { auth } from '@/lib/auth-server'

export const metadata: Metadata = { 
  title: 'CampusHub', 
  description: 'Class knowledge hub' 
}

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Providers>
          <nav className="border-b sticky top-0 bg-white/80 backdrop-blur z-50">
            <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-4">
              <Link href="/" className="font-semibold">
                CampusHub
              </Link>
              <Link href="/blog" className="text-sm text-gray-600">
                Blog
              </Link>
              <Link href="/tutor" className="text-sm text-gray-600">
                Tutor Buddy
              </Link>
              <div className="flex-1" />
              <Link href="/create/post" className="text-sm border rounded px-3 py-1">
                New Post
              </Link>
              {session?.user ? (
                <span className="text-sm">
                  Hi, {session.user.name ?? session.user.email}
                </span>
              ) : (
                <Link href="/sign-in" className="text-sm">
                  Sign in
                </Link>
              )}
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  )
}
