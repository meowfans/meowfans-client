'use client';

import { AppBottomNav } from '@/components/AppBottomNav';
import { AppSidebar } from '@/components/AppSideBar';
import { CreatorStatusLayout } from '@/components/CreatorStatusLayout';
import { Events } from '@/components/Events';
import { CreatorApprovalStatus, CreatorProfilesEntity } from '@workspace/gql/generated/graphql';
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import { ThemeProvider } from 'next-themes';
import { createContext, useContext, useState } from 'react';
import { Toaster } from 'sonner';
import { EventsProvider } from './EventsProvider';

export const CreatorContext = createContext<[CreatorProfilesEntity, React.Dispatch<React.SetStateAction<CreatorProfilesEntity>>]>([
  {} as CreatorProfilesEntity,
  () => null
]);

interface CreatorProps {
  children: React.ReactNode;
  creator: CreatorProfilesEntity;
}

export function CreatorContextWrapper({ children, creator }: CreatorProps) {
  const [creatorInfo, setCreatorInfo] = useState<CreatorProfilesEntity>(creator);

  return (
    <CreatorContext.Provider value={[creatorInfo, setCreatorInfo]}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        value={{ light: 'light', dark: 'dark' }}
      >
        <Toaster richColors position="top-center" closeButton theme={'system'} />
        {creatorInfo.status === CreatorApprovalStatus.Accepted ? (
          <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
              <AppSidebar />
              <SidebarInset className="flex flex-1 flex-col min-w-0">
                <EventsProvider />
                <Events />
                <main className="relative flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
              </SidebarInset>
            </div>
            <AppBottomNav />
          </SidebarProvider>
        ) : (
          <CreatorStatusLayout status={creatorInfo.status} />
        )}
      </ThemeProvider>
    </CreatorContext.Provider>
  );
}
export const useCreator = () => {
  const [creator, setCreator] = useContext(CreatorContext);

  return { creator, setCreator };
};
