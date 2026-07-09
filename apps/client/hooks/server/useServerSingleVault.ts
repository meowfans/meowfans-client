'use client';

import { getSingleVault } from '@/app/server/getSingleVault';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { DataFetchType, GetPublicSingleVaultOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useRef, useState } from 'react';

export const useServerSingleVault = (input: PaginationInput, initialVault: GetPublicSingleVaultOutput | null) => {
  const { errorHandler } = useErrorHandler();
  const { vault, setVault } = useVaultsStore();
  const take = input.take ?? 30;
  const [loading, setLoading] = useState(!initialVault);
  const [hasMore, setHasMore] = useState(initialVault?.vaultObjects?.length === take);
  const skipRef = useRef(take);
  const loadingRef = useRef(false);

  const loadMore = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);
    const currentSkip = skipRef.current;

    try {
      const fetched = (await getSingleVault({
        ...input,
        skip: currentSkip,
        take,
        orderBy: input.orderBy ?? SortOrder.Asc,
        sortBy: input.sortBy ?? SortBy.VaultObjectSuffix,
        dataFetchType: DataFetchType.InfiniteScroll
      })) as GetPublicSingleVaultOutput;

      const newObjects = fetched.vaultObjects ?? [];

      setHasMore(newObjects.length === take);
      setVault((prev) => {
        const existing = prev?.vaultObjects ?? [];
        const merged = new Map();

        [...existing, ...newObjects].forEach((item) => {
          merged.set(item.id, item);
        });

        return {
          ...fetched,
          vaultObjects: [...merged.values()]
        };
      });

      skipRef.current += take;
    } catch (error) {
      errorHandler({ error, msg: 'Error loading album! Try again later.' });
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialVault) {
      setVault(initialVault);
      skipRef.current = initialVault.vaultObjects?.length ?? take;
    }
  }, [initialVault, setVault, take]);

  return {
    vault,
    loading,
    hasMore,
    loadMore
  };
};
