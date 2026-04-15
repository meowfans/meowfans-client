'use client';

import { useAssets } from '@/hooks/useAssets';
import { useCreatePost } from '@/hooks/usePosts';
import { PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { PostCaption } from './PostCaption';
import { PostPreview } from './PostPreview';
import { PostStudioAssets } from './PostStudioAssets';
import { PostStudioHeader } from './PostStudioHeader';
import { PostType } from './PostType';

export function PostsStudio() {
  const { handleUploadPosts, creating } = useCreatePost();
  const { assets, loading, hasMore, handleLoadMore } = useAssets({
    sortBy: SortBy.AssetCreatedAt,
    orderBy: SortOrder.Desc,
    take: 30
  });

  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [previewAssetId, setPreviewAssetId] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [postType, setPostType] = useState<PostTypes>(PostTypes.Exclusive);
  const [unlockPrice, setUnlockPrice] = useState<number | undefined>(undefined);

  const handleToggleAsset = (assetId: string) => {
    setSelectedAssets((prev) => {
      if (prev.includes(assetId)) {
        if (previewAssetId === assetId) setPreviewAssetId(null);
        return prev.filter((id) => id !== assetId);
      } else {
        if (!previewAssetId) setPreviewAssetId(assetId);
        return [...prev, assetId];
      }
    });
  };

  const handleResetForm = () => {
    setSelectedAssets([]);
    setPreviewAssetId(null);
    setCaption('');
    setPostType(PostTypes.Public);
    setUnlockPrice(undefined);
  };

  const handleCreatePost = async () => {
    await handleUploadPosts({
      assetIds: selectedAssets,
      caption: caption || undefined,
      previewId: previewAssetId || undefined,
      type: postType,
      unlockPrice: postType === PostTypes.Exclusive ? unlockPrice : undefined
    });
    handleResetForm();
  };

  const selectedAssetsData = assets.filter((a) => selectedAssets.includes(a.id));
  const previewAsset = selectedAssetsData.find((a) => a.id === previewAssetId);

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <PostStudioHeader selectedAssetsLength={selectedAssets.length} />

      <PostStudioAssets
        assets={assets}
        hasMore={hasMore}
        loading={loading}
        onToggleSelect={handleToggleAsset}
        onLoadMore={handleLoadMore}
        selectedAssets={selectedAssets}
      />

      <div className="space-y-4">
        {previewAsset && <PostPreview previewAsset={previewAsset} />}

        <PostCaption caption={caption} onSetPostCation={setCaption} />
        <PostType onSetPostType={setPostType} onSetUnlockPrice={setUnlockPrice} postType={postType} unlockPrice={unlockPrice} />

        <LoadingButtonV2
          onClick={handleCreatePost}
          disabled={creating || !selectedAssets.length}
          className="w-full"
          size="lg"
          loading={creating}
        >
          <Upload className="mr-2 h-4 w-4" />
          Publish Post
        </LoadingButtonV2>
      </div>
    </div>
  );
}
