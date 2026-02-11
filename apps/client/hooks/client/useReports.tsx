'use client';

import { useReportsActions } from '@workspace/gql/actions';
import { CreateReportInput, PaginationInput, ReportsEntity, ResolveReportInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useEffect, useState } from 'react';
import { useReportsStore } from '../store/reports.store';

export const useReports = (input: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { reports, setReports } = useReportsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { getReportsHandler } = useReportsActions();

  const loadReports = async (initialLoad: boolean = false) => {
    const skip = initialLoad ? 0 : reports.length;
    setLoading(reports.length === 0);
    try {
      const { data } = await getReportsHandler({ ...input, take: 10, skip });
      const fetched = (data?.getReports ?? []) as ReportsEntity[];

      setReports((prev) => (initialLoad ? fetched : [...prev, ...fetched]));
      setHasMore(fetched.length === input.take);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      loadReports();
    }
  };

  useEffect(() => {
    loadReports(true);
  }, [input.take, input.skip, input.reportStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loading,
    reports,
    loadMore,
    hasMore,
    refresh: () => loadReports(true)
  };
};

export const useReportMutations = () => {
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const { resolveReportHandler, createReportHandler } = useReportsActions();
  const [loading, setLoading] = useState<boolean>(false);
  const { setReports } = useReportsStore();

  const resolveReport = async (input: ResolveReportInput) => {
    setLoading(true);
    try {
      const { data } = await resolveReportHandler(input);
      if (data?.resolveReport) {
        successHandler({ message: 'Report resolved successfully' });
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (input: CreateReportInput) => {
    setLoading(true);
    try {
      const { data } = await createReportHandler(input);
      const newReport = data?.createReport as ReportsEntity;
      if (data?.createReport) {
        successHandler({ message: 'Report created successfully' });
        setReports((prev) => [newReport, ...prev]);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    resolveReport,
    createReport,
    loading
  };
};

export const useSingleReport = (id: string) => {
  const { errorHandler } = useErrorHandler();
  const { getSingleReportHandler } = useReportsActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [report, setReport] = useState<ReportsEntity | null>(null);

  const loadReport = async () => {
    setLoading(true);
    try {
      const { data } = await getSingleReportHandler(id);
      const fetched = data?.getSingleReport as ReportsEntity;
      setReport(fetched);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loading,
    report
  };
};
