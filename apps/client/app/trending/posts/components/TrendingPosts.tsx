'use client';

import { ApplyAd } from '@/components/ApplyAd';
import { PageHandler } from '@/components/PageHandler';
import { useServerPosts } from '@/hooks/server/useServerPosts';
import { GetPublicPostsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { TrendingPostCard } from './TrendingPostCard';
import { TrendingPostsHeader } from './TrendingPostsHeader';

interface TrendingPostsProps {
  initialPosts: GetPublicPostsOutput[];
}

export function TrendingPosts({ initialPosts }: TrendingPostsProps) {
  const { posts, loadMore, hasMore, loading } = useServerPosts(
    {
      sortBy: SortBy.PostCreatedAt,
      orderBy: SortOrder.Asc,
      take: 20
    },
    initialPosts
  );

  return (
    <div className="flex flex-1 flex-col gap-3 p-2 bg-background/50 backdrop-blur-3xl h-screen">
      <TrendingPostsHeader />
      <PageHandler isEmpty={!posts.length} isLoading={loading && !initialPosts.length}>
        <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="space-y-4 md:space-y-6 px-1">
            {posts.map((post, index) => (
              <ApplyAd
                element={<TrendingPostCard key={post.id} post={post} index={index} />}
                canApplyAd={index > 0 && index % 25 === 0}
                zoneIndex={index}
                key={post.id}
              />
            ))}
          </div>
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
