'use client';

import { AssetPickerModal } from '@/components/modals/AssetPickerModal';
import { useCreator } from '@/hooks/context/useCreator';
import { useChannelsStore } from '@/hooks/store/channels.store';
import { useMessageUIStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { FileType, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { BadgeDollarSign, ImagePlus, Reply, Send, SquarePen, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export const MessageInput = () => {
  const { creator } = useCreator();
  const { channel } = useChannelsStore();
  const { sendMessage, sendReply, loading, updateMessage } = useMessageMutations();

  const {
    setAttachments,
    setOpenAssets,
    attachments,
    content,
    openAssets,
    setContent,
    isExclusive,
    unlockAmount,
    replyMessageId,
    setIsExclusive,
    setUnlockAmount,
    isEditing,
    selectedMessage,
    setIsEditing,
    setReplyMessageId,
    setSelectedMessage
  } = useMessageUIStore();

  const handleRemove = (assetId: string) => {
    const filtered = attachments.filter((u) => u.assetId !== assetId);
    setAttachments(filtered);

    if (!filtered.length) {
      setIsExclusive(false);
      setUnlockAmount(null);
    }
  };

  const handleCancel = () => {
    setContent('');
    setAttachments([]);
    setIsExclusive(false);
    setUnlockAmount(null);
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

    if (isExclusive && Number(unlockAmount ?? 0) <= 2.99) {
      return toast.warning('Invalid unlock price', {
        description: 'Exclusive message prices should be higher than $2.99'
      });
    }

    const payload = {
      content: content.trim(),
      senderId: creator.user.id,
      recipientUserId: channel.fanId,
      assetIds: attachments.map((ca) => ca.assetId),
      isExclusive,
      unlockAmount
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
        {attachments.length > 0 && (
          <div className="mb-2 flex gap-2 overflow-x-auto">
            {attachments.map(({ asset }, idx) => (
              <div key={asset.id} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-muted/10">
                {asset.fileType === FileType.Image ? (
                  <Image
                    src={asset.rawUrl}
                    alt="Post content"
                    width={300}
                    height={400}
                    draggable={false}
                    className="h-full w-full object-contain select-none"
                  />
                ) : (
                  <video src={asset.rawUrl} muted className="h-full w-full object-contain" />
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(asset.id)}
                  className="absolute right-0 top-0 rounded-full border bg-background p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {attachments.length > 0 && (
          <div className="mb-2 flex items-center gap-2">
            <Button
              type="button"
              variant={isExclusive ? 'default' : 'outline'}
              onClick={() => setIsExclusive(!isExclusive)}
              className="gap-1"
            >
              <BadgeDollarSign className="h-4 w-4" />
              PPV
            </Button>

            {isExclusive && (
              <Input
                type="text"
                placeholder="Unlock price"
                value={unlockAmount || ''}
                onChange={(e) => setUnlockAmount(Number(e.target.value.replace(/[^0-9]/, '')))}
                className="w-32"
              />
            )}
          </div>
        )}

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
            {(content.length > 0 || attachments.length > 0) && (
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-5 w-5 text-muted-foreground" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              disabled={channel.status !== MessageChannelStatus.Accepted}
              onClick={() => setOpenAssets(true)}
            >
              <ImagePlus className="h-5 w-5 text-muted-foreground" />
            </Button>

            <Input
              placeholder="Enter your message"
              onChange={(e) => setContent(e.target.value)}
              className="border-0 focus-visible:ring-0"
              value={content}
              disabled={channel.status !== MessageChannelStatus.Accepted}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>

          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleSend}
            disabled={loading || channel.status !== MessageChannelStatus.Accepted}
          >
            {resolveSendButton()}
          </Button>
        </div>
      </div>
      {openAssets && (
        <AssetPickerModal
          open={openAssets}
          onClose={() => setOpenAssets(false)}
          onSelectUrls={(creatorAssets) => setAttachments(creatorAssets)}
        />
      )}
    </div>
  );
};
