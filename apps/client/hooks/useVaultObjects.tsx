import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useVaultsActions } from '@workspace/gql/actions/vaults.actions';
import { DataFetchType, SortBy, SortOrder, VaultObjectsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface VaultObjectProps {
  vaultId?: string;
  take?: number;
  sortBy?: SortBy;
  orderBy?: SortOrder;
}

export const useVaultObjects = (params: VaultObjectProps) => {
  const { errorHandler } = useErrorHandler();
  const { getVaultObjectsQueryByVaultId } = useVaultsActions();
  const { vaultObjects, setVaultObjects, appendVaultObjects, vault, setVault } = useVaultsStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadVaultObjects = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaultObjects.length;
    setLoading(vaultObjects.length === 0);

    try {
      const { data } = await getVaultObjectsQueryByVaultId({
        take: params.take ?? 30,
        skip,
        sortBy: params.sortBy ?? SortBy.VaultObjectSuffix,
        orderBy: params.orderBy ?? SortOrder.Asc,
        relatedEntityId: params.vaultId,
        dataFetchType: DataFetchType.InfiniteScroll
      });

      const fetched = (data?.getPublicVaultObjectsByVaultId.vaultObjects ?? []) as VaultObjectsEntity[];
      setHasMore(fetched.length === (params.take ?? 30));

      setVault(data?.getPublicVaultObjectsByVaultId.vault as VaultsEntity);

      initialLoad ? setVaultObjects(fetched) : appendVaultObjects(fetched);
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
  }, [params.vaultId, params.sortBy, params.orderBy]);

  return {
    vaultObjects,
    loading,
    hasMore,
    loadMore,
    refresh,
    vault
  };
};
