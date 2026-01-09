'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import { FOLLOW_CREATOR_MUTATION, GET_FOLLOWING_QUERY, UNFOLLOW_CREATOR_MUTATION } from '@workspace/gql/api';
import { FollowCreatorInput, PaginationInput, UnFollowCreatorInput } from '@workspace/gql/generated/graphql';

export const useFollowsActions = () => {
  const [getFollowing] = useLazyQuery(GET_FOLLOWING_QUERY);
  const [followACreator] = useMutation(FOLLOW_CREATOR_MUTATION);
  const [unFollowACreator] = useMutation(UNFOLLOW_CREATOR_MUTATION);

  const getFanFollowingsQuery = (input: PaginationInput) => {
    return getFollowing({ variables: { input } });
  };

  const followCreatorMutation = (input: FollowCreatorInput) => {
    return followACreator({ variables: { input } });
  };

  const unFollowCreatorMutation = (input: UnFollowCreatorInput) => {
    return unFollowACreator({ variables: { input } });
  };

  return { getFanFollowingsQuery, unFollowCreatorMutation, followCreatorMutation };
};
