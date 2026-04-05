import { useUpdateChannel, useUpdateChannelStatus } from '@/hooks/useChannels';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { BellOff, CheckCircle, Lock, MoreVertical, Pin, ShieldBan, Trash2, VolumeX } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface ChannelItemProps {
  channel: ChannelsOutput;
  isMultiSelectMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

export function ChannelItem({ channel, isMultiSelectMode, isSelected, onToggleSelect }: ChannelItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentId = pathname.split('/').pop();
  const isActive = currentId === channel.id;

  const channelLoading = useUpdateChannel().loading;
  const updateChannel = useUpdateChannel().updateChannel;
  const statusLoading = useUpdateChannelStatus().loading;
  const updateChannelStatus = useUpdateChannelStatus().updateChannelStatus;
  const loading = channelLoading || statusLoading;

  const handleChannelClick = () => {
    if (isMultiSelectMode && onToggleSelect) {
      onToggleSelect(channel.id);
      return;
    }
    router.push(`/channels/${channel.id}`);
  };

  const handlePin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateChannel({ channelId: channel.id, isPinned: !channel.isPinned });
  };

  const handleMute = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateChannel({ channelId: channel.id, isMuted: !channel.isMuted });
  };

  const handleBlock = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Blocked });
    await updateChannel({ channelId: channel.id, isBlocked: !channel.isBlocked });
    if (currentId === channel.id) router.push('/channels');
  };

  const handleRestrict = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateChannel({ channelId: channel.id, isRestricted: !channel.isRestricted });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Rejected });
    if (currentId === channel.id) router.push('/channels');
  };

  const lastMessage = channel.lastMessage?.content || 'No messages yet';
  const lastMessageTime = channel.lastMessage?.createdAt
    ? formatDistanceToNow(new Date(channel.lastMessage.createdAt), { addSuffix: false })
    : '';

  return (
    <Card
      className={cn(
        'group relative transition-all duration-200 cursor-pointer shadow-none overflow-hidden rounded-none border-none border-b border-border/5',
        isActive && !isMultiSelectMode ? 'bg-primary/20' : 'bg-transparent hover:bg-secondary/20',
        isSelected && 'bg-primary/10 pl-2'
      )}
      onClick={handleChannelClick}
    >
      <CardContent className="p-1 md:p-1 py-1 md:py-1">
        <div className="flex items-center gap-1.5">
          {isMultiSelectMode && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelect?.(channel.id)}
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 scale-75 mr-0.5 border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          )}

          <div className="relative shrink-0">
            <Avatar className="h-7.5 w-7.5 border-none shadow-sm transition-all duration-300">
              <AvatarImage src={channel.fanAvatarUrl} alt={channel.fanFullname} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-[9px] font-black text-primary">
                {channel.fanFullname.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {channel.isFanOnline && (
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full border border-background bg-green-500" />
            )}
            {channel.isPinned && <Pin className="absolute -top-1 -right-1 h-2.5 w-2.5 text-primary fill-primary rotate-45" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <h3
                  className={cn(
                    'font-bold text-[10.5px] tracking-tight truncate transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  )}
                >
                  {channel.fanFullname}
                </h3>
                {channel.isMuted && <BellOff className="h-2.5 w-2.5 fill-primary" />}
                {channel.isRestricted && <Lock className="h-2.5 w-2.5 text-amber-500" />}
              </div>
              {lastMessageTime && (
                <span className="text-[7px] font-bold text-muted-foreground/20 whitespace-nowrap">{lastMessageTime}</span>
              )}
            </div>

            <div className="flex items-center justify-between gap-1 -mt-px">
              <p
                className={cn(
                  'text-[8.5px] font-medium truncate transition-colors duration-200 pr-2',
                  isActive ? 'text-primary/60 font-bold' : 'text-muted-foreground/40'
                )}
              >
                {lastMessage}
              </p>
              <div className="flex items-center gap-1 shrink-0">
                {!channel.lastMessage?.hasSeen && !isActive && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                )}
              </div>
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 top-0 bottom-0 flex items-center pr-0.5 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={loading}
                  className="h-6 w-6 rounded-full bg-background/50 backdrop-blur-md border border-white/5 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
                <DropdownMenuItem
                  disabled={loading}
                  className="flex items-center gap-2 font-bold text-[11px] py-1.5 rounded-lg cursor-pointer"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Mark as read
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handlePin}
                  disabled={loading}
                  className="flex items-center gap-2 font-bold text-[11px] py-1.5 rounded-lg cursor-pointer"
                >
                  <Pin className="h-3.5 w-3.5" />
                  {channel.isPinned ? 'Unpin' : 'Pin chat'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleMute}
                  disabled={loading}
                  className="flex items-center gap-2 font-bold text-[11px] py-1.5 rounded-lg cursor-pointer"
                >
                  <VolumeX className="h-3.5 w-3.5" />
                  {channel.isMuted ? 'Unmute' : 'Mute notifications'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleRestrict}
                  disabled={loading}
                  className="flex items-center gap-2 font-bold text-[11px] py-1.5 rounded-lg cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" />
                  {channel.isRestricted ? 'Remove Restriction' : 'Restrict Access'}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem
                  onClick={handleBlock}
                  disabled={loading}
                  className="flex items-center gap-2 font-bold text-[11px] py-1.5 rounded-lg cursor-pointer text-destructive focus:text-destructive"
                >
                  <ShieldBan className="h-3.5 w-3.5" />
                  {channel.isBlocked ? 'Unblock' : 'Block interaction'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex items-center gap-2 font-bold text-[11px] py-1.5 rounded-lg cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
