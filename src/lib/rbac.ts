import { prisma } from './db'

export async function getUserRoleNames(userId: string | undefined) {
  if (!userId) return []
  const roles = await prisma.userRole.findMany({ where: { userId }, include: { role: true } })
  return roles.map(r => r.role.name)
}

export async function isAdmin(userId: string | undefined) {
  return (await getUserRoleNames(userId)).includes('ADMIN')
}

export async function isMod(userId: string | undefined) {
  const names = await getUserRoleNames(userId)
  return names.includes('ADMIN') || names.includes('MOD')
}
