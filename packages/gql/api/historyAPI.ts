import { graphql } from '../generated';

export const GET_WATCH_HISTORY_QUERY = graphql(`
  query GetWatchHistory($input: PaginationInput!) {
    getWatchHistory(input: $input) {
      id
      userId
      type
      entityId
      createdAt
      deletedAt
    }
  }
`);

export const DELETE_WATCH_HISTORY_MUTATION = graphql(`
  mutation DeleteWatchHistory($input: DeleteWatchHistoryInput!) {
    deleteWatchHistory(input: $input)
  }
`);
