import Link from 'next/link'

export default async function Home() {
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to CampusHub</h1>
      <p className="text-gray-700">Organize and share class content by semester and subject.</p>
      <div className="flex gap-3">
        <Link className="border rounded px-3 py-2" href="/blog">Browse Blog</Link>
        <Link className="border rounded px-3 py-2" href="/create/post">Create a Post</Link>
      </div>
    </main>
  )
}
