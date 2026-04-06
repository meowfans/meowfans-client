import { PaymentModal } from '@/components/PaymentModal';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { ChannelsOutput, PurchaseType } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence } from 'framer-motion';
import { SingleMessage } from './single-message/SingleMessage';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  loadMore: () => void;
  loading: boolean;
}

export const SingleChannelMessageThread = ({ channel, scrollRef, hasMore, loadMore, loading }: SingleChannelMessageThreadProps) => {
  const payableMessage = useMessageInputStore((state) => state.payableMessage);
  const setPayableMessage = useMessageInputStore((state) => state.setPayableMessage);

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
          onLoadMore={loadMore}
          scrollableDiv="chatScrollable"
        >
          <div className="flex flex-col-reverse w-full h-full">
            {channel?.messages?.map((msg) => {
              const isMe = msg.senderId !== channel?.creatorId;
              return <SingleMessage isMe={isMe} message={msg} channel={channel} key={msg.id} />;
            })}
          </div>
        </InfiniteScrollManager>
      </AnimatePresence>
      {payableMessage && (
        <PaymentModal
          open={!!payableMessage}
          onOpenChange={() => setPayableMessage(null)}
          amount={Number(payableMessage.unlockPrice || 0)}
          entityId={payableMessage.id}
          creatorId={payableMessage.senderId}
          purchaseType={PurchaseType.Message}
          title="Unlock Premium Message"
          description="Get instant access to this exclusive drop from the creator."
        />
      )}
    </div>
  );
};
