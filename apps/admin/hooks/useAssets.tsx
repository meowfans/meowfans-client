import { useAssetsStore } from '@/zustand/assets.store';
import { useAssetsActions } from '@workspace/gql/actions';
import { AssetType, CreatorAssetsEntity, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useAssets = ({ username, assetType = AssetType.Private }: PaginationInput) => {
  const { getCreatorOrCreatorsAssetsQuery } = useAssetsActions();
  const { assets, setAssets } = useAssetsStore();
  const { errorHandler } = useErrorHandler();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : assets.length;
    try {
      const { data } = await getCreatorOrCreatorsAssetsQuery({
        take: 50,
        skip,
        assetType,
        relatedUserId: username,
        orderBy: SortOrder.Asc
      });

      const fetchedAssets = (data?.getCreatorAssetsByAdmin ?? []) as CreatorAssetsEntity[];
      setHasMore(fetchedAssets.length === 50);

      if (initialLoad) setAssets(fetchedAssets);
      else setAssets([...assets, ...fetchedAssets]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      await loadAssets();
    }
  };

  useEffect(() => {
    loadAssets(true);
  }, [username, assetType]); //eslint-disable-line

  return { hasMore, loading, onLoadMore: handleLoadMore, assets, setAssets };
};
