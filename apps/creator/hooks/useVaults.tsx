import { useVaultsActions } from '@workspace/gql/actions';
import { PaginationInput, VaultsEntity, VaultStatsAnalyticsOutput, VaultStatsInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useVaultsStore } from './store/vaults.store';

export const useVaults = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { vaults, setVaults } = useVaultsStore();
  const { getCreatorVaultsQuery } = useVaultsActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadPosts = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaults.length;
    try {
      const { data } = await getCreatorVaultsQuery({
        ...params,
        skip
      });

      const fetchedVaults = (data?.getCreatorVaults ?? []) as VaultsEntity[];

      setHasMore(fetchedVaults.length === params.take);

      if (initialLoad) setVaults(fetchedVaults);
      else setVaults([...vaults, ...fetchedVaults]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadPosts();
  };

  useEffect(() => {
    loadPosts(true);
  }, [params.sortBy, params.orderBy]); //eslint-disable-line

  return { vaults, handleLoadMore, loading, hasMore };
};

export const useVaultsAnalytics = (input: VaultStatsInput) => {
  const { vaultAnalytics, setVaultAnalytics } = useVaultsStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { getVaultsAnalyticsQuery } = useVaultsActions();
  const { errorHandler } = useErrorHandler();

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await getVaultsAnalyticsQuery(input);
      const fetched = data?.getVaultsAnalytics as VaultStatsAnalyticsOutput[];
      setVaultAnalytics(fetched);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [input.vaultStats]); //eslint-disable-line

  return { vaultAnalytics, loading };
};
