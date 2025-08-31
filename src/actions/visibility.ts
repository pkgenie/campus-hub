'use server'
import { auth } from '@/lib/auth-server'
import { prisma } from '@/lib/db'
import { isMod } from '@/lib/rbac'
import { upsertVisibilityForEntity } from '@/lib/visibility'
import type { ScopeType } from '@prisma/client'

export async function setVisibility(entityKind: 'post' | 'doc', entityId: string, scope: ScopeType, scopeId?: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  // Only author/uploader or mods can change
  if (entityKind === 'post') {
    const post = await prisma.post.findUnique({ where: { id: entityId } })
    if (!post) throw new Error('Not found')
    if (post.authorId !== (session.user as any).id && !(await isMod((session.user as any).id))) throw new Error('Forbidden')
  } else {
    const doc = await prisma.doc.findUnique({ where: { id: entityId } })
    if (!doc) throw new Error('Not found')
    if (doc.uploaderId !== (session.user as any).id && !(await isMod((session.user as any).id))) throw new Error('Forbidden')
  }

  await upsertVisibilityForEntity(entityKind, entityId, scope, scopeId)
}

export async function createShareLink(entityKind: 'post' | 'doc', entityId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')
  const token = crypto.randomUUID()
  await upsertVisibilityForEntity(entityKind, entityId, 'LINK', undefined, token)
  return token
}
