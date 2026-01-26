'use client';

import { MessagesEntity } from '@workspace/gql/generated/graphql';
import { Carousel } from '@workspace/ui/globals/Carousel';
import { cn } from '@workspace/ui/lib/utils';
import moment from 'moment';

interface MessageThreadContentProps {
  message: MessagesEntity;
  isSender: boolean;
}

export const MessageThreadContent: React.FC<MessageThreadContentProps> = ({ message, isSender }) => {
  return (
    <div className="min-w-0 w-full space-y-2">
      <p
        className={cn(
          'text-sm leading-relaxed wrap-break-word',
          message.isExclusive && 'blur-sm select-none',
          isSender ? 'text-primary-foreground' : 'text-foreground/90'
        )}
      >
        {message.content}
      </p>

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

      <div className={cn('flex items-center gap-2 text-[11px]', isSender ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
        <span>{moment(message.createdAt).format('hh:mm')}</span>
      </div>
    </div>
  );
};
