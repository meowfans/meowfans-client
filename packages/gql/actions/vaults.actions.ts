'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION,
  DOWNLOAD_OBJECT_BY_VAULT_OBJECT_IDS_MUTATION,
  DOWNLOAD_OBJECTS_BY_CREATOR_IDS_MUTATION,
  GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE_QUERY,
  GET_CREATOR_VAULT_OBJECTS_QUERY,
  GET_CREATOR_VAULTS_BY_ADMIN_QUERY,
  GET_CREATOR_VAULTS_QUERY,
  GET_PUBLIC_SINGLE_VAULT_QUERY,
  GET_PUBLIC_VAULT_OBJECTS_QUERY,
  GET_PUBLIC_VAULTS_BY_TAGS_QUERY,
  GET_PUBLIC_VAULTS_QUERY,
  GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY,
  GET_VAULTS_ANALYTICS_QUERY,
  TERMINATE_ALL_DOWNLOADING_MUTATION,
  TERMINATE_IMPORT_JOBS_MUTATION,
  UPDATE_PREVIEW_OF_VAULTS_QUERY
} from '@workspace/gql/api';
import {
  CleanUpVaultInput,
  DownloadObjectsByCreatorIdsInput,
  DownloadObjectsByVaultObjectIdsQueueInput,
  PaginationInput,
  VaultStatsInput
} from '@workspace/gql/generated/graphql';

export const useVaultsActions = () => {
  const [getPublicVaultObjects] = useLazyQuery(GET_PUBLIC_VAULT_OBJECTS_QUERY);
  const [getPublicVaults] = useLazyQuery(GET_PUBLIC_VAULTS_QUERY);
  const [getSingleVault] = useLazyQuery(GET_PUBLIC_SINGLE_VAULT_QUERY);
  const [getCreatorVaults] = useLazyQuery(GET_CREATOR_VAULTS_QUERY);
  const [getVaultsAnalytics] = useLazyQuery(GET_VAULTS_ANALYTICS_QUERY);
  const [getTotalVaultObjectsCountByType] = useLazyQuery(GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY);
  const [getAllObjectsCountOfEachTypeQuery] = useLazyQuery(GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE_QUERY);
  const [getCreatorVaultObjects] = useLazyQuery(GET_CREATOR_VAULT_OBJECTS_QUERY);
  const [downloadObjectsByCreatorIds] = useMutation(DOWNLOAD_OBJECTS_BY_CREATOR_IDS_MUTATION);
  const [terminateDownloadingMutation] = useMutation(TERMINATE_ALL_DOWNLOADING_MUTATION);
  const [terminateImportJobsMutation] = useMutation(TERMINATE_IMPORT_JOBS_MUTATION);
  const [cleanUpVaultObjectsOfACreator] = useMutation(CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION);
  const [downloadObjectByVaultObjectIds] = useMutation(DOWNLOAD_OBJECT_BY_VAULT_OBJECT_IDS_MUTATION);
  const [getPublicVaultsByTags] = useLazyQuery(GET_PUBLIC_VAULTS_BY_TAGS_QUERY);
  const [getCreatorVaultsByAdmin] = useLazyQuery(GET_CREATOR_VAULTS_BY_ADMIN_QUERY);
  const [updatePreviewOfVaultsMutation] = useMutation(UPDATE_PREVIEW_OF_VAULTS_QUERY);

  const getCreatorVaultsQuery = (input: PaginationInput) => {
    return getCreatorVaults({ variables: { input } });
  };

  const getCreatorVaultsByAdminQuery = (input: PaginationInput) => {
    return getCreatorVaultsByAdmin({ variables: { input } });
  };

  const getVaultsAnalyticsQuery = (input: VaultStatsInput) => {
    return getVaultsAnalytics({ variables: { input } });
  };

  const getCreatorVaultObjectsQuery = (input: PaginationInput) => {
    return getCreatorVaultObjects({ variables: { input } });
  };

  const getPublicVaultsQuery = (input: PaginationInput) => {
    return getPublicVaults({ variables: { input } });
  };

  const getPublicVaultsByTagsQuery = (input: PaginationInput) => {
    return getPublicVaultsByTags({ variables: { input } });
  };

  const downloadObjectsByCreatorIdsMutation = (input: DownloadObjectsByCreatorIdsInput) => {
    return downloadObjectsByCreatorIds({ variables: { input } });
  };

  const cleanUpVaultObjectsOfACreatorMutation = (input: CleanUpVaultInput) => {
    return cleanUpVaultObjectsOfACreator({ variables: { input } });
  };

  const downloadObjectByVaultObjectIdsMutation = (input: DownloadObjectsByVaultObjectIdsQueueInput) => {
    return downloadObjectByVaultObjectIds({ variables: { input } });
  };

  const getSingleVaultQuery = (input: PaginationInput) => {
    return getSingleVault({ variables: { input } });
  };

  const getPublicVaultObjectsQuery = (input: PaginationInput) => {
    return getPublicVaultObjects({ variables: { input } });
  };

  return {
    getSingleVaultQuery,
    getPublicVaultsQuery,
    getCreatorVaultsQuery,
    getVaultsAnalyticsQuery,
    getPublicVaultObjectsQuery,
    getCreatorVaultObjectsQuery,
    getAllObjectsCountOfEachTypeQuery,
    downloadObjectsByCreatorIdsMutation,
    terminateDownloadingMutation,
    terminateImportJobsMutation,
    cleanUpVaultObjectsOfACreatorMutation,
    downloadObjectByVaultObjectIdsMutation,
    getPublicVaultsByTagsQuery,
    getCreatorVaultsByAdminQuery,
    updatePreviewOfVaultsMutation
  };
};
