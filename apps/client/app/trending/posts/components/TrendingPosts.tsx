'use client';

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
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-4xl mx-auto w-full pb-20">
      <TrendingPostsHeader />
      <PageHandler isEmpty={!posts.length} isLoading={loading && !initialPosts.length}>
        <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="space-y-4 md:space-y-6 px-1">
            {posts.map((post, index) => (
              <TrendingPostCard key={`trending-post-id${post.id}`} post={post} index={index} />
            ))}
          </div>
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
