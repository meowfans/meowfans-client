'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { GalleryManager } from '@/components/GalleryManager';
import { usePostAssets } from '@/hooks/usePostAssets';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useParams } from 'next/navigation';
import { PostGalleryOptions } from './PostGalleryOptions';

export const PostGallery = () => {
  const { id } = useParams();
  const { postAssets, handleLoadMore, hasMore, loading, handleRefresh } = usePostAssets({
    postId: id as string,
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Asc
  });

  return (
    <InfiniteScrollManager
      hasMore={hasMore}
      dataLength={postAssets.length}
      loading={loading}
      onLoadMore={handleLoadMore}
      onRefresh={handleRefresh}
    >
      <GalleryManager
        loading={loading}
        items={postAssets}
        getKey={(postAsset) => postAsset.id}
        getImageUrl={(postAsset) => postAsset.asset?.rawUrl}
        renderOverlay={(postAsset, idx, allItems) => (
          <PostGalleryOptions
            fullScreenButtonProps={{ currentIdx: idx, currentUrl: postAsset.asset?.rawUrl, urls: allItems.map((vo) => vo.asset.rawUrl) }}
          />
        )}
      />
      <ExoAdProvider zoneId="5771264" zoneType={ExoAdZoneTypes.OutStream} />
    </InfiniteScrollManager>
  );
};
