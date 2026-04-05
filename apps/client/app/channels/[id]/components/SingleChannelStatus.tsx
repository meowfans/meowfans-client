'use client';

import { useUpdateChannel, useUpdateChannelStatus } from '@/hooks/client/useChannels';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { CheckCircle, Lock, MessageCircle, ShieldAlert, Unlock, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SingleChannelStatusProps {
  isRequested: boolean;
  isBlocked: boolean;
  channel: ChannelsOutput;
  isRestricted: boolean;
}

export const SingleChannelStatus: React.FC<SingleChannelStatusProps> = ({ isBlocked, channel, isRequested, isRestricted }) => {
  const statusLoading = useUpdateChannelStatus().loading;
  const updateChannelStatus = useUpdateChannelStatus().updateChannelStatus;
  const channelLoading = useUpdateChannel().loading;
  const updateChannel = useUpdateChannel().updateChannel;
  const loading = statusLoading || channelLoading;
  const router = useRouter();

  const handleAccept = async () => {
    await updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Accepted });
  };

  const handleReject = async () => {
    await updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Rejected });
    router.push('/channels');
  };

  return isRequested ? (
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
          <Button
            variant="default"
            size="sm"
            disabled={loading}
            onClick={handleAccept}
            className="rounded-full px-6 font-bold text-[11px] h-9 shadow-lg shadow-primary/20"
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            {loading ? 'Updating…' : 'Accept'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={handleReject}
            className="rounded-full px-6 font-bold text-[11px] h-9 border-muted/50"
          >
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Reject
          </Button>
        </div>
      </div>
    </div>
  ) : isBlocked ? (
    <div className="flex-none bg-destructive/5 p-3 flex items-center justify-center gap-2 border-b border-destructive/10 animate-in fade-in duration-300">
      <ShieldAlert className="h-3.5 w-3.5 text-destructive" />
      <p className="text-[10px] font-black uppercase tracking-widest text-destructive/80">Messaging is currently blocked for this user</p>
    </div>
  ) : isRestricted && !isBlocked ? (
    <div className="flex-none bg-amber-500/5 px-4 py-2 flex items-center justify-between gap-3 border-b border-amber-500/10 transition-colors">
      <div className="flex items-center gap-2">
        <Lock className="h-3 w-3 text-amber-500 shrink-0" />
        <p className="text-[9px] font-bold uppercase tracking-wide text-amber-500/70">Restricted Mode Active</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        disabled={loading}
        onClick={() => updateChannel({ channelId: channel.id, isRestricted: false })}
        className="h-6 px-3 rounded-full text-[9px] font-black uppercase tracking-wider text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 border border-amber-500/30"
      >
        <Unlock className="h-2.5 w-2.5 mr-1" />
        Remove
      </Button>
    </div>
  ) : null;
};
