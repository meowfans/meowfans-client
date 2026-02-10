'use client';

import { PageHandler } from '@/components/PageHandler';
import { useChannelMessages } from '@/hooks/useMessages';
import { useEffect, useRef } from 'react';
import { SingleChannelHeader } from './SingleChannelHeader';
import { SingleChannelInputArea } from './SingleChannelInputArea';
import { SingleChannelMessageThread } from './SingleChannelMessageThread';

interface SingleChannelProps {
  channelId: string;
}

export function SingleChannel({ channelId }: SingleChannelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { channel, loading, hasMore, handleLoadMore } = useChannelMessages({ relatedEntityId: channelId, take: 50 });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [channel?.messages]);

  return (
    <PageHandler isEmpty={false} isLoading={loading && !channel?.id}>
      <div className="flex h-screen flex-col bg-background relative overflow-hidden">
        <SingleChannelHeader channel={channel} />
        <div className="flex-1 min-h-0 relative">
          <SingleChannelMessageThread
            channel={channel}
            scrollRef={scrollRef}
            hasMore={hasMore}
            handleLoadMore={handleLoadMore}
            loading={loading}
          />
        </div>
        <SingleChannelInputArea channel={channel} />
      </div>
    </PageHandler>
  );
}
