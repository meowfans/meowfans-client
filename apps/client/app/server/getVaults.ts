'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_VAULTS_QUERY } from '@workspace/gql/api/vaultsAPI';
import { PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getVaults(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_VAULTS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });

    return data?.getPublicVaults || [];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetVaults' });
    return [];
  }
}
