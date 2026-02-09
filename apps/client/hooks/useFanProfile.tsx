'use client';

import { useFanActions } from '@workspace/gql/actions';
import { FanProfilesEntity, UpdateUserProfileInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useState } from 'react';
import { useFan } from './context/UserContextWrapper';

export const useFanProfile = () => {
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const { updateFanProfileMutation } = useFanActions();
  const { setFan } = useFan();
  const [loading, setLoading] = useState<boolean>(false);

  const updateProfile = async (input: UpdateUserProfileInput) => {
    setLoading(true);
    try {
      const { data } = await updateFanProfileMutation(input);
      if (data?.updateFanProfile) {
        setFan(data.updateFanProfile as FanProfilesEntity);
        successHandler({ message: 'Profile updated successfully! ✨' });
        return true;
      }
    } catch (error) {
      errorHandler({ error, msg: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
    return false;
  };

  return {
    updateProfile,
    loading
  };
};
