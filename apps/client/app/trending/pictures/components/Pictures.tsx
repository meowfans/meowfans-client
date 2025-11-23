'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { PicturesGalleryOptions } from './PicturesGalleryOptions';

const TrendingPictures = () => {
  const { fan } = useFan();
  const { getVaultObjects } = useVaults();
  const { vaultObjects, handleLoadMore, hasMore, loading, onRefresh } = getVaultObjects({
    take: 30,
    sortBy: SortBy.VaultObjectLikeCount,
    orderBy: SortOrder.Desc,
    fanId: fan?.fanId
  });

  return (
    <PageManager>
      <InfiniteScrollManager
        dataLength={vaultObjects.length}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={handleLoadMore}
        onRefresh={onRefresh}
      >
        <PageHeader title="Top liked pictures" />
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
