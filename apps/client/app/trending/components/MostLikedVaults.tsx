'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { GalleryManager } from '@/components/GalleryManager';
import { LikeButton } from '@/components/LikeButton';
import { PageHeader } from '@/components/PageHeader';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useLikes } from '@/hooks/useLikes';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useDebouncedCallback } from 'use-debounce';

const MostLikedVaults = () => {
  const { fan } = useFan();
  const { getVaults } = useVaults();
  const { likeVault } = useLikes();
  const { vaults } = getVaults({ fanId: fan?.fanId, take: 20, sortBy: SortBy.VaultLikeCount, orderBy: SortOrder.Desc });

  const handleDebounceLikeVault = useDebouncedCallback(likeVault, 350);

  return (
    <div className="mb-6">
      <PageHeader title="Top liked vaults" zoneId="5772066" outstreamZoneId="5771266" />
      <GalleryManager
        items={vaults}
        getKey={(vault) => vault.id}
        getImageUrl={(vault) => vault.preview}
        applyLink
        pathname="/vaults"
        renderOverlay={(vault) => (
          <div className="flex flex-col justify-end h-full">
            <div className="flex justify-between items-end w-full p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <p className="truncate text-xs sm:text-sm md:text-base text-white max-w-[75%]">{vault.description}</p>
              <LikeButton isLiked={vault.isLiked} onLikeDisLike={() => handleDebounceLikeVault(vault.id)} title="Like" />
            </div>
          </div>
        )}
        zoneId="5770612"
      />
      <ExoAdProvider zoneId="5771286" zoneType={ExoAdZoneTypes.OutStream} />
    </div>
  );
};
export default MostLikedVaults;
