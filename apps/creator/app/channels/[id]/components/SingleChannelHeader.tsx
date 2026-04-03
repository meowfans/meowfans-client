'use client';

import { useUpdateChannelStatus } from '@/hooks/useChannels';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { ArrowLeft, Check, MoreVertical, Pin, ShieldBan, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SingleChannelHeader({ channel }: { channel: ChannelsOutput | null }) {
  const router = useRouter();
  const { updateChannelStatus } = useUpdateChannelStatus();

  const handleStatusChange = async (status: MessageChannelStatus) => {
    if (!channel) return;
    await updateChannelStatus({ channelId: channel.id, status });
    if (status === MessageChannelStatus.Rejected || status === MessageChannelStatus.Blocked) {
      router.push('/channels');
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 border-b bg-background/60 backdrop-blur-xl sticky top-0 z-50">
      <Button variant="ghost" size="icon-sm" onClick={() => router.push('/channels')} className="shrink-0 rounded-full md:hidden">
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="relative shrink-0 group cursor-pointer">
        <Avatar className="h-9 w-9 border-none shadow-sm transition-transform duration-300 group-hover:scale-105">
          <AvatarImage src={channel?.fanAvatarUrl} className="object-cover" />
          <AvatarFallback className="bg-primary/10 text-[10px] font-black text-primary">
            {channel?.fanFullname?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {channel?.isFanOnline && (
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-background bg-green-500 shadow-sm" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h2 className="font-black text-[13px] tracking-tight truncate text-foreground/90">{channel?.fanFullname}</h2>
          {channel?.isPinned && <Pin className="h-2.5 w-2.5 text-primary fill-primary rotate-45" />}
        </div>
        <p className="text-[10px] font-bold text-muted-foreground/40 -mt-px">
          {channel?.isFanOnline ? (
            <span className="text-green-500/80 uppercase tracking-widest text-[9px]">Online Now</span>
          ) : (
            <span className="uppercase tracking-widest text-[9px]">Offline</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
            <DropdownMenuItem onClick={() => handleStatusChange(MessageChannelStatus.Accepted)} className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
              <Pin className="h-3.5 w-3.5" />
              {channel?.isPinned ? 'Unpin Chat' : 'Pin Chat'}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem onClick={() => handleStatusChange(MessageChannelStatus.Blocked)} className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer text-destructive focus:text-destructive">
              <ShieldBan className="h-3.5 w-3.5" />
              Block Interaction
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange(MessageChannelStatus.Rejected)}
              className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Thread
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
