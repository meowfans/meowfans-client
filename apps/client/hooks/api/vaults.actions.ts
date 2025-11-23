'use client';

import { GET_PUBLIC_VAULT_OBJECTS_BY_VAULT_ID_QUERY, GET_PUBLIC_VAULTS_QUERY } from '@workspace/gql/api/vaultsAPI';
import { PaginationInput } from '@workspace/gql/generated/graphql';
import { useLazyQuery } from '@apollo/client/react';

export const useVaultsActions = () => {
  const [getVaults] = useLazyQuery(GET_PUBLIC_VAULTS_QUERY);
  const [getVaultObjects] = useLazyQuery(GET_PUBLIC_VAULT_OBJECTS_BY_VAULT_ID_QUERY);

  const getVaultsQuery = (input: PaginationInput) => {
    return getVaults({ variables: { input } });
  };

  const getVaultObjectsQuery = (input: PaginationInput) => {
    return getVaultObjects({ variables: { input } });
  };

  return { getVaultsQuery, getVaultObjectsQuery };
};
