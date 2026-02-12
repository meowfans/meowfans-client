'use client';

import { useRecommendationsActions } from '@workspace/gql/actions';
import { CreatorProfilesEntity, GetRecommendationsInput, PostsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useState } from 'react';

export const useRecommendations = () => {
  const { errorHandler } = useErrorHandler();
  const { getRecommendedCreatorsQuery, getRecommendedPostsQuery, getRecommendedVaultsQuery } = useRecommendationsActions();

  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecommendedCreators = async (input: GetRecommendationsInput) => {
    setLoading(true);
    try {
      const { data } = await getRecommendedCreatorsQuery(input);
      return (data?.getRecommendedCreators ?? []) as CreatorProfilesEntity[];
    } catch (error) {
      errorHandler({ error });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedPosts = async (input: GetRecommendationsInput) => {
    setLoading(true);
    try {
      const { data } = await getRecommendedPostsQuery(input);
      return (data?.getRecommendedPosts ?? []) as PostsEntity[];
    } catch (error) {
      errorHandler({ error });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedVaults = async (input: GetRecommendationsInput) => {
    setLoading(true);
    try {
      const { data } = await getRecommendedVaultsQuery(input);
      return (data?.getRecommendedVaults ?? []) as VaultsEntity[];
    } catch (error) {
      errorHandler({ error });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchRecommendedCreators,
    fetchRecommendedPosts,
    fetchRecommendedVaults
  };
};
