'use client';

import { CreatorProfilesGalleryOptions } from '@/components/CreatorProfilesGalleryOptions';
import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

export const CreatorProfiles = () => {
  const { creators, loadMore, hasMore, loading, refresh } = useCreators({
    sortBy: SortBy.CreatorViewCount,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager className="mb-6 p-1">
      <InfiniteScrollManager dataLength={creators.length} hasMore={hasMore} loading={loading} onLoadMore={loadMore} onRefresh={refresh}>
        <PageHeader title="Explore creators" />
        <GalleryManager
          loading={loading}
          items={creators}
          getKey={(creator) => creator.username}
          getImageUrl={(creator) => creator.avatarUrl as string}
          applyLink
          renderOverlay={(creator) => <CreatorProfilesGalleryOptions creator={creator} />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
