'use client';
import { useCreator } from '@/hooks/context/useCreator';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { useUpdateChannelStatus } from '@/hooks/useChannels';
import { useChannelMessages, useMessageMutations } from '@/hooks/useMessages';
import { FileType, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { ArrowLeft, Check, DollarSign, Image as ImageIcon, Lock, MoreVertical, Send, ShieldBan, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function ChatView() {
  const { channelId } = useParams();
  const router = useRouter();
  const { creator } = useCreator();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [unlockAmount, setUnlockAmount] = useState<string>('');
  const { showAssetsSidebar, setShowAssetsSidebar, selectedAssets, setSelectedAssets } = useUtilsStore();

  const { channel, loading, hasMore, handleLoadMore } = useChannelMessages({
    relatedEntityId: channelId as string,
    take: 50
  });

  const { sendMessage, deleteMessages, loading: isSending } = useMessageMutations();
  const { updateChannelStatus } = useUpdateChannelStatus();

  // Scroll to bottom on initial load only
  useEffect(() => {
    if (scrollRef.current && channel?.messages && isInitialLoad) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsInitialLoad(false);
    }
  }, [channel?.messages, isInitialLoad]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!message.trim() && selectedAssets.length === 0) || isSending || !channel || !creator) return;

    await sendMessage({
      content: message,
      recipientUserId: channel.fanId,
      senderId: creator.user.id,
      assetIds: selectedAssets.map((a) => a.id),
      isExclusive,
      unlockAmount: isExclusive ? parseInt(unlockAmount || '0', 10) : undefined
    });

    setMessage('');
    setSelectedAssets([]);
    setShowAssetsSidebar(false);
    setIsExclusive(false);
    setUnlockAmount('');
  };

  const handleStatusChange = async (status: MessageChannelStatus) => {
    if (!channel) return;
    await updateChannelStatus({ channelId: channel.id, status });
    if (status === MessageChannelStatus.Rejected) {
      router.push('/channels');
    }
  };

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) => (prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId]));
  };

  const handleDeleteSelected = async () => {
    if (selectedMessages.length === 0) return;
    await deleteMessages({ messageIds: selectedMessages });
    setSelectedMessages([]);
    setIsMultiSelectMode(false);
  };

  if (loading && !channel?.id) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.push('/channels')} className="shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={channel?.fanAvatarUrl} />
          <AvatarFallback>{channel?.fanFullname?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-sm sm:text-base truncate">{channel?.fanFullname}</h2>
          <p className="text-xs text-muted-foreground">
            {channel?.isFanOnline ? <span className="text-green-500 font-medium">Online</span> : 'Offline'}
          </p>
        </div>

        {isMultiSelectMode ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">{selectedMessages.length} selected</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={selectedMessages.length === 0}
              className="rounded-full h-8 px-3 text-xs"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMultiSelectMode(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsMultiSelectMode(true)}>
                <Check className="mr-2 h-4 w-4" />
                <span>Select Messages</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(MessageChannelStatus.Rejected)}>
                <ShieldBan className="mr-2 h-4 w-4" />
                <span>Block Fan</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(MessageChannelStatus.Rejected)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Channel</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Messages */}
      <div id="chatScrollable" className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
        <InfiniteScrollManager
          dataLength={channel?.messages?.length ?? 0}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          inverse={true}
          scrollableDiv="chatScrollable"
          loading={loading}
          customHeight="h-auto"
        >
          <div className="space-y-4 pb-4 flex flex-col">
            {channel?.messages
              ?.slice()
              .reverse()
              .map((msg) => {
                const isMe = msg.senderId !== channel?.fanId;
                const isSelected = selectedMessages.includes(msg.id);
                return (
                  <div key={msg.id} className={`flex items-start gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {isMultiSelectMode && (
                      <Checkbox checked={isSelected} onCheckedChange={() => toggleMessageSelection(msg.id)} className="mt-2 shrink-0" />
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-sm transition-all ${
                        isMe ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'
                      } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                    >
                      <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                      {msg.isExclusive && (
                        <div
                          className={`flex items-center gap-1 mt-1 text-[10px] font-bold ${isMe ? 'text-primary-foreground/90' : 'text-amber-500'}`}
                        >
                          <Lock className="h-3 w-3" />
                          <span>PPV: ${msg.unlockPrice}</span>
                        </div>
                      )}
                      <div className={`text-[10px] mt-1 opacity-70 ${isMe ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </InfiniteScrollManager>
      </div>

      {/* Selected Assets Preview */}
      {selectedAssets.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/30">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-medium text-muted-foreground shrink-0">{selectedAssets.length} item(s):</span>
            {selectedAssets.map((asset, idx) => (
              <div key={idx} className="relative shrink-0">
                <div className="h-10 w-10 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/50 transition-colors">
                  {asset.fileType === FileType.Image ? (
                    <Image width={40} height={40} src={asset.rawUrl} alt={`Selected ${idx + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <video src={asset.rawUrl} className="h-full w-full object-cover" muted playsInline preload="metadata" />
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 cursor-pointer h-3.5 w-3.5 rounded-full p-0 shadow-sm z-10"
                  onClick={() => setSelectedAssets((prev) => prev.filter((_, i) => i !== idx))}
                >
                  <X className="h-2 w-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
        {showAssetsSidebar && (
          <div className="flex items-center gap-2 mb-3 bg-primary/5 p-2 rounded-xl border border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex-1 flex items-center gap-2">
              <div className="h-6 w-1 bg-primary rounded-full" />
              <p className="text-xs font-medium text-primary">Picking assets from sidebar</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAssetsSidebar(false)}
              className="h-7 px-2 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              Done Pick
            </Button>
            {selectedAssets.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAssets([])}
                className="h-7 px-2 text-xs font-bold uppercase tracking-widest text-destructive hover:text-destructive"
              >
                Clear all
              </Button>
            )}
          </div>
        )}
        {isExclusive && (
          <div className="flex items-center gap-2 mb-3 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex-1 flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-medium text-amber-500">Paid PPV Message</p>
            </div>
            <div className="relative w-24">
              <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-amber-500" />
              <Input
                type="number"
                placeholder="0"
                value={unlockAmount}
                onChange={(e) => setUnlockAmount(e.target.value)}
                className="h-7 pl-6 pr-2 py-0 text-xs bg-background/50 border-amber-500/30 focus-visible:ring-amber-500/50"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExclusive(false);
                setUnlockAmount('');
              }}
              className="h-7 w-7 p-0 rounded-full hover:bg-amber-500/20 text-amber-500"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        <form onSubmit={handleSend} className="flex gap-2">
          <Button
            type="button"
            variant={showAssetsSidebar ? 'default' : 'outline'}
            size="icon"
            onClick={() => setShowAssetsSidebar(!showAssetsSidebar)}
            className={`rounded-full shrink-0 transition-transform ${showAssetsSidebar ? 'scale-110 shadow-lg' : ''}`}
          >
            <ImageIcon className={`h-4 w-4 ${showAssetsSidebar ? 'animate-pulse' : ''}`} />
          </Button>

          <Button
            type="button"
            variant={isExclusive ? 'default' : 'outline'}
            size="icon"
            onClick={() => setIsExclusive(!isExclusive)}
            className={`rounded-full shrink-0 transition-all ${isExclusive ? 'bg-amber-500 hover:bg-amber-600 text-white scale-110 shadow-lg' : 'hover:text-amber-500'}`}
          >
            <DollarSign className="h-4 w-4" />
          </Button>
          <Input
            placeholder={showAssetsSidebar ? 'Add a caption...' : 'Type a message...'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
            className="flex-1 h-10 px-4 rounded-full bg-background/50 focus-visible:ring-primary/50 transition-all border-none shadow-inner"
          />
          <Button
            type="submit"
            size="icon"
            disabled={(!message.trim() && selectedAssets.length === 0) || isSending || (isExclusive && !unlockAmount)}
            className="rounded-full shrink-0 hover:scale-105 transition-transform"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
