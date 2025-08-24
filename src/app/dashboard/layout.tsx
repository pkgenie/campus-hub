import { ReactNode } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect('/login');
  }
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}