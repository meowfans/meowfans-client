'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { useAssets } from '@/hooks/useAssets';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { FanAssetsGalleryOptions } from './PurchasedGalleryOptions';

export const Purchased = () => {
  const { getFanAssets } = useAssets();
  const { fanAssets, handleLoadMore, handleRefresh, hasMore, loading } = getFanAssets({
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
          getImageUrl={(fanAsset) => fanAsset.asset.rawUrl}
          renderOverlay={(fanAsset) => <FanAssetsGalleryOptions />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
