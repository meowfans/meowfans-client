'use client';

import { useServerSingleChannel } from '@/hooks/server/useServerSingleChannel';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Loading } from '@workspace/ui/globals/Loading';
import { MessageCircle } from 'lucide-react';
import { useRef } from 'react';
import { LastSeenUpdater } from './LastSeenUpdater';
import { SingleChannelHeader } from './SingleChannelHeader';
import { SingleChannelInputArea } from './SingleChannelInputArea';
import { SingleChannelMessageThread } from './SingleChannelMessageThread';
import { SingleChannelStatus } from './SingleChannelStatus';

interface SingleChannelProps {
  channelId: string;
  initialChannel: ChannelsOutput | null;
}

export function SingleChannel({ channelId, initialChannel }: SingleChannelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { channel, loading, hasMore, loadMore } = useServerSingleChannel({ relatedEntityId: channelId, take: 30 }, initialChannel);

  const isRequested = channel?.status === MessageChannelStatus.Requested;
  const isBlocked = channel?.hasBlockedThisChannel || channel?.status === MessageChannelStatus.Blocked;
  const isRestricted = channel?.hasRestrictedThisChannel;

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
      <LastSeenUpdater
        channelId={channelId}
        channel={channel}
        loading={loading}
        isRestricted={isRestricted}
        isBlocked={isBlocked}
        isRequested={isRequested}
      />
      <SingleChannelHeader channel={channel} />
      <SingleChannelStatus channel={channel} isBlocked={isBlocked} isRequested={isRequested} isRestricted={isRestricted} />

      <SingleChannelMessageThread channel={channel} scrollRef={scrollRef} hasMore={hasMore} loadMore={loadMore} loading={loading} />
      {!isRequested && !isBlocked && <SingleChannelInputArea channel={channel} />}
    </div>
  );
}
