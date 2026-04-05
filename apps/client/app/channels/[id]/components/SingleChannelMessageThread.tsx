import { PaymentModal } from '@/components/PaymentModal';
import { useInfiniteObserver } from '@/hooks/client/useInfiniteObserver';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { ChannelsOutput, PurchaseType } from '@workspace/gql/generated/graphql';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
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
  const payableMessage = useMessageInputStore((state) => state.payableMessage);
  const setPayableMessage = useMessageInputStore((state) => state.setPayableMessage);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useInfiniteObserver({
    target: sentinelRef,
    hasMore,
    loading,
    onLoadMore: handleLoadMore,
    root: scrollRef.current ?? null
  });

  return (
    <div
      ref={scrollRef}
      id="chatScrollable"
      className="h-full overflow-y-auto p-4 flex flex-col-reverse bg-background/5 transition-opacity duration-500 custom-scrollbar"
    >
      <AnimatePresence initial={false}>
        <div className="flex flex-col-reverse w-full h-full">
          {channel?.messages?.map((msg) => {
            const isMe = msg.senderId === fan?.fanId;
            return <SingleMessage channel={channel} isMe={isMe} message={msg} key={msg.id} />;
          })}
          <div key={'ref' + channel?.id} ref={sentinelRef} />
        </div>
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
