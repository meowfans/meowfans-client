import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useVaultsActions } from '@workspace/gql/actions/vaults.actions';
import { DataFetchType, PaginationInput, SortBy, SortOrder, VaultObjectsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useSingleVault = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { getSingleVaultQuery } = useVaultsActions();
  const { vault, setVault, setVaultObjects, vaultObjects, appendVaultObjects } = useVaultsStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadVaultObjects = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vault.vaultObjects.length;
    setLoading(vault?.vaultObjects.length === 0);

    try {
      const { data } = await getSingleVaultQuery({
        ...params,
        skip,
        take: params.take ?? 30,
        relatedEntityId: params.relatedEntityId,
        orderBy: params.orderBy ?? SortOrder.Asc,
        dataFetchType: DataFetchType.InfiniteScroll,
        sortBy: params.sortBy ?? SortBy.VaultObjectSuffix
      });

      const fetched = data?.getPublicSingleVault as VaultsEntity;
      setHasMore(fetched.vaultObjects.length === (params.take ?? 30));

      if (initialLoad) {
        setVault(data?.getPublicSingleVault as VaultsEntity);
        setVaultObjects(fetched.vaultObjects);
      } else appendVaultObjects(fetched.vaultObjects);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) loadVaultObjects();
  };

  const refresh = () => {
    setVaultObjects([]);
    loadVaultObjects(true);
  };

  useEffect(() => {
    loadVaultObjects(true);
  }, [params.relatedEntityId, params.sortBy, params.orderBy]); //eslint-disable-line

  return {
    vaultObjects,
    loading,
    hasMore,
    loadMore,
    refresh,
    vault
  };
};

export const useVaultObjects = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { getPublicVaultObjectsQuery } = useVaultsActions();
  const { setVaultObjects, vaultObjects, appendVaultObjects } = useVaultsStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadVaultObjects = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaultObjects.length;
    setLoading(vaultObjects.length === 0);

    try {
      const { data } = await getPublicVaultObjectsQuery({
        ...params,
        skip,
        take: params.take ?? 30,
        relatedEntityId: params.relatedEntityId,
        orderBy: params.orderBy ?? SortOrder.Asc,
        sortBy: params.sortBy ?? SortBy.VaultObjectSuffix
      });

      const fetched = data?.getPublicVaultObjects as VaultObjectsEntity[];
      setHasMore(fetched.length === (params.take ?? 30));

      if (initialLoad) {
        setVaultObjects(fetched);
      } else appendVaultObjects(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) loadVaultObjects();
  };

  const refresh = () => {
    setVaultObjects([]);
    loadVaultObjects(true);
  };

  useEffect(() => {
    loadVaultObjects(true);
  }, [params.relatedEntityId, params.sortBy, params.orderBy]); //eslint-disable-line

  return {
    vaultObjects,
    loading,
    hasMore,
    loadMore,
    refresh
  };
};
