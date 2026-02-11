'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_CREATOR_POSTS_QUERY } from '@workspace/gql/api/postsAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getPublicCreatorPosts(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_CREATOR_POSTS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });

    return data?.getPublicCreatorPosts || [];
  } catch (error) {
    console.error('Error fetching creator posts:', error);
    return [];
  }
}
