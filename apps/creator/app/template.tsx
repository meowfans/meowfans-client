'use client';

import { AppBottomNav } from '@/components/AppBottomNav';
import { LogoutModal } from '@/components/LogoutModal';
import { useNotificationsStore } from '@/hooks/store/notifications.store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const isChannelsPath = pathname.startsWith('/channels');

  useEffect(() => {
    useNotificationsStore.persist.rehydrate();
  }, []);

  return (
    <div className={isChannelsPath ? 'flex flex-1 flex-col' : 'flex flex-1 flex-col gap-4 p-4 pb-24 pt-0 md:pb-4'}>
      {children}
      <AppBottomNav />
      <LogoutModal />
    </div>
  );
}
