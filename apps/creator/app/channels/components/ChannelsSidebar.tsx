'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { useChannels } from '@/hooks/useChannels';
import { PaginationInput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { Check, MoreVertical, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChannelsList } from './ChannelsList';
import { ChannelsSidebarAssets } from './ChannelsSidebarAssets';

export function ChannelsSidebar() {
  const { showAssetsSidebar } = useUtilsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

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

  const { channels, loading, hasMore, handleLoadMore } = useChannels(params);

  if (showAssetsSidebar) {
    return <ChannelsSidebarAssets />;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="p-4 border-b bg-card/50 backdrop-blur-md sticky top-0 z-10 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-tight">Messages</h1>
          {!isMultiSelectMode ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsMultiSelectMode(true)}>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Select Conversations</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{selectedChannels.length} selected</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsMultiSelectMode(false);
                  setSelectedChannels([]);
                }}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {!isMultiSelectMode ? (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 text-sm rounded-full bg-muted/50 border-none focus-visible:ring-primary/20 transition-all"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <Button
              variant="destructive"
              className="flex-1 h-10 rounded-full text-xs font-bold uppercase tracking-widest"
              disabled={selectedChannels.length === 0}
              onClick={() => {
                // Bulk action logic will go here
                console.log('Delete channels:', selectedChannels);
                setSelectedChannels([]);
                setIsMultiSelectMode(false);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-full text-xs font-bold uppercase tracking-widest"
              onClick={() => {
                const allIds = channels.map((c) => c.id);
                setSelectedChannels(selectedChannels.length === channels.length ? [] : allIds);
              }}
            >
              {selectedChannels.length === channels.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 min-h-0">
        <ChannelsList
          channels={channels}
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
