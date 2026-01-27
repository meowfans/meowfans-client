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
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {c.fanProfile?.user?.firstName.concat(' ', c.fanProfile?.user?.lastName) ?? 'No messages yet'}
                  </p>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{c.lastMessage?.content ?? 'No messages yet'}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
              <span className="text-[11px]">{c.lastMessage?.createdAt ? moment(c.lastMessage.createdAt).format('hh:mm') : ''}</span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Options for ${c.id}`}
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
