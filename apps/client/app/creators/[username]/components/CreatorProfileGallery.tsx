'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaultAssets } from '@/hooks/useVaultAssets';
import { SortBy } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { CreatorProfileGalleryOptions } from './CreatorProfileGalleryOptions';

interface Props {
  username: string;
}

export const CreatorProfileGallery: React.FC<Props> = ({ username }) => {
  const { fan } = useFan();
  const {
    assets: creatorAssets,
    handleLoadMore,
    hasMore,
    loading,
    handleRefresh
  } = useVaultAssets({ username, fanId: fan?.fanId, sortBy: SortBy.VaultObjectSuffix });

  return (
    <PageManager>
      <InfiniteScrollManager
        dataLength={creatorAssets.length}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
      >
        <GalleryManager
          loading={loading}
          items={creatorAssets}
          getKey={(creatorAsset) => creatorAsset.assetId}
          getImageUrl={(creatorAsset) => creatorAsset.asset.rawUrl}
          renderOverlay={(creatorAsset, idx, creatorAssetItems) => (
            <CreatorProfileGalleryOptions creatorAsset={creatorAsset} creatorAssetItems={creatorAssetItems} idx={idx} />
          )}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
