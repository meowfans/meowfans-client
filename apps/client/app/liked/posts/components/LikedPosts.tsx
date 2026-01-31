'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { LikeButton } from '@/components/LikeButton';
import { PageHeader } from '@/components/PageHeader';
import { useLikedPosts } from '@/hooks/useLikedPosts';
import { useLikes } from '@/hooks/useLikes';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { motion } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';

export const LikedPosts = () => {
  const { likePost } = useLikes();
  const { loadMore, hasMore, loading, postLikes } = useLikedPosts();
  const handleDebounceLikePost = useDebouncedCallback(likePost, 250);

  return (
    <PageManager>
      <InfiniteScrollManager hasMore={hasMore} dataLength={postLikes.length} loading={loading} onLoadMore={loadMore}>
        <PageHeader title="Liked posts" />
        <GalleryManager
          items={postLikes}
          getImageUrl={(post) => post.preview}
          getKey={(post) => post.id}
          loading={loading}
          renderOverlay={(post) => (
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="absolute bottom-0 right-0"
            >
              <LikeButton
                onLikeDisLike={() => handleDebounceLikePost(post.id)}
                className="rounded-full p-2 shadow-lg backdrop-blur-sm bg-white/30 hover:bg-red-500 transition-all duration-300"
                isLiked={post.isLiked}
              />
            </motion.div>
          )}
        />
      </InfiniteScrollManager>
    </PageManager>
  );
};
