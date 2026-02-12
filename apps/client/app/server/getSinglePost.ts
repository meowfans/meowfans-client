'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_SINGLE_POST_QUERY } from '@workspace/gql/api/postsAPI';
import { GetPostInput, GetPublicSinglePostOutput, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getSinglePost(input: GetPostInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_SINGLE_POST_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return (data?.getPublicSinglePost as GetPublicSinglePostOutput) ?? null;
  } catch (error) {
    serverErrorHandler({ error, context: 'GetSinglePost' });
    return null;
  }
}
