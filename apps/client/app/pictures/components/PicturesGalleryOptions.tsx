import { LikeButton } from '@/components/LikeButton';
import { PurchaseSheet } from '@/components/modals/PurchaseSheet';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { GetPublicVaultObjectsOutput, PurchaseType } from '@workspace/gql/generated/graphql';
import { FullScreenButton } from '@workspace/ui/globals/FullScreenButton';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

interface PicturesGalleryProps {
  idx: number;
  allVaultObjects: GetPublicVaultObjectsOutput[];
  vaultObject: GetPublicVaultObjectsOutput;
}

export const PicturesGalleryOptions: React.FC<PicturesGalleryProps> = ({ vaultObject, allVaultObjects, idx }) => {
  const { likeVaultObject } = useLikeMutations();
  const handleDebounceLikeVaultObject = useDebouncedCallback(likeVaultObject, 350);

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden pointer-events-auto">
      <div className="absolute top-0 right-0">
        <FullScreenButton
          className="cursor-pointer border-dashed hidden md:flex"
          currentIdx={idx}
          currentUrl={vaultObject.rawUrl}
          urls={(allVaultObjects.map((vo) => vo.rawUrl) ?? []) as string[]}
        />
      </div>

      {vaultObject.unlockPrice && !vaultObject.isPurchased && (
        <div className="flex justify-center place-content-center items-center absolute inset-0">
          <PurchaseSheet
            entityId={vaultObject.id}
            amount={vaultObject.unlockPrice}
            purchaseType={PurchaseType.VaultObject}
            creatorId={vaultObject.creatorId as string}
            className="h-fit w-fit z-10"
          />
        </div>
      )}
      <div className="flex flex-col justify-end h-full">
        <div className="flex justify-end place-content-end w-full p-2 bg-linear-to-t from-black/70 via-black/30 to-transparent">
          <div className="flex flex-row justify-between space-x-1 items-center">
            <Link href={`/vaults/${vaultObject.vaultId}`}>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            {vaultObject.isPurchased && (
              <LikeButton
                className="hover:text-red-500 rounded-xl transition z-10"
                onLikeDisLike={() => handleDebounceLikeVaultObject(vaultObject.id)}
                isLiked={vaultObject.isLiked}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
