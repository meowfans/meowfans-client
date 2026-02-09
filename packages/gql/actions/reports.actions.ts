import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CREATE_REPORT_MUTATION, GET_REPORT_QUERY, GET_REPORTS_QUERY, RESOLVE_REPORT_MUTATION } from '../api/reportsAPI';
import { CreateReportInput, PaginationInput, ResolveReportInput } from '../generated/graphql';

export const useReportsActions = () => {
  const [getReports] = useLazyQuery(GET_REPORTS_QUERY);
  const [getSingleReport] = useLazyQuery(GET_REPORT_QUERY);
  const [createReport] = useMutation(CREATE_REPORT_MUTATION);
  const [resolveReport] = useMutation(RESOLVE_REPORT_MUTATION);

  const getReportsHandler = (input: PaginationInput) => {
    return getReports({ variables: { input } });
  };

  const getSingleReportHandler = (reportId: string) => {
    return getSingleReport({ variables: { reportId } });
  };

  const createReportHandler = (input: CreateReportInput) => {
    return createReport({ variables: { input } });
  };

  const resolveReportHandler = (input: ResolveReportInput) => {
    return resolveReport({ variables: { input } });
  };

  return {
    getReportsHandler,
    getSingleReportHandler,
    createReportHandler,
    resolveReportHandler
  };
};
