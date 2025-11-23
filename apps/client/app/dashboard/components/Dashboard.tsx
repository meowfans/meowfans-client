'use client';

import { CreatorProfilesGalleryOptions } from '@/components/CreatorProfilesGalleryOptions';
import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

export const Dashboard = () => {
  const { fan } = useFan();
  const { getCreators } = useCreators();
  const { creators, loading, handleLoadMore, hasMore, onRefresh } = getCreators({
    sortBy: SortBy.CreatorViewCount,
    fanId: fan?.fanId,
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
        <PageHeader title="Explore premium creators" />
        <GalleryManager
          loading={loading}
          items={creators}
          getKey={(creator) => creator.username}
          getImageUrl={(creator) => creator.avatarUrl as string}
          applyLink
          pathname="/creators"
          renderOverlay={(creator) => <CreatorProfilesGalleryOptions creator={creator} />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
