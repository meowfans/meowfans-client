import { useCreatorsActions, useUserActions } from '@workspace/gql/actions';
import {
  CreatorApprovalStatus,
  CreatorProfilesEntity,
  CreatorVerificationInput,
  UpdateCreatorProfileInput
} from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCreator } from './context/useCreator';

export const useCreatorMutations = () => {
  const { creator, setCreator } = useCreator();
  const { errorHandler } = useErrorHandler();
  const { updateCreatorProfileMutation, submitCreatorVerificationDetailsMutation } = useCreatorsActions();
  const { deleteUserMutation } = useUserActions();
  const [loading, setLoading] = useState<boolean>(false);

  const updateCreator = async (input: UpdateCreatorProfileInput) => {
    setLoading(true);
    try {
      const { data } = await updateCreatorProfileMutation(input);
      const updatedProfile = data?.updateCreatorProfile as CreatorProfilesEntity;

      if (updatedProfile) {
        setCreator({ ...creator, ...updatedProfile });
        toast.success('Updated your profile', {
          description: 'Happy to help'
        });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const submitCreatorVerificationDetails = async (input: CreatorVerificationInput) => {
    setLoading(true);
    try {
      const { data } = await submitCreatorVerificationDetailsMutation(input);
      const updatedProfile = data?.submitCreatorVerificationDetails as CreatorApprovalStatus;
      if (updatedProfile === CreatorApprovalStatus.Requested) {
        setCreator((prev) => ({ ...prev, status: CreatorApprovalStatus.Requested }));
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      await deleteUserMutation();
      toast.success('Your account has been deleted');
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { updateCreator, loading, submitCreatorVerificationDetails, deleteAccount };
};
