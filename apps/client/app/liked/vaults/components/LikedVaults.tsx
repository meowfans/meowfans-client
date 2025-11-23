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

export const LikedVaults = () => {
  const { getLikedVaults, likeVault } = useLikes();
  const { onLoadMore, hasMore, loading, vaultLikes } = getLikedVaults();

  const handleDebounceLikeVault = useDebouncedCallback(likeVault, 350);

  return (
    <PageManager>
      <InfiniteScrollManager hasMore={hasMore} dataLength={vaultLikes.length} loading={loading} onLoadMore={onLoadMore}>
        <PageHeader title="Liked vaults" />
        <GalleryManager
          items={vaultLikes}
          getImageUrl={(vaultLike) => vaultLike.vault.preview}
          getKey={(vaultLike) => vaultLike.vaultId}
          loading={loading}
          renderOverlay={(vaultLike) => (
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="absolute bottom-0 right-0"
            >
              <LikeButton
                onLikeDisLike={() => handleDebounceLikeVault(vaultLike.vaultId)}
                className="rounded-full p-2 shadow-lg backdrop-blur-sm bg-white/30 hover:bg-red-500 transition-all duration-300"
                isLiked={vaultLike.vault.isLiked}
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
              Explore More Vaults
            </span>
          </motion.div>
        </Link>
      </InfiniteScrollManager>
    </PageManager>
  );
};
