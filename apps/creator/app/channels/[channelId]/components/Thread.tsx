import { cn } from '@workspace/ui/lib/utils';
import { Modal } from '@workspace/ui/modals/Modal';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { ChevronDown } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { MessagesEntity } from './Message';

interface Props {
  message: MessagesEntity;
  isOutgoing?: boolean;
}

export const MessageThread: React.FC<Props> = ({ message, isOutgoing = false }) => {
  const [messageOptionModal, setMessageOptionModal] = useState<boolean>(false);
  return (
    <div
      className={cn(
        'group relative max-w-[min(34rem,90%)] rounded-2xl border px-3 py-2 shadow-sm',
        isOutgoing ? 'bg-primary text-primary-foreground border-primary/20' : 'bg-background/70 backdrop-blur border-border/60'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={cn('flex items-center gap-2 text-[11px]', isOutgoing ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
            <span className="font-medium">{message.author}</span>
            <span aria-hidden="true">·</span>
            <span>{moment(message.timestamp).format('hh:mm')}</span>
          </div>
          <p className={cn('mt-1 text-sm leading-relaxed wrap-break-word', isOutgoing ? 'text-primary-foreground' : 'text-foreground/90')}>
            {message.content}
          </p>
        </div>

        <TriggerModal
          onChangeModalState={() => setMessageOptionModal(true)}
          modalIcon={{ icon: ChevronDown, size: 'sm', variant: 'ghost' }}
          className={cn(
            'h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100',
            isOutgoing ? 'hover:bg-primary-foreground/10' : 'hover:bg-muted'
          )}
        />
      </div>
      <Modal
        isOpen={messageOptionModal}
        description="View message options"
        title="Options"
        onClose={() => setMessageOptionModal(false)}
      ></Modal>
    </div>
  );
};
