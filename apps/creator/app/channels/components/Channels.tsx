'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { ChannelsOutput, PaginationInput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { cn } from '@workspace/ui/lib/utils';
import { BellOff, Check, Filter, MessageSquare, MoreVertical, Pin, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChannelsList } from './ChannelsList';
import { ChannelsSidebarAssets } from './ChannelsSidebarAssets';
import { useServerChannels } from '@/hooks/server/useServerChannels';

export type ChannelFilter = 'all' | 'pinned' | 'muted' | 'unread';

interface ChannelsProps {
  initialChannels: ChannelsOutput[];
}

export function Channels({ initialChannels }: ChannelsProps) {
  const { showAssetsSidebar } = useUtilsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [filter, setFilter] = useState<ChannelFilter>('all');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const params: PaginationInput = {
    take: 20,
    searchTerm: debouncedSearch || undefined
  };

  const { channels, loading, hasMore, loadMore: handleLoadMore } = useServerChannels(params, initialChannels);

  const filteredChannels = channels.filter((channel: ChannelsOutput) => {
    if (filter === 'pinned') return channel.isPinned;
    if (filter === 'muted') return channel.isMuted;
    if (filter === 'unread') return !channel.lastMessage?.hasSeen;
    return true;
  });

  if (showAssetsSidebar) {
    return <ChannelsSidebarAssets />;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background/40 backdrop-blur-3xl">
      <div className="p-3 border-b bg-background/60 backdrop-blur-xl sticky top-0 z-10 space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-black uppercase tracking-tighter text-foreground/80">Messages</h1>
            <div className="bg-primary/10 px-1.5 py-0.5 rounded-full">
              <span className="text-[9px] font-black text-primary">{filteredChannels.length}</span>
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
              disabled={selectedChannels.length === 0}
              onClick={() => {
                setSelectedChannels([]);
                setIsMultiSelectMode(false);
              }}
            >
              <Trash2 className="h-3 w-3 mr-1.5" />
              Delete ({selectedChannels.length})
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-lg text-[9px] font-black uppercase tracking-tighter border-muted-foreground/10"
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
      <div className="flex-1 min-h-0 bg-background/10">
        <ChannelsList
          channels={filteredChannels}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          isMultiSelectMode={isMultiSelectMode}
          selectedChannels={selectedChannels}
          setSelectedChannels={setSelectedChannels}
        />
      </div>
    </div>
  );
}
