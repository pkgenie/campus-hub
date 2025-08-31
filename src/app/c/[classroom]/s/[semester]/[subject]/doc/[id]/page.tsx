import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth-server'
import { canView } from '@/lib/visibility'
import Link from 'next/link'

export const revalidate = 0

export default async function DocPage({ params, searchParams }:any) {
  const doc = await prisma.doc.findFirst({
    where: {
      id: params.id,
      subject: {
        slug: params.subject,
        semester: { slug: params.semester, classroom: { slug: params.classroom } }
      }
    },
    include: {
      visibility: true,
      subject: { include: { semester: { include: { classroom: true } } } },
      uploader: true,
    }
  })
  if (!doc) return notFound()

  const session = await auth()
  const userId = (session?.user as any)?.id as string | undefined
  const token = Array.isArray(searchParams?.token) ? searchParams.token[0] : searchParams?.token
  const ok = await canView(userId, doc.visibility, {
    classroomId: doc.subject.semester.classroom.id,
    semesterId: doc.subject.semester.id,
    subjectId: doc.subject.id,
    seriesId: doc.seriesId ?? undefined,
    token
  })

  if (!ok) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-xl font-semibold">403 — You don’t have access to this document.</h1>
      </main>
    )
  }

  const downloadHref = `/c/${params.classroom}/s/${params.semester}/${params.subject}/doc/${doc.id}/download${token ? `?token=${token}` : ''}`

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <div className="text-sm text-gray-500">
        <Link href={`/c/${params.classroom}/s/${params.semester}/${params.subject}`}>← Back to subject</Link>
      </div>
      <h1 className="text-2xl font-semibold">{doc.title}</h1>
      <div className="text-xs text-gray-500">Uploaded by {doc.uploader.name ?? doc.uploader.email}</div>
      <a href={downloadHref} className="inline-block border rounded px-3 py-2">Download</a>
    </main>
  )
}
