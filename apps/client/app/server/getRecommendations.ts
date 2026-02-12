'use server';

import { configService } from '@/util/config';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GET_RECOMMENDED_CREATORS_QUERY, GET_RECOMMENDED_POSTS_QUERY, GET_RECOMMENDED_VAULTS_QUERY } from '@workspace/gql/api';
import { GetRecommendationsInput, UserRoles } from '@workspace/gql/generated/graphql';
import { serverErrorHandler } from '@workspace/ui/hooks/server-error-handler';

const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan);

export const getRecommendedCreators = async (input: GetRecommendationsInput) => {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_RECOMMENDED_CREATORS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getRecommendedCreators ?? [];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetRecommendedCreators' });
    return [];
  }
};

export const getRecommendedPosts = async (input: GetRecommendationsInput) => {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_RECOMMENDED_POSTS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getRecommendedPosts ?? [];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetRecommendedPosts' });
    return [];
  }
};

export const getRecommendedVaults = async (input: GetRecommendationsInput) => {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: GET_RECOMMENDED_VAULTS_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache'
    });
    return data?.getRecommendedVaults ?? [];
  } catch (error) {
    serverErrorHandler({ error, context: 'GetRecommendedVaults' });
    return [];
  }
};
