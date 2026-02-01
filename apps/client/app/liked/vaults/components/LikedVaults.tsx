'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { LikeButton } from '@/components/LikeButton';
import { PageHeader } from '@/components/PageHeader';
import { useLikedVaults } from '@/hooks/useLikedVaults';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { motion } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';

export const LikedVaults = () => {
  const { likeVault } = useLikeMutations();
  const { loadMore, hasMore, loading, vaultLikes } = useLikedVaults();

  const handleDebounceLikeVault = useDebouncedCallback(likeVault, 350);

  return (
    <PageManager>
      <InfiniteScrollManager hasMore={hasMore} dataLength={vaultLikes.length} loading={loading} onLoadMore={loadMore}>
        <PageHeader title="Liked vaults" />
        <GalleryManager
          items={vaultLikes}
          getImageUrl={(vaultLike) => vaultLike.preview as string}
          getKey={(vaultLike) => vaultLike.id as string}
          loading={loading}
          renderOverlay={(vaultLike) => (
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="absolute bottom-0 right-0 pointer-events-auto"
            >
              <LikeButton
                onLikeDisLike={() => handleDebounceLikeVault(vaultLike.id as string)}
                className="rounded-full p-2 shadow-lg backdrop-blur-sm bg-white/30 hover:bg-red-500 transition-all duration-300"
                isLiked={vaultLike.isLiked}
              />
            </motion.div>
          )}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
