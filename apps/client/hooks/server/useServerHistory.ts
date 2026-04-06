import { getHistory } from '@/app/server/getHistory';
import { PaginationInput, WatchHistoryEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useHistoryStore } from '../store/history.store';

export const useServerHistory = (params: PaginationInput, initialHistory: WatchHistoryEntity[]) => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(!initialHistory.length);
  const [hasMore, setHasMore] = useState<boolean>(initialHistory.length === (params.take ?? 20));
  const [skip, setSkip] = useState<number>(params.take ?? 20);
  const { history, setHistory } = useHistoryStore();

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getHistory({
        offset: skip,
        take: params.take ?? 20
      });

      const fetchedHistory = (fetched ?? []) as WatchHistoryEntity[];
      setHistory((prev) => [...prev, ...fetchedHistory]);
      setSkip((prev) => prev + (params.take ?? 20));
      setHasMore(fetchedHistory.length === (params.take ?? 20));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading history! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialHistory.length) {
      setHistory(initialHistory);
    }
  }, [initialHistory, setHistory]);

  return {
    history,
    loading,
    hasMore,
    loadMore
  };
};
