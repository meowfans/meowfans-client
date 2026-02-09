import { graphql } from '../generated';

export const CREATE_REPORT_MUTATION = graphql(`
  mutation CreateReport($input: CreateReportInput!) {
    createReport(input: $input) {
      id
      reason
      status
      createdAt
    }
  }
`);

export const RESOLVE_REPORT_MUTATION = graphql(`
  mutation ResolveReport($input: ResolveReportInput!) {
    resolveReport(input: $input) {
      id
      resolveMessage
      status
      resolvedAt
    }
  }
`);

export const GET_REPORTS_QUERY = graphql(`
  query GetReports($input: PaginationInput!) {
    getReports(input: $input) {
      id
      reason
      status
      resolveMessage
      createdAt
      resolvedAt
    }
  }
`);

export const GET_REPORT_QUERY = graphql(`
  query GetReport($reportId: String!) {
    getSingleReport(reportId: $reportId) {
      id
      reason
      status
      resolveMessage
      createdAt
      resolvedAt
    }
  }
`);
