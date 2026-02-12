'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_FAN_ASSETS_QUERY } from '@workspace/gql/api/assetsAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getFanAssets(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_FAN_ASSETS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getFanAssets || [];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetFanAssets' });
    return [];
  }
}
