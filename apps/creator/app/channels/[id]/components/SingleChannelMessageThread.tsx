'use client';

import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Check, Copy, Lock, MoreVertical, Reply, Trash2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { useState } from 'react';

interface SingleChannelMessageThreadProps {
  channel: ChannelsOutput | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  handleLoadMore: () => void;
  loading: boolean;
}

export function SingleChannelMessageThread({
  channel,
  scrollRef,
  hasMore,
  handleLoadMore,
  loading
}: SingleChannelMessageThreadProps) {
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) => (prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId]));
  };

  return (
    <div 
        ref={scrollRef}
        id="chatScrollable" 
        className="h-full overflow-y-auto p-4 flex flex-col-reverse bg-background/5 transition-opacity duration-500 custom-scrollbar"
    >
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
                <div key={msg.id} className={`group flex items-start gap-2 relative ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {isMultiSelectMode && (
                    <Checkbox checked={isSelected} onCheckedChange={() => toggleMessageSelection(msg.id)} className="mt-2 shrink-0 border-primary/20" />
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 text-[13px] leading-relaxed transition-all relative overflow-hidden shadow-sm",
                      isMe 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-secondary/40 backdrop-blur-md rounded-tl-none border border-border/5",
                      isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    )}
                  >
                    <div className="whitespace-pre-wrap break-words font-medium">{msg.content}</div>
                    {msg.isExclusive && (
                      <div
                        className={cn(
                          "flex items-center gap-1.5 mt-2 p-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest",
                          isMe ? "bg-black/20 text-white/90" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        )}
                      >
                        <Lock className="h-3 w-3" />
                        <span>PPV LOCK: ${msg.unlockPrice}</span>
                      </div>
                    )}
                    <div className={cn(
                      "text-[9px] mt-2 font-bold uppercase tracking-tighter opacity-40 flex items-center gap-1.5",
                      isMe ? "justify-end text-white" : "justify-start"
                    )}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isMe && <Check className="h-3 w-3 inline opacity-40" />}
                    </div>
                  </div>

                  {!isMultiSelectMode && (
                    <div className={cn(
                      "opacity-0 group-hover:opacity-100 transition-all duration-200 self-center shrink-0",
                      isMe ? "mr-1" : "ml-1"
                    )}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" className="h-7 w-7 rounded-full bg-secondary/20 hover:bg-secondary/40">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={isMe ? "end" : "start"} className="w-40 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
                          <DropdownMenuItem className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer">
                            <Reply className="h-3.5 w-3.5" /> REPLY
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer">
                            <Copy className="h-3.5 w-3.5" /> COPY TEXT
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/50" />
                          <DropdownMenuItem className="flex items-center gap-2 font-bold text-[10px] py-1.5 rounded-lg cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" /> DELETE
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </InfiniteScrollManager>
    </div>
  );
}
