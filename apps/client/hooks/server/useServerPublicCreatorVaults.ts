'use client';

import { getPublicCreatorVaults } from '@/app/server/getPublicCreatorVaults';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { GetPublicVaultsOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerPublicCreatorVaults = (params: PaginationInput, initialVaults: GetPublicVaultsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { vaults, setVaults } = useVaultsStore();
  const [loading, setLoading] = useState<boolean>(initialVaults.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialVaults.length === (params.take ?? 30));
  const [skip, setSkip] = useState<number>(initialVaults.length);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getPublicCreatorVaults({
        ...params,
        skip,
        take: params.take ?? 30,
        sortBy: params.sortBy ?? SortBy.VaultViewCount,
        orderBy: params.orderBy ?? SortOrder.Desc
      });

      setHasMore(fetched.length === (params.take ?? 30));
      setVaults((prev) => [...prev, ...fetched]);
      setSkip((prev) => prev + (params.take ?? 30));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading vaults! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialVaults?.length > 0) {
      setVaults(initialVaults);
      setSkip(initialVaults.length);
    }
  }, [initialVaults, setVaults]);

  return {
    vaults,
    loading,
    hasMore,
    loadMore
  };
};
