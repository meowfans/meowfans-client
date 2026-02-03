'use client';

import { useCreators } from '@/hooks/useCreators';
import { useFollowingMutations } from '@/hooks/useFollow';
import { GetDefaultCreatorsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Heart, Loader2, Plus, User } from 'lucide-react';
import Link from 'next/link';

interface CreatorCardProps {
  creator: GetDefaultCreatorsOutput;
  index: number;
}

const CreatorCard = ({ creator, index }: CreatorCardProps) => {
  const { followCreator } = useFollowingMutations();

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
      <Card className="group relative overflow-hidden border-border bg-secondary/40 transition-all duration-300 hover:border-indigo-500/50 hover:bg-secondary/60 hover:shadow-lg hover:shadow-indigo-500/10">
        <Link href={`/creators/${creator.username}`} className="block p-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with Glow Effect */}
            <div className="relative mb-4">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
              <Avatar className="h-24 w-24 border-2 border-border transition-transform duration-300 group-hover:scale-105 group-hover:border-foreground">
                <AvatarImage src={creator.avatarUrl} alt={creator.username} className="object-cover" />
                <AvatarFallback className="bg-secondary text-muted-foreground">
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name & Badge */}
            <div className="mb-1 flex items-center justify-center gap-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-indigo-400 transition-colors">{creator.username}</h3>
              <BadgeCheck className="h-4 w-4 text-blue-500" />
            </div>

            {/* Subtext (Optional placeholder if bio is missing) */}
            <p className="text-sm text-muted-foreground">@{creator.username}</p>
          </div>
        </Link>

        {/* Action Button */}
        <div className="mt-4 px-6 pb-6 w-full">
          {creator.isFollowing ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full gap-2 border border-border bg-secondary/50 text-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                followCreator(creator.id);
              }}
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>Following</span>
            </Button>
          ) : (
            <Button
              size="sm"
              className="w-full gap-2 bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                followCreator(creator.id);
              }}
            >
              <Plus className="h-4 w-4" />
              <span>Follow</span>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export const Creators = () => {
  const { creators, loadMore, hasMore, loading, refresh } = useCreators({
    sortBy: SortBy.CreatorViewCount,
    orderBy: SortOrder.Desc,
    take: 40
  });

  return (
    <div id="creators-scroll" className="flex-1 overflow-y-auto no-scrollbar bg-background pb-20 md:pb-10">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-border py-8 md:py-20">
        <div className="absolute inset-0" />
        <div className="container relative z-10 px-4 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text"
          >
            Trending Creators
          </motion.h1>
          <p className="mt-4 max-w-[600px] md:text-xl">Meet the most popular personalities in the community.</p>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-8">
        <InfiniteScrollManager
          LoadingComponent={
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
          }
          dataLength={creators.length}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
          scrollableDiv="creators-scroll"
        >
          {creators.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-500">
              <User className="h-12 w-12 mb-4 opacity-50" />
              <p>No creators found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <AnimatePresence>
                {creators.map((creator, i) => (
                  <CreatorCard key={creator.id} creator={creator} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </InfiniteScrollManager>
      </div>
    </div>
  );
};
