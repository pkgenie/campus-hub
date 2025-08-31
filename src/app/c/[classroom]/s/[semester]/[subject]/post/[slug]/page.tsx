import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth-server'
import { canView } from '@/lib/visibility'
import { Mdx } from '@/lib/mdx'
import Link from 'next/link'

export const revalidate = 0

export default async function PostPage({ params, searchParams }: any) {
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
      subject: {
        slug: params.subject,
        semester: { slug: params.semester, classroom: { slug: params.classroom } }
      }
    },
    include: {
      visibility: true,
      subject: { include: { semester: { include: { classroom: true } } } },
      author: true,
    }
  })
  if (!post) return notFound()

  const session = await auth()
  const userId = (session?.user as any)?.id as string | undefined
  const token = Array.isArray(searchParams?.token) ? searchParams.token[0] : searchParams?.token
  const ok = await canView(userId, post.visibility, {
    classroomId: post.subject.semester.classroom.id,
    semesterId: post.subject.semester.id,
    subjectId: post.subject.id,
    seriesId: post.seriesId ?? undefined,
    token
  })

  if (!ok) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-xl font-semibold">403 — You don’t have access to this post.</h1>
        <p className="mt-2 text-gray-600">Ask the author to share a link or change visibility.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6 prose">
      <div className="not-prose">
        <div className="text-sm text-gray-500">
          <Link href={`/c/${params.classroom}/s/${params.semester}/${params.subject}`}>← Back to subject</Link>
        </div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="text-xs text-gray-500">By {post.author.name ?? post.author.email} • {post.createdAt.toDateString()}</div>
      </div>
      <Mdx code={post.mdx} />
    </main>
  )
}
