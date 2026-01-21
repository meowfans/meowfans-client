'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  GET_CREATORS_BY_ADMIN_QUERY,
  GET_DEFAULT_CREATORS_QUERY,
  GET_USER_QUERY,
  UPDATE_CREATOR_PROFILE_MUTATION
} from '@workspace/gql/api';
import { PaginationInput, UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';

export const useCreatorsActions = () => {
  const [getDefaultCreators] = useLazyQuery(GET_DEFAULT_CREATORS_QUERY);
  const [getAllCreators] = useLazyQuery(GET_CREATORS_BY_ADMIN_QUERY);
  const [getUser] = useLazyQuery(GET_USER_QUERY);
  const [updateCreatorProfile] = useMutation(UPDATE_CREATOR_PROFILE_MUTATION);

  const getCreatorsByAdminQuery = (input: PaginationInput) => {
    return getAllCreators({ variables: { input } });
  };

  const getUserQuery = (username: string) => {
    return getUser({ variables: { username } });
  };

  const publicGetDefaultCreatorsQuery = (input: PaginationInput) => {
    return getDefaultCreators({ variables: { input } });
  };

  const updateCreatorProfileMutation = (input: UpdateCreatorProfileInput) => {
    return updateCreatorProfile({ variables: { input } });
  };

  return { publicGetDefaultCreatorsQuery, getCreatorsByAdminQuery, updateCreatorProfileMutation, getUserQuery };
};
