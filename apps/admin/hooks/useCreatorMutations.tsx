'use client';

import { useCreatorsActions } from '@workspace/gql/actions';
import { CreatorApprovalStatus, UpdateCreatorApprovalStatusInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useState } from 'react';

export const useCreatorMutations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const { updateCreatorApprovalStatusMutation } = useCreatorsActions();

  const updateCreatorApprovalStatus = async (input: UpdateCreatorApprovalStatusInput) => {
    setLoading(true);
    let updatedStatus: CreatorApprovalStatus | null = null;
    try {
      const { data } = await updateCreatorApprovalStatusMutation(input);
      updatedStatus = data?.updateCreatorApprovalStatus as CreatorApprovalStatus;
      successHandler({ message: 'Creator approval status updated successfully', description: updatedStatus });
      return updatedStatus;
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
    return updatedStatus;
  };

  return {
    updateCreatorApprovalStatus,
    loading
  };
};
