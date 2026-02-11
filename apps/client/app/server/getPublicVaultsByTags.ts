'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_VAULTS_BY_TAGS_QUERY } from '@workspace/gql/api/vaultsAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getPublicVaultsByTags(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_VAULTS_BY_TAGS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });

    return data?.getPublicVaultsByTags || [];
  } catch (error) {
    console.error('Error fetching vaults by tags:', error);
    return [];
  }
}
