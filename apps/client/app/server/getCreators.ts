'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_CREATORS_QUERY } from '@workspace/gql/api/creatorAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';
import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getCreators(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_CREATORS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getPublicCreators || [];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetCreators' });
    return [];
  }
}
