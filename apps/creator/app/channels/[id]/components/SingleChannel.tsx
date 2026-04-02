'use client';

import { useServerSingleChannel } from '@/hooks/server/useServerSingleChannel';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Loading } from '@workspace/ui/globals/Loading';
import { Lock, MessageCircle, ShieldAlert } from 'lucide-react';
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
  const { channel, loading, hasMore, handleLoadMore } = useServerSingleChannel({ relatedEntityId: channelId, take: 50 }, initialChannel);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [channel?.messages]);

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

  const isRequested = channel?.status === MessageChannelStatus.Requested;
  const isBlocked = channel?.isMessagingBlocked || channel?.status === MessageChannelStatus.Blocked;
  const isRestricted = channel?.isRestricted;

  return (
    <div className="flex h-full flex-col bg-background relative overflow-hidden border-l border-border/50">
      <SingleChannelHeader channel={channel} />

      {isRequested && (
        <div className="flex-none bg-primary/5 p-4 border-b border-primary/10 backdrop-blur-xl animate-in slide-in-from-top duration-500 z-40">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-tight">Channel Request</h3>
                <p className="text-[10px] font-medium text-muted-foreground/60 leading-tight">
                  This fan is interested in starting a conversation.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" className="rounded-full px-6 font-bold text-[10px] h-8 shadow-lg shadow-primary/20">
                Accept Request
              </Button>
              <Button variant="outline" size="sm" className="rounded-full px-6 font-bold text-[10px] h-8 border-muted/30">
                Decline
              </Button>
            </div>
          </div>
        </div>
      )}

      {isBlocked && (
        <div className="flex-none bg-destructive/5 p-2 flex items-center justify-center gap-2 border-b border-destructive/10 animate-in fade-in duration-300 z-40">
          <ShieldAlert className="h-3 w-3 text-destructive" />
          <p className="text-[9px] font-black uppercase tracking-widest text-destructive/80 leading-none">
            Messaging is blocked for this interaction
          </p>
        </div>
      )}

      {isRestricted && !isBlocked && (
        <div className="flex-none bg-amber-500/5 p-2 flex items-center justify-center gap-2 border-b border-amber-500/10 transition-colors z-40">
          <Lock className="h-3 w-3 text-amber-500" />
          <p className="text-[9px] font-bold uppercase tracking-wide text-amber-500/70">Restricted Mode</p>
        </div>
      )}

      <div className="flex-1 min-h-0 relative">
        <SingleChannelMessageThread
          channel={channel}
          scrollRef={scrollRef}
          hasMore={hasMore}
          handleLoadMore={handleLoadMore}
          loading={loading}
        />
      </div>

      {!isRequested && !isBlocked && <SingleChannelInputArea channel={channel} />}
    </div>
  );
}
