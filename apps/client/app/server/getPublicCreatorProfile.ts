'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export const getPublicCreatorProfile = async (userId: string) => {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_PUBLIC_CREATOR_PROFILE_QUERY,
      variables: { input: { userId } },
      fetchPolicy: 'no-cache'
    });
    return data?.getPublicCreatorProfile || null;
  } catch (error) {
    serverErrorHandler({ error, context: 'GetPublicCreatorProfile' });
    return null;
  }
};
