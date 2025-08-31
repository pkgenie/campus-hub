import { prisma } from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function SubjectPage({ params }: { params: { classroom: string, semester: string, subject: string } }) {
  const semester = await prisma.semester.findFirst({
    where: { slug: params.semester, classroom: { slug: params.classroom } },
    include: { subjects: { where: { slug: params.subject } } }
  })
  if (!semester || semester.subjects.length === 0) return notFound()
  const subject = semester.subjects[0]
  const posts = await prisma.post.findMany({ where: { subjectId: subject.id, status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' }, take: 20 })
  const docs = await prisma.doc.findMany({ where: { subjectId: subject.id }, orderBy: { createdAt: 'desc' }, take: 20 })
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{subject.name}</h1>

      <section className="space-y-2">
        <h2 className="font-semibold">Recent Posts</h2>
        <ul className="space-y-2">
          {posts.map(p => (
            <li key={p.id} className="border rounded p-3">
              <Link href={`/c/${params.classroom}/s/${params.semester}/${params.subject}/post/${p.slug}`} className="font-medium">{p.title}</Link>
              <div className="text-xs text-gray-500">{p.createdAt.toDateString()}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Recent Docs</h2>
        <ul className="space-y-2">
          {docs.map(d => (
            <li key={d.id} className="border rounded p-3">
              <Link href={`/c/${params.classroom}/s/${params.semester}/${params.subject}/doc/${d.id}`}>{d.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
