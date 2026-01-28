import { MessagesEntity } from '@workspace/gql/generated/graphql';
import { Carousel } from '@workspace/ui/globals/Carousel';
import { formatDate } from '@workspace/ui/lib/formatters';
import { cn } from '@workspace/ui/lib/utils';
import { ReplyPreview } from './ReplyPreview';

interface MessageThreadContentProps {
  message: MessagesEntity;
  isSender: boolean;
}

export const MessageThreadContent: React.FC<MessageThreadContentProps> = ({ message, isSender }) => {
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
            getKey={({ asset }) => asset.id}
            getUrl={({ asset }) => asset.rawUrl}
            getFileType={({ asset }) => asset.fileType}
            urls={message.messageAssets.map(({ asset }) => asset.rawUrl)}
          />
        </div>
      )}

      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <span>{formatDate(message.createdAt)}</span>
      </div>
    </div>
  );
};
