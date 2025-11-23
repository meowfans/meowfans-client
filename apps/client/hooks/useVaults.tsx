import { useVaultsStore } from '@/hooks/store/vaults.store';
import { CreatorType, DataFetchType, SortBy, SortOrder, VaultObjectsEntity, VaultsEntity } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { useVaultsActions } from './api/vaults.actions';
import { useErrorHandler } from './useErrorHandler';

interface VaultProps {
  searchTerm?: string;
  take?: number;
  dataFetchType?: DataFetchType.InfiniteScroll;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  fanId?: string;
  username?: string;
}

interface VaultObjectProps extends VaultProps {
  vaultId?: string;
  fanId?: string;
}

export const useVaults = () => {
  const { errorHandler } = useErrorHandler();
  const { getVaultObjectsQuery, getVaultsQuery } = useVaultsActions();
  const { vaults, setVaults, appendVaults, setVaultObjects, vaultObjects, appendVaultObjects, vault, setVault } = useVaultsStore();

  const getVaults = ({
    searchTerm,
    take = 40,
    dataFetchType = DataFetchType.InfiniteScroll,
    sortBy = SortBy.VaultViewCount,
    orderBy = SortOrder.Desc,
    fanId,
    username
  }: VaultProps) => {
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const loadVaults = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : vaults.length;
      try {
        const { data } = await getVaultsQuery({
          take,
          skip,
          searchTerm,
          dataFetchType,
          sortBy,
          orderBy,
          relatedUserId: fanId,
          username,
          creatorType: [CreatorType.ImportedOnlyFansUser, CreatorType.ImportedPornStar]
        });

        const fetchedVaults = (data?.getPublicVaults.vaults ?? []) as VaultsEntity[];
        setHasMore(fetchedVaults.length === take);

        if (initialLoad) setVaults(fetchedVaults);
        else appendVaults(fetchedVaults);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadVaults();
    };

    const handleRefresh = async () => {
      setVaults([]);
      loadVaults(true);
    };

    useEffect(() => {
      loadVaults(true);
    }, []);

    return { vaults, loading, hasMore, handleLoadMore, setVaults, onRefresh: handleRefresh };
  };

  const getVaultObjects = ({ vaultId, orderBy = SortOrder.Asc, sortBy = SortBy.VaultObjectSuffix, take = 30, fanId }: VaultObjectProps) => {
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const loadVaultObjects = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : vaultObjects.length;
      try {
        const { data } = await getVaultObjectsQuery({
          take,
          skip,
          sortBy,
          orderBy,
          relatedEntityId: vaultId,
          dataFetchType: DataFetchType.InfiniteScroll,
          relatedUserId: fanId
        });

        const fetchedVaultObjects = (data?.getPublicVaultObjectsByVaultId.vaultObjects ?? []) as VaultObjectsEntity[];
        setHasMore(fetchedVaultObjects.length === take);

        setVault(data?.getPublicVaultObjectsByVaultId.vault as VaultsEntity);

        if (initialLoad) setVaultObjects(fetchedVaultObjects);
        else appendVaultObjects(fetchedVaultObjects);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadVaultObjects();
    };

    const handleRefresh = async () => {
      setVaultObjects([]);
      loadVaultObjects(true);
    };

    useEffect(() => {
      loadVaultObjects(true);
    }, []);

    return { vaultObjects, loading, hasMore, handleLoadMore, vault, setVault, onRefresh: handleRefresh };
  };

  return { getVaultObjects, getVaults };
};
