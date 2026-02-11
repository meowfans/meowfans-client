'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerChannels } from '@/hooks/server/useServerChannels';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChannelsHeader } from './ChannelsHeader';

interface ChannelsProps {
  initialChannels: ChannelsOutput[];
}

export function Channels({ initialChannels }: ChannelsProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { channels, loading, hasMore, loadMore } = useServerChannels(
    {
      take: 20,
      skip: 0
    },
    initialChannels
  );

  const filteredChannels = useMemo(() => {
    return channels.filter(
      (channel) =>
        channel.creatorFullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [channels, searchTerm]);

  return (
    <PageHandler isLoading={loading && !initialChannels.length} isEmpty={!filteredChannels.length}>
      <div className="flex h-full flex-1 flex-col overflow-hidden bg-background/50 backdrop-blur-3xl">
        <ChannelsHeader channelsCount={filteredChannels.length} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="flex-1 min-h-0 overflow-y-scroll px-4 md:px-6 custom-scrollbar" id="channels-scroll-wrapper">
          <InfiniteScrollManager
            dataLength={channels.length}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            scrollableDiv="channels-scroll-wrapper"
            customHeight="h-full"
          >
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
            {loading && (
              <div className="py-12 flex justify-center">
                <Loading />
              </div>
            )}
          </InfiniteScrollManager>
        </div>
      </div>
    </PageHandler>
  );
}
