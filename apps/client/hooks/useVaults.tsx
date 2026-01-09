import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useVaultsActions } from '@workspace/gql/actions/vaults.actions';
import { CreatorType, DataFetchType, SortBy, SortOrder, VaultsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface VaultProps {
  searchTerm?: string;
  take?: number;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  fanId?: string;
  username?: string;
}

export const useVaults = (params: VaultProps) => {
  const { errorHandler } = useErrorHandler();
  const { getVaultsQuery } = useVaultsActions();
  const { vaults, setVaults, appendVaults } = useVaultsStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  console.log('Started');

  const loadVaults = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaults.length;
    setLoading(vaults.length === 0);
    console.log('Load vaults called');
    try {
      const { data } = await getVaultsQuery({
        take: params.take ?? 40,
        skip,
        searchTerm: params.searchTerm,
        dataFetchType: DataFetchType.InfiniteScroll,
        sortBy: params.sortBy ?? SortBy.VaultViewCount,
        orderBy: params.orderBy ?? SortOrder.Desc,
        relatedUserId: params.fanId,
        username: params.username,
        creatorType: [CreatorType.ImportedOnlyFansUser, CreatorType.ImportedPornStar]
      });

      console.log('Data fetched');

      const fetched = (data?.getPublicVaults.vaults ?? []) as VaultsEntity[];
      setHasMore(fetched.length === (params.take ?? 40));
      if (initialLoad) setVaults(fetched);
      else appendVaults(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) loadVaults();
  };

  const refresh = () => {
    setVaults([]);
    loadVaults(true);
  };

  useEffect(() => {
    loadVaults(true);
  }, [params.searchTerm, params.sortBy, params.orderBy, params.fanId, params.username]);

  return {
    vaults,
    loading,
    hasMore,
    loadMore,
    refresh
  };
};
