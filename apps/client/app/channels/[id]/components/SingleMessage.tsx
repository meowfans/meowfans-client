import { ChannelsOutput, MessagesOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Card } from '@workspace/ui/components/card';
import { SeenPreview } from '@workspace/ui/globals/SeenPreview';
import { getTime } from '@workspace/ui/lib/helpers';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import { SingleMessageOptions } from './SingleMessageOptions';

interface SingleMessageProps {
  isMe: boolean;
  channel: ChannelsOutput;
  message: MessagesOutput;
}

export const SingleMessage: React.FC<SingleMessageProps> = ({ channel, isMe, message }) => {
  const hasSeen = useMemo(() => {
    const creatorSeenTime = getTime(channel?.creatorLastSeenAt, true);
    return creatorSeenTime >= Math.max(getTime(message.createdAt), getTime(message.updatedAt));
  }, [channel, message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isMe && (
          <Avatar className="h-8 w-8 mt-auto hidden sm:flex border-2 border-background shadow-md shrink-0">
            <AvatarImage src={channel.creatorAvatarUrl} />
            <AvatarFallback>{channel.creatorFullname?.[0]}</AvatarFallback>
          </Avatar>
        )}
        <div className={`space-y-1.5 ${isMe ? 'items-end' : 'items-start'} flex flex-col group relative`}>
          <div className="flex items-center gap-2 group">
            <Card
              className={`p-3 border-none shadow-sm relative overflow-visible ${
                isMe
                  ? 'bg-linear-to-br from-primary to-primary text-primary-foreground rounded-2xl rounded-tr-none'
                  : 'bg-secondary/40 backdrop-blur-md text-foreground rounded-2xl rounded-tl-none border border-white/5'
              }`}
            >
              {message.isExclusive && (
                <div className="absolute -top-1.5 -left-1.5 bg-primary rounded-full p-0.5 border-2 border-background shadow-lg rotate-[-15deg] scale-75">
                  <ShieldCheck className="h-3 w-3 text-white" />
                </div>
              )}
              <p className="text-[13px] leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
            </Card>
            <SingleMessageOptions isMe={isMe} message={message} />
          </div>

          <div className={`flex items-center gap-2 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
            <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-tighter">
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </p>
            <SeenPreview isSender={isMe} seen={hasSeen} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
