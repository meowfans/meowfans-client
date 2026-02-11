'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_LIKED_VAULT_OBJECTS_QUERY } from '@workspace/gql/api/vaultsAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getLikedVaultObjects(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_LIKED_VAULT_OBJECTS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getLikedVaultObjects || [];
  } catch (error) {
    console.error('Error in getLikedVaultObjects:', error);
    return [];
  }
}
