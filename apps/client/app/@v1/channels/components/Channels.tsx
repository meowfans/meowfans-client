'use client';

import { PageManager } from '@workspace/ui/globals/PageManager';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { ChannelList } from './ChannelList';
import { ChannelHeader } from './Header';
import { NoChatSelected } from './NoChatSelected';

export const Channels = () => {
  const isMobile = useIsMobile();
  return (
    <PageManager className="relative p-0">
      <ChannelHeader />
      <div className="pt-20 pb-24 px-4">
        <div className="mx-auto w-full max-w-3xl space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Channels</h1>
            </div>
            <p className="text-sm text-muted-foreground">Open a channel to chat with your community.</p>
          </div>

          {!isMobile ? <NoChatSelected /> : <ChannelList />}
        </div>
      </div>
    </PageManager>
  );
};
