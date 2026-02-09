'use client';

import { useUpdateChannelStatus } from '@/hooks/useChannels';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { MoreVertical, ShieldBan, Trash2, VolumeX } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ChannelItemProps {
  channel: ChannelsOutput;
  isMultiSelectMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + 'y ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + 'mo ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + 'h ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + 'm ago';
  return 'just now';
}

export function ChannelItem({ channel, isMultiSelectMode, isSelected, onToggleSelect }: ChannelItemProps) {
  const router = useRouter();
  const { channelId } = useParams();
  const isActive = channelId === channel.id;
  const { updateChannelStatus } = useUpdateChannelStatus();

  const handleChannelClick = () => {
    if (isMultiSelectMode && onToggleSelect) {
      onToggleSelect(channel.id);
      return;
    }
    router.push(`/channels/${channel.id}`);
  };

  const handleAction = async (action: 'Mute' | 'Block' | 'Delete') => {
    if (action === 'Block') {
      await updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Rejected });
    } else if (action === 'Delete') {
      await updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Rejected });
    } else {
      toast.info(`${action} action triggered (mock)`);
    }
  };

  const lastMessage = channel.lastMessage?.content || 'No messages yet';
  const lastMessageTime = channel.lastMessage?.createdAt ? timeAgo(new Date(channel.lastMessage.createdAt)) : '';

  return (
    <div
      className={cn(
        'px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer group relative border-b border-border/40 last:border-0',
        isActive && !isMultiSelectMode ? 'bg-muted/80' : 'bg-transparent',
        isSelected && 'bg-primary/5'
      )}
      onClick={handleChannelClick}
    >
      {isMultiSelectMode && (
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect?.(channel.id)}
          onClick={(e) => e.stopPropagation()}
          className="shrink-0"
        />
      )}
      <Avatar className="h-9 w-9 border shrink-0">
        <AvatarImage src={channel.fanAvatarUrl} alt={channel.fanFullname} />
        <AvatarFallback>{channel.fanFullname.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className={cn('text-xs font-semibold truncate', isActive ? 'text-foreground' : 'text-foreground/90')}>
            {channel.fanFullname}
          </h3>
          <span className="text-[9px] text-muted-foreground whitespace-nowrap ml-1 flex-shrink-0">{lastMessageTime}</span>
        </div>
        <p className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">{lastMessage}</p>
      </div>

      <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleAction('Mute')}>
              <VolumeX className="mr-2 h-3.5 w-3.5" />
              <span>Mute</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('Block')}>
              <ShieldBan className="mr-2 h-3.5 w-3.5" />
              <span>Block</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('Delete')} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
