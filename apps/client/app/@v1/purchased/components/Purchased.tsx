'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { useFanAssets } from '@/hooks/useFanAssets';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

export const Purchased = () => {
  const { fanAssets, handleLoadMore, handleRefresh, hasMore, loading } = useFanAssets({
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager
        dataLength={fanAssets.length}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
      >
        <h2 className="text-xl font-semibold m-3">Explore your purchased assets</h2>
        <GalleryManager
          loading={loading}
          items={fanAssets}
          getKey={(fanAsset) => fanAsset.id}
          getImageUrl={(fanAsset) => fanAsset.rawUrl}
          renderOverlay={() => null}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
