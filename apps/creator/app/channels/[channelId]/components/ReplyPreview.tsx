import { MessagesEntity } from '@workspace/gql/generated/graphql';
import { cn } from '@workspace/ui/lib/utils';
import { Reply } from 'lucide-react';

interface ReplyPreviewProps {
  repliedTo: MessagesEntity;
  isSender: boolean;
  onScroll: (id: string) => unknown;
}

export const ReplyPreview: React.FC<ReplyPreviewProps> = ({ repliedTo, isSender, onScroll }) => {
  return (
    <div
      className={cn(
        'relative rounded-md border-l-4 px-3 py-2 text-xs',
        isSender ? 'border-primary bg-primary/5' : 'border-muted-foreground bg-muted/50'
      )}
      onClick={() => onScroll(repliedTo.id)}
    >
      <div className="flex items-center gap-1 text-muted-foreground mb-1">
        <Reply className="h-3 w-3" />
        <span className="font-medium">{isSender ? 'You replied to' : 'Replied to'}</span>
      </div>

      <p className="line-clamp-2 text-foreground/80">{repliedTo.content}</p>
    </div>
  );
};
