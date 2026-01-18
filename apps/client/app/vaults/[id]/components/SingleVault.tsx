'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { useSingleVault } from '@/hooks/useVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams } from 'next/navigation';
import { SingleVaultInfo } from './SingleVaultInfo';
import { VaultObjectsGalleryOptions } from './VaultObjectsGalleryOptions';

export const SingleVault = () => {
  const { id } = useParams();

  const { vaultObjects, loadMore, hasMore, loading } = useSingleVault({
    relatedEntityId: id as string,
    sortBy: SortBy.VaultObjectSuffix,
    orderBy: SortOrder.Asc
  });

  {
    /* <ExoAdProvider zoneId="5771480" />
<ExoAdProvider zoneId="5771444" zoneType={ExoAdZoneTypes.MobileBanner} />
<ExoAdProvider zoneId="5771274" classIdName="eas6a97888e37" zoneType={ExoAdZoneTypes.OutStream} />
*/
  }
  return (
    <PageManager>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] items-start">
        <div className="hidden md:flex space-y-6">
          <SingleVaultInfo />
        </div>

        <InfiniteScrollManager hasMore={hasMore} dataLength={vaultObjects.length} loading={loading} onLoadMore={loadMore}>
          <div className="flex md:hidden">
            <SingleVaultInfo />
          </div>
          <GalleryManager
            breakpointCols={{ default: 1, 768: 2, 500: 1 }}
            loading={loading}
            items={vaultObjects}
            getKey={(vaultObject) => vaultObject.id}
            getImageUrl={(vaultObject) => vaultObject.asset?.rawUrl}
            renderOverlay={(vaultObject, idx, vaultItems) => (
              <VaultObjectsGalleryOptions idx={idx} vaultObject={vaultObject} vaultObjects={vaultItems} />
            )}
          />
        </InfiniteScrollManager>
      </div>
    </PageManager>
  );
};
