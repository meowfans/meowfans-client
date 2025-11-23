'use client';

import { GET_FAN_ASSETS_QUERY, GET_PUBLIC_CREATOR_ASSETS_QUERY, GET_PUBLIC_SHORTS_QUERY } from '@workspace/gql/api/assetsAPI';
import { GET_PUBLIC_POST_ASSETS_QUERY } from '@workspace/gql/api/postsAPI';
import { PaginationInput } from '@workspace/gql/generated/graphql';
import { useLazyQuery } from '@apollo/client/react';

export const useAssetsActions = () => {
  const [getFanAssets] = useLazyQuery(GET_FAN_ASSETS_QUERY);
  const [getPostAssets] = useLazyQuery(GET_PUBLIC_POST_ASSETS_QUERY);
  const [getVaultAssets] = useLazyQuery(GET_PUBLIC_CREATOR_ASSETS_QUERY);
  const [getPublicShortsAssets] = useLazyQuery(GET_PUBLIC_SHORTS_QUERY);

  const publicGetVaultAssetsQuery = (input: PaginationInput) => {
    return getVaultAssets({ variables: { input } });
  };

  const publicGetPostAssetsQuery = (input: PaginationInput) => {
    return getPostAssets({ variables: { input } });
  };

  const privateGetFanAssetsQuery = (input: PaginationInput) => {
    return getFanAssets({ variables: { input } });
  };

  const publicGetShortsQuery = (input: PaginationInput) => {
    return getPublicShortsAssets({ variables: { input } });
  };

  return { publicGetPostAssetsQuery, privateGetFanAssetsQuery, publicGetVaultAssetsQuery, publicGetShortsQuery };
};
