import { useLazyQuery, useMutation } from '@apollo/client/react';
import { GET_FAN_PROFILE_QUERY, UPDATE_FAN_PROFILE_MUTATION } from '../api';
import { UpdateUserProfileInput } from '../generated/graphql';

export const useFanActions = () => {
  const [getFanProfile] = useLazyQuery(GET_FAN_PROFILE_QUERY);
  const [updateFanProfile] = useMutation(UPDATE_FAN_PROFILE_MUTATION);

  const getFanProfileQuery = () => {
    return getFanProfile();
  };

  const updateFanProfileMutation = (input: UpdateUserProfileInput) => {
    return updateFanProfile({ variables: { input } });
  };

  return {
    getFanProfileQuery,
    updateFanProfileMutation
  };
};
