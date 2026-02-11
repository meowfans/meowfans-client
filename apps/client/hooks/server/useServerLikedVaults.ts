'use client';

import { getLikedVaults } from '@/app/server/getLikedVaults';
import { useLikesStore } from '@/hooks/store/likes.store';
import { GetLikedVaultsOutput, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerLikedVaults = (params: PaginationInput, initialLikes: GetLikedVaultsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { vaultLikes, setVaultLikes, appendVaultLikes } = useLikesStore();
  const [loading, setLoading] = useState<boolean>(initialLikes.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialLikes.length === params.take);
  const [skip, setSkip] = useState<number>(params.take ?? 20);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getLikedVaults({
        ...params,
        skip,
        take: params.take ?? 20,
        orderBy: params.orderBy ?? SortOrder.Desc
      });

      const fetchedLikes = (fetched ?? []) as GetLikedVaultsOutput[];
      setHasMore(fetchedLikes.length === (params.take ?? 20));
      appendVaultLikes(fetchedLikes);
      setSkip((prev) => prev + (params.take ?? 20));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading liked vaults! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLikes?.length > 0) {
      setVaultLikes(initialLikes);
    }
  }, [initialLikes, setVaultLikes]);

  return {
    vaultLikes,
    loading,
    hasMore,
    loadMore
  };
};
