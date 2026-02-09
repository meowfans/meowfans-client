'use client';

import { AppBottomNav } from '@/components/AppBottomNav';
import { usePathname } from 'next/navigation';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const isChannelDetail = pathname.startsWith('/channels/');

  return (
    <div className={isChannelDetail ? 'flex flex-1 flex-col h-screen' : 'flex flex-1 flex-col gap-4 p-4 pb-24 pt-0 md:pb-4'}>
      {children}
      <AppBottomNav />
    </div>
  );
}
