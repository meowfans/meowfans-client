import { useMessagesStore } from '@/hooks/store/message.store';
import { FileType, MessagesEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { ChevronDown, Lock } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';

interface Props {
  message: MessagesEntity;
  isSender?: boolean;
}

export const MessageThread: React.FC<Props> = ({ message, isSender = false }) => {
  const { setMessageOptionsMenu } = useMessagesStore();

  return (
    <div
      className={cn(
        'group relative max-w-[min(34rem,90%)] rounded-2xl border px-3 py-2 shadow-sm',
        isSender ? 'bg-primary text-primary-foreground border-primary/20' : 'bg-background/70 backdrop-blur border-border/60'
      )}
    >
      <div className="flex items-start justify-between gap-3">
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
            <div className="grid grid-cols-2 gap-2">
              {message.messageAssets.map(({ asset }) => (
                <div
                  key={asset.id}
                  className={cn('relative aspect-square overflow-hidden rounded-lg border', message.isExclusive && 'blur-md')}
                >
                  {asset.fileType === FileType.Image ? (
                    <Image src={asset.rawUrl} alt="Asset" fill className="object-cover" />
                  ) : (
                    <video src={asset.rawUrl} controls={!message.isExclusive} className="h-full w-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className={cn('flex items-center gap-2 text-[11px]', isSender ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
            <span>{moment(message.createdAt).format('hh:mm')}</span>
          </div>
        </div>

        <TriggerModal
          onChangeModalState={() => setMessageOptionsMenu(message)}
          modalIcon={{ icon: ChevronDown, size: 'sm', variant: 'ghost' }}
          className={cn(
            'h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100',
            isSender ? 'hover:bg-primary-foreground/10' : 'hover:bg-muted'
          )}
        />
      </div>

      {message.isExclusive && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/50">
          <Button
            size="sm"
            className="gap-2"
            onClick={() => {
              // open purchase modal
              // setSelectedMessage(message)
            }}
          >
            <Lock className="h-4 w-4" />
            Unlock for {message.unlockPrice}
          </Button>
        </div>
      )}
    </div>
  );
};
