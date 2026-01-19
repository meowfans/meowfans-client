'use client';

import { useLazyQuery } from '@apollo/client/react';
import {
  GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE_QUERY,
  GET_CREATOR_VAULT_OBJECTS_QUERY,
  GET_PUBLIC_SINGLE_VAULT_QUERY,
  GET_PUBLIC_VAULT_OBJECTS_QUERY,
  GET_PUBLIC_VAULTS_QUERY,
  GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY
} from '@workspace/gql/api';
import { PaginationInput } from '@workspace/gql/generated/graphql';

export const useVaultsActions = () => {
  const [getPublicVaultObjects] = useLazyQuery(GET_PUBLIC_VAULT_OBJECTS_QUERY);
  const [getPublicVaults] = useLazyQuery(GET_PUBLIC_VAULTS_QUERY);
  const [getSingleVault] = useLazyQuery(GET_PUBLIC_SINGLE_VAULT_QUERY);
  const [getTotalVaultObjectsCountByType] = useLazyQuery(GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY);
  const [getAllObjectsCountOfEachType] = useLazyQuery(GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE_QUERY);
  const [getCreatorVaultObjects] = useLazyQuery(GET_CREATOR_VAULT_OBJECTS_QUERY);

  const getCreatorVaultObjectsQuery = (input: PaginationInput) => {
    return getCreatorVaultObjects({ variables: { input } });
  };

  const getPublicVaultsQuery = (input: PaginationInput) => {
    return getPublicVaults({ variables: { input } });
  };

  const getAllObjectsCountOfEachTypeQuery = () => {
    return getAllObjectsCountOfEachType();
  };

  const getSingleVaultQuery = (input: PaginationInput) => {
    return getSingleVault({ variables: { input } });
  };

  const getPublicVaultObjectsQuery = (input: PaginationInput) => {
    return getPublicVaultObjects({ variables: { input } });
  };

  return {
    getPublicVaultsQuery,
    getSingleVaultQuery,
    getPublicVaultObjectsQuery,
    getAllObjectsCountOfEachTypeQuery,
    getCreatorVaultObjectsQuery
  };
};
