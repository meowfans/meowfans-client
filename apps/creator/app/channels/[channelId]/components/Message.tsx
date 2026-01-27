'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useChannelMessages } from '@/hooks/useMessages';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useParams } from 'next/navigation';
import { MessageHeader } from './Header';
import { MessageInput } from './Input';
import { MessageThread } from './MessageThread';

export const Message = () => {
  const { creator } = useCreator();
  const { channelId } = useParams<{ channelId: string }>();
  const { channel, handleLoadMore, hasMore, loading } = useChannelMessages({ relatedEntityId: channelId, take: 30 });

  return (
    <div className="w-full relative h-screen overflow-hidden">
      <MessageHeader channel={channel} />
      <div id="channel-scroll" className="absolute top-16 bottom-16 left-0 right-0 overflow-y-auto">
        <InfiniteScrollManager
          scrollableDiv="channel-scroll"
          dataLength={channel.messages?.length || 0}
          hasMore={hasMore}
          loading={loading}
          onLoadMore={handleLoadMore}
        >
          {channel.messages?.map((message) => {
            const isSender = message.senderId === creator.creatorId;
            return (
              <div key={message.id} className={`flex w-full my-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
                <MessageThread message={message} isSender={isSender} />
              </div>
            );
          })}
        </InfiniteScrollManager>
      </div>
      <MessageInput />
    </div>
  );
};
