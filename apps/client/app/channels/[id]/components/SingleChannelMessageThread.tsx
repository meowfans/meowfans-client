import { PageHandler } from '@/components/PageHandler';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  handleLoadMore: () => void;
  loading: boolean;
}

export const SingleChannelMessageThread = ({ channel, scrollRef, hasMore, handleLoadMore, loading }: SingleChannelMessageThreadProps) => {
  const { fan } = useFan();
  return (
    <PageHandler isEmpty={!channel.messages?.length} isLoading={loading}>
      <div ref={scrollRef} className="h-full overflow-y-auto p-6 space-y-6 flex flex-col-reverse custom-scrollbar z-0">
        <AnimatePresence initial={false}>
          {channel?.messages?.map((msg) => {
            const isMe = msg.senderId === fan?.user?.id;
            return (
              <motion.div
                key={msg.id}
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
                  <div className={`space-y-1.5 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    <Card
                      className={`p-4 border-none shadow-md ${
                        isMe
                          ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-tr-none'
                          : 'bg-secondary/60 backdrop-blur-md text-foreground rounded-2xl rounded-tl-none border border-white/10'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </Card>
                    <div className={`flex items-center gap-2 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                      <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-tighter">
                        {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                      </p>
                      {isMe && <Zap className="h-2.5 w-2.5 text-primary opacity-50" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {hasMore && (
          <div className="flex justify-center py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadMore}
              className="rounded-full bg-background/50 border-muted/50 text-xs px-4"
            >
              Load earlier messages
            </Button>
          </div>
        )}
      </div>
    </PageHandler>
  );
};
