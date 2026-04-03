import { PageHandler } from '@/components/PageHandler';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { AnimatePresence } from 'framer-motion';
import { SingleMessage } from './SingleMessage';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  handleLoadMore: () => void;
  loading: boolean;
}

export const SingleChannelMessageThread = ({ channel, scrollRef, hasMore, handleLoadMore, loading }: SingleChannelMessageThreadProps) => {
  const { fan } = useFan();

  return (
    <PageHandler isEmpty={!channel.messages?.length} isLoading={loading}>
      <div ref={scrollRef} className="h-full overflow-y-auto p-6 space-y-6 flex flex-col-reverse custom-scrollbar z-0">
        <AnimatePresence initial={false}>
          {channel?.messages?.map((msg) => {
            const isMe = msg.senderId === fan?.fanId;
            return <SingleMessage channel={channel} isMe={isMe} message={msg} key={msg.id} />;
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
    </PageHandler>
  );
};
