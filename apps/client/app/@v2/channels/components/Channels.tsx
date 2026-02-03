'use client';

import { ChannelItem } from '@/app/@v2/channels/components/ChannelItem';
import { useChannels } from '@/hooks/useChannels';
import { Vortex } from '@workspace/ui/components/shadcn-io/vortex';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MessageSquare, Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Channels = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { channels, loading } = useChannels({ take: 50 });

  const filteredChannels = channels.filter((c) => c.creatorFullname?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleChannelClick = (id: string) => {
    router.push(`/channels/${id}`);
  };

  return (
    <div className="relative flex-1 w-full overflow-hidden bg-background">
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={300}
        baseHue={45}
        className="h-full w-full overflow-y-auto pb-20 md:pb-10 no-scrollbar"
      >
        <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
          {/* Premium Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <MessageSquare className="text-white h-5 w-5" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-100 to-white">
                Messages
              </h1>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-amber-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-secondary/40 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 backdrop-blur-xl transition-all"
              />
            </div>
          </motion.div>

          {/* Channels List */}
          <div className="flex flex-col gap-3">
            {loading && channels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500 mb-4" />
                <p className="text-zinc-500 font-medium">Loading your conversations...</p>
              </div>
            ) : filteredChannels.length > 0 ? (
              <AnimatePresence>
                {filteredChannels.map((channel, index) => {
                  const lastMessage = channel.lastMessage;
                  const timestamp = new Date(Number(channel?.creatorLastSeenAt)).getTime();
                  const hasSeen =
                    timestamp >= Math.max(new Date(lastMessage?.createdAt || 0).getTime(), new Date(lastMessage?.updatedAt || 0).getTime());

                  return (
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                      index={index}
                      hasSeenLastMessage={hasSeen}
                      onClick={handleChannelClick}
                    />
                  );
                })}
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 px-6 text-center bg-secondary/20 border border-border/50 rounded-3xl backdrop-blur-sm"
              >
                <div className="h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No messages found</h3>
                <p className="text-muted-foreground max-w-xs">
                  {searchQuery ? `No results for "${searchQuery}"` : 'Your inbox is empty. Start a conversation with a creator!'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => router.push('/creators')}
                    className="mt-6 px-6 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-amber-600/20 hover:scale-105 transition-transform"
                  >
                    Find Creators
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </Vortex>
    </div>
  );
};
