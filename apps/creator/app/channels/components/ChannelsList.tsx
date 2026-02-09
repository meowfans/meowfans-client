'use client';

import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { ChannelItem } from './ChannelItem';

interface ChannelsListProps {
  channels: ChannelsOutput[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  isMultiSelectMode: boolean;
  selectedChannels: string[];
  setSelectedChannels: (ids: string[] | ((prev: string[]) => string[])) => void;
}

export function ChannelsList({
  channels,
  loading,
  hasMore,
  onLoadMore,
  isMultiSelectMode,
  selectedChannels,
  setSelectedChannels
}: ChannelsListProps) {
  return (
    <InfiniteScrollManager dataLength={channels.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
      <div className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
            >
              <ChannelItem
                channel={channel}
                isMultiSelectMode={isMultiSelectMode}
                isSelected={selectedChannels.includes(channel.id)}
                onToggleSelect={(id: string) =>
                  setSelectedChannels((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <div className="flex justify-center p-8">
          <Loading />
        </div>
      )}

      {!loading && channels.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="bg-muted p-4 rounded-full">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">No messages yet</h3>
            <p className="text-sm text-muted-foreground">Start a conversation with your fans</p>
          </div>
        </div>
      )}
    </InfiniteScrollManager>
  );
}
