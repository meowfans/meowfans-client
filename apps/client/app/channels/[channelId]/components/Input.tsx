'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useMessagesStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Reply, Send, SquarePen, X } from 'lucide-react';
import { toast } from 'sonner';

export const MessageInput = () => {
  const { fan } = useFan();
  const { channel } = useMessagesStore();
  const { sendMessage, sendReply, loading, updateMessage } = useMessageMutations();
  const { content, setContent, replyMessageId, isEditing, selectedMessage, setIsEditing, setReplyMessageId, setSelectedMessage } =
    useMessagesStore();

  const handleCancel = () => {
    setContent('');
    setIsEditing(false);
    setSelectedMessage(null);
    setReplyMessageId(null);
  };

  const handleSend = async () => {
    if (!content.trim()) {
      return toast.warning("Message can't be empty", {
        description: "Empty message can't be sent!"
      });
    }

    if (!fan?.fanId) return;

    const payload = {
      content: content.trim(),
      senderId: fan?.fanId,
      recipientUserId: channel.fanProfile.user.id
    };

    if (replyMessageId) await sendReply({ ...payload, messageId: replyMessageId });
    else if (isEditing) await updateMessage({ messageId: selectedMessage?.id as string, content });
    else await sendMessage(payload);

    handleCancel();
  };

  const resolveSendButton = () => {
    if (replyMessageId) return <Reply className="h-4 w-4" />;
    else if (isEditing) return <SquarePen className="h-4 w-4" />;
    else return <Send className="h-4 w-4" />;
  };

  const handleCancelReplying = () => {
    setSelectedMessage(null);
    setReplyMessageId(null);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (content.trim()) handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 md:left-(--sidebar-width) right-0 md:right-(--sidebar-width) border-t bg-background/80 backdrop-blur p-2">
      <div className="mx-auto w-full max-w-3xl">
        {replyMessageId && (
          <div className="flex flex-row justify-between">
            <p>{selectedMessage?.content}</p>
            <Button variant="ghost" size="icon" onClick={handleCancelReplying}>
              <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="relative flex items-center rounded-xl border bg-background px-2 w-full">
            {content.length > 0 && (
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-5 w-5 text-muted-foreground" />
              </Button>
            )}

            <Input
              placeholder="Enter your message"
              onChange={(e) => setContent(e.target.value)}
              className="border-0 focus-visible:ring-0"
              value={content}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>

          <Button type="button" size="icon" variant="outline" onClick={handleSend} disabled={loading}>
            {resolveSendButton()}
          </Button>
        </div>
      </div>
    </div>
  );
};
