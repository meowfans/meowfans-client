'use client';

import { usePostAssets } from '@/hooks/useAssets';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams } from 'next/navigation';

export const Post = () => {
  const { id } = useParams();
  const { handleLoadMore, hasMore, loading, postAssets } = usePostAssets({ postId: id as string });
  return (
    <PageManager>
      <InfiniteScrollManager dataLength={postAssets.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {postAssets.map((postAsset) => (
            <div key={postAsset.id} className="relative group overflow-hidden rounded-xl shadow-sm">
              <div
                className="aspect-square bg-cover bg-center w-full transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${postAsset.asset.rawUrl})` }}
              />
            </div>
          ))}
        </div>
      </InfiniteScrollManager>
    </PageManager>
  );
};
