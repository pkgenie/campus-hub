import { prisma } from './db'
import type { VisibilityRule, ScopeType } from '@prisma/client'

type Context = {
  classroomId?: string
  semesterId?: string
  subjectId?: string
  seriesId?: string
  token?: string
}

export async function canView(userId: string | undefined, rule: VisibilityRule | null | undefined, ctx: Context): Promise<boolean> {
  if (!rule) return true // No rule = public for MVP

  switch (rule.scopeType as ScopeType) {
    case 'PUBLIC':
      return true
    case 'SCHOOL':
      return !!userId
    case 'CLASSROOM':
      if (!ctx.classroomId) return false
      return !!(await prisma.enrollment.findUnique({ where: { userId_classroomId: { userId: userId ?? '', classroomId: ctx.classroomId } } }))
    case 'SEMESTER':
      if (!ctx.semesterId) return false
      // If user is enrolled in the semester's classroom, allow
      const sem = await prisma.semester.findUnique({ where: { id: ctx.semesterId }, include: { classroom: true } })
      if (!sem) return false
      return !!(await prisma.enrollment.findUnique({ where: { userId_classroomId: { userId: userId ?? '', classroomId: sem.classroomId } } }))
    case 'SUBJECT':
      if (!ctx.subjectId) return false
      const subj = await prisma.subject.findUnique({ where: { id: ctx.subjectId }, include: { semester: true } })
      if (!subj) return false
      return await canView(userId, { ...rule, scopeType: 'SEMESTER' } as any, { ...ctx, semesterId: subj.semesterId })
    case 'SERIES':
      if (!ctx.seriesId) return false
      const series = await prisma.series.findUnique({ where: { id: ctx.seriesId }, include: { subject: { include: { semester: true } } } })
      if (!series) return false
      return await canView(userId, { ...rule, scopeType: 'SUBJECT' } as any, { ...ctx, subjectId: series.subjectId })
    case 'CUSTOM':
      if (!userId || !rule.scopeId) return false
      return !!(await prisma.customListMember.findUnique({ where: { customListId_userId: { customListId: rule.scopeId, userId } } }))
    case 'LINK':
      // token must match
      return !!(ctx.token && rule.linkToken && ctx.token === rule.linkToken)
    default:
      return false
  }
}

// Utility to set or replace a visibility rule for a post or doc
export async function upsertVisibilityForEntity(entity: 'post' | 'doc', entityId: string, scopeType: ScopeType, scopeId?: string, linkToken?: string) {
  if (entity === 'post') {
    const prev = await prisma.visibilityRule.findUnique({ where: { postId: entityId } })
    if (prev) {
      await prisma.visibilityRule.update({ where: { id: prev.id }, data: { scopeType, scopeId: scopeId ?? null, linkToken: linkToken ?? null } })
      return
    }
    await prisma.visibilityRule.create({ data: { scopeType, scopeId, linkToken, post: { connect: { id: entityId } } } })
  } else {
    const prev = await prisma.visibilityRule.findUnique({ where: { docId: entityId } })
    if (prev) {
      await prisma.visibilityRule.update({ where: { id: prev.id }, data: { scopeType, scopeId: scopeId ?? null, linkToken: linkToken ?? null } })
      return
    }
    await prisma.visibilityRule.create({ data: { scopeType, scopeId, linkToken, doc: { connect: { id: entityId } } } })
  }
}
