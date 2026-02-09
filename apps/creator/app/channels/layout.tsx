'use client';

import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { cn } from '@workspace/ui/lib/utils';
import { usePathname } from 'next/navigation';
import { ChannelsSidebar } from './components/ChannelsSidebar';

import { useUtilsStore } from '@/hooks/store/utils.store';

export default function ChannelsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { showAssetsSidebar } = useUtilsStore();

  const isChannelsIndex = pathname === '/channels' || pathname === '/channels/';
  const isChatPage = pathname.startsWith('/channels/') && pathname !== '/channels/';
  const heightClass = isChatPage ? 'h-svh md:h-screen' : 'h-[calc(100svh-128px)] md:h-[calc(100vh-64px)]';

  const shouldRenderSidebar = !isMobile || isChannelsIndex || showAssetsSidebar;
  const showSidebarOnMobile = isChannelsIndex || showAssetsSidebar;
  const showContentOnMobile = !isChannelsIndex && !showAssetsSidebar;

  return (
    <div className={cn('flex w-full overflow-hidden bg-background', heightClass)}>
      {shouldRenderSidebar && (
        <aside
          className={cn(
            'w-full md:w-80 lg:w-96 flex-shrink-0 md:border-r bg-muted/5 flex-col',
            !showSidebarOnMobile ? 'hidden md:flex' : 'flex'
          )}
        >
          <ChannelsSidebar />
        </aside>
      )}
      <main className={cn('flex-1 flex flex-col min-w-0 min-h-0', !showContentOnMobile ? 'hidden md:flex' : 'flex')}>{children}</main>
    </div>
  );
}
