'use client';

import { getReports } from '@/app/server/getReports';
import { useReportsStore } from '@/hooks/store/reports.store';
import { PaginationInput, ReportsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerReports = (params: PaginationInput, initialReports: ReportsEntity[]) => {
  const { errorHandler } = useErrorHandler();
  const { reports, setReports } = useReportsStore();
  const [loading, setLoading] = useState<boolean>(initialReports.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialReports.length === params.take);
  const [skip, setSkip] = useState<number>(params.take ?? 10);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getReports({
        ...params,
        skip,
        take: params.take ?? 10
      });
      const fetchedReports = (fetched ?? []) as ReportsEntity[];

      setHasMore(fetchedReports.length === (params.take ?? 10));
      setReports((prev) => [...prev, ...fetchedReports]);
      setSkip((prev) => prev + (params.take ?? 10));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading reports! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialReports?.length > 0) {
      setReports(initialReports);
    }
  }, [initialReports, setReports]);

  return {
    reports,
    loading,
    hasMore,
    loadMore
  };
};
