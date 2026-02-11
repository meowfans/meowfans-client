'use client';

import { useAssetsStore } from '@/hooks/store/assets.store';
import { useAssetsActions } from '@workspace/gql/actions/assets.actions';
import { GetFanAssetsOutput, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useFan } from '../context/UserContextWrapper';

export const useFanAssets = ({ orderBy = SortOrder.Asc, take = 30, ...params }: PaginationInput) => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { fanAssets, setFanAssets } = useAssetsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { privateGetFanAssetsQuery } = useAssetsActions();

  const loadFanAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : fanAssets.length;
    setLoading(fanAssets.length === 0);

    try {
      const { data } = await privateGetFanAssetsQuery({ ...params, skip, take, orderBy });
      const fetchedFanAssets = (data?.getFanAssets ?? []) as GetFanAssetsOutput[];

      setHasMore(fetchedFanAssets.length === take);
      setFanAssets((prev) => (initialLoad ? fetchedFanAssets : [...prev, ...fetchedFanAssets]));
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadFanAssets();
  };

  const handleRefresh = () => {
    setFanAssets([]);
    loadFanAssets(true);
  };

  useEffect(() => {
    if (fan) loadFanAssets(true);
  }, [fan, orderBy, take, params.sortBy]); // eslint-disable-line

  return {
    fanAssets,
    loading,
    hasMore,
    handleLoadMore,
    handleRefresh
  };
};
