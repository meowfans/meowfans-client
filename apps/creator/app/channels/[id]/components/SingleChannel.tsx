'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useServerSingleChannel } from '@/hooks/server/useServerSingleChannel';
import { useQuery } from '@apollo/client/react';
import { UPDATE_LAST_SEEN_QUERY } from '@workspace/gql/api';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Loading } from '@workspace/ui/globals/Loading';
import { MessageCircle } from 'lucide-react';
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
  const { creator } = useCreator();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { channel, loading, hasMore, loadMore } = useServerSingleChannel({ relatedEntityId: channelId, take: 30 }, initialChannel);

  const isRequested = channel?.status === MessageChannelStatus.Requested;
  const isBlocked = channel?.isBlocked || channel?.status === MessageChannelStatus.Blocked;
  const isRestricted = channel?.isRestricted;

  const { refetch } = useQuery(UPDATE_LAST_SEEN_QUERY, {
    skip: !channelId && !loading,
    variables: { input: { messageChannelId: channelId } }
  });

  useEffect(() => {
    const lastMessage = (channel.messages || []).at(0);
    if (lastMessage?.recipientUserId === creator?.creatorId) {
      refetch({ input: { messageChannelId: channelId, messageId: lastMessage?.id } });
    }
  }, [channel?.messages, channelId, refetch, creator]);

  if (loading && !channel?.id) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  if (!channel?.id && !loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full p-12 text-center text-muted-foreground">
        <MessageCircle className="h-12 w-12 mb-4 opacity-20" />
        <h3 className="font-black text-[10px] uppercase tracking-widest text-foreground/40">Select a conversion to start messaging</h3>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background relative overflow-hidden border-l border-border/50">
      <SingleChannelHeader channel={channel} />
      <SingleChannelStatus channel={channel} isBlocked={isBlocked} isRequested={isRequested} isRestricted={isRestricted} />

      <SingleChannelMessageThread channel={channel} scrollRef={scrollRef} hasMore={hasMore} handleLoadMore={loadMore} loading={loading} />

      {!isRequested && !isBlocked && <SingleChannelInputArea channel={channel} />}
    </div>
  );
}
