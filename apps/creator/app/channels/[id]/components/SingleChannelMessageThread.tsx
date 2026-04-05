'use client';

import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence } from 'framer-motion';
import { SingleMessage } from './single-message/SingleMessage';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  handleLoadMore: () => void;
  loading: boolean;
}

export function SingleChannelMessageThread({ channel, scrollRef, hasMore, handleLoadMore, loading }: SingleChannelMessageThreadProps) {
  return (
    <div
      ref={scrollRef}
      id="chatScrollable"
      className="h-full overflow-y-auto p-4 flex flex-col-reverse bg-background/5 transition-opacity duration-500 custom-scrollbar"
    >
      <AnimatePresence initial={false}>
        <InfiniteScrollManager
          dataLength={channel?.messages.length || 0}
          inverse={true}
          hasMore={hasMore}
          loading={loading}
          onLoadMore={handleLoadMore}
          scrollableDiv="chatScrollable"
        >
          <div className="flex flex-col-reverse w-full h-full">
            {channel?.messages?.map((msg) => {
              const isMe = msg.senderId !== channel?.fanId;
              return <SingleMessage isMe={isMe} message={msg} channel={channel} key={msg.id} />;
            })}
          </div>
        </InfiniteScrollManager>
      </AnimatePresence>
    </div>
  );
}
