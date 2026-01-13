import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { cn } from '@workspace/ui/lib/utils';
import { EllipsisVertical, Lock, ShieldBan, Trash2, VolumeX } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Channel } from './Channels';

enum ChannelBadgeVariant {
  General = 'default',
  Design = 'outline',
  Support = 'secondary',
  Random = 'destructive'
}

type ChannelType = 'General' | 'Design' | 'Support' | 'Random';
interface Props {
  channels: Channel[];
}

export const ChannelList: React.FC<Props> = ({ channels }) => {
  const router = useRouter();
  const [multiSelect, setMultiSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const selectedCount = selected.length;

  const channelMeta = useMemo(() => {
    const selectedSet = new Set(selected);
    return {
      selectedSet
    };
  }, [selected]);

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

  const handleMute = (channelName: string) => toast.message(`Muted ${channelName}`);
  const handleRestrict = (channelName: string) => toast.message(`Restricted ${channelName}`);
  const handleDelete = (channelName: string) => toast.message(`Deleted chat: ${channelName}`);

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
                  setMultiSelect((v) => {
                    const next = !v;
                    if (!next) setSelected([]);
                    return next;
                  });
                }}
              >
                {multiSelect ? 'Exit multi-select' : 'Multi-select'}
              </DropdownMenuItem>
              {multiSelect ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelected(channels.map((c) => c.path))}>Select all</DropdownMenuItem>
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

      {channels.map((c, idx) => {
        const channelVariant = (ChannelBadgeVariant[c.name as ChannelType] ?? (c.isPrivate ? 'secondary' : 'outline')) as
          | 'default'
          | 'secondary'
          | 'destructive'
          | 'outline';

        const isChecked = channelMeta.selectedSet.has(c.path);

        return (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            onClick={() => handleRowClick(c.path)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleRowClick(c.path);
            }}
            className={cn(
              'group flex items-center justify-between gap-3 rounded-xl border bg-background/70 px-3 py-2 backdrop-blur transition-colors',
              'hover:bg-muted/30'
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              {multiSelect ? (
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleSelected(c.path)}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Select ${c.name}`}
                />
              ) : null}

              <SAvatar url={c.lastMessage?.sender ? '/icons/app_icon.svg' : ''} />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <Badge variant={channelVariant} className="hidden sm:inline-flex">
                    {c.isPrivate ? 'Private' : 'Public'}
                  </Badge>
                  {c.isPrivate ? <Lock className="h-3.5 w-3.5 text-muted-foreground" /> : null}
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{c.lastMessage?.text ?? c.description ?? 'No messages yet'}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
              <span className="hidden sm:inline text-[11px]">{c.members.toLocaleString()}</span>
              <span className="text-[11px]">{c.lastMessage?.timestamp ? moment(c.lastMessage.timestamp).format('hh:mm') : ''}</span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Options for ${c.name}`}
                  >
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{c.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleMute(c.name)}>
                    <VolumeX className="h-4 w-4" />
                    Mute
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRestrict(c.name)}>
                    <ShieldBan className="h-4 w-4" />
                    Restrict
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => handleDelete(c.name)}>
                    <Trash2 className="h-4 w-4" />
                    Delete chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
};
