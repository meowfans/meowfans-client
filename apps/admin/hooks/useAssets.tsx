import { useAssetsStore } from '@/zustand/assets.store';
import { AssetType, CreatorAssetsEntity, PaginationInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useAssets = ({ username, assetType = AssetType.Private }: PaginationInput) => {
  const { assets, setAssets } = useAssetsStore();
  const { errorHandler } = useErrorHandler();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : assets.length;
    try {
      const fetchedAssets = [] as CreatorAssetsEntity[];
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
