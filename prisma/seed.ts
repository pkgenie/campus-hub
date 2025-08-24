import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@iitj.ac.in";

  // Ensure Admin user exists
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      name: "Batch Admin",
      role: "ADMIN",
    },
  });

  // Add Welcome Post if none exists
  const postsCount = await prisma.post.count();
  if (postsCount === 0) {
    await prisma.post.create({
      data: {
        title: "🎉 Welcome to the AI Batch 2025–27 Blog!",
        content:
          "This is the official blog and news portal for the M.Tech AI Batch (2025–27) at IIT Jodhpur. Stay tuned for research updates, events, and achievements.",
        category: "NOTICES",
        author: { connect: { id: admin.id } },
      },
    });
  }

  console.log("✅ Seed completed: Admin + Welcome Post ready.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
