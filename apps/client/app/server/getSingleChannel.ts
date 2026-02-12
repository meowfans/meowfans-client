'use server';

import { configService } from '@/util/config';
import { GET_SINGLE_CHANNEL_QUERY } from '@workspace/gql/api/messagesAPI';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { ChannelsOutput, PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getSingleChannel(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_SINGLE_CHANNEL_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getSingleChannel as ChannelsOutput;
  } catch (error) {
    serverErrorHandler({ error, context: 'GetSingleChannel' });
    return null;
  }
}
