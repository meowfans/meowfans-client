'use client';

import { getSingleVault } from '@/app/server/getSingleVault';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { DataFetchType, GetPublicSingleVaultOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerSingleVault = (input: PaginationInput, initialVault: GetPublicSingleVaultOutput | null) => {
  const { errorHandler } = useErrorHandler();
  const { vault, setVault } = useVaultsStore();
  const [loading, setLoading] = useState<boolean>(!initialVault);
  const [hasMore, setHasMore] = useState<boolean>(initialVault?.vaultObjects?.length === input.take);
  const [skip, setSkip] = useState<number>(input.take ?? 30);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getSingleVault({
        ...input,
        skip,
        take: input.take ?? 30,
        orderBy: input.orderBy ?? SortOrder.Asc,
        sortBy: input.sortBy ?? SortBy.VaultObjectSuffix,
        dataFetchType: DataFetchType.InfiniteScroll
      });
      const fetchedVault = fetched as GetPublicSingleVaultOutput;
      const vaultObjects = fetchedVault?.vaultObjects ?? [];

      setHasMore(vaultObjects.length === (input.take ?? 30));
      setVault((prev) => ({ ...fetchedVault, vaultObjects: [...(prev.vaultObjects ?? []), ...vaultObjects] }));
      setSkip((prev) => prev + (input.take ?? 30));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading album! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialVault) {
      setVault(initialVault);
    }
  }, [initialVault, setVault]);

  return {
    vault,
    loading,
    hasMore,
    loadMore
  };
};
