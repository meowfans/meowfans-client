'use client';

import { useChannels } from '@/hooks/useChannels';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { SidebarTrigger } from '@workspace/ui/components/sidebar';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Filter, MessageSquare, MoreHorizontal, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ChannelsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const { channels, loading, hasMore, handleLoadMore } = useChannels({
    take: 20,
    skip: 0
  });

  const filteredChannels = channels.filter(
    (channel) =>
      channel.creatorFullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background/50 backdrop-blur-3xl">
      {/* Header & Search */}
      <div className="flex-none p-4 md:p-6 pb-2 space-y-4">
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="space-y-0.5">
              <h1 className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Messages
              </h1>
              <p className="text-[10px] md:text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                {channels.length} Conversations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" className="rounded-full h-8 w-8 hover:bg-secondary">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="rounded-full h-8 w-8 hover:bg-secondary">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search creators..."
            className="pl-9 h-10 bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20 rounded-xl text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 min-h-0 overflow-y-scroll px-4 md:px-6 custom-scrollbar" id="channels-scroll-wrapper">
        <InfiniteScrollManager
          dataLength={channels.length}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          scrollableDiv="channels-scroll-wrapper"
          customHeight="h-full"
        >
          {filteredChannels.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/30 backdrop-blur-md border border-white/5">
                <MessageSquare className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">No messages yet</h2>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">Start a conversation to see it here.</p>
              <Button asChild variant="outline" size="sm" className="mt-6 rounded-full px-6">
                <Link href="/creators">Find Creators</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-1 py-2 max-w-5xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filteredChannels.map((channel, idx) => (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.03, 0.3), duration: 0.3 }}
                  >
                    <Link href={`/channels/${channel.id}`}>
                      <Card className="group relative border-none bg-transparent hover:bg-secondary/20 transition-all duration-200 cursor-pointer shadow-none overflow-hidden rounded-2xl">
                        <CardContent className="p-2 md:p-3">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="relative shrink-0">
                              <Avatar className="h-12 w-12 md:h-14 md:w-14 border border-background shadow-sm transition-transform duration-300 group-hover:scale-105">
                                <AvatarImage src={channel.creatorAvatarUrl} alt={channel.creatorFullname} className="object-cover" />
                                <AvatarFallback className="bg-primary/10 text-lg font-black text-primary">
                                  {channel.creatorFullname.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              {channel.isCreatorOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500 shadow-sm" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0 py-0.5">
                              <div className="flex items-center justify-between gap-2 mb-0.5">
                                <h3 className="font-bold text-sm md:text-base tracking-tight truncate group-hover:text-primary transition-colors">
                                  {channel.creatorFullname}
                                </h3>
                                {channel.lastMessage && (
                                  <span className="text-[10px] font-medium text-muted-foreground/50 whitespace-nowrap px-1">
                                    {formatDistanceToNow(new Date(channel.lastMessage.createdAt), { addSuffix: false })}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between gap-4">
                                <p className="text-xs md:text-sm text-muted-foreground/70 truncate font-medium">
                                  {channel.lastMessage?.content || <span className="italic opacity-40">Click to chat...</span>}
                                </p>
                              </div>
                            </div>

                            <div className="hidden sm:flex shrink-0 h-8 w-8 items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                              <ArrowRight className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          {loading && (
            <div className="py-12 flex justify-center">
              <Loading />
            </div>
          )}
        </InfiniteScrollManager>
      </div>
    </div>
  );
}
