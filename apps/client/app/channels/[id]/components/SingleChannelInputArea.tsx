import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { ImageIcon, Paperclip, Send, Smile } from 'lucide-react';

interface SingleChannelInputAreaProps {
  channel: ChannelsOutput;
}

export const SingleChannelInputArea = ({ channel }: SingleChannelInputAreaProps) => {
  const { fan } = useFan();
  const { content, setContent } = useMessageInputStore();
  const { sendMessage, loading } = useMessageMutations();

  const handleSend = async () => {
    if (!content.trim() || loading || !fan?.user?.id || !channel?.creatorId) return;

    await sendMessage({
      content,
      recipientUserId: channel.creatorId,
      senderId: fan.user.id
    });
    setContent('');
  };
  return (
    <div className="flex-none p-2 sm:p-4 bg-background/80 backdrop-blur-xl border-t z-10">
      <div className="flex items-end gap-2 sm:gap-3 max-w-5xl mx-auto">
        <div className="flex gap-0.5 sm:gap-1 mb-0.5 items-center">
          <Button variant="ghost" size="icon" className="text-muted-foreground w-9 h-9 sm:w-10 sm:h-10 hover:bg-secondary rounded-full">
            <Paperclip className="h-4 w-4 sm:h-5 sm:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground w-9 h-9 sm:w-10 sm:h-10 hover:bg-secondary rounded-full hidden sm:flex"
          >
            <ImageIcon className="h-4 w-4 sm:h-5 sm:h-5" />
          </Button>
        </div>

        <div className="flex-1 relative flex items-center">
          <textarea
            placeholder="Type a message..."
            rows={1}
            className="w-full bg-secondary/30 border-none focus:ring-1 focus:ring-primary/20 rounded-xl sm:rounded-2xl py-2 px-3 sm:p-3 pr-10 text-sm resize-none min-h-[38px] max-h-[100px] transition-all overflow-y-auto scrollbar-hide"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button variant="ghost" size="icon-sm" className="absolute right-1 text-muted-foreground hover:text-primary rounded-full h-7 w-7">
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <LoadingButtonV2
          className="flex-none h-10 w-10 sm:h-11 sm:w-11 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
          size="icon"
          onClick={handleSend}
          disabled={!content.trim() || loading}
          loading={loading}
        >
          <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
        </LoadingButtonV2>
      </div>
      {/* Mobile safe area spacer if needed, but keeping it tight for now */}
      <div className="h-safe-bottom sm:hidden" />
    </div>
  );
};
