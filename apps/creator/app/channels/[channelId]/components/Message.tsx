'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useMessageMultiSelectStore } from '@/hooks/store/message.store';
import { useChannelMessages } from '@/hooks/useMessages';
import { useQuery } from '@apollo/client/react';
import { UPDATE_LAST_SEEN_QUERY } from '@workspace/gql/api';
import { SortOrder } from '@workspace/gql/generated/graphql';
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
  const { openMultiSelect, deleteMessageIds, toggleMessageIds } = useMessageMultiSelectStore();
  const { channel, handleLoadMore, hasMore, loading } = useChannelMessages({
    relatedEntityId: channelId,
    take: 30,
    orderBy: SortOrder.Desc
  });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTop = 0;
  }, []);

  const { refetch } = useQuery(UPDATE_LAST_SEEN_QUERY, {
    skip: !channelId && !loading,
    variables: { input: { messageChannelId: channelId } }
  });

  useEffect(() => {
    const lastMessage = (channel.messages || []).at(0);
    if (lastMessage?.recipientUserId === creator?.creatorId) {
      refetch({ input: { messageChannelId: channelId, messageId: lastMessage.id } });
    }
  }, [channel?.messages, channelId, refetch, creator]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MessageHeader channel={channel} />
      <div
        ref={scrollRef}
        id="channel-scroll"
        className="
          absolute top-16 bottom-16 left-0 right-0
          overflow-y-auto flex flex-col-reverse"
      >
        <InfiniteScrollManager
          scrollableDiv="channel-scroll"
          dataLength={channel.messages?.length || 0}
          hasMore={hasMore}
          loading={loading}
          inverse
          onLoadMore={handleLoadMore}
        >
          <div className="flex flex-col-reverse">
            {channel.messages?.length ? (
              channel.messages.map((message) => {
                const isSender = message.senderId === creator.creatorId;
                return (
                  <div
                    key={message.id}
                    id={`msg-${message.id}`}
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
              <EmptyElement title="Start messaging" description="Looks like you have not messaged yet. Say hi!" />
            )}
          </div>
        </InfiniteScrollManager>
      </div>
      {openMultiSelect ? <MultiSelectButtons /> : <MessageInput />}
    </div>
  );
};
