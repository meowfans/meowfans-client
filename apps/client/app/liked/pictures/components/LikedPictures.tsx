'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { LikeButton } from '@/components/LikeButton';
import { PageHeader } from '@/components/PageHeader';
import { useLikes } from '@/hooks/useLikes';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

export const LikedPictures = () => {
  const { getLikedVaultObjects, likeVaultObject } = useLikes();
  const { vaultObjectLikes, onLoadMore, hasMore, loading } = getLikedVaultObjects();
  const handleDebounceLikeVaultObject = useDebouncedCallback(likeVaultObject, 350);

  return (
    <PageManager>
      <InfiniteScrollManager hasMore={hasMore} dataLength={vaultObjectLikes.length} loading={loading} onLoadMore={onLoadMore}>
        <PageHeader title="Liked pictures" />
        <GalleryManager
          items={vaultObjectLikes}
          getImageUrl={(vaultObjectLike) => vaultObjectLike.vaultObject.asset?.rawUrl}
          getKey={(vaultObjectLike) => vaultObjectLike.vaultObjectId}
          loading={loading}
          renderOverlay={(vaultObject) => (
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="absolute bottom-0 right-0"
            >
              <LikeButton
                onLikeDisLike={() => handleDebounceLikeVaultObject(vaultObject.vaultObjectId)}
                className="rounded-full p-2 shadow-lg backdrop-blur-sm bg-white/30 hover:bg-red-500 transition-all duration-300"
                isLiked={vaultObject.vaultObject.isLiked}
              />
            </motion.div>
          )}
        />
        <Link href={'/vaults'}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="aspect-square rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center border border-white/10"
            style={{
              backgroundImage: `url('/meowfans_banner.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <span className="bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm text-white text-sm font-semibold">
              Explore More Pictures
            </span>
          </motion.div>
        </Link>
      </InfiniteScrollManager>
    </PageManager>
  );
};
