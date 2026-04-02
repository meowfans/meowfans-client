'use client';

import { useMessageMutations } from '@/hooks/client/useMessages';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { ImageIcon, Paperclip, Send, Smile } from 'lucide-react';

interface SingleChannelInputAreaProps {
  channel: ChannelsOutput | null;
}

export const SingleChannelInputArea = ({ channel }: SingleChannelInputAreaProps) => {
  const { fan } = useFan();
  const { content, setContent } = useMessageInputStore();
  const { sendMessage, loading } = useMessageMutations();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading || !fan?.fanId || !channel?.creatorId) return;

    await sendMessage({
      content,
      recipientUserId: channel.creatorId,
      senderId: fan.fanId
    });
    setContent('');
  };

  if (!channel) return null;

  return (
    <div className="flex-none p-2 sm:p-4 bg-card/60 backdrop-blur-xl border-t z-10">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSend} className="flex items-end gap-2 sm:gap-3">
          <div className="flex gap-0.5 shrink-0 pb-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground h-9 w-9 sm:h-10 sm:w-10 hover:bg-secondary rounded-xl transition-all"
            >
              <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground h-9 w-9 sm:h-10 sm:w-10 hover:bg-secondary rounded-xl hidden sm:flex transition-all"
            >
              <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
            disabled={!content.trim() || loading}
            loading={loading}
            className="flex-none h-10 w-10 sm:h-11 sm:w-11 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
          </LoadingButtonV2>
        </form>
      </div>
    </div>
  );
};
