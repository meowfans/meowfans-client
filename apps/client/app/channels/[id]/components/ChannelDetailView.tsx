'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useChannelMessages, useMessageMutations } from '@/hooks/useMessages';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, MoreVertical, Paperclip, Phone, Send, Smile, Video, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ChannelDetailViewProps {
  channelId: string;
}

export function ChannelDetailView({ channelId }: ChannelDetailViewProps) {
  const { channel, loading, hasMore, handleLoadMore } = useChannelMessages({
    relatedEntityId: channelId,
    take: 50
  });
  const { sendMessage, loading: sending } = useMessageMutations();
  const { fan } = useFan();
  const [messageText, setMessageText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!messageText.trim() || sending || !fan?.user?.id || !channel?.creatorId) return;

    await sendMessage({
      content: messageText,
      recipientUserId: channel.creatorId,
      senderId: fan.user.id
    });
    setMessageText('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [channel?.messages]);

  if (loading && !channel?.id) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Messaging Header */}
      <div className="flex-none flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/channels">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="relative group cursor-pointer">
            <Avatar className="h-10 w-10 border-2 border-background shadow-lg transition-transform group-hover:scale-105">
              <AvatarImage src={channel?.creatorAvatarUrl} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {channel?.creatorFullname?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {channel?.isCreatorOnline && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500 shadow-sm" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-base leading-none tracking-tight">{channel?.creatorFullname}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`h-1.5 w-1.5 rounded-full ${channel?.isCreatorOnline ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
              <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                {channel?.isCreatorOnline ? 'Online' : 'Away'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" className="rounded-full h-9 w-9 border-muted/50 hidden sm:flex">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" className="rounded-full h-9 w-9 border-muted/50 hidden sm:flex">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="rounded-full h-9 w-9">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col-reverse custom-scrollbar z-0">
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

      {/* Input Area */}
      <div className="flex-none p-4 pb-8 sm:pb-4 bg-background/80 backdrop-blur-xl border-t z-10 transition-all duration-300">
        <div className="flex items-end gap-3 max-w-5xl mx-auto">
          <div className="flex gap-1 mb-1 items-center">
            <Button variant="ghost" size="icon" className="text-muted-foreground w-10 h-10 hover:bg-secondary rounded-full">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground w-10 h-10 hover:bg-secondary rounded-full hidden sm:flex">
              <ImageIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 relative flex items-center">
            <textarea
              placeholder="Type a message..."
              rows={1}
              className="w-full bg-secondary/30 border-none focus:ring-2 focus:ring-primary/20 rounded-2xl p-3 pr-12 text-sm resize-none min-h-[44px] max-h-[120px] transition-all overflow-y-auto scrollbar-hide"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-2 text-muted-foreground hover:text-primary rounded-full h-8 w-8"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>

          <Button
            className="flex-none h-11 w-11 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
            size="icon"
            onClick={handleSend}
            disabled={!messageText.trim() || sending}
          >
            {sending ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send className="h-5 w-5 ml-0.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
