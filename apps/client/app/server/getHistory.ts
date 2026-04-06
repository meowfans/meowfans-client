'use server';

import { configService } from '@/util/config';
import { GET_WATCH_HISTORY_QUERY } from '@workspace/gql/api/historyAPI';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { PaginationInput, UserRoles, WatchHistoryEntity } from '@workspace/gql/generated/graphql';
import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getHistory(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_WATCH_HISTORY_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return (data?.getWatchHistory || []) as WatchHistoryEntity[];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetHistory' });
    return [];
  }
}
