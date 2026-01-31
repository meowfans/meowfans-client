'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GET_CREATOR_ASSETS_QUERY, GET_FAN_ASSETS_QUERY, GET_PUBLIC_SHORTS_ASSETS_QUERY } from '@workspace/gql/api';
import { PaginationInput } from '@workspace/gql/generated/graphql';

export const useAssetsActions = () => {
  const [getFanAssets] = useLazyQuery(GET_FAN_ASSETS_QUERY);
  const [getPublicShortsAssets] = useLazyQuery(GET_PUBLIC_SHORTS_ASSETS_QUERY);
  const [getCreatorAssets, { refetch: refetchCreatorAssets }] = useLazyQuery(GET_CREATOR_ASSETS_QUERY);

  const privateGetFanAssetsQuery = (input: PaginationInput) => {
    return getFanAssets({ variables: { input } });
  };

  const publicGetShortsQuery = (input: PaginationInput) => {
    return getPublicShortsAssets({ variables: { input } });
  };

  const getCreatorAssetsQuery = (input: PaginationInput) => {
    return getCreatorAssets({ variables: { input } });
  };

  return {
    privateGetFanAssetsQuery,
    publicGetShortsQuery,
    refetchCreatorAssets,
    getCreatorAssetsQuery
  };
};
