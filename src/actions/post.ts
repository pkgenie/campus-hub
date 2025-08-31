'use server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { upsertVisibilityForEntity } from '@/lib/visibility'
import { isMod } from '@/lib/rbac'

const PostInput = z.object({
  subjectId: z.string(),
  title: z.string().min(3),
  slug: z.string().min(3),
  mdx: z.string().min(1),
  seriesId: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  isOfficial: z.enum(['true', 'false']).default('false'),
  visibilityScope: z.enum(['PUBLIC','SCHOOL','CLASSROOM','SEMESTER','SUBJECT','SERIES','CUSTOM','LINK']).default('PUBLIC'),
  scopeId: z.string().optional(),
})

export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  const data = PostInput.parse({
    subjectId: formData.get('subjectId'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    mdx: formData.get('mdx'),
    seriesId: formData.get('seriesId') || undefined,
    status: (formData.get('status') as 'DRAFT' | 'PUBLISHED') ?? 'DRAFT',
    isOfficial: (formData.get('isOfficial') as string) ?? 'false',
    visibilityScope: (formData.get('visibilityScope') as any) ?? 'PUBLIC',
    scopeId: (formData.get('scopeId') as string) || undefined,
  })

  const canSetOfficial = await isMod((session.user as any).id)
  const isOfficial = data.isOfficial === 'true' && canSetOfficial

  const post = await prisma.post.create({
    data: { ...data, isOfficial, authorId: (session.user as any).id, seriesId: data.seriesId ?? null }
  })

  // visibility rule
  const linkToken = data.visibilityScope === 'LINK' ? crypto.randomUUID() : undefined
  await upsertVisibilityForEntity('post', post.id, data.visibilityScope as any, data.scopeId, linkToken)

  return { id: post.id, linkToken }
}
