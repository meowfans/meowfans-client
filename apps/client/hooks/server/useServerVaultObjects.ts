'use client';

import { getVaultObjects } from '@/app/server/getVaultObjects';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { GetPublicVaultObjectsOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerVaultObjects = (params: PaginationInput, initialObjects: GetPublicVaultObjectsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { vaultObjects, setVaultObjects } = useVaultsStore();
  const [loading, setLoading] = useState<boolean>(initialObjects.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialObjects.length === (params.take ?? 30));
  const [skip, setSkip] = useState<number>(params.take ?? 30);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const fetched = await getVaultObjects({
        ...params,
        skip,
        take: params.take ?? 30,
        orderBy: params.orderBy ?? SortOrder.Asc,
        sortBy: params.sortBy ?? SortBy.VaultObjectSuffix
      });

      const fetchedObjects = (fetched ?? []) as GetPublicVaultObjectsOutput[];
      setHasMore(fetchedObjects.length === (params.take ?? 30));
      setVaultObjects((prev) => [...prev, ...fetchedObjects]);
      setSkip((prev) => prev + (params.take ?? 30));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading pictures! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialObjects?.length > 0) {
      setVaultObjects(initialObjects);
    }
  }, [initialObjects, setVaultObjects]);

  return {
    vaultObjects,
    loading,
    hasMore,
    loadMore
  };
};
