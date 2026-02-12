'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_REPORTS_QUERY } from '@workspace/gql/api/reportsAPI';
import { PaginationInput, ReportsEntity, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getReports(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_REPORTS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return (data?.getReports || []) as ReportsEntity[];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetReports' });
    return [];
  }
}
