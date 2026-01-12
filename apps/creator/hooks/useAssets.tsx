import { useAssetsStore } from '@/hooks/store/assets.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { CombinedGraphQLErrors } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { GET_CREATOR_ASSETS_QUERY } from '@workspace/gql/api/assetsAPI';
import { GET_POST_ASSETS_QUERY } from '@workspace/gql/api/postsAPI';
import { AssetType, CreatorAssetsEntity, PostAssetsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
interface Props {
  assetType?: AssetType;
}

interface UseAssetsProps extends Props {
  pageNumber?: number;
  username?: string;
  fanId?: string;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
  postId?: string;
}

export const useAssets = ({ assetType }: Props) => {
  const { assets, setAssets } = useAssetsStore();
  const [getCreatorAssets, { refetch }] = useLazyQuery(GET_CREATOR_ASSETS_QUERY);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadCreatorAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : assets.length;
    try {
      const { data } = await getCreatorAssets({ variables: { input: { take: 30, skip, assetType } } });
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
    const { data } = await refetch({ input: { take, skip: 0, assetType } });
    const creatorAssets = data?.getCreatorAssets as CreatorAssetsEntity[];
    return creatorAssets;
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadCreatorAssets();
  };

  useEffect(() => {
    loadCreatorAssets(true);
  }, [assetType]);

  return { handleLoadMore, hasMore, loading, assets, handleRefetch };
};

export const usePostAssets = ({
  postId,
  username,
  take = 30,
  sortBy = SortBy.PostCreatedAt,
  orderBy = SortOrder.Desc,
  assetType = AssetType.Private
}: UseAssetsProps) => {
  const { errorHandler } = useErrorHandler();
  const { postAssets, setPostAssets } = usePostsStore();
  const [getCreatorAssets] = useLazyQuery(GET_POST_ASSETS_QUERY);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const handleLoadMoreAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : postAssets.length;
    try {
      const { data } = await getCreatorAssets({
        variables: { input: { take, skip, username, orderBy, sortBy, relatedEntityId: postId, assetType } }
      });

      const fetchedPostsAssets = (data?.getPostAssets ?? []) as PostAssetsEntity[];

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
    if (!loading && hasMore) handleLoadMoreAssets();
  };

  useEffect(() => {
    handleLoadMoreAssets(true);
  }, [assetType]);

  return { postAssets, handleLoadMore, loading, hasMore };
};
