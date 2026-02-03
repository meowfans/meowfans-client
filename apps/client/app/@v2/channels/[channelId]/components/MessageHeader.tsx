'use client';

import { useMessageMultiSelectStore } from '@/hooks/store/message.store';
import { useUpdateChannel } from '@/hooks/useChannels';
import { ChannelsOutput, UpdateChannelInput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { SidebarTrigger } from '@workspace/ui/components/sidebar';
import { formatDistanceToNow } from 'date-fns';
import { BadgeCheck, ChevronLeft, CircleCheckBig, EllipsisVertical, ShieldBan, Trash2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface MessageHeaderV2Props {
  channel: ChannelsOutput;
}

export const MessageHeader: React.FC<MessageHeaderV2Props> = ({ channel }) => {
  const router = useRouter();
  const { setOpenMultiSelect } = useMessageMultiSelectStore();
  const { updateChannel } = useUpdateChannel();
  const [input, setInput] = useState<UpdateChannelInput>({
    channelId: channel.id,
    isBlocked: channel.isMessagingBlocked,
    isMessagingBlocked: channel.isMessagingBlocked,
    isMuted: channel.isMuted,
    isRestricted: channel.isRestricted
  });

  const handleChangeInput = async <K extends keyof UpdateChannelInput>(key: K, value: UpdateChannelInput[K]) => {
    const newInput = { ...input, [key]: value };
    setInput(newInput);
    await updateChannel(newInput);
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-border/50 bg-background/40 backdrop-blur-2xl">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center md:hidden">
            <SidebarTrigger />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3 py-1">
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-full bg-linear-to-tr from-amber-500/50 to-orange-500/50 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
              <Avatar className="h-10 w-10 border-2 border-background ring-1 ring-border transition-all group-hover:ring-amber-500/50">
                <AvatarImage src={channel.creatorAvatarUrl || ''} className="object-cover" />
                <AvatarFallback className="bg-secondary text-muted-foreground text-[10px] font-bold">
                  {channel.creatorFullname?.charAt(0) || 'C'}
                </AvatarFallback>
              </Avatar>
              {channel.isCreatorOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-foreground truncate max-w-30 sm:max-w-xs tracking-tight">
                  {channel.creatorFullname}
                </span>
                <div className="p-0.5 rounded-full bg-amber-500/10">
                  <BadgeCheck className="h-3.5 w-3.5 text-amber-500" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {channel.creatorLastSeenAt ? (
                  <span className="text-[10px] font-semibold text-muted-foreground tracking-wider">
                    {formatDistanceToNow(new Date(channel.creatorLastSeenAt), { addSuffix: true }).toUpperCase()}
                  </span>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-500 tracking-wider">ONLINE</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
              >
                <EllipsisVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-background/90 backdrop-blur-xl border-border/50 p-1.5 text-foreground rounded-2xl shadow-2xl"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-muted-foreground text-[9px] uppercase font-black tracking-[0.2em]">
                Channel Control
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50 mx-1" />
              <DropdownMenuItem
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-accent focus:bg-accent cursor-pointer transition-colors"
                onClick={() => setOpenMultiSelect(true)}
              >
                <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Select Messages</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-accent focus:bg-accent cursor-pointer transition-colors"
                onClick={() => handleChangeInput('isMuted', !channel.isMuted)}
              >
                <VolumeX className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{channel.isMuted ? 'Unmute' : 'Mute'} Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-accent focus:bg-accent cursor-pointer transition-colors"
                onClick={() => handleChangeInput('isRestricted', !channel.isRestricted)}
              >
                <ShieldBan className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{channel.isRestricted ? 'Unrestrict' : 'Restrict'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50 mx-1" />
              <DropdownMenuItem
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer transition-all"
                onClick={() => toast.message('Deleted chat')}
              >
                <Trash2 className="h-4 w-4" />
                <span className="text-sm font-bold">Delete Conversation</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
