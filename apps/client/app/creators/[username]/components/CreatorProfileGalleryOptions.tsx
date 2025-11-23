import { FullScreenButton } from '@workspace/ui/globals/FullScreenButton';
import { LikeButton } from '@/components/LikeButton';
import { useAssetsStore } from '@/hooks/store/assets.store';
import { useLikes } from '@/hooks/useLikes';
import { CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { useDebouncedCallback } from 'use-debounce';

interface CreatorProfileGalleryOptionsProps {
  creatorAsset: CreatorAssetsEntity;
  idx: number;
  creatorAssetItems: CreatorAssetsEntity[];
}

export const CreatorProfileGalleryOptions: React.FC<CreatorProfileGalleryOptionsProps> = ({ creatorAsset, creatorAssetItems, idx }) => {
  const { likeVaultObject } = useLikes();
  const { setAssets, assets: creatorAssets } = useAssetsStore();

  const handleLikeVaultObject = async (vaultObjectId: string) => {
    if (!vaultObjectId) return;
    const hasLiked = await likeVaultObject(vaultObjectId);
    setAssets(
      creatorAssets.map((creatorAsset) =>
        creatorAsset.asset.vaultObjectId === vaultObjectId
          ? {
              ...creatorAsset,
              asset: {
                ...creatorAsset.asset,
                vaultObjectId: creatorAsset.asset.vaultObjectId,
                vaultObject: {
                  ...creatorAsset.asset.vaultObject,
                  isLiked: hasLiked
                }
              }
            }
          : creatorAsset
      ) as CreatorAssetsEntity[]
    );
  };
  const handleDebounceLikeVaultObject = useDebouncedCallback(handleLikeVaultObject, 350);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end place-content-end p-1">
        <FullScreenButton currentIdx={idx} currentUrl={creatorAsset.asset.rawUrl} urls={creatorAssetItems.map((c) => c.asset.rawUrl)} />
      </div>
      <div className="flex flex-col justify-end h-full">
        <div className="flex justify-end place-content-end w-full p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <LikeButton
            isLiked={!!creatorAsset.asset.vaultObject?.isLiked}
            title="Like"
            onLikeDisLike={() => handleDebounceLikeVaultObject(creatorAsset.asset?.vaultObjectId as string)}
          />
        </div>
      </div>
    </div>
  );
};
