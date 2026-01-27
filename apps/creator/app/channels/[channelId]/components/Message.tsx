'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useMessagesStore } from '@/hooks/store/message.store';
import { useChannelMessages } from '@/hooks/useMessages';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Toggle } from '@workspace/ui/globals/Toggle';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { MessageHeader } from './Header';
import { MessageInput } from './Input';
import { MessageThread } from './MessageThread';
import { MultiSelectButtons } from './MultiSelectButtons';

export const Message = () => {
  const { creator } = useCreator();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { channelId } = useParams<{ channelId: string }>();
  const { openMultiSelect, deleteMessageIds, toggleMessageIds } = useMessagesStore();
  const { channel, handleLoadMore, hasMore, loading } = useChannelMessages({ relatedEntityId: channelId, take: 30 });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [channel.messages?.length]);

  return (
    <div className="w-full relative h-screen overflow-hidden">
      <MessageHeader channel={channel} />

      <div ref={scrollRef} id="channel-scroll" className="absolute top-16 bottom-16 left-0 right-0 overflow-y-auto">
        <InfiniteScrollManager
          scrollableDiv="channel-scroll"
          dataLength={channel.messages?.length || 0}
          hasMore={hasMore}
          loading={loading}
          onLoadMore={handleLoadMore}
        >
          {channel.messages?.length > 0 ? (
            channel.messages.map((message) => {
              const isSender = message.senderId === creator.creatorId;

              return (
                <div
                  id={`msg-${message.id}`}
                  key={`msg-${message.id}`}
                  className={`relative flex w-full my-2 ${isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <MessageThread message={message} isSender={isSender} />
                  <Toggle
                    visible={openMultiSelect && isSender}
                    checked={deleteMessageIds.includes(message.id)}
                    onChange={() => toggleMessageIds(message.id)}
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  />
                </div>
              );
            })
          ) : (
            <EmptyElement title="Start messaging" description="Looks like you have not messaged yet, Say Hi!" />
          )}
        </InfiniteScrollManager>
      </div>
      <MultiSelectButtons />
      <MessageInput />
    </div>
  );
};
