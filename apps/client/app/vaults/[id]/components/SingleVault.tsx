'use client';

import { VerticalFeedGallery } from '@/components/VerticalFeedGallery';
import { useSingleVault } from '@/hooks/useVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams } from 'next/navigation';
import { SingleVaultInfo } from './SingleVaultInfo';
import { VaultObjectsGalleryOptions } from './VaultObjectsGalleryOptions';

export const SingleVault = () => {
  const { id } = useParams<{ id: string }>();
  const { vault, loadMore, hasMore, loading } = useSingleVault({
    relatedEntityId: id,
    sortBy: SortBy.VaultObjectSuffix,
    orderBy: SortOrder.Asc
  });

  return (
    <PageManager>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] items-start">
        <div className="hidden md:flex">
          <SingleVaultInfo vault={vault} />
        </div>

        <InfiniteScrollManager hasMore={hasMore} dataLength={vault?.vaultObjects?.length ?? 0} loading={loading} onLoadMore={loadMore}>
          <div className="flex md:hidden">
            <SingleVaultInfo vault={vault} />
          </div>

          <VerticalFeedGallery
            loading={loading}
            items={vault?.vaultObjects ?? []}
            getKey={(v) => v.id}
            getImageUrl={(v) => v.rawUrl}
            renderOverlay={(v, idx, all) => <VaultObjectsGalleryOptions idx={idx} vaultObject={v} vaultObjects={all} />}
          />
        </InfiniteScrollManager>
      </div>
    </PageManager>
  );
};
