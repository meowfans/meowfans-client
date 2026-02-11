'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getPublicCreatorProfile(username: string) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_CREATOR_PROFILE_QUERY,
      variables: { username },
      fetchPolicy: 'no-cache'
    });
    return data?.getPublicCreatorProfile || null;
  } catch (error) {
    console.error('Error in getPublicCreatorProfile:', error);
    return null;
  }
}
