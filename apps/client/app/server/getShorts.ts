'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_SHORTS_ASSETS_QUERY } from '@workspace/gql/api/assetsAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getShorts(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_SHORTS_ASSETS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getPublicShortsAssets || [];
  } catch (error) {
    console.error('Error in getShorts:', error);
    return [];
  }
}
