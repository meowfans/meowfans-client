'use client';

import { GET_PUBLIC_POSTS_QUERY } from '@workspace/gql/api/postsAPI';
import { PaginationInput } from '@workspace/gql/generated/graphql';
import { useLazyQuery } from '@apollo/client/react';

export const usePostsActions = () => {
  const [getPosts] = useLazyQuery(GET_PUBLIC_POSTS_QUERY);

  const getPostsQuery = (input: PaginationInput) => {
    return getPosts({ variables: { input } });
  };
  return { getPostsQuery };
};
