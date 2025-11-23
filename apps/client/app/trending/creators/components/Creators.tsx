'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { CreatorsGalleryOptions } from './CreatorsGalleryOptions';

const TrendingCreators = () => {
  const { getCreators } = useCreators();
  const { creators, handleLoadMore, hasMore, loading, onRefresh } = getCreators({
    sortBy: SortBy.CreatorFollowingCount,
    take: 30,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager
        dataLength={creators.length}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={handleLoadMore}
        onRefresh={onRefresh}
      >
        <PageHeader title="Top followed creators" />
        <GalleryManager
          loading={loading}
          items={creators}
          getKey={(creator) => creator.username}
          getImageUrl={(creator) => creator.avatarUrl as string}
          applyLink
          pathname="/creators"
          renderOverlay={(creator) => <CreatorsGalleryOptions creator={creator} />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
export default TrendingCreators;
