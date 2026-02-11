'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_FOLLOWING_QUERY } from '@workspace/gql/api/creatorAPI';
import { GetFollowingOutput, PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getFollowings(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_FOLLOWING_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return (data?.getFollowing || []) as GetFollowingOutput[];
  } catch (error) {
    console.error('Error in getFollowings:', error);
    return [];
  }
}
