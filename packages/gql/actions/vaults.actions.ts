'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GET_PUBLIC_SINGLE_VAULT_QUERY, GET_PUBLIC_VAULT_OBJECTS_QUERY, GET_PUBLIC_VAULTS_QUERY } from '@workspace/gql/api';
import { PaginationInput } from '@workspace/gql/generated/graphql';

export const useVaultsActions = () => {
  const [getPublicVaultObjects] = useLazyQuery(GET_PUBLIC_VAULT_OBJECTS_QUERY);
  const [getPublicVaults] = useLazyQuery(GET_PUBLIC_VAULTS_QUERY);
  const [getSingleVault] = useLazyQuery(GET_PUBLIC_SINGLE_VAULT_QUERY);

  const getPublicVaultsQuery = (input: PaginationInput) => {
    return getPublicVaults({ variables: { input } });
  };

  const getSingleVaultQuery = (input: PaginationInput) => {
    return getSingleVault({ variables: { input } });
  };

  const getPublicVaultObjectsQuery = (input: PaginationInput) => {
    return getPublicVaultObjects({ variables: { input } });
  };

  return { getPublicVaultsQuery, getSingleVaultQuery, getPublicVaultObjectsQuery };
};
