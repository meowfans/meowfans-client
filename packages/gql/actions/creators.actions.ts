'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GET_CREATORS_BY_ADMIN_QUERY, GET_DEFAULT_CREATORS_QUERY } from '@workspace/gql/api';
import { PaginationInput } from '@workspace/gql/generated/graphql';

export const useCreatorsActions = () => {
  const [getDefaultCreators] = useLazyQuery(GET_DEFAULT_CREATORS_QUERY);
  const [getAllCreators] = useLazyQuery(GET_CREATORS_BY_ADMIN_QUERY);

  const getCreatorsByAdminQuery = (input: PaginationInput) => {
    return getAllCreators({ variables: { input } });
  };

  const publicGetDefaultCreatorsQuery = (input: PaginationInput) => {
    return getDefaultCreators({ variables: { input } });
  };

  return { publicGetDefaultCreatorsQuery, getCreatorsByAdminQuery };
};
