'use client';

import { useChannelsStore } from '@/hooks/store/channels.store';
import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Carousel } from '@workspace/ui/globals/Carousel';
import { SeenPreview } from '@workspace/ui/globals/SeenPreview';
import { cn } from '@workspace/ui/lib/utils';
import { useMemo } from 'react';
import { ReplyPreview } from './ReplyPreview';

interface MessageThreadContentV2Props {
  message: MessagesOutput;
  isSender: boolean;
}

export const MessageThreadContent: React.FC<MessageThreadContentV2Props> = ({ message, isSender }) => {
  const { channel } = useChannelsStore();

  const hasSeen = useMemo(() => {
    const timestamp = new Date(Number(channel?.creatorLastSeenAt)).getTime();
    return timestamp >= Math.max(new Date(message.createdAt).getTime(), new Date(message.updatedAt).getTime());
  }, [channel, message]);

  const handleScrollToRepliedMessage = (messageId: string) => {
    const element = document.getElementById(messageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.animate([{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }, { backgroundColor: 'transparent' }], {
        duration: 2000,
        easing: 'ease-out'
      });
    }
  };

  return (
    <div className="min-w-0 w-full space-y-2">
      {message.repliedTo && (
        <ReplyPreview
          onScroll={(id) => handleScrollToRepliedMessage(id)}
          repliedTo={message.repliedTo as MessagesOutput}
          isSender={isSender}
        />
      )}
      <p className={cn('text-sm leading-relaxed wrap-break-word', isSender ? 'text-white font-medium' : 'text-foreground')}>
        {message.content}
      </p>

      {!!message.messageAssets?.length && (
        <div className="w-full max-w-75 mt-3 rounded-xl overflow-hidden shadow-xl border border-border">
          <Carousel
            items={message.messageAssets}
            getKey={({ id }) => id}
            getUrl={({ rawUrl }) => rawUrl}
            getFileType={({ fileType }) => fileType}
            urls={message.messageAssets.map(({ rawUrl }) => rawUrl)}
          />
        </div>
      )}

      <div
        className={cn(
          'flex items-center gap-2 pt-1 opacity-70 group-hover:opacity-100 transition-opacity',
          isSender ? 'justify-end' : 'justify-start'
        )}
      >
        <SeenPreview isSender={isSender} seen={hasSeen} />
      </div>
    </div>
  );
};
