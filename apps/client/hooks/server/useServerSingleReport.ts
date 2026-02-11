'use client';

import { getSingleReport } from '@/app/server/getSingleReport';
import { ReportsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerSingleReport = (id: string, initialReport: ReportsEntity | null) => {
  const { errorHandler } = useErrorHandler();
  const [report, setReport] = useState<ReportsEntity | null>(initialReport);
  const [loading, setLoading] = useState<boolean>(!initialReport);

  const loadReport = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getSingleReport(id);
      if (data) {
        setReport(data as ReportsEntity);
      }
    } catch (error) {
      errorHandler({ error, msg: 'Error loading report! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialReport) {
      setReport(initialReport);
    }
  }, [initialReport]);

  return {
    report,
    loading,
    loadReport
  };
};
