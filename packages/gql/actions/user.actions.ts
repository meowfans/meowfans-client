'use client';

import { useMutation } from '@apollo/client/react';
import { DELETE_USER_MUTATION, UPDATE_ALL_CREATOR_PROFILES_MUTATION } from '@workspace/gql/api';

export const useUserActions = () => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [updateAllCreatorProfiles] = useMutation(UPDATE_ALL_CREATOR_PROFILES_MUTATION);

  const updateAllCreatorProfilesMutation = () => {
    return updateAllCreatorProfiles();
  };

  const deleteUserMutation = () => {
    return deleteUser();
  };

  return {
    deleteUserMutation,
    updateAllCreatorProfilesMutation
  };
};
