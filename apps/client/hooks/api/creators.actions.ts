'use client';

import { GET_DEFAULT_CREATORS_QUERY } from '@workspace/gql/api/creatorAPI';
import { PaginationInput } from '@workspace/gql/generated/graphql';
import { useLazyQuery } from '@apollo/client/react';

export const useCreatorsActions = () => {
  const [getAllCreators] = useLazyQuery(GET_DEFAULT_CREATORS_QUERY);

  const publicGetAllCreatorsQuery = (input: PaginationInput) => {
    return getAllCreators({ variables: { input } });
  };

  return { publicGetAllCreatorsQuery };
};
