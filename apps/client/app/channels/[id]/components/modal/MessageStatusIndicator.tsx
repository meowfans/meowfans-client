import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { cn } from '@workspace/ui/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

interface MessageStatusIndicatorProps {
  message: MessagesOutput;
}

export const MessageStatusIndicator: React.FC<MessageStatusIndicatorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-background rounded-xl border border-border/50 shadow-sm">
      <div className="flex items-center gap-2">
        {message.hasSeen ? <CheckCircle2 className="h-4 w-4 text-sky-500" /> : <Circle className="h-4 w-4 text-muted-foreground/30" />}
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Delivery Status</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter',
            message.hasSeen ? 'bg-sky-500/10 text-sky-500' : 'bg-muted text-muted-foreground'
          )}
        >
          {message.hasSeen ? 'Seen' : 'Delivered'}
        </span>
      </div>
    </div>
  );
};
