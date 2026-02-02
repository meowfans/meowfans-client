import { ChannelsOutput, MessagesOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { OnlinePreview } from '@workspace/ui/globals/OnlinePreview';
import { SeenPreview } from '@workspace/ui/globals/SeenPreview';
import { cn } from '@workspace/ui/lib/utils';
import { EllipsisVertical } from 'lucide-react';
import moment from 'moment';

interface ChannelListExpandedProps {
  onRowClick: (id: string) => unknown;
  channel: ChannelsOutput;
  lastMessage?: MessagesOutput | null;
  hasSeenLastMessage: boolean;
}

export const ChannelListExpanded: React.FC<ChannelListExpandedProps> = ({ onRowClick, channel, lastMessage, hasSeenLastMessage }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onRowClick(channel.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onRowClick(channel.id);
      }}
      className={cn(
        'group flex items-center justify-between gap-3 rounded-xl border bg-background/70 px-3 py-2 backdrop-blur transition-colors',
        'hover:bg-muted/30'
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <OnlinePreview avatarUrl={channel.creatorAvatarUrl as string} isOnline={channel.isCreatorOnline} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">{channel.creatorFullname}</p>

          <div className="mt-0.5 flex items-center gap-2">
            <SeenPreview isSender={channel.creatorId === lastMessage?.recipientUserId} seen={hasSeenLastMessage} />

            <p className={cn('min-w-0 flex-1 truncate text-xs', hasSeenLastMessage ? 'text-muted-foreground' : 'text-primary font-medium')}>
              {lastMessage?.content ?? ''}
            </p>

            <span className="shrink-0 text-[11px] text-muted-foreground">
              {lastMessage?.createdAt ? moment(lastMessage?.createdAt).format('HH:mm') : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Options for`}
            >
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{channel.id}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
