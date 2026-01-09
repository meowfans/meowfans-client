'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GET_PUBLIC_TAGS_QUERY, SEARCH_TAGS_QUERY } from '@workspace/gql/api';
import { PaginationInput } from '@workspace/gql/generated/graphql';

export const useTagsActions = () => {
  const [getPublicTags] = useLazyQuery(GET_PUBLIC_TAGS_QUERY);
  const [getSearchedTags] = useLazyQuery(SEARCH_TAGS_QUERY);

  const getPublicTagsQuery = (input: PaginationInput) => {
    return getPublicTags({ variables: { input } });
  };

  const getSearchedTagsQuery = (input: PaginationInput) => {
    return getSearchedTags({ variables: { input } });
  };
  return { getPublicTagsQuery, getSearchedTagsQuery };
};
