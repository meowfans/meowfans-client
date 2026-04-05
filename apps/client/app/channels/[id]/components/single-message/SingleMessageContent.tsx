import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Card } from '@workspace/ui/components/card';
import { CornerUpLeft, ShieldCheck } from 'lucide-react';
import { SingleMessageAssets } from './SingleMessageAssets';
import { SingleMessageOptions } from './SingleMessageOptions';

interface SingleMessageContentProps {
  onShowInfo: (val: boolean) => void;
  isMe: boolean;
  message: MessagesOutput;
}

export const SingleMessageContent: React.FC<SingleMessageContentProps> = ({ isMe, message, onShowInfo }) => {
  const handleScrollToRepliedMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!message.repliedTo) return;

    const element = document.getElementById(message.repliedTo.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.animate([{ backgroundColor: 'rgba(255,0,0, 0.8)' }, { backgroundColor: 'transparent' }], {
        duration: 5000,
        easing: 'ease-out'
      });
    }
  };
  return (
    <div className="flex items-center gap-2 group">
      <Card
        id={message.id}
        className={`p-3 border-none shadow-sm relative overflow-visible cursor-pointer transition-transform active:scale-[0.98] ${
          isMe
            ? 'bg-linear-to-br from-primary to-primary text-primary-foreground rounded-2xl rounded-tr-none'
            : 'bg-secondary/40 backdrop-blur-md text-foreground rounded-2xl rounded-tl-none border border-white/5'
        }`}
      >
        {!isMe && <div className="absolute top-0 -left-1 w-2 h-2 bg-secondary/40 [clip-path:polygon(100%_0,0_0,100%_100%)]" />}
        {isMe && <div className="absolute top-0 -right-1 w-2 h-2 bg-primary [clip-path:polygon(0_0,100%_0,0_100%)]" />}

        {message.repliedTo && (
          <div
            onClick={handleScrollToRepliedMessage}
            className={`flex items-center gap-2 mb-2 p-2 rounded-xl text-[11px] border leading-tight ${
              isMe ? 'bg-black/10 border-white/10' : 'bg-primary/5 border-primary/10 text-muted-foreground'
            }`}
          >
            <CornerUpLeft className="h-3 w-3 shrink-0 opacity-50" />
            <p className="line-clamp-1 italic">{message.repliedTo.content}</p>
          </div>
        )}

        {message.isExclusive && (
          <div className="absolute -top-1.5 -left-1.5 bg-primary rounded-full p-0.5 border-2 border-background shadow-lg rotate-[-15deg] scale-75">
            <ShieldCheck className="h-3 w-3" />
          </div>
        )}

        <SingleMessageAssets message={message} />

        <p className="text-[13px] leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
      </Card>
      <SingleMessageOptions isMe={isMe} message={message} />
    </div>
  );
};
