'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GET_PUBLIC_POSTS_QUERY } from '@workspace/gql/api';
import { PaginationInput } from '@workspace/gql/generated/graphql';

export const usePostsActions = () => {
  const [getPosts] = useLazyQuery(GET_PUBLIC_POSTS_QUERY);

  const getPostsQuery = (input: PaginationInput) => {
    return getPosts({ variables: { input } });
  };
  return { getPostsQuery };
};
