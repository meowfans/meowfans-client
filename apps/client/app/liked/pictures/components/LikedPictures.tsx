'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { LikeButton } from '@/components/LikeButton';
import { PageHeader } from '@/components/PageHeader';
import { useLikedVaultObjects } from '@/hooks/useLikedVaultObjects';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useDebouncedCallback } from 'use-debounce';

export const LikedPictures = () => {
  const { likeVaultObject } = useLikeMutations();
  const { vaultObjectLikes, loadMore, hasMore, loading } = useLikedVaultObjects();
  const handleDebounceLikeVaultObject = useDebouncedCallback(likeVaultObject, 350);

  return (
    <PageManager>
      <InfiniteScrollManager hasMore={hasMore} dataLength={vaultObjectLikes.length} loading={loading} onLoadMore={loadMore}>
        <PageHeader title="Liked pictures" />
        <GalleryManager
          items={vaultObjectLikes}
          getImageUrl={(vo) => vo.preview as string}
          getKey={(vo) => vo.id}
          loading={loading}
          renderOverlay={(vaultObject) => (
            <div className="relative">
              <LikeButton
                onLikeDisLike={() => handleDebounceLikeVaultObject(vaultObject.id)}
                className="absolute top-0 right-0 pointer-events-auto rounded-full p-2 shadow-lg backdrop-blur-sm bg-white/30 hover:bg-red-500 transition-all duration-300"
                isLiked={vaultObject.isLiked}
              />
            </div>
          )}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
