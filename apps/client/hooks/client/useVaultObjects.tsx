import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useVaultsActions } from '@workspace/gql/actions/vaults.actions';
import { DataFetchType, GetPublicSingleVaultOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useSingleVault = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { getSingleVaultQuery } = useVaultsActions();
  const { vault, setVault } = useVaultsStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadVaultObjects = async (initialLoad = false) => {
    setLoading(vault?.vaultObjects?.length === 0);

    const skip = initialLoad ? 0 : (vault?.vaultObjects?.length ?? 0);

    try {
      const { data } = await getSingleVaultQuery({
        ...params,
        skip,
        take: params.take ?? 30,
        orderBy: params.orderBy ?? SortOrder.Asc,
        sortBy: params.sortBy ?? SortBy.VaultObjectSuffix,
        dataFetchType: DataFetchType.InfiniteScroll
      });

      const fetched = data?.getPublicSingleVault as GetPublicSingleVaultOutput;
      const vaultObjects = fetched?.vaultObjects ?? [];

      setHasMore(vaultObjects.length === (params.take ?? 30));

      setVault((prev) => ({
        ...fetched,
        vaultObjects: initialLoad ? vaultObjects : [...(prev.vaultObjects ?? []), ...vaultObjects]
      }));
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadVaultObjects(false);
    }
  };

  const refresh = () => {
    setVault({
      ...vault,
      vaultObjects: []
    });
    setHasMore(true);
    loadVaultObjects(true);
  };

  useEffect(() => {
    refresh();
    return () => {
      setVault({
        ...vault,
        vaultObjects: []
      });
    };
  }, [params.relatedEntityId, params.sortBy, params.orderBy, params.take]); //eslint-disable-line

  return {
    vault,
    loading,
    hasMore,
    loadMore,
    refresh
  };
};

export const useVaultObjects = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { getPublicVaultObjectsQuery } = useVaultsActions();
  const { vaultObjects, setVaultObjects } = useVaultsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadVaultObjects = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaultObjects.length;
    setLoading(vaultObjects.length === 0);

    try {
      const { data } = await getPublicVaultObjectsQuery({
        ...params,
        skip,
        take: params.take ?? 30,
        orderBy: params.orderBy ?? SortOrder.Asc,
        sortBy: params.sortBy ?? SortBy.VaultObjectSuffix
      });

      const fetched = data?.getPublicVaultObjects ?? [];

      setHasMore(fetched.length === (params.take ?? 30));
      setVaultObjects((prev) => (initialLoad ? fetched : [...prev, ...fetched]));

      setLoading(false);
    } catch (error) {
      errorHandler({ error });
    }
  };

  useEffect(() => {
    loadVaultObjects(true);

    return () => {
      console.log('clearing vault objects');
      setVaultObjects([]);
    };
  }, [params.relatedEntityId, params.sortBy, params.orderBy, params.take]); // eslint-disable-line

  const loadMore = () => {
    if (!loading && hasMore) loadVaultObjects();
  };

  return {
    vaultObjects,
    loading,
    hasMore,
    loadMore,
    isEmpty: !vaultObjects.length && !loading
  };
};
