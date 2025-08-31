
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth-server'
import { canView } from '@/lib/visibility'

export async function GET(req: NextRequest, context: any) {
  const { params } = context
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token') ?? undefined

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
      subject: { include: { semester: { include: { classroom: true } } } }
    }
  })
  if (!doc) return new NextResponse('Not found', { status: 404 })

  const session = await auth()
  const userId = (session?.user as any)?.id as string | undefined
  const ok = await canView(userId, doc.visibility, {
    classroomId: doc.subject.semester.classroom.id,
    semesterId: doc.subject.semester.id,
    subjectId: doc.subject.id,
    seriesId: doc.seriesId ?? undefined,
    token
  })
  if (!ok) return new NextResponse('Forbidden', { status: 403 })

  const upstream = await fetch(doc.url, {
    headers: { 'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
  })
  if (!upstream.ok || !upstream.body) return new NextResponse('Blob fetch failed', { status: 502 })

  const res = new NextResponse(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(doc.title)}"`,
      'Cache-Control': 'private, max-age=0, no-cache, no-store',
    }
  })
  return res
}
