'use client';

import { useMutation } from '@apollo/client/react';
import { DELETE_USER_MUTATION } from '@workspace/gql/api';

export const useUserActions = () => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const deleteUserMutation = () => {
    return deleteUser();
  };

  return {
    deleteUserMutation
  };
};
