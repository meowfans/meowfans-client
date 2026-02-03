'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { Reply, Send, SquarePen, X } from 'lucide-react';
import { toast } from 'sonner';

interface MessageInputV2Props {
  channel: ChannelsOutput;
}

export const MessageInput = ({ channel }: MessageInputV2Props) => {
  const { fan } = useFan();
  const { sendMessage, sendReply, loading, updateMessage } = useMessageMutations();
  const { content, setContent, replyMessageId, isEditing, selectedMessage, setIsEditing, setReplyMessageId, setSelectedMessage } =
    useMessageInputStore();

  const handleCancel = () => {
    setContent('');
    setIsEditing(false);
    setSelectedMessage(null);
    setReplyMessageId(null);
  };

  const handleSend = async () => {
    if (!content.trim()) {
      return toast.warning('Empty message', {
        description: 'You cannot send an empty message.'
      });
    }

    if (!fan?.fanId) return;

    const payload = {
      content: content.trim(),
      senderId: fan?.fanId,
      recipientUserId: channel.creatorId
    };

    try {
      if (replyMessageId) await sendReply({ ...payload, messageId: replyMessageId });
      else if (isEditing) await updateMessage({ messageId: selectedMessage?.id as string, content });
      else await sendMessage(payload);

      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelReplying = () => {
    setSelectedMessage(null);
    setReplyMessageId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-2">
      {replyMessageId && (
        <div className="flex items-center justify-between mb-3 px-4 py-2.5 bg-secondary/60 backdrop-blur-xl border border-border/50 rounded-[18px] animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-1 bg-amber-500 rounded-full shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Replying to</span>
              <p className="text-[13px] text-muted-foreground truncate italic font-medium">&quot;{selectedMessage?.content}&quot;</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleCancelReplying} className="h-8 w-8 rounded-xl hover:bg-white/5 group">
            <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Button>
        </div>
      )}

      {isEditing && (
        <div className="flex items-center justify-between mb-3 px-4 py-2.5 bg-indigo-500/5 backdrop-blur-xl border border-indigo-500/20 rounded-[18px] animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">Editing Mode</span>
              <p className="text-[13px] text-muted-foreground font-medium">Updating message content...</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleCancel} className="h-8 w-8 rounded-xl hover:bg-white/5 group">
            <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Button>
        </div>
      )}

      <div className="flex items-end gap-2.5">
        <div className="relative flex-1 group">
          <div className="absolute -inset-0.5 rounded-[22px] bg-linear-to-tr from-amber-500/20 to-orange-500/20 opacity-0 blur-md transition-opacity group-focus-within:opacity-100" />
          <textarea
            rows={1}
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={channel.status !== MessageChannelStatus.Accepted}
            className="relative w-full bg-background/50 border border-border/80 rounded-[22px] px-5 py-4 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/50 backdrop-blur-2xl transition-all resize-none min-h-14 max-h-50 font-medium tracking-wide"
            style={{
              height: 'auto',
              scrollbarWidth: 'none'
            }}
          />
        </div>

        <Button
          type="button"
          size="icon"
          disabled={loading || !content.trim() || channel.status !== MessageChannelStatus.Accepted}
          onClick={handleSend}
          className={cn(
            'h-14 w-14 rounded-[22px] shadow-2xl transition-all duration-300 active:scale-90 shrink-0',
            isEditing
              ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
              : 'bg-linear-to-tr from-amber-500 directly via-amber-600 to-orange-600 hover:scale-105 active:scale-95 shadow-amber-600/20'
          )}
        >
          {isEditing ? (
            <SquarePen className="h-5 w-5 text-white" />
          ) : replyMessageId ? (
            <Reply className="h-5 w-5 text-white" />
          ) : (
            <Send className="h-5 w-5 text-white ml-0.5" />
          )}
        </Button>
      </div>
    </div>
  );
};
