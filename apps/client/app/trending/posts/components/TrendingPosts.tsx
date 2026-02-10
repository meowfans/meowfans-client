'use client';

import { PageHandler } from '@/components/PageHandler';
import { usePosts } from '@/hooks/usePosts';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { TrendingPostCard } from './TrendingPostCard';

export function TrendingPosts() {
  const { posts, handleLoadMore, hasMore, loading } = usePosts({
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc,
    take: 20
  });

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-4xl mx-auto w-full pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col gap-6 px-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-purple-500 fill-purple-500" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic truncate">The Pulse</h1>
              <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] truncate">
                Live feed of talked-about updates
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center bg-secondary/30 rounded-full px-4 py-2 border border-border/50 gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live</span>
            </div>
            <div className="h-4 w-1 border-l border-border/50" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">3.2k Content pieces / hr</span>
          </div>
        </div>
      </div>
      <PageHandler isEmpty={!posts.length && !loading} isLoading={loading && !posts.length}>
        <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={handleLoadMore}>
          <div className="space-y-4 md:space-y-6 px-1">
            <AnimatePresence mode="popLayout">
              {posts.map((post, index) => (
                <TrendingPostCard key={post.id} post={post} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {loading && (
            <div className="py-20 flex justify-center">
              <Loading />
            </div>
          )}
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
