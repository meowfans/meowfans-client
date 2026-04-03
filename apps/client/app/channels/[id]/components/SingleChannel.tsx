'use client';

import { PageHandler } from '@/components/PageHandler';
import { useChannelMessages } from '@/hooks/client/useMessages';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useQuery } from '@apollo/client/react';
import { UPDATE_LAST_SEEN_QUERY } from '@workspace/gql/api';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { useEffect, useRef } from 'react';
import { SingleChannelHeader } from './SingleChannelHeader';
import { SingleChannelInputArea } from './SingleChannelInputArea';
import { SingleChannelMessageThread } from './SingleChannelMessageThread';
import { SingleChannelStatus } from './SingleChannelStatus';

interface SingleChannelProps {
  channelId: string;
  initialChannel: ChannelsOutput | null;
}

export function SingleChannel({ channelId, initialChannel }: SingleChannelProps) {
  const { fan } = useFan();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { channel, loading, hasMore, loadMore } = useChannelMessages({ relatedEntityId: channelId, take: 50 });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [channel?.messages]);

  const isRequested = channel?.status === MessageChannelStatus.Requested;
  const isBlocked = channel?.isMessagingBlocked || channel?.status === MessageChannelStatus.Blocked;
  const isRestricted = channel?.isRestricted;

  const { refetch } = useQuery(UPDATE_LAST_SEEN_QUERY, {
    skip: !channelId && !loading,
    variables: { input: { messageChannelId: channelId } }
  });

  useEffect(() => {
    const lastMessage = (channel.messages || []).at(0);
    if (lastMessage?.recipientUserId === fan?.fanId) {
      refetch({ input: { messageChannelId: channelId, messageId: lastMessage?.id } });
    }
  }, [channel?.messages, channelId, refetch, fan]);

  return (
    <PageHandler isEmpty={!initialChannel} isLoading={loading && !channel?.id}>
      <div className="flex h-full flex-col bg-background relative overflow-hidden border-l border-border/50">
        <SingleChannelHeader channel={channel} />
        <SingleChannelStatus channel={channel} isBlocked={isBlocked} isRequested={isRequested} isRestricted={isRestricted} />

        <div className="flex-1 min-h-0 relative">
          <SingleChannelMessageThread
            channel={channel}
            scrollRef={scrollRef}
            hasMore={hasMore}
            handleLoadMore={loadMore}
            loading={loading}
          />
        </div>

        {!isRequested && !isBlocked && <SingleChannelInputArea channel={channel} />}
      </div>
    </PageHandler>
  );
}
