'use client';

import { useServerChannels } from '@/hooks/server/useServerChannels';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { ChannelsOutput, PaginationInput } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { ChannelsHeader } from './ChannelsHeader';
import { ChannelsList } from './ChannelsList';
import { ChannelsSidebarAssets } from './ChannelsSidebarAssets';

export type ChannelFilter = 'all' | 'pinned' | 'muted' | 'unread';

interface ChannelsProps {
  initialChannels: ChannelsOutput[];
}

export function Channels({ initialChannels }: ChannelsProps) {
  const showAssetsSidebar = useUtilsStore().showAssetsSidebar;
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
    if (filter === 'pinned') return channel.hasPinnedThisChannel;
    if (filter === 'muted') return channel.hasMutedThisChannel;
    if (filter === 'unread') return !channel.lastMessage?.hasSeen;
    return true;
  });

  if (showAssetsSidebar) {
    return <ChannelsSidebarAssets />;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background/40 backdrop-blur-3xl">
      <div className="absolute inset-0 z-0 p-px overflow-hidden rounded-xl border-mask">
        <div className="pointer-events-none animate-rotate-border" />
      </div>

      <ChannelsHeader
        filteredChannels={filteredChannels}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        isMultiSelectMode={isMultiSelectMode}
        setIsMultiSelectMode={setIsMultiSelectMode}
        selectedChannels={selectedChannels}
        setSelectedChannels={setSelectedChannels}
      />
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
