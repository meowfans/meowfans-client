import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { cn } from '@workspace/ui/lib/utils';
import { Reply } from 'lucide-react';

interface ReplyPreviewV2Props {
  repliedTo: MessagesOutput;
  isSender: boolean;
  onScroll: (id: string) => unknown;
}

export const ReplyPreview: React.FC<ReplyPreviewV2Props> = ({ repliedTo, isSender, onScroll }) => {
  return (
    <div
      className={cn(
        'relative rounded-2xl border-l-[3px] px-4 py-2.5 text-xs transition-all hover:bg-white/5 cursor-pointer mb-2.5 group overflow-hidden',
        isSender ? 'border-amber-500 bg-amber-500/10 backdrop-blur-md' : 'border-border bg-secondary/50 backdrop-blur-md'
      )}
      onClick={() => onScroll(repliedTo.id)}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
        <Reply className="h-3 w-3 transition-transform group-hover:scale-125" />
        <span className="font-black uppercase tracking-[0.15em] text-[8px] opacity-70">{isSender ? 'Your Reply' : 'Replying To'}</span>
      </div>

      <p className="line-clamp-2 text-foreground italic font-medium leading-relaxed opacity-80">&quot;{repliedTo.content}&quot;</p>
    </div>
  );
};
