'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useChannelMessages } from '@/hooks/useMessages';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams } from 'next/navigation';
import { MessageHeader } from './Header';
import { MessageInput } from './Input';
import { MessageThread } from './Thread';

export const Message = () => {
  const { creator } = useCreator();
  const { channelId } = useParams<{ channelId: string }>();
  const { messages, handleLoadMore, hasMore, loading } = useChannelMessages({ relatedEntityId: channelId, take: 30 });

  return (
    <PageManager>
      <MessageHeader />
      <div className="mt-16">
        <InfiniteScrollManager dataLength={messages.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
          {messages.map((message) => {
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
    </PageManager>
  );
};
