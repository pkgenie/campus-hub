'use server'
import { put } from '@vercel/blob'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { upsertVisibilityForEntity } from '@/lib/visibility'
import { isMod } from '@/lib/rbac'

const DocInput = z.object({
  subjectId: z.string(),
  title: z.string().min(2),
  file: z.any(),
  visibilityScope: z.enum(['PUBLIC','SCHOOL','CLASSROOM','SEMESTER','SUBJECT','SERIES','CUSTOM','LINK']).default('PUBLIC'),
  scopeId: z.string().optional(),
})

export async function uploadDoc(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  const subjectId = String(formData.get('subjectId'))
  const title = String(formData.get('title'))
  const file = formData.get('file') as File
  const visibilityScope = String(formData.get('visibilityScope') ?? 'PUBLIC')
  const scopeId = (formData.get('scopeId') as string) || undefined

  DocInput.parse({ subjectId, title, file, visibilityScope, scopeId })

  const uploaded = await put(`docs/${crypto.randomUUID()}-${file.name}`, file, { access: 'private' })

  const doc = await prisma.doc.create({
    data: {
      subjectId,
      title,
      kind: 'FILE',
      url: uploaded.url,
      uploaderId: (session.user as any).id,
      mime: file.type,
      size: file.size,
    }
  })

  const linkToken = visibilityScope === 'LINK' ? crypto.randomUUID() : undefined
  await upsertVisibilityForEntity('doc', doc.id, visibilityScope as any, scopeId, linkToken)

  return { id: doc.id, linkToken }
}
