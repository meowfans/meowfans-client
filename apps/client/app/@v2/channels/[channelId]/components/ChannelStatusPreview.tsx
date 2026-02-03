'use client';

import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { cn } from '@workspace/ui/lib/utils';
import { Clock, ShieldBan, Sparkles, XCircle } from 'lucide-react';

interface ChannelStatusPreviewV2Props {
  channel: ChannelsOutput;
}

export const ChannelStatusPreview = ({ channel }: ChannelStatusPreviewV2Props) => {
  const getStatusConfig = () => {
    if (channel.isMessagingBlocked) {
      return {
        icon: ShieldBan,
        title: 'Messaging Unavailable',
        description: 'This conversation has been restricted based on user settings or safety guidelines.',
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        blurColor: 'bg-red-500/20'
      };
    }

    if (channel.isRestricted) {
      return {
        icon: Clock,
        title: 'Direct Link Required',
        description: 'This creator requires a direct connection to start messaging.',
        color: 'text-zinc-500',
        bgColor: 'bg-zinc-500/10',
        blurColor: 'bg-zinc-500/20'
      };
    }

    switch (channel.status) {
      case MessageChannelStatus.Requested:
        return {
          icon: Sparkles,
          title: 'Approval Pending',
          description: "Your connection request has been sent. You'll be able to chat once the creator accepts.",
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          blurColor: 'bg-amber-500/20'
        };
      case MessageChannelStatus.Rejected:
        return {
          icon: XCircle,
          title: 'Request Declined',
          description: 'This connection request was not accepted at this time.',
          color: 'text-zinc-500',
          bgColor: 'bg-zinc-500/10',
          blurColor: 'bg-zinc-500/20'
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95 duration-700">
      <div className="relative mb-6">
        <div className={cn('absolute inset-0 blur-2xl rounded-full animate-pulse', config.blurColor)} />
        <div
          className={cn(
            'relative h-16 w-16 rounded-3xl border flex items-center justify-center transition-all duration-500',
            config.bgColor,
            'border-white/10'
          )}
        >
          <Icon className={cn('h-8 w-8 animate-pulse', config.color)} />
        </div>
      </div>
      <h3 className="text-lg font-black text-foreground mb-2 tracking-tight italic uppercase">{config.title}</h3>
      <p className="text-sm text-muted-foreground max-w-70 font-medium leading-relaxed">{config.description}</p>
    </div>
  );
};
