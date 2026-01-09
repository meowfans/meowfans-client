'use client';

import { useAssetsStore } from '@/hooks/store/assets.store';
import { useAssetsActions } from '@workspace/gql/actions/assets.actions';
import { FanAssetsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useFan } from './context/UserContextWrapper';
import { sort } from 'radash';

interface UseFanAssetsProps {
  orderBy?: SortOrder;
  take?: number;
  sortBy?: SortBy;
}

export const useFanAssets = ({ orderBy = SortOrder.Asc, take = 30, ...params }: UseFanAssetsProps) => {
  const { fanAssets, setFanAssets } = useAssetsStore();
  const { privateGetFanAssetsQuery } = useAssetsActions();
  const { errorHandler } = useErrorHandler();
  const { fan } = useFan();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadFanAssets = async (initialLoad = false) => {
    if (!fan) return;
    const skip = initialLoad ? 0 : fanAssets.length;
    setLoading(fanAssets.length === 0);

    try {
      const { data } = await privateGetFanAssetsQuery({ skip, take, orderBy });
      const fetchedFanAssets = (data?.getFanAssets ?? []) as FanAssetsEntity[];
      setHasMore(fetchedFanAssets.length === take);
      if (initialLoad) setFanAssets(fetchedFanAssets);
      else setFanAssets([...fanAssets, ...fetchedFanAssets]);
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
  }, [fan, orderBy, take, params.sortBy]);

  return {
    fanAssets,
    loading: fan ? loading : false,
    hasMore,
    handleLoadMore,
    handleRefresh
  };
};
