import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { CornerUpLeft } from 'lucide-react';

interface MessageRepliedToSectionProps {
  message: MessagesOutput;
}

export const MessageRepliedToSection: React.FC<MessageRepliedToSectionProps> = ({ message }) => {
  return message.repliedTo ? (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground opacity-50">
        <CornerUpLeft className="h-3 w-3" />
        <span className="text-[10px] font-black uppercase tracking-widest">In Response To</span>
      </div>
      <div className="p-3 rounded-xl bg-secondary/10 border border-border/30">
        <p className="text-xs italic text-muted-foreground line-clamp-2">{message.repliedTo.content}</p>
      </div>
    </div>
  ) : null;
};
