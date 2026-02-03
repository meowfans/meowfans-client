'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { CreatorsGalleryOptions } from './CreatorsGalleryOptions';

const TrendingCreators = () => {
  const { creators, loadMore, hasMore, loading, refresh } = useCreators({
    sortBy: SortBy.CreatorFollowingCount,
    take: 30,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={creators.length} hasMore={hasMore} loading={loading} onLoadMore={loadMore} onRefresh={refresh}>
        <PageHeader title="Top followed creators" />
        <GalleryManager
          loading={loading}
          items={creators}
          getKey={(user) => user.username}
          getImageUrl={(user) => user.avatarUrl as string}
          applyLink
          pathname="/creators"
          renderOverlay={(user) => <CreatorsGalleryOptions user={user} />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
export default TrendingCreators;
