'use client';

import { useHistoryActions } from '@workspace/gql/actions';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useState } from 'react';
import { useHistoryStore } from '../store/history.store';

export const useHistoryMutations = () => {
  const { errorHandler } = useErrorHandler();
  const { deleteHistory } = useHistoryStore();
  const { deleteHistoryMutation } = useHistoryActions();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteWatchHistory = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await deleteHistoryMutation({ watchId: id });
      if (data?.deleteWatchHistory) {
        deleteHistory(id);
      }
    } catch (error) {
      errorHandler({ error, msg: 'Error deleting history! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteWatchHistory
  };
};
