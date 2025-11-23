'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { VaultsGalleryOptions } from '@/components/VaultsGalleryOptions';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaults } from '@/hooks/useVaults';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

interface Props {
  label: string;
}

export const SearchTerm: React.FC<Props> = ({ label }) => {
  const { fan } = useFan();
  const { getVaults } = useVaults();
  const { vaults, loading, handleLoadMore, hasMore, onRefresh } = getVaults({
    fanId: fan?.fanId,
    searchTerm: label
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
