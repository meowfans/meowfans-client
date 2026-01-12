import { useCreatorsActions } from '@workspace/gql/actions';
import { CreatorProfilesEntity, UpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useState } from 'react';
import { useCreator } from './context/useCreator';
import { toast } from 'sonner';

export const useCreatorMutation = () => {
  const { creator, setCreator } = useCreator();
  const { errorHandler } = useErrorHandler();
  const { updateCreatorProfileMutation } = useCreatorsActions();
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

  return { updateCreator, loading };
};
