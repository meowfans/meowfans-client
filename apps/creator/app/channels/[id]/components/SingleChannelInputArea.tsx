'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useMessageUIStore } from '@/hooks/store/message.store';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { ChannelsOutput, FileType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownRight, DollarSign, Image as ImageIcon, Lock, Send, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function SingleChannelInputArea({ channel }: { channel: ChannelsOutput | null }) {
  const { creator } = useCreator();
  const {
    content: message,
    setContent: setMessage,
    isExclusive,
    setIsExclusive,
    unlockAmount,
    setUnlockAmount,
    isEditing,
    setIsEditing,
    replyMessageId,
    setReplyMessageId,
    selectedMessage,
    setSelectedMessage
  } = useMessageUIStore();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { showAssetsSidebar, setShowAssetsSidebar, selectedAssets, setSelectedAssets } = useUtilsStore();
  const { sendMessage, sendReply, updateMessage, loading: isSending } = useMessageMutations();

  useEffect(() => {
    setDisabled(
      (!message.trim() && selectedAssets.length === 0) ||
        isSending ||
        (isExclusive && !unlockAmount) ||
        (isEditing && selectedMessage?.content === message.trim())
    );
  }, [message, isSending, isEditing, selectedMessage, selectedAssets, isExclusive, unlockAmount]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!message.trim() && selectedAssets.length === 0) || !channel) return;

    if (isEditing && selectedMessage) {
      await updateMessage({
        messageId: selectedMessage.id,
        content: message.trim()
      });
      setIsEditing(false);
      setSelectedMessage(null);
    } else if (replyMessageId) {
      await sendReply({
        content: message.trim(),
        recipientUserId: channel.fanId,
        senderId: creator.user.id,
        messageId: replyMessageId,
        assetIds: selectedAssets.map((a) => a.id),
        isExclusive,
        unlockAmount: isExclusive ? parseInt(unlockAmount?.toString() || '0', 10) : undefined
      });
      setReplyMessageId(null);
      setSelectedMessage(null);
    } else {
      await sendMessage({
        content: message.trim(),
        recipientUserId: channel.fanId,
        senderId: creator.user.id,
        assetIds: selectedAssets.map((a) => a.id),
        isExclusive,
        unlockAmount: isExclusive ? parseInt(unlockAmount?.toString() || '0', 10) : undefined
      });
    }

    setMessage('');
    setSelectedAssets([]);
    setShowAssetsSidebar(false);
    setIsExclusive(false);
    setUnlockAmount(null);
  };

  const cancelAction = () => {
    setIsEditing(false);
    setReplyMessageId(null);
    setSelectedMessage(null);
    if (isEditing) setMessage('');
  };

  useEffect(() => {
    if (!showAssetsSidebar && selectedAssets.length) {
      setIsExclusive(true);
    }
  }, [showAssetsSidebar, selectedAssets, setIsExclusive]);

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

      {selectedAssets.length > 0 && (
        <div className="px-4 py-2 border-b bg-muted/20">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest shrink-0">
              {selectedAssets.length} Selected
            </span>
            {selectedAssets.map((asset, idx) => (
              <div key={idx} className="relative shrink-0 group">
                <div className="h-12 w-12 rounded-xl overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-all shadow-sm">
                  {asset.fileType === FileType.Image ? (
                    <Image width={48} height={48} src={asset.rawUrl} alt={`Selected ${idx + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <video src={asset.rawUrl} className="h-full w-full object-cover" muted playsInline preload="metadata" />
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full p-0 shadow-lg scale-0 group-hover:scale-100 transition-transform"
                  onClick={() => setSelectedAssets((prev) => prev.filter((_, i) => i !== idx))}
                >
                  <X className="h-2 w-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 space-y-3">
        {showAssetsSidebar && (
          <div className="flex items-center gap-2 bg-primary/5 p-2 rounded-xl border border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex-1 flex items-center gap-2">
              <div className="h-6 w-1 bg-primary rounded-full animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Media Library Active</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAssetsSidebar(false)}
              className="h-7 px-3 text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors"
            >
              Close
            </Button>
          </div>
        )}

        {isExclusive && (
          <div className="flex items-center gap-2 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex-1 flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-amber-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Premium Locked Content</p>
            </div>
            <div className="relative w-20">
              <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-amber-500" />
              <Input
                type="number"
                placeholder="0"
                value={unlockAmount || ''}
                onChange={(e) => setUnlockAmount(e.target.value ? parseInt(e.target.value, 10) : null)}
                className="h-7 pl-6 pr-2 py-0 text-[11px] font-bold bg-background/50 border-amber-500/30 focus-visible:ring-amber-500/50 rounded-lg shadow-inner"
              />
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setIsExclusive(false);
                setUnlockAmount(null);
              }}
              className="h-7 w-7 rounded-full hover:bg-amber-500/20 text-amber-500"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        <form onSubmit={handleSend} className="flex items-end gap-2">
          <div className="flex gap-1.5 shrink-0 pb-0.5">
            <Button
              type="button"
              variant={showAssetsSidebar ? 'default' : 'outline'}
              size="icon-sm"
              onClick={() => setShowAssetsSidebar(!showAssetsSidebar)}
              className={`h-9 w-9 rounded-xl shrink-0 transition-all ${showAssetsSidebar ? 'shadow-lg shadow-primary/20 scale-105' : 'border-border/30'}`}
            >
              <ImageIcon className={`h-4 w-4 ${showAssetsSidebar ? 'animate-pulse' : ''}`} />
            </Button>

            <Button
              type="button"
              variant={isExclusive ? 'default' : 'outline'}
              size="icon-sm"
              onClick={() => setIsExclusive(!isExclusive)}
              className={`h-9 w-9 rounded-xl shrink-0 transition-all ${isExclusive ? 'bg-amber-500 hover:bg-amber-600 border-none shadow-lg shadow-amber-500/20 scale-105' : 'border-border/30 hover:text-amber-500'}`}
            >
              <DollarSign className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 relative group">
            <Input
              placeholder={showAssetsSidebar ? 'Add a caption...' : 'Message...'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
              className="h-10 px-4 rounded-xl bg-secondary/30 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-medium text-[13px] placeholder:text-muted-foreground/30 placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px]"
            />
          </div>

          <LoadingButtonV2
            type="submit"
            size="icon"
            loading={isSending}
            disabled={disabled}
            className="flex-none h-10 w-10 rounded-xl shrink-0 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="h-4 w-4" />
          </LoadingButtonV2>
        </form>
      </div>
    </div>
  );
}
