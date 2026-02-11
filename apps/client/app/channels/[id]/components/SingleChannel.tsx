'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerSingleChannel } from '@/hooks/server/useServerSingleChannel';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { useEffect, useRef } from 'react';
import { SingleChannelHeader } from './SingleChannelHeader';
import { SingleChannelInputArea } from './SingleChannelInputArea';
import { SingleChannelMessageThread } from './SingleChannelMessageThread';

interface SingleChannelProps {
  channelId: string;
  initialChannel: ChannelsOutput | null;
}

export function SingleChannel({ channelId, initialChannel }: SingleChannelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { channel, loading, hasMore, loadMore } = useServerSingleChannel({ relatedEntityId: channelId, take: 50 }, initialChannel);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [channel?.messages]);

  return (
    <PageHandler isEmpty={!initialChannel} isLoading={loading && !channel?.id}>
      <div className="flex h-screen flex-col bg-background relative overflow-hidden">
        <SingleChannelHeader channel={channel} />
        <div className="flex-1 min-h-0 relative">
          <SingleChannelMessageThread
            channel={channel}
            scrollRef={scrollRef}
            hasMore={hasMore}
            handleLoadMore={loadMore}
            loading={loading}
          />
        </div>
        <SingleChannelInputArea channel={channel} />
      </div>
    </PageHandler>
  );
}
