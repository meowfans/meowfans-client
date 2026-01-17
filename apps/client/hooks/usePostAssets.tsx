'use client';

import { usePostsStore } from '@/hooks/store/posts.store';
import { useAssetsActions } from '@workspace/gql/actions/assets.actions';
import { PostAssetsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface UsePostAssetsProps {
  postId: string;
  username?: string;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
}

export const usePostAssets = ({
  postId,
  username,
  sortBy = SortBy.VaultObjectSuffix,
  orderBy = SortOrder.Asc,
  take = 30
}: UsePostAssetsProps) => {
  const { postAssets, setPostAssets } = usePostsStore();
  const { publicGetPostAssetsQuery } = useAssetsActions();
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : postAssets.length;
    setLoading(postAssets.length === 0);

    try {
      const { data } = await publicGetPostAssetsQuery({
        take,
        skip,
        username,
        orderBy,
        sortBy,
        relatedEntityId: postId
      });
      const fetchedPostsAssets = (data?.getPublicPostAssets.postAssets ?? []) as PostAssetsEntity[];
      setHasMore(fetchedPostsAssets.length === take);
      if (initialLoad) setPostAssets(fetchedPostsAssets);
      else setPostAssets([...postAssets, ...fetchedPostsAssets]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadAssets();
  };

  const handleRefresh = () => {
    setPostAssets([]);
    loadAssets(true);
  };

  useEffect(() => {
    loadAssets(true);
  }, []);

  return {
    postAssets,
    loading,
    hasMore,
    handleLoadMore,
    handleRefresh
  };
};
