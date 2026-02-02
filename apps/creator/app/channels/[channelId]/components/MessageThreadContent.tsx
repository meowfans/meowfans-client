import { useChannelsStore } from '@/hooks/store/channels.store';
import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Carousel } from '@workspace/ui/globals/Carousel';
import { SeenPreview } from '@workspace/ui/globals/SeenPreview';
import { formatDate } from '@workspace/ui/lib/formatters';
import { cn } from '@workspace/ui/lib/utils';
import { useMemo } from 'react';
import { ReplyPreview } from './ReplyPreview';

interface MessageThreadContentProps {
  message: MessagesOutput;
  isSender: boolean;
}

export const MessageThreadContent: React.FC<MessageThreadContentProps> = ({ message, isSender }) => {
  const { channel } = useChannelsStore();

  const hasSeen = useMemo(() => {
    const timestamp = new Date(Number(channel?.fanLastSeenAt)).getTime();
    return timestamp >= Math.max(new Date(message.createdAt).getTime(), new Date(message.updatedAt).getTime());
  }, [channel, message]);

  const handleScrollToRepliedMessage = (messageId: string) => {
    const element = document.getElementById(`msg-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.animate([{ backgroundColor: 'rgba(59,130,246,0.15)' }, { backgroundColor: 'transparent' }], {
        duration: 3000,
        easing: 'ease-out'
      });
    }
  };

  return (
    <div className="min-w-0 w-full space-y-2">
      {message.repliedTo && (
        <ReplyPreview onScroll={(id) => handleScrollToRepliedMessage(id)} repliedTo={message.repliedTo} isSender={isSender} />
      )}
      <p className={cn('text-sm leading-relaxed wrap-break-word', isSender ? 'text-primary' : 'text-foreground/90')}>{message.content}</p>

      {!!message.messageAssets?.length && (
        <div className="w-50">
          <Carousel
            items={message.messageAssets}
            getKey={({ id }) => id}
            getUrl={({ rawUrl }) => rawUrl}
            getFileType={({ fileType }) => fileType}
            urls={message.messageAssets.map(({ rawUrl }) => rawUrl)}
          />
        </div>
      )}

      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <SeenPreview isSender={isSender} seen={hasSeen} />
        <span>{formatDate(message.createdAt)}</span>
      </div>
    </div>
  );
};
