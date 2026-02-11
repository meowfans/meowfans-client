'use client';

import { getFanAssets } from '@/app/server/getFanAssets';
import { useAssetsStore } from '@/hooks/store/assets.store';
import { GetFanAssetsOutput, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerPurchased = (params: PaginationInput, initialData: GetFanAssetsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { fanAssets, setFanAssets } = useAssetsStore();
  const [loading, setLoading] = useState<boolean>(initialData.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialData.length === (params.take ?? 30));
  const [skip, setSkip] = useState<number>(initialData.length);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const fetched = await getFanAssets({
        ...params,
        skip,
        take: params.take ?? 30,
        orderBy: params.orderBy ?? SortOrder.Desc
      });

      const fetchedAssets = (fetched ?? []) as GetFanAssetsOutput[];
      setHasMore(fetchedAssets.length === (params.take ?? 30));
      setFanAssets((prev) => [...prev, ...fetchedAssets]);
      setSkip((prev) => prev + (params.take ?? 30));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading purchased items! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData?.length > 0) {
      setFanAssets(initialData);
      setSkip(initialData.length);
    }
  }, [initialData, setFanAssets]);

  return {
    fanAssets,
    loading,
    hasMore,
    loadMore
  };
};
