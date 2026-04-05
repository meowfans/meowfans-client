import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { format } from 'date-fns';
import { Clock, Edit3 } from 'lucide-react';

interface MessageTimeStampsProps {
  message: MessagesOutput;
}

export const MessageTimeStamps: React.FC<MessageTimeStampsProps> = ({ message }) => {
  return (
    <div className="grid grid-cols-1 gap-4 bg-secondary/10 p-4 rounded-2xl border border-border/20">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 p-1.5 bg-background rounded-lg border border-border/50">
          <Clock className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Sent on</span>
          <p className="text-xs font-bold text-foreground">
            {format(new Date(message.createdAt), 'PPP')} @ {format(new Date(message.createdAt), 'p')}
          </p>
        </div>
      </div>

      {message.updatedAt && new Date(message.updatedAt) > new Date(message.createdAt) && (
        <div className="flex items-start gap-3 pt-3 border-t border-border/20">
          <div className="mt-0.5 p-1.5 bg-primary/5 rounded-lg border border-primary/20">
            <Edit3 className="h-3 w-3 text-primary" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">Last Edited</span>
            <p className="text-xs font-bold text-foreground">
              {format(new Date(message.updatedAt), 'PPP')} @ {format(new Date(message.updatedAt), 'p')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
