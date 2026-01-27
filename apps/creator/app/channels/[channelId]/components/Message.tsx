'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useChannelMessages } from '@/hooks/useMessages';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useParams } from 'next/navigation';
import { MessageHeader } from './Header';
import { MessageInput } from './Input';
import { MessageThread } from './MessageThread';
import { useEffect, useRef } from 'react';

export const Message = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { creator } = useCreator();
  const { channelId } = useParams<{ channelId: string }>();
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
                  className={`flex w-full my-2 ${isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <MessageThread message={message} isSender={isSender} />
                </div>
              );
            })
          ) : (
            <EmptyElement title="Start messaging" description="Looks like you have not messaged yet, Say Hi!" />
          )}
        </InfiniteScrollManager>
      </div>

      <MessageInput />
    </div>
  );
};
