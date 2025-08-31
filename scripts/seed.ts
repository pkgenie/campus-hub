import { prisma } from '@/lib/db'

async function main() {
  const classroom = await prisma.classroom.upsert({
    where: { slug: 'cse' },
    update: {},
    create: { slug: 'cse', name: 'CSE' },
  })
  const semester = await prisma.semester.upsert({
    where: { classroomId_slug: { classroomId: classroom.id, slug: '2025-spring' } },
    update: {},
    create: { classroomId: classroom.id, slug: '2025-spring', name: '2025 Spring' },
  })
  const subject = await prisma.subject.upsert({
    where: { semesterId_slug: { semesterId: semester.id, slug: 'dsa' } },
    update: {},
    create: { semesterId: semester.id, slug: 'dsa', name: 'Data Structures & Algorithms' },
  })

  // Optional: create a sample published post
  await prisma.post.upsert({
    where: { subjectId_slug: { subjectId: subject.id, slug: 'welcome' } },
    update: {},
    create: {
      subjectId: subject.id,
      slug: 'welcome',
      title: 'Welcome to DSA',
      mdx: '# Hello!\n\nThis is an **MDX** post. Check code:\n\n```ts\nexport const hello = (name: string) => `Hello ${name}`\n```\n',
      status: 'PUBLISHED',
    },
  })
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
