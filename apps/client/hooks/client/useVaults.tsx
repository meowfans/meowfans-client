import { getPublicVaultsByTags } from '@/app/server/getPublicVaultsByTags';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useVaultsActions } from '@workspace/gql/actions/vaults.actions';
import { CreatorType, DataFetchType, GetPublicVaultsOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useVaults = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { getPublicVaultsQuery } = useVaultsActions();
  const { vaults, setVaults } = useVaultsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadVaults = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaults.length;
    setLoading(vaults.length === 0);
    try {
      const { data } = await getPublicVaultsQuery({
        ...params,
        take: params.take ?? 40,
        skip,
        searchTerm: params.searchTerm,
        dataFetchType: DataFetchType.InfiniteScroll,
        sortBy: params.sortBy ?? SortBy.VaultViewCount,
        orderBy: params.orderBy ?? SortOrder.Desc,
        username: params.username,
        creatorType: [CreatorType.ImportedOnlyFansUser, CreatorType.ImportedPornStar]
      });

      const fetched = (data?.getPublicVaults ?? []) as GetPublicVaultsOutput[];
      setHasMore(fetched.length === (params.take ?? 40));
      setVaults((prev) => (initialLoad ? fetched : [...prev, ...fetched]));
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
  }, [params.searchTerm, params.sortBy, params.orderBy, params.username]); //eslint-disable-line

  return {
    vaults,
    loading,
    hasMore,
    loadMore,
    refresh
  };
};


