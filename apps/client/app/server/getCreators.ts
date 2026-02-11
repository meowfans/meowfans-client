'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_DEFAULT_CREATORS_QUERY } from '@workspace/gql/api/creatorAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getCreators(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_DEFAULT_CREATORS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getDefaultCreators || [];
  } catch (error) {
    console.error('Error in getCreators:', error);
    return [];
  }
}
