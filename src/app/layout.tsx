import './globals.css';
import Providers from '@/components/providers';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'AI Batch 2025-27 | IIT Jodhpur Blog & News',
  description: 'Official blog and news portal for M.Tech AI batch (2025-2027) at IIT Jodhpur.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}