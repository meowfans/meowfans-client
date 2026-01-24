'use client';

import { useChannels } from '@/hooks/useChannels';
import { Badge } from '@workspace/ui/components/badge';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { ChannelList } from './ChannelList';
import { ChannelHeader } from './Header';
import { NoChatSelected } from './NoChatSelected';

export const Channels = () => {
  const isMobile = useIsMobile();
  const { channels, loading } = useChannels({ take: 30 });

  return (
    <PageManager className="relative p-0">
      <ChannelHeader />
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-linear-to-b from-background via-background to-muted/20" />
        <div className="absolute inset-x-0 -top-24 mx-auto h-72 w-72 rounded-full bg-muted/30 blur-3xl" />
        <div className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-muted/20 blur-3xl" />
      </div>

      <div className="pt-20 pb-24 px-4">
        <div className="mx-auto w-full max-w-3xl space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Channels</h1>
              <Badge variant="outline">{channels.length} total</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Open a channel to chat with your community.</p>
          </div>

          {!isMobile ? <NoChatSelected /> : <ChannelList channels={channels} loading={loading} />}
        </div>
      </div>
    </PageManager>
  );
};
