import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function getStats() {
  const [postsCount, uploadsCount, usersCount] = await Promise.all([
    prisma.post.count(),
    prisma.upload.count(),
    prisma.user.count(),
  ]);
  return { postsCount, uploadsCount, usersCount };
}

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/login');
  }
  const { postsCount, uploadsCount, usersCount } = await getStats();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Posts</h2>
          <p className="text-3xl mt-2 text-primary">{postsCount}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Uploads</h2>
          <p className="text-3xl mt-2 text-primary">{uploadsCount}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl mt-2 text-primary">{usersCount}</p>
        </div>
      </div>
    </div>
  );
}