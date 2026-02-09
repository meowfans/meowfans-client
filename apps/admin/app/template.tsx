'use client';

import { AppBottomNav } from '@/components/AppBottomNav';
import { ImpersonationModal } from '@/components/ImpersonationModal';
import { LogoutModal } from '@/components/LogoutModal';
import { usePathname } from 'next/navigation';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pb-24 pt-0 md:pb-4">
      {children}
      <AppBottomNav />
      <LogoutModal />
      <ImpersonationModal />
    </div>
  );
}
