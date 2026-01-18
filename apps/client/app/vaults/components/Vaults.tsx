'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { VaultsGalleryOptions } from '@/components/VaultsGalleryOptions';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

export const Vaults = () => {
  const { vaults, loading, loadMore, hasMore, refresh } = useVaults({
    sortBy: SortBy.VaultCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={vaults.length} hasMore={hasMore} loading={loading} onLoadMore={loadMore} onRefresh={refresh}>
        <PageHeader title="Explore vaults" />
        <GalleryManager
          loading={loading}
          items={vaults}
          getKey={(vault) => vault.id}
          getImageUrl={(vault) => vault.preview}
          renderOverlay={(vault) => <VaultsGalleryOptions vault={vault} />}
          applyLink
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
