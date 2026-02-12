'use client';

import { useLazyQuery } from '@apollo/client/react';
import {
  GET_RECOMMENDED_CREATORS_QUERY,
  GET_RECOMMENDED_POSTS_QUERY,
  GET_RECOMMENDED_VAULTS_QUERY
} from '@workspace/gql/api/recommendationsAPI';
import { GetRecommendationsInput } from '@workspace/gql/generated/graphql';

export const useRecommendationsActions = () => {
  const [getRecommendedCreators] = useLazyQuery(GET_RECOMMENDED_CREATORS_QUERY);
  const [getRecommendedPosts] = useLazyQuery(GET_RECOMMENDED_POSTS_QUERY);
  const [getRecommendedVaults] = useLazyQuery(GET_RECOMMENDED_VAULTS_QUERY);

  const getRecommendedCreatorsQuery = (input: GetRecommendationsInput) => {
    return getRecommendedCreators({ variables: { input } });
  };

  const getRecommendedPostsQuery = (input: GetRecommendationsInput) => {
    return getRecommendedPosts({ variables: { input } });
  };

  const getRecommendedVaultsQuery = (input: GetRecommendationsInput) => {
    return getRecommendedVaults({ variables: { input } });
  };

  return {
    getRecommendedCreatorsQuery,
    getRecommendedPostsQuery,
    getRecommendedVaultsQuery
  };
};
