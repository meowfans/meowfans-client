'use client';

import { GET_TAGS_QUERY, SEARCH_TAGS_QUERY } from '@workspace/gql/api/tagsAPI';
import { PaginationInput } from '@workspace/gql/generated/graphql';
import { useLazyQuery } from '@apollo/client/react';

export const useTagsActions = () => {
  const [getTags] = useLazyQuery(GET_TAGS_QUERY);
  const [getSearchedTags] = useLazyQuery(SEARCH_TAGS_QUERY);

  const getTagsQuery = (input: PaginationInput) => {
    return getTags({ variables: { input } });
  };

  const getSearchedTagsQuery = (input: PaginationInput) => {
    return getSearchedTags({ variables: { input } });
  };
  return { getTagsQuery, getSearchedTagsQuery };
};
