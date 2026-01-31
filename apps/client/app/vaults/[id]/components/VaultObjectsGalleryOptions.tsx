import { LikeButton } from '@/components/LikeButton';
import { PurchaseSheet } from '@/components/modals/PurchaseSheet';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { GetPublicVaultObjectsOutput, PurchaseType } from '@workspace/gql/generated/graphql';
import { FullScreenButton } from '@workspace/ui/globals/FullScreenButton';
import { useDebouncedCallback } from 'use-debounce';

interface VaultObjectsGalleryProps {
  vaultObject: GetPublicVaultObjectsOutput;
  idx: number;
  vaultObjects: GetPublicVaultObjectsOutput[];
}

export const VaultObjectsGalleryOptions: React.FC<VaultObjectsGalleryProps> = ({ idx, vaultObject, vaultObjects }) => {
  const { likeVaultObject } = useLikeMutations();
  const handleDebounceLikeVaultObject = useDebouncedCallback(likeVaultObject, 350);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end place-content-end p-1">
        <FullScreenButton
          className="cursor-pointer border-dashed hidden md:flex z-10"
          currentIdx={idx}
          currentUrl={vaultObject.rawUrl}
          urls={(vaultObjects.map((vo) => vo.rawUrl) ?? []) as string[]}
        />
      </div>
      {vaultObject.isPurchased ? (
        <div className="flex flex-col justify-end h-full">
          <div className="flex justify-end place-content-end w-full p-2 bg-linear-to-t from-black/70 via-black/30 to-transparent">
            <LikeButton
              className="absolute bottom-1 right-1 hover:text-red-500 rounded-xl transition"
              onLikeDisLike={() => handleDebounceLikeVaultObject(vaultObject.id)}
              isLiked={vaultObject.isLiked}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center place-content-center items-center absolute inset-0">
          {vaultObject.unlockPrice && (
            <PurchaseSheet
              entityId={vaultObject.id}
              amount={vaultObject.unlockPrice}
              purchaseType={PurchaseType.VaultObject}
              creatorId={vaultObject.creatorId as string}
              className="h-fit w-fit"
            />
          )}
        </div>
      )}
    </div>
  );
};
