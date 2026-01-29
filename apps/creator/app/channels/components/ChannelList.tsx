import { useChannels } from '@/hooks/useChannels';
import { Badge } from '@workspace/ui/components/badge';
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
import { SeenPreview } from '@workspace/ui/globals/SeenPreview';
import { cn } from '@workspace/ui/lib/utils';
import { EllipsisVertical, ShieldBan, Trash2, VolumeX } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const ChannelList = () => {
  const router = useRouter();
  const [multiSelect, setMultiSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { channels, loading } = useChannels({ take: 30 });

  const selectedCount = selected.length;

  const toggleSelected = (channelPath: string) => {
    setSelected((prev) => (prev.includes(channelPath) ? prev.filter((p) => p !== channelPath) : [...prev, channelPath]));
  };

  const handleRowClick = (channelPath: string) => {
    if (multiSelect) {
      toggleSelected(channelPath);
      return;
    }
    router.push(`/channels/${channelPath}`);
  };

  console.log({ channels });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Chats</p>
        <div className="flex items-center gap-2">
          {multiSelect ? <Badge variant="secondary">{selectedCount} selected</Badge> : <Badge variant="outline">{channels.length}</Badge>}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Chat options">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Channel tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setMultiSelect((prev) => {
                    if (!prev) setSelected([]);
                    return !prev;
                  });
                }}
              >
                {multiSelect ? 'Exit multi-select' : 'Multi-select'}
              </DropdownMenuItem>
              {multiSelect ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelected(channels.map((c) => c.id))}>Select all</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelected([])}>Clear selection</DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {multiSelect && selectedCount ? (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-background/70 p-2 backdrop-blur">
          <Button variant="outline" size="sm" onClick={() => toast.message(`Muted ${selectedCount} chats`)}>
            <VolumeX className="h-4 w-4" />
            Mute
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.message(`Restricted ${selectedCount} chats`)}>
            <ShieldBan className="h-4 w-4" />
            Restrict
          </Button>
          <Button variant="destructive" size="sm" onClick={() => toast.message(`Deleted ${selectedCount} chats`)}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      ) : null}

      {loading && <p className="text-sm text-muted-foreground">Loading channels...</p>}

      {channels.map((c, idx) => {
        const fan = c.participants.find(({ userId }) => userId === c?.fanProfile?.fanId);
        const timestamp = fan ? new Date(Number(fan.lastSeenAt)).getTime() : new Date(0).getTime();
        const hasSeenLastMessage = timestamp >= new Date(c?.lastMessage?.createdAt).getTime();

        console.log({ fan, timestamp, hasSeenLastMessage });
        return (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            onClick={() => handleRowClick(c.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleRowClick(c.id);
            }}
            className={cn(
              'group flex items-center justify-between gap-3 rounded-xl border bg-background/70 px-3 py-2 backdrop-blur transition-colors',
              'hover:bg-muted/30'
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <SAvatar url={c.fanProfile?.user?.avatarUrl} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">
                  {c.fanProfile?.user?.firstName} {c.fanProfile?.user?.lastName}
                </p>

                <div className="mt-0.5 flex items-center gap-2">
                  <SeenPreview isSender={fan?.userId === c?.lastMessage?.recipientUserId} seen={hasSeenLastMessage} />

                  <p
                    className={cn(
                      'min-w-0 flex-1 truncate text-xs',
                      hasSeenLastMessage ? 'text-muted-foreground' : 'text-primary font-medium'
                    )}
                  >
                    {c.lastMessage?.content ?? 'Last message is erased'}
                  </p>

                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {c.lastMessage?.createdAt ? moment(c.lastMessage.createdAt).format('HH:mm') : ''}
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
                    aria-label={`Options for ${c.fanProfile?.user?.username}`}
                  >
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{c.id}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
};
