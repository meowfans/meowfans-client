import { PaymentModal } from '@/components/PaymentModal';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { ChannelsOutput, PurchaseType } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence } from 'framer-motion';
import { SingleMessage } from './single-message/SingleMessage';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  handleLoadMore: () => void;
  loading: boolean;
}

export const SingleChannelMessageThread = ({ channel, scrollRef, hasMore, handleLoadMore, loading }: SingleChannelMessageThreadProps) => {
  const { fan } = useFan();
  const { selectedMessage, setSelectedMessage } = useMessageInputStore();

  return (
    <div
      ref={scrollRef}
      id="chatScrollable"
      className="h-full overflow-y-auto p-4 flex flex-col-reverse bg-background/5 transition-opacity duration-500 custom-scrollbar"
    >
      <AnimatePresence initial={false}>
        <InfiniteScrollManager
          dataLength={channel?.messages?.length || 0}
          hasMore={hasMore}
          loading={loading}
          inverse={true}
          onLoadMore={handleLoadMore}
          scrollableDiv="chatScrollable"
        >
          <div className="flex flex-col-reverse w-full h-full">
            {channel?.messages?.map((msg) => {
              const isMe = msg.senderId === fan?.fanId;
              return <SingleMessage channel={channel} isMe={isMe} message={msg} key={msg.id} />;
            })}
          </div>
        </InfiniteScrollManager>
      </AnimatePresence>
      {selectedMessage && (
        <PaymentModal
          open={!!selectedMessage}
          onOpenChange={() => setSelectedMessage(null)}
          amount={Number(selectedMessage.unlockPrice || 0)}
          entityId={selectedMessage.id}
          creatorId={selectedMessage.senderId}
          purchaseType={PurchaseType.Message}
          title="Unlock Premium Message"
          description="Get instant access to this exclusive drop from the creator."
        />
      )}
    </div>
  );
};
