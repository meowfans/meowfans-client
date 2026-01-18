'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useVaultObjects } from '@/hooks/useVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { PicturesGalleryOptions } from './PicturesGalleryOptions';

const TrendingPictures = () => {
  const { vaultObjects, loadMore, hasMore, loading, refresh } = useVaultObjects({
    take: 30,
    sortBy: SortBy.VaultObjectLikeCount,
    orderBy: SortOrder.Desc,
    searchTerm: 'Free posts only'
  });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={vaultObjects.length} hasMore={hasMore} loading={loading} onLoadMore={loadMore} onRefresh={refresh}>
        <PageHeader title="Top pictures" />
        <GalleryManager
          loading={loading}
          items={vaultObjects}
          getKey={(vaultObject) => vaultObject.asset?.id as string}
          getImageUrl={(vaultObject) => vaultObject.asset?.rawUrl}
          renderOverlay={(vaultObject, idx, allVaultObjects) => (
            <PicturesGalleryOptions vaultObject={vaultObject} idx={idx} allVaultObjects={allVaultObjects} />
          )}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};

export default TrendingPictures;
