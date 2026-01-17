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
  username?: string;
}

export const useVaults = (params: VaultProps) => {
  const { errorHandler } = useErrorHandler();
  const { getPublicVaultsQuery } = useVaultsActions();
  const { vaults, setVaults, appendVaults } = useVaultsStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadVaults = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaults.length;
    setLoading(vaults.length === 0);
    try {
      const { data } = await getPublicVaultsQuery({
        take: params.take ?? 40,
        skip,
        searchTerm: params.searchTerm,
        dataFetchType: DataFetchType.InfiniteScroll,
        sortBy: params.sortBy ?? SortBy.VaultViewCount,
        orderBy: params.orderBy ?? SortOrder.Desc,
        username: params.username,
        creatorType: [CreatorType.ImportedOnlyFansUser, CreatorType.ImportedPornStar]
      });

      const fetched = (data?.getPublicVaults ?? []) as VaultsEntity[];
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
  }, [params.searchTerm, params.sortBy, params.orderBy, params.username]);

  return {
    vaults,
    loading,
    hasMore,
    loadMore,
    refresh
  };
};
