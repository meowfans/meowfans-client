import { useMessagesStore } from '@/hooks/store/message.store';
import { useUpdateChannel } from '@/hooks/useChannels';
import { MessageChannelsEntity, UpdateChannelInput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { ArrowBigLeftDash, CircleCheckBig, EllipsisVertical, ShieldBan, Trash2, VolumeX } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface MessageHeaderProps {
  channel: MessageChannelsEntity;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({ channel }) => {
  const router = useRouter();
  const { setOpenMultiSelect } = useMessagesStore();
  const { updateChannel } = useUpdateChannel();
  const [input, setInput] = useState<UpdateChannelInput>({
    channelId: channel.id,
    isBlocked: channel.isMessagingBlocked,
    isMessagingBlocked: channel.isMessagingBlocked,
    isMuted: channel.isMuted,
    isRestricted: channel.isRestricted
  });

  const handleChangeInput = async <K extends keyof UpdateChannelInput>(key: K, value: UpdateChannelInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
    await updateChannel(input);
  };

  return (
    <div className="fixed top-0 left-0 md:left-(--sidebar-width) md:right-(--sidebar-width) right-0 flex flex-row items-center justify-between border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 px-2 z-40 h-16">
      <div className="flex flex-row justify-between space-x-3 items-center">
        <Button variant={'outline'} size={'lg'} onClick={() => router.back()}>
          <ArrowBigLeftDash />
        </Button>
        <div className="cursor-pointer">
          <SAvatar url={channel.creatorProfile?.user?.avatarUrl} />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">
            {channel.creatorProfile?.user?.firstName} {channel.creatorProfile?.user?.lastName}
          </p>
          <p className="font-semibold text-xs">{moment(channel.creatorProfile?.user?.lastLoginAt).format('hh:mm')}</p>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Chat actions">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Chat actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenMultiSelect(true)}>
                <CircleCheckBig className="h-4 w-4" />
                Select
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeInput('isMuted', !channel.isMuted)}>
                <VolumeX className="h-4 w-4" />
                Mute
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeInput('isRestricted', !channel.isRestricted)}>
                <ShieldBan className="h-4 w-4" />
                Restrict
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => toast.message('Deleted chat')}>
                <Trash2 className="h-4 w-4" />
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
