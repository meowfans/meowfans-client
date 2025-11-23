'use client';

import { VaultObjectsGalleryOptions } from '@/app/vaults/[id]/components/VaultObjectsGalleryOptions';
import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { GalleryManager } from '@/components/GalleryManager';
import { PageHeader } from '@/components/PageHeader';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';

const MostLikedVaultObjects = () => {
  const { fan } = useFan();
  const { getVaultObjects } = useVaults();
  const { vaultObjects, loading } = getVaultObjects({
    take: 20,
    sortBy: SortBy.VaultObjectLikeCount,
    orderBy: SortOrder.Desc,
    fanId: fan?.fanId
  });

  return (
    <div className="mb-6 p-1">
      <PageHeader title="Top liked Pictures" zoneId="5772068" outstreamZoneId="5771268" />
      <GalleryManager
        loading={loading}
        items={vaultObjects}
        getKey={(vaultObject) => vaultObject.id}
        getImageUrl={(vaultObject) => vaultObject.asset?.rawUrl}
        renderOverlay={(vaultObject, idx, allVaultObjects) => (
          <VaultObjectsGalleryOptions idx={idx} vaultObject={vaultObject} vaultObjects={allVaultObjects} />
        )}
        zoneId="5769740"
      />
      <ExoAdProvider zoneId={'5771282'} zoneType={ExoAdZoneTypes.OutStream} />
    </div>
  );
};
export default MostLikedVaultObjects;
