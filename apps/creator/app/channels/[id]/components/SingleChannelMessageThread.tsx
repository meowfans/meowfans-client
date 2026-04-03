'use client';

import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SingleMessage } from './SingleMessage';
import { Button } from '@workspace/ui/components/button';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  handleLoadMore: () => void;
  loading: boolean;
}

export function SingleChannelMessageThread({ channel, scrollRef, hasMore, handleLoadMore, loading }: SingleChannelMessageThreadProps) {
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) => (prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId]));
  };

  return (
    <div
      ref={scrollRef}
      id="chatScrollable"
      className="h-full overflow-y-auto p-4 flex flex-col-reverse bg-background/5 transition-opacity duration-500 custom-scrollbar"
    >
      <AnimatePresence initial={false}>
        {channel?.messages?.map((msg) => {
          const isMe = msg.senderId !== channel?.fanId;
          const isSelected = selectedMessages.includes(msg.id);
          return (
            <SingleMessage
              isMe={isMe}
              isMultiSelectMode={isMultiSelectMode}
              isSelected={isSelected}
              message={msg}
              channel={channel}
              toggleMessageSelection={toggleMessageSelection}
              key={msg.id}
            />
          );
        })}
      </AnimatePresence>

      {hasMore && (
        <div className="flex justify-center py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadMore}
            className="rounded-full bg-background/50 border-muted/50 text-xs px-4"
          >
            Load earlier messages
          </Button>
        </div>
      )}
    </div>
  );
}
