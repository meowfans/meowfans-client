import { useLazyQuery, useMutation } from '@apollo/client/react';
import { DELETE_WATCH_HISTORY_MUTATION, GET_WATCH_HISTORY_QUERY } from '../api/historyAPI';
import { DeleteWatchHistoryInput, PaginationInput } from '../generated/graphql';

export const useHistoryActions = () => {
  const [deleteWatchHistory] = useMutation(DELETE_WATCH_HISTORY_MUTATION);
  const [getWatchHistory] = useLazyQuery(GET_WATCH_HISTORY_QUERY);

  const deleteHistoryMutation = (input: DeleteWatchHistoryInput) => {
    return deleteWatchHistory({ variables: { input } });
  };

  const getHistoryQuery = (input: PaginationInput) => {
    return getWatchHistory({ variables: { input } });
  };

  return {
    deleteHistoryMutation,
    getHistoryQuery
  };
};
