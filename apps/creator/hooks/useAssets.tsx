import { useAssetsStore } from '@/hooks/store/assets.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { CombinedGraphQLErrors } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { useAssetsActions } from '@workspace/gql/actions';
import { GET_POST_ASSETS_QUERY } from '@workspace/gql/api/postsAPI';
import { AssetType, CreatorAssetsEntity, PaginationInput, PostAssetsEntity, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useAssets = (params: PaginationInput) => {
  const { assets, setAssets } = useAssetsStore();
  const { refetchCreatorAssets, getCreatorAssetsQuery } = useAssetsActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadCreatorAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : assets.length;
    try {
      const { data } = await getCreatorAssetsQuery({ ...params, take: 30, skip });
      const fetchedAssets = data?.getCreatorAssets as CreatorAssetsEntity[];

      setHasMore(fetchedAssets.length === 30);

      if (initialLoad) setAssets(fetchedAssets);
      else setAssets([...assets, ...fetchedAssets]);
    } catch (error) {
      if (error instanceof CombinedGraphQLErrors || error.name === 'AbortError') return;
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefetch = async (take: number) => {
    const { data } = await refetchCreatorAssets({ input: { ...params, take, skip: 0 } });
    const creatorAssets = data?.getCreatorAssets as CreatorAssetsEntity[];
    return creatorAssets;
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadCreatorAssets();
  };

  useEffect(() => {
    loadCreatorAssets(true);
  }, [params.assetType, params.orderBy]); //eslint-disable-line

  return { handleLoadMore, hasMore, loading, assets, handleRefetch };
};

export const usePostAssets = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { postAssets, setPostAssets } = usePostsStore();
  const [getCreatorAssets] = useLazyQuery(GET_POST_ASSETS_QUERY);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const handleLoadMoreAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : postAssets.length;
    try {
      const { data } = await getCreatorAssets({
        variables: {
          input: { ...params, username: params.username, skip, take: 30, orderBy: SortOrder.Desc, assetType: AssetType.Private }
        }
      });

      const fetchedPostsAssets = (data?.getPostAssets ?? []) as PostAssetsEntity[];

      setHasMore(fetchedPostsAssets.length === params.take);

      if (initialLoad) setPostAssets(fetchedPostsAssets);
      else setPostAssets([...postAssets, ...fetchedPostsAssets]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) handleLoadMoreAssets();
  };

  useEffect(() => {
    handleLoadMoreAssets(true);
  }, [params.assetType]); //eslint-disable-line

  return { postAssets, handleLoadMore, loading, hasMore };
};
