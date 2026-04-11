import { useAssetsStore } from '@/hooks/store/assets.store';
import { useAssetsActions } from '@workspace/gql/actions';
import { AssetsEntity, AssetType, GetAllAssetsOutput, PaginationInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useAssets = (params: PaginationInput) => {
  const { assets, setAssets } = useAssetsStore();
  const { errorHandler } = useErrorHandler();
  const { getAllAssetsQuery } = useAssetsActions();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : assets?.assets.length;
    try {
      const { data } = await getAllAssetsQuery({
        ...params,
        skip,
        assetType: AssetType.Private
      });
      const fetched = data?.getAllAssetsByAdmin as GetAllAssetsOutput;
      const fetchedAssets = fetched?.assets as AssetsEntity[];
      setHasMore(fetchedAssets.length === 50);

      if (initialLoad) setAssets(fetched);
      else
        setAssets((prev) => ({
          ...prev,
          count: fetched.count ?? 0,
          assets: [...(prev?.assets ?? []), ...fetchedAssets]
        }));
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
  }, [params.username, params.assetType]); //eslint-disable-line

  return { hasMore, loading, onLoadMore: handleLoadMore, assets, setAssets };
};
