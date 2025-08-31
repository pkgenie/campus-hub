import { prisma } from '@/lib/db'

export const revalidate = 60

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { subject: { include: { semester: { include: { classroom: true } } } } }
  })
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <ul className="grid gap-3 md:grid-cols-2">
        {posts.map(p => (
          <li key={p.id} className="border rounded p-4">
            <div className="text-xs text-gray-500">
              {p.subject.semester.classroom.name} → {p.subject.semester.name} → {p.subject.name}
            </div>
            <div className="font-medium text-lg">{p.title}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
