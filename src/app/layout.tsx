import './globals.css'
import type { Metadata } from 'next'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export const metadata: Metadata = { title: 'CampusHub', description: 'Class knowledge hub' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <nav className="border-b sticky top-0 bg-white/80 backdrop-blur z-50">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-4">
            <Link href="/" className="font-semibold">CampusHub</Link>
            <Link href="/blog" className="text-sm text-gray-600">Blog</Link>
            <Link href="/create/post" className="ml-auto text-sm border rounded px-3 py-1">New Post</Link>
            {session?.user ? (
              <span className="text-sm">Hi, {session.user.name ?? session.user.email}</span>
            ) : (
              <Link href="/sign-in" className="text-sm">Sign in</Link>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
