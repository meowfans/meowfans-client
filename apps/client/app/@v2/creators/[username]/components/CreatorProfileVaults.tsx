'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { VaultsGalleryOptions } from '@/components/VaultsGalleryOptions';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';

interface Props {
  username: string;
}

export const CreatorProfileVaults: React.FC<Props> = ({ username }) => {
  const { vaults, loadMore, hasMore, loading, refresh } = useVaults({
    username,
    take: 30,
    sortBy: SortBy.VaultCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <InfiniteScrollManager
      dataLength={vaults.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      onRefresh={refresh}
      scrollableDiv="v2-main-content"
    >
      <GalleryManager
        layout="grid"
        loading={loading}
        items={vaults}
        getKey={(vault) => vault.id}
        getImageUrl={(vault) => vault.preview}
        applyLink
        pathname="/vaults"
        getObjectsLength={(vault) => vault.objectCount}
        renderOverlay={(vault) => <VaultsGalleryOptions vault={vault} />}
      />
    </InfiniteScrollManager>
  );
};
