'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { VaultsGalleryOptions } from '@/components/VaultsGalleryOptions';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

const TrendingVaults = () => {
  const { fan } = useFan();
  const { getVaults } = useVaults();
  const { vaults, handleLoadMore, hasMore, loading, onRefresh } = getVaults({
    fanId: fan?.fanId,
    take: 30,
    sortBy: SortBy.VaultLikeCount,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager
        dataLength={vaults.length}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={handleLoadMore}
        onRefresh={onRefresh}
      >
        <PageHeader title="Top liked vaults" />
        <GalleryManager
          loading={loading}
          items={vaults}
          getKey={(vault) => vault.id}
          getImageUrl={(vault) => vault.preview}
          applyLink
          pathname="/vaults"
          renderOverlay={(vault) => <VaultsGalleryOptions vault={vault} />}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
export default TrendingVaults;
