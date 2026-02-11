'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_CHANNELS_QUERY } from '@workspace/gql/api/channelsAPI';
import { ChannelsOutput, PaginationInput, UserRoles } from '@workspace/gql/generated/graphql';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export async function getChannels(input: PaginationInput) {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_CHANNELS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return (data?.getChannels || []) as ChannelsOutput[];
  } catch (error) {
    console.error('Error in getChannels:', error);
    return [];
  }
}
