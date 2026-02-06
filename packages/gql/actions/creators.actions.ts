'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  GET_CREATORS_BY_ADMIN_QUERY,
  GET_DEFAULT_CREATORS_QUERY,
  GET_USER_QUERY,
  SUBMIT_CREATOR_VERIFICATION_DETAILS_MUTATION,
  UPDATE_CREATOR_APPROVAL_STATUS_MUTATION,
  UPDATE_CREATOR_PROFILE_MUTATION
} from '@workspace/gql/api';
import { CreatorVerificationInput, PaginationInput, UpdateCreatorApprovalStatusInput, UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';

export const useCreatorsActions = () => {
  const [submitCreatorVerificationDetails] = useMutation(SUBMIT_CREATOR_VERIFICATION_DETAILS_MUTATION);
  const [updateCreatorApprovalStatus] = useMutation(UPDATE_CREATOR_APPROVAL_STATUS_MUTATION);
  const [updateCreatorProfile] = useMutation(UPDATE_CREATOR_PROFILE_MUTATION);
  const [getDefaultCreators] = useLazyQuery(GET_DEFAULT_CREATORS_QUERY);
  const [getAllCreators] = useLazyQuery(GET_CREATORS_BY_ADMIN_QUERY);
  const [getUser] = useLazyQuery(GET_USER_QUERY);

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

  const submitCreatorVerificationDetailsMutation = (input: CreatorVerificationInput) => {
    return submitCreatorVerificationDetails({ variables: { input } });
  };

  const updateCreatorApprovalStatusMutation = (input: UpdateCreatorApprovalStatusInput) => {
    return updateCreatorApprovalStatus({ variables: { input } });
  };

  return {
    submitCreatorVerificationDetailsMutation,
    updateCreatorApprovalStatusMutation,
    publicGetDefaultCreatorsQuery,
    updateCreatorProfileMutation,
    getCreatorsByAdminQuery,
    getUserQuery,
  };
};
