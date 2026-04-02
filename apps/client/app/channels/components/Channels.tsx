'use client';

import { useServerChannels } from '@/hooks/server/useServerChannels';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { Separator } from '@workspace/ui/components/separator';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { cn } from '@workspace/ui/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { BellOff, CheckCircle, MoreHorizontal, Pin, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ChannelFilter, ChannelsHeader } from './ChannelsHeader';

interface ChannelsProps {
  initialChannels: ChannelsOutput[];
}

export function Channels({ initialChannels }: ChannelsProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<ChannelFilter>('all');
  const pathname = usePathname();
  const currentId = pathname.split('/').pop();

  const { channels, loading, hasMore, loadMore } = useServerChannels({ take: 20, skip: 0 }, initialChannels);

  const filteredChannels = useMemo(() => {
    let result = channels.filter(
      (channel) =>
        channel.creatorFullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === 'pinned') result = result.filter((c) => c.isPinned);
    if (filter === 'muted') result = result.filter((c) => c.isMuted);
    if (filter === 'unread') result = result.filter((c) => !c.lastMessage?.hasSeen);

    return result;
  }, [channels, searchTerm, filter]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background/40 backdrop-blur-3xl">
      <ChannelsHeader
        channelsCount={filteredChannels.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="flex-1 min-h-0 overflow-y-scroll custom-scrollbar" id="channels-scroll-wrapper">
        <InfiniteScrollManager
          dataLength={channels.length}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          scrollableDiv="channels-scroll-wrapper"
          customHeight="h-full"
        >
          <div className="flex flex-col py-0.5">
            <AnimatePresence mode="popLayout">
              {filteredChannels.map((channel, idx) => {
                const isActive = currentId === channel.id;
                return (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(idx * 0.01, 0.1), duration: 0.15 }}
                    className="relative group/item"
                  >
                    <Separator />
                    <Link href={`/channels/${channel.id}`}>
                      <Card
                        className={cn(
                          'group relative transition-all duration-200 cursor-pointer shadow-none overflow-hidden rounded-none border-none border-b border-border/5',
                          isActive ? 'bg-primary/20' : 'bg-transparent hover:bg-secondary/20'
                        )}
                      >
                        <CardContent className="p-1 md:p-1 py-1 md:py-1">
                          <div className="flex items-center gap-1.5">
                            <div className="relative shrink-0">
                              <Avatar className="h-7 w-7 border-none transition-all duration-300">
                                <AvatarImage src={channel.creatorAvatarUrl} alt={channel.creatorFullname} className="object-cover" />
                                <AvatarFallback className="bg-primary/10 text-[9px] font-black text-primary">
                                  {channel.creatorFullname.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              {channel.isCreatorOnline && (
                                <span
                                  className={cn(
                                    'absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full border border-background bg-green-500',
                                    isActive && 'ring-0.5 ring-primary/20'
                                  )}
                                />
                              )}
                              {channel.isPinned && (
                                <Pin className="absolute -top-1 -right-1 h-2.5 w-2.5 text-primary fill-primary rotate-45 animate-in fade-in duration-500" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <h3
                                    className={cn(
                                      'font-bold text-[10.5px] tracking-tight truncate transition-colors duration-200',
                                      isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                    )}
                                  >
                                    {channel.creatorFullname}
                                  </h3>
                                  {channel.isMuted && <BellOff className="h-2.5 w-2.5 text-muted-foreground/30" />}
                                </div>
                                {channel.lastMessage && (
                                  <span className="text-[7px] font-bold text-muted-foreground/20 whitespace-nowrap">
                                    {formatDistanceToNow(new Date(channel.lastMessage.createdAt), { addSuffix: false })}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between gap-1 mt-[-1px]">
                                <p
                                  className={cn(
                                    'text-[8.5px] font-medium truncate transition-colors duration-200 pr-2',
                                    isActive ? 'text-primary/60 font-bold' : 'text-muted-foreground/40'
                                  )}
                                >
                                  {channel.lastMessage?.content || <span className="italic opacity-20">No message</span>}
                                </p>
                                <div className="flex items-center gap-1 shrink-0">
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>

                    <div className="absolute right-1 top-1/2 -translate-y-1/2 z-20">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-6 w-6 rounded-full bg-background/50 backdrop-blur-md border border-white/5 shadow-lg"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-44 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl"
                        >
                          <DropdownMenuItem className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Mark as read
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
                            <Pin className="h-3.5 w-3.5" />
                            {channel.isPinned ? 'Unpin' : 'Pin'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
                            <BellOff className="h-3.5 w-3.5" />
                            {channel.isMuted ? 'Unmute' : 'Mute'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/50" />
                          <DropdownMenuItem className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer text-destructive focus:text-destructive">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            {channel.isMessagingBlocked ? 'Unblock' : 'Block'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Separator />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {loading && (
            <div className="py-8 flex justify-center">
              <Loading />
            </div>
          )}
        </InfiniteScrollManager>
      </div>
    </div>
  );
}
