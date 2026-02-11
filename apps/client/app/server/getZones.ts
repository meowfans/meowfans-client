'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_ZONE_PLANS_QUERY } from '@workspace/gql/api/zonesAPI';
import { UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getZones() {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_ZONE_PLANS_QUERY,
      fetchPolicy: 'no-cache'
    });
    return data?.getZonePlans || [];
  } catch (error) {
    console.error('Error in getZones:', error);
    return [];
  }
}
