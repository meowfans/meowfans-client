'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GET_PUBLIC_VAULT_OBJECTS_BY_VAULT_ID_QUERY, GET_PUBLIC_VAULTS_QUERY } from '@workspace/gql/api';
import { PaginationInput } from '@workspace/gql/generated/graphql';

export const useVaultsActions = () => {
  const [getPublicVaults] = useLazyQuery(GET_PUBLIC_VAULTS_QUERY);
  const [getVaultObjectsByVaultId] = useLazyQuery(GET_PUBLIC_VAULT_OBJECTS_BY_VAULT_ID_QUERY);

  const getPublicVaultsQuery = (input: PaginationInput) => {
    return getPublicVaults({ variables: { input } });
  };

  const getVaultObjectsQueryByVaultId = (input: PaginationInput) => {
    return getVaultObjectsByVaultId({ variables: { input } });
  };

  return { getPublicVaultsQuery, getVaultObjectsQueryByVaultId };
};
