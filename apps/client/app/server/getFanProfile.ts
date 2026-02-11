'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_FAN_PROFILE_QUERY } from '@workspace/gql/api/fanAPI';
import { UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getFanProfile() {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_FAN_PROFILE_QUERY,
      fetchPolicy: 'no-cache'
    });
    return data?.getFanProfile || null;
  } catch (error) {
    console.error('Error in getFanProfile:', error);
    return null;
  }
}
