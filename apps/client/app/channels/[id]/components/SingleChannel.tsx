'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerSingleChannel } from '@/hooks/server/useServerSingleChannel';
import { MessageChannelStatus, ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { ShieldAlert, CheckCircle, XCircle, MessageCircle, Lock } from 'lucide-react';
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

  const isRequested = channel?.status === MessageChannelStatus.Requested;
  const isBlocked = channel?.isMessagingBlocked || channel?.status === MessageChannelStatus.Blocked;
  const isRestricted = channel?.isRestricted;

  return (
    <PageHandler isEmpty={!initialChannel} isLoading={loading && !channel?.id}>
      <div className="flex h-full flex-col bg-background relative overflow-hidden border-l border-border/50">
        <SingleChannelHeader channel={channel} />

        {isRequested && (
          <div className="flex-none bg-primary/5 p-4 border-b border-primary/10 backdrop-blur-xl animate-in slide-in-from-top duration-500">
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Chat Request</h3>
                  <p className="text-[11px] font-medium text-muted-foreground/60 leading-tight">
                    {channel.creatorFullname} wants to start a conversation with you.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="default" size="sm" className="rounded-full px-6 font-bold text-[11px] h-9 shadow-lg shadow-primary/20">
                  <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                  Accept
                </Button>
                <Button variant="outline" size="sm" className="rounded-full px-6 font-bold text-[11px] h-9 border-muted/50">
                  <XCircle className="h-3.5 w-3.5 mr-1.5" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        )}

        {isBlocked && (
          <div className="flex-none bg-destructive/5 p-3 flex items-center justify-center gap-2 border-b border-destructive/10 animate-in fade-in duration-300">
            <ShieldAlert className="h-3.5 w-3.5 text-destructive" />
            <p className="text-[10px] font-black uppercase tracking-widest text-destructive/80">Messaging is currently blocked for this user</p>
          </div>
        )}

        {isRestricted && !isBlocked && (
          <div className="flex-none bg-amber-500/5 p-2 flex items-center justify-center gap-2 border-b border-amber-500/10 transition-colors">
            <Lock className="h-3 w-3 text-amber-500" />
            <p className="text-[9px] font-bold uppercase tracking-wide text-amber-500/70">Restricted Mode Active</p>
          </div>
        )}

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
