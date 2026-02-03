'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessageMultiSelectStore } from '@/hooks/store/message.store';
import { useChannelMessages } from '@/hooks/useMessages';
import { useQuery } from '@apollo/client/react';
import { UPDATE_LAST_SEEN_QUERY } from '@workspace/gql/api';
import { MessageChannelStatus, SortOrder } from '@workspace/gql/generated/graphql';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Toggle } from '@workspace/ui/globals/Toggle';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ChannelStatusPreview } from './ChannelStatusPreview';
import { MessageHeader } from './MessageHeader';
import { MessageInput } from './MessageInput';
import { MessageThread } from './MessageThread';
import { MultiSelectButtons } from './MultiSelectButtons';

export const Message = () => {
  const { fan } = useFan();
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
    if (lastMessage?.recipientUserId === fan?.fanId) {
      refetch({ input: { messageChannelId: channelId, messageId: lastMessage?.id } });
    }
  }, [channel?.messages, channelId, refetch, fan]);

  return (
    <div className="relative flex-1 w-full overflow-hidden bg-background">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-orange-600/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        <MessageHeader channel={channel} />

        <div
          ref={scrollRef}
          id="channel-scroll-v2"
          className="flex-1 overflow-y-auto flex flex-col-reverse px-4 py-4 md:px-6 scroll-smooth transition-all no-scrollbar"
        >
          <InfiniteScrollManager
            scrollableDiv="channel-scroll-v2"
            dataLength={channel.messages?.length || 0}
            hasMore={hasMore}
            loading={loading}
            inverse={true}
            onLoadMore={handleLoadMore}
          >
            <div className="flex flex-col-reverse max-w-4xl mx-auto w-full py-4">
              {channel.messages?.length > 0 ? (
                channel.messages.map((message, index) => {
                  const isSender = message.senderId === fan?.fanId;

                  return (
                    <div
                      id={message.id}
                      key={`msg-${message.id}`}
                      className={`relative flex w-full my-1 md:my-1.5 px-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both ${isSender ? 'justify-end' : 'justify-start'}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <MessageThread message={message} isSender={isSender} />
                      <Toggle
                        visible={openMultiSelect && isSender}
                        checked={deleteMessageIds.includes(message.id)}
                        onChange={() => toggleMessageIds(message.id)}
                        className="absolute -left-12 top-1/2 -translate-y-1/2 scale-125"
                      />
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-32 opacity-40">
                  <EmptyElement title="New Conversation" description="Be the first to say hello!" />
                </div>
              )}
            </div>
          </InfiniteScrollManager>
        </div>

        <div className="p-4 md:p-8 bg-linear-to-t from-background via-background/90 to-transparent backdrop-blur-sm">
          {channel.status === MessageChannelStatus.Accepted ? (
            openMultiSelect ? (
              <MultiSelectButtons />
            ) : (
              <MessageInput channel={channel} />
            )
          ) : (
            <div className="max-w-xl mx-auto border border-border bg-card/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              <ChannelStatusPreview channel={channel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
