'use client';

import { getFollowings } from '@/app/server/getFollowings';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useFollowingStore } from '@/hooks/store/follows.store';
import { GetFollowingOutput, PaginationInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerGetFollowings = (params: PaginationInput, initialFollowings: GetFollowingOutput[]) => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { followings, setFollowings } = useFollowingStore();
  const [loading, setLoading] = useState<boolean>(initialFollowings.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialFollowings.length === (params.take ?? 30));
  const [skip, setSkip] = useState<number>(initialFollowings.length);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const fetched = await getFollowings({
        ...params,
        skip,
        take: params.take ?? 30
      });

      const fetchedFollowings = (fetched ?? []) as GetFollowingOutput[];
      setHasMore(fetchedFollowings.length === (params.take ?? 30));
      setFollowings((prev) => [...prev, ...fetchedFollowings]);
      setSkip((prev) => prev + (params.take ?? 30));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading following list! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFollowings?.length > 0) {
      setFollowings(initialFollowings);
      setSkip(initialFollowings.length);
    }
  }, [initialFollowings, setFollowings]);

  if (!fan)
    return {
      followings: [],
      loading: false,
      hasMore: false,
      loadMore: () => {}
    };

  return {
    followings,
    loading,
    hasMore,
    loadMore
  };
};
