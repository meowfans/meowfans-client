'use client';

import { useAssetsStore } from '@/hooks/store/assets.store';
import { useAssetsActions } from '@workspace/gql/actions/assets.actions';
import { AssetsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useFan } from './context/UserContextWrapper';

interface UsePublicShortsProps {
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
}

export const usePublicShorts = ({ sortBy = SortBy.AssetViewCount, orderBy = SortOrder.Desc, take = 5 }: UsePublicShortsProps) => {
  const { publicShorts, setPublicShorts } = useAssetsStore();
  const { publicGetShortsQuery } = useAssetsActions();
  const { errorHandler } = useErrorHandler();
  const { fan } = useFan();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadShorts = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : publicShorts.length;
    setLoading(publicShorts.length === 0);

    try {
      const { data } = await publicGetShortsQuery({ sortBy, orderBy, take, skip, relatedUserId: fan?.fanId });
      const fetchedShorts = data?.getPublicShorts as AssetsEntity[];
      setHasMore(fetchedShorts.length === take);
      if (initialLoad) setPublicShorts(fetchedShorts);
      else setPublicShorts([...publicShorts, ...fetchedShorts]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadShorts();
  };

  const handleRefresh = () => {
    setPublicShorts([]);
    loadShorts(true);
  };

  useEffect(() => {
    loadShorts(true);
  }, [fan]);

  return {
    publicShorts,
    loading,
    hasMore,
    handleLoadMore,
    handleRefresh
  };
};
