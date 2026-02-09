'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION,
  DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION,
  DOWNLOAD_CREATOR_OBJECTS_AS_BATCH_MUTATION,
  GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE_QUERY,
  GET_CREATOR_VAULT_OBJECTS_QUERY,
  GET_CREATOR_VAULTS_QUERY,
  GET_PUBLIC_SINGLE_VAULT_QUERY,
  GET_PUBLIC_VAULT_OBJECTS_QUERY,
  GET_PUBLIC_VAULTS_QUERY,
  GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY,
  GET_VAULTS_ANALYTICS_QUERY,
  TERMINATE_ALL_DOWNLOADING_MUTATION,
  TERMINATE_ALL_JOBS_MUTATION
} from '@workspace/gql/api';
import {
  CleanUpVaultInput,
  DownloadAllCreatorObjectsAsBatchInput,
  PaginationInput,
  UploadVaultQueueInput,
  VaultStatsInput
} from '@workspace/gql/generated/graphql';

export const useVaultsActions = () => {
  const [getPublicVaultObjects] = useLazyQuery(GET_PUBLIC_VAULT_OBJECTS_QUERY);
  const [getPublicVaults] = useLazyQuery(GET_PUBLIC_VAULTS_QUERY);
  const [getSingleVault] = useLazyQuery(GET_PUBLIC_SINGLE_VAULT_QUERY);
  const [getCreatorVaults] = useLazyQuery(GET_CREATOR_VAULTS_QUERY);
  const [getVaultsAnalytics] = useLazyQuery(GET_VAULTS_ANALYTICS_QUERY);
  const [getTotalVaultObjectsCountByType] = useLazyQuery(GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY);
  const [getAllObjectsCountOfEachType] = useLazyQuery(GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE_QUERY);
  const [getCreatorVaultObjects] = useLazyQuery(GET_CREATOR_VAULT_OBJECTS_QUERY);
  const [downloadAllCreatorObjects] = useMutation(DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION);
  const [terminateDownloading] = useMutation(TERMINATE_ALL_DOWNLOADING_MUTATION);
  const [terminateAllJobs] = useMutation(TERMINATE_ALL_JOBS_MUTATION);
  const [cleanUpVaultObjectsOfACreator] = useMutation(CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION);
  const [downloadCreatorObjectsAsBatch] = useMutation(DOWNLOAD_CREATOR_OBJECTS_AS_BATCH_MUTATION);

  const getCreatorVaultsQuery = (input: PaginationInput) => {
    return getCreatorVaults({ variables: { input } });
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

  const getAllObjectsCountOfEachTypeQuery = () => {
    return getAllObjectsCountOfEachType();
  };

  const downloadAllCreatorObjectsMutation = (input: DownloadAllCreatorObjectsAsBatchInput) => {
    return downloadAllCreatorObjects({ variables: { input } });
  };

  const terminateDownloadingMutation = () => {
    return terminateDownloading();
  };

  const terminateAllJobsMutation = () => {
    return terminateAllJobs();
  };

  const cleanUpVaultObjectsOfACreatorMutation = (input: CleanUpVaultInput) => {
    return cleanUpVaultObjectsOfACreator({ variables: { input } });
  };

  const downloadCreatorObjectsAsBatchMutation = (input: UploadVaultQueueInput) => {
    return downloadCreatorObjectsAsBatch({ variables: { input } });
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
    downloadAllCreatorObjectsMutation,
    terminateDownloadingMutation,
    terminateAllJobsMutation,
    cleanUpVaultObjectsOfACreatorMutation,
    downloadCreatorObjectsAsBatchMutation
  };
};
