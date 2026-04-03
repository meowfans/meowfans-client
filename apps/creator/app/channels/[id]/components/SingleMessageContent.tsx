import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { SeenPreview } from '@workspace/ui/globals/SeenPreview';
import { cn } from '@workspace/ui/lib/utils';
import { Lock } from 'lucide-react';

interface SingleMessageContentProps {
  isMe: boolean;
  isSelected: boolean;
  message: MessagesOutput;
  seen: boolean;
}

export const SingleMessageContent: React.FC<SingleMessageContentProps> = ({ isMe, isSelected, message, seen }) => {
  return (
    <div
      className={cn(
        'max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 text-[13px] leading-relaxed transition-all relative overflow-hidden shadow-sm',
        isMe
          ? 'bg-primary text-primary-foreground rounded-tr-none'
          : 'bg-secondary/40 backdrop-blur-md rounded-tl-none border border-border/5',
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
    >
      <div className="whitespace-pre-wrap wrap-break-word font-medium">{message.content}</div>
      {message.isExclusive && (
        <div
          className={cn(
            'flex items-center gap-1.5 mt-2 p-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest',
            isMe ? 'bg-black/20 text-white/90' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
          )}
        >
          <Lock className="h-3 w-3" />
          <span>PPV LOCK: ${message.unlockPrice}</span>
        </div>
      )}
      <div
        className={cn(
          'text-[9px] mt-2 font-bold uppercase tracking-tighter opacity-40 flex items-center gap-1.5',
          isMe ? 'justify-end text-white' : 'justify-start'
        )}
      >
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        <SeenPreview isSender={isMe} seen={seen} />
      </div>
    </div>
  );
};
