'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_SINGLE_VAULT_QUERY } from '@workspace/gql/api/vaultsAPI';
import { GetPublicSingleVaultOutput, PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getSingleVault(input: PaginationInput): Promise<GetPublicSingleVaultOutput | null> {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_SINGLE_VAULT_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getPublicSingleVault as GetPublicSingleVaultOutput;
  } catch (error) {
    serverErrorHandler({ error, context: 'GetSingleVault' });
    return null;
  }
}
