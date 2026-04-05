'use client';

import { useMessageMutations } from '@/hooks/client/useMessages';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownRight, ImageIcon, Paperclip, Send, Smile, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SingleChannelInputAreaProps {
  channel: ChannelsOutput | null;
}

export const SingleChannelInputArea = ({ channel }: SingleChannelInputAreaProps) => {
  const { fan } = useFan();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { sendMessage, sendReply, updateMessage, loading } = useMessageMutations();
  const { content, setContent, isEditing, setIsEditing, replyMessageId, setReplyMessageId, selectedMessage, setSelectedMessage } =
    useMessageInputStore();

  useEffect(() => {
    setDisabled(!content.trim() || loading || (isEditing && selectedMessage?.content === content.trim()));
  }, [content, loading, isEditing, selectedMessage]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading || !fan?.fanId || !channel?.creatorId) return;

    if (isEditing && selectedMessage) {
      await updateMessage({
        messageId: selectedMessage.id,
        content: content.trim()
      });
      setIsEditing(false);
      setSelectedMessage(null);
    } else if (replyMessageId) {
      await sendReply({
        content: content.trim(),
        recipientUserId: channel.creatorId,
        senderId: fan.fanId,
        messageId: replyMessageId
      });
      setReplyMessageId(null);
      setSelectedMessage(null);
    } else {
      await sendMessage({
        content: content.trim(),
        recipientUserId: channel.creatorId,
        senderId: fan.fanId
      });
    }
    setContent('');
  };

  const cancelAction = () => {
    setIsEditing(false);
    setReplyMessageId(null);
    setSelectedMessage(null);
    if (isEditing) setContent('');
  };

  if (!channel) return null;

  return (
    <div className="flex flex-col border-t bg-card/60 backdrop-blur-xl">
      <AnimatePresence>
        {(isEditing || replyMessageId) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-2 bg-secondary/50 border-b border-primary/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-none p-1.5 bg-primary/10 rounded-lg">
                {isEditing ? (
                  <CornerDownRight className="h-3.5 w-3.5 text-primary rotate-180" />
                ) : (
                  <CornerDownRight className="h-3.5 w-3.5 text-primary" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {isEditing ? 'Editing Message' : 'Replying to'}
                </span>
                <p className="text-xs text-muted-foreground truncate">{selectedMessage?.content}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={cancelAction} className="h-6 w-6 rounded-full hover:bg-secondary">
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-3 space-y-3">
        <form onSubmit={handleSend} className="flex items-end gap-2 sm:gap-3">
          <div className="flex gap-1.5 shrink-0 pb-0.5">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className={`h-9 w-9 rounded-xl shrink-0 transition-all border-border/30`}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon-sm" className="h-9 w-9 rounded-xl shrink-0 transition-all border-border/30">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 relative group">
            <Input
              placeholder="Start typing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className="h-10 px-4 rounded-xl bg-secondary/30 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-medium text-[13px] placeholder:text-muted-foreground/30 placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px]"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-primary rounded-lg h-7 w-7 transition-colors"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          <LoadingButtonV2
            type="submit"
            size={'icon'}
            disabled={disabled}
            loading={loading}
            className="flex-none h-10 w-10 rounded-xl shrink-0 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="h-4 w-4" />
          </LoadingButtonV2>
        </form>
      </div>
    </div>
  );
};
