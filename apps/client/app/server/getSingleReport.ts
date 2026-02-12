'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_REPORT_QUERY } from '@workspace/gql/api/reportsAPI';
import { ReportsEntity, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getSingleReport(reportId: string) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_REPORT_QUERY,
      variables: { reportId },
      fetchPolicy: 'no-cache'
    });
    return (data?.getSingleReport as ReportsEntity) ?? null;
  } catch (error) {
    serverErrorHandler({ error, context: 'GetSingleReport' });
    return null;
  }
}
