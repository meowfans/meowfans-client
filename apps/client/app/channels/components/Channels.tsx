'use client';

import { useServerChannels } from '@/hooks/server/useServerChannels';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { useMemo, useState } from 'react';
import { ChannelFilter, ChannelsHeader } from './ChannelsHeader';
import { ChannelsList } from './ChannelsList';

interface ChannelsProps {
  initialChannels: ChannelsOutput[];
}

export function Channels({ initialChannels }: ChannelsProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<ChannelFilter>('all');
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const { channels, loading, hasMore, loadMore } = useServerChannels({ take: 20, skip: 0 }, initialChannels);

  const filteredChannels = useMemo(() => {
    let result = channels.filter(
      (channel) =>
        channel.creatorFullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === 'pinned') result = result.filter((c) => c.isPinned);
    if (filter === 'muted') result = result.filter((c) => c.isMuted);
    if (filter === 'unread') result = result.filter((c) => !c.lastMessage?.hasSeen);

    return result;
  }, [channels, searchTerm, filter]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-background/40 backdrop-blur-3xl">
      <div className="absolute inset-0 z-0 p-px overflow-hidden rounded-xl border-mask">
        <div className="pointer-events-none animate-rotate-border" />
      </div>

      <div className="z-10 relative flex h-full flex-col rounded-xl">
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
            onLoadMore={loadMore}
            isMultiSelectMode={isMultiSelectMode}
            selectedChannels={selectedChannels}
            setSelectedChannels={setSelectedChannels}
          />
        </div>
      </div>
    </div>
  );
}
