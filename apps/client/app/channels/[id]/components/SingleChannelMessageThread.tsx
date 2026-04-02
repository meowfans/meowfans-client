import { PageHandler } from '@/components/PageHandler';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Edit, Reply, Trash, Zap, MoreHorizontal, ShieldCheck } from 'lucide-react';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  handleLoadMore: () => void;
  loading: boolean;
}

export const SingleChannelMessageThread = ({ channel, scrollRef, hasMore, handleLoadMore, loading }: SingleChannelMessageThreadProps) => {
  const { fan } = useFan();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <PageHandler isEmpty={!channel.messages?.length} isLoading={loading}>
      <div ref={scrollRef} className="h-full overflow-y-auto p-6 space-y-6 flex flex-col-reverse custom-scrollbar z-0">
        <AnimatePresence initial={false}>
          {channel?.messages?.map((msg) => {
            const isMe = msg.senderId === fan?.fanId;
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
                  <div className={`space-y-1.5 ${isMe ? 'items-end' : 'items-start'} flex flex-col group relative`}>
                    <div className="flex items-center gap-2 group">
                      <Card
                        className={`p-3 border-none shadow-sm relative overflow-visible ${
                          isMe
                            ? 'bg-gradient-to-br from-primary to-primary text-primary-foreground rounded-2xl rounded-tr-none'
                            : 'bg-secondary/40 backdrop-blur-md text-foreground rounded-2xl rounded-tl-none border border-white/5'
                        }`}
                      >
                        {msg.isExclusive && (
                          <div className="absolute -top-1.5 -left-1.5 bg-primary rounded-full p-0.5 border-2 border-background shadow-lg rotate-[-15deg] scale-75">
                            <ShieldCheck className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <p className="text-[13px] leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                      </Card>

                      <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1 ${isMe ? 'mr-1' : 'ml-1'}`}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" className="rounded-full h-7 w-7 hover:bg-secondary">
                              <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align={isMe ? 'end' : 'start'} className="w-40 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
                            <DropdownMenuItem onClick={() => {}} className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
                              <Reply className="h-3 w-3" />
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(msg.content)} className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
                              <Copy className="h-3 w-3" />
                              Copy Text
                            </DropdownMenuItem>
                            {isMe && (
                              <>
                                <DropdownMenuSeparator className="bg-border/50" />
                                <DropdownMenuItem onClick={() => {}} className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
                                  <Edit className="h-3 w-3" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {}} className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer text-destructive focus:text-destructive">
                                  <Trash className="h-3 w-3" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                      <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-tighter">
                        {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                      </p>
                      {msg.hasSeen && isMe && <Zap className="h-2 w-2 text-primary fill-primary opacity-30" />}
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
