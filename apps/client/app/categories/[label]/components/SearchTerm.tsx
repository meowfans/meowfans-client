'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { VaultsGalleryOptions } from '@/components/VaultsGalleryOptions';
import { useVaults } from '@/hooks/useVaults';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

interface Props {
  label: string;
}

export const SearchTerm: React.FC<Props> = ({ label }) => {
  const { vaults, hasMore, loadMore, loading, refresh } = useVaults({ searchTerm: label });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={vaults.length} hasMore={hasMore} loading={loading} onLoadMore={loadMore} onRefresh={refresh}>
        <PageHeader title={`Explore contents of ${label && label}`} />
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
