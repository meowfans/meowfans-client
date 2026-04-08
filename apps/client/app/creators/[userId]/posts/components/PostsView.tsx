'use client';

import { ApplyAd } from '@/components/ApplyAd';
import { PageHandler } from '@/components/PageHandler';
import { ReportModal } from '@/components/ReportModal';
import { useServerPublicCreatorPosts } from '@/hooks/server/useServerPublicCreatorPosts';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { EntityType, GetPublicPostsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useState } from 'react';
import { PostViewItem } from './PostViewItem';

interface PostsViewProps {
  userId: string;
  initialPosts: GetPublicPostsOutput[];
}

export function PostsView({ userId, initialPosts }: PostsViewProps) {
  const [reportPostId, setReportPostId] = useState<string | null>(null);

  const {
    creatorPosts: posts,
    loadMore,
    hasMore,
    loading
  } = useServerPublicCreatorPosts(
    {
      sortBy: SortBy.PostCreatedAt,
      relatedUserId: userId,
      orderBy: SortOrder.Desc,
      take: 20
    },
    initialPosts
  );

  return (
    <div className="flex flex-1 flex-col">
      <PageHandler isLoading={loading && !initialPosts.length} isEmpty={!posts.length} path={APP_PATHS.POSTS}>
        <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="grid grid-cols-3 gap-px md:gap-1">
            {posts.map((post, index) => (
              <ApplyAd canApplyAd={index > 0 && index % 3 === 0} element={<PostViewItem post={post} />} zoneIndex={index} key={post.id} />
            ))}
          </div>
        </InfiniteScrollManager>
      </PageHandler>

      <ReportModal
        isOpen={!!reportPostId}
        onClose={() => setReportPostId(null)}
        entityId={reportPostId || ''}
        entityType={EntityType.Post}
      />
    </div>
  );
}
