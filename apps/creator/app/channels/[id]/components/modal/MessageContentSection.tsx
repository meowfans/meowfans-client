import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { MessageCircle } from 'lucide-react';

interface MessageContentSectionProps {
  message: MessagesOutput;
}

export const MessageContentSection: React.FC<MessageContentSectionProps> = ({ message }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground opacity-50">
        <MessageCircle className="h-3 w-3" />
        <span className="text-[10px] font-black uppercase tracking-widest">Message Content</span>
      </div>
      <p className="text-sm font-medium bg-secondary/30 p-4 rounded-2xl border border-border/50 leading-relaxed wrap-break-word">
        {message.content}
      </p>
    </div>
  );
};
