import { useMessagesStore } from '@/hooks/store/message.store';
import { MessagesEntity } from '@workspace/gql/generated/graphql';
import { cn } from '@workspace/ui/lib/utils';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { ChevronDown } from 'lucide-react';
import { MessageThreadContent } from './MessageThreadContent';

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
        <MessageThreadContent message={message} isSender={isSender} />
        <TriggerModal
          onChangeModalState={() => setMessageOptionsMenu(message)}
          modalIcon={{ icon: ChevronDown, size: 'sm', variant: 'ghost' }}
          className={cn(
            'h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100',
            isSender ? 'hover:bg-primary-foreground/10' : 'hover:bg-muted'
          )}
        />
      </div>
    </div>
  );
};
