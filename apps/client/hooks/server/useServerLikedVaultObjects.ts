'use client';

import { getLikedVaultObjects } from '@/app/server/getLikedVaultObjects';
import { useLikesStore } from '@/hooks/store/likes.store';
import { GetLikedVaultObjectsOutput, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerLikedVaultObjects = (params: PaginationInput, initialLikes: GetLikedVaultObjectsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { vaultObjectLikes, setVaultObjectLikes, appendVaultObjectLikes } = useLikesStore();
  const [loading, setLoading] = useState<boolean>(initialLikes.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialLikes.length === params.take);
  const [skip, setSkip] = useState<number>(params.take ?? 20);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getLikedVaultObjects({
        ...params,
        skip,
        take: params.take ?? 20,
        orderBy: params.orderBy ?? SortOrder.Desc
      });

      const fetchedLikes = (fetched ?? []) as GetLikedVaultObjectsOutput[];
      setHasMore(fetchedLikes.length === (params.take ?? 20));
      appendVaultObjectLikes(fetchedLikes);
      setSkip((prev) => prev + (params.take ?? 20));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading liked pictures! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLikes?.length > 0) {
      setVaultObjectLikes(initialLikes);
    }
  }, [initialLikes, setVaultObjectLikes]);

  return {
    vaultObjectLikes,
    loading,
    hasMore,
    loadMore
  };
};
