'use client';

import { getCreators } from '@/app/server/getCreators';
import { useCreatorsStore } from '@/hooks/store/users.store';
import { CreatorType, DataFetchType, GetDefaultCreatorsOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerCreators = (params: PaginationInput, initialCreators: GetDefaultCreatorsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const [loading, setLoading] = useState<boolean>(initialCreators.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialCreators.length === (params.take ?? 40));
  const [skip, setSkip] = useState<number>(params.take ?? 40);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetchedCreators = await getCreators({
        ...params,
        skip,
        take: params.take ?? 40,
        sortBy: params.sortBy ?? SortBy.UserCreatedAt,
        orderBy: params.orderBy ?? SortOrder.Desc,
        creatorType: Object.values(CreatorType),
        dataFetchType: DataFetchType.InfiniteScroll
      });

      setHasMore(fetchedCreators.length === (params.take ?? 40));
      setCreators((prev) => [...prev, ...fetchedCreators]);
      setSkip((prev) => prev + (params.take ?? 40));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading creators! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCreators?.length > 0) {
      setCreators(initialCreators);
    }
  }, [initialCreators, setCreators]);

  return {
    creators,
    loading,
    hasMore,
    loadMore,
    isEmpty: !creators.length && !loading
  };
};

export const useCreatorsServer = ({
  sortBy = SortBy.UserCreatedAt,
  take = 40,
  orderBy = SortOrder.Desc,
  enabled = true,
  ...params
}: PaginationInput & { enabled?: boolean }) => {
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const [loading, setLoading] = useState<boolean>(enabled);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadCreators = async (initialLoad = false) => {
    if (!enabled) return;
    const skip = initialLoad ? 0 : creators.length;
    setLoading(creators.length === 0);
    try {
      const data = await getCreators({
        take,
        skip,
        sortBy,
        orderBy,
        ...params,
        creatorType: Object.values(CreatorType),
        dataFetchType: DataFetchType.InfiniteScroll
      });

      const fetchedCreators = (data ?? []) as GetDefaultCreatorsOutput[];

      setHasMore(fetchedCreators.length === take);

      if (initialLoad) setCreators(fetchedCreators);
      else setCreators([...creators, ...fetchedCreators]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) loadCreators();
  };

  const refresh = () => {
    setCreators([]);
    loadCreators(true);
  };

  useEffect(() => {
    if (enabled) {
      loadCreators(true);
    }
  }, [sortBy, orderBy, enabled, params.searchTerm]); //eslint-disable-line

  return { creators, loading, hasMore, loadMore, refresh, isEmpty: creators.length === 0 };
};
