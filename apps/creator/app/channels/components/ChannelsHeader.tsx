'use client';

import { useUpdateChannelStatus } from '@/hooks/useChannels';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { pluralizeByCount } from '@workspace/ui/lib/helpers';
import { cn } from '@workspace/ui/lib/utils';
import { BellOff, Check, Filter, MessageSquare, MoreVertical, Pin, Search, Trash2, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ChannelFilter } from './Channels';

interface ChannelsHeaderProps {
  filteredChannels: ChannelsOutput[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  filter: ChannelFilter;
  setFilter: (filter: ChannelFilter) => void;
  isMultiSelectMode: boolean;
  setIsMultiSelectMode: (isMultiSelectMode: boolean) => void;
  selectedChannels: string[];
  setSelectedChannels: (selectedChannels: string[]) => void;
}

export const ChannelsHeader = ({
  filteredChannels,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  isMultiSelectMode,
  setIsMultiSelectMode,
  selectedChannels,
  setSelectedChannels
}: ChannelsHeaderProps) => {
  const pathname = usePathname();
  const { updateChannelStatus, loading } = useUpdateChannelStatus();

  const handleBulkDelete = async () => {
    if (selectedChannels.length === 0) return;
    await Promise.all(
      selectedChannels.map((channelId) =>
        updateChannelStatus({ channelId, status: MessageChannelStatus.Rejected })
      )
    );
    setSelectedChannels([]);
    setIsMultiSelectMode(false);
  };

  return (
    <div className="flex-none py-2 px-1.5 space-y-3 bg-background/20">
      <div className="flex flex-row justify-between items-center gap-2 px-1">
        <div className="flex items-center gap-3">
          <ReturnToPreviousPage applyReturn={pathname.startsWith('/channels/')} />
          <div className="space-y-0.5">
            <h1 className="text-sm md:text-base font-black tracking-tighter bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent uppercase">
              Messages
            </h1>
            <p className="text-[7.5px] md:text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest">
              {filteredChannels.length} {pluralizeByCount(filteredChannels.length, 'Thread')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn(
                  'h-7 w-7 rounded-full transition-colors',
                  filter !== 'all' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:bg-secondary'
                )}
              >
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
              <DropdownMenuItem
                onClick={() => setFilter('all')}
                className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer"
              >
                <MessageSquare className="h-3 w-3" /> ALL CONVERSATIONS
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter('pinned')}
                className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer"
              >
                <Pin className="h-3 w-3" /> PINNED
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter('muted')}
                className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer"
              >
                <BellOff className="h-3 w-3" /> MUTED
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter('unread')}
                className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> UNREAD
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isMultiSelectMode ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="h-7 w-7 rounded-full text-muted-foreground hover:bg-secondary">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
                <DropdownMenuItem
                  onClick={() => setIsMultiSelectMode(true)}
                  className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" /> SELECT CHATS
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setIsMultiSelectMode(false);
                setSelectedChannels([]);
              }}
              className="h-7 w-7 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {!isMultiSelectMode ? (
        <div className="relative group px-0.5">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-8 text-[11px] font-medium rounded-lg bg-secondary/30 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
          />
        </div>
      ) : (
        <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 px-0.5">
          <Button
            variant="destructive"
            className="flex-1 h-8 rounded-lg text-[9px] font-black uppercase tracking-tighter"
            disabled={selectedChannels.length === 0 || loading}
            onClick={handleBulkDelete}
          >
            <Trash2 className="h-3 w-3 mr-1.5" />
            {loading ? 'Deleting…' : `Delete (${selectedChannels.length})`}
          </Button>
          <Button
            variant="outline"
            className="h-8 rounded-lg text-[9px] font-black uppercase tracking-tighter border-muted-foreground/10"
            disabled={loading}
            onClick={() => {
              const allIds = filteredChannels.map((c: ChannelsOutput) => c.id);
              setSelectedChannels(selectedChannels.length === filteredChannels.length ? [] : allIds);
            }}
          >
            {selectedChannels.length === filteredChannels.length ? 'None' : 'All'}
          </Button>
        </div>
      )}
    </div>
  );
};
