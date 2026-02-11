'use client';

import { getShorts } from '@/app/server/getShorts';
import { useAssetsStore } from '@/hooks/store/assets.store';
import { GetPublicShortsOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerShorts = (params: PaginationInput, initialShorts: GetPublicShortsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { publicShorts, setPublicShorts } = useAssetsStore();
  const [loading, setLoading] = useState<boolean>(initialShorts.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialShorts.length === (params.take ?? 5));
  const [skip, setSkip] = useState<number>(params.take ?? 5);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getShorts({
        ...params,
        take: params.take ?? 5,
        skip,
        sortBy: params.sortBy ?? SortBy.AssetCreatedAt,
        orderBy: params.orderBy ?? SortOrder.Desc
      });

      const fetchedShorts = (fetched ?? []) as GetPublicShortsOutput[];
      setHasMore(fetchedShorts.length === (params.take ?? 5));
      setPublicShorts((prev) => [...prev, ...fetchedShorts]);
      setSkip((prev) => prev + (params.take ?? 5));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading shorts! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialShorts?.length > 0) {
      setPublicShorts(initialShorts);
    }
  }, [initialShorts, setPublicShorts]);

  return {
    publicShorts,
    loading,
    hasMore,
    loadMore
  };
};
