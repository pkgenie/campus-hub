import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  Users,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: <LayoutDashboard size={18} /> },
  { href: '/dashboard/posts', label: 'Posts', icon: <FileText size={18} /> },
  { href: '/dashboard/uploads', label: 'Uploads', icon: <UploadCloud size={18} /> },
  { href: '/dashboard/users', label: 'Users', icon: <Users size={18} /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-primary text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary-dark transition ${active ? 'bg-primary-dark' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}