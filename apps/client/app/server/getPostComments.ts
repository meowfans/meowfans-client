'use server';

import { configService } from '@/util/config';
import { GET_PUBLIC_POST_COMMENTS_BY_POST_ID_QUERY } from '@workspace/gql/api';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getPostComments(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_POST_COMMENTS_BY_POST_ID_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getPublicPostCommentsByPostId || [];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetPostComments' });
    return [];
  }
}
