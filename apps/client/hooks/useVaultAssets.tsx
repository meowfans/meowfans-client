'use client';

import { useAssetsStore } from '@/hooks/store/assets.store';
import { useAssetsActions } from '@workspace/gql/actions/assets.actions';
import { CreatorAssetsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface UseVaultAssetsProps {
  username?: string;
  fanId?: string;
  sortBy?: SortBy;
  orderBy?: SortOrder;
  take?: number;
}

export const useVaultAssets = ({
  username,
  fanId,
  sortBy = SortBy.VaultObjectSuffix,
  orderBy = SortOrder.Asc,
  take = 30
}: UseVaultAssetsProps) => {
  const { assets, setAssets } = useAssetsStore();
  const { publicGetVaultAssetsQuery } = useAssetsActions();
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadAssets = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : assets.length;
    setLoading(assets.length === 0);

    try {
      const { data } = await publicGetVaultAssetsQuery({ take, skip, username, orderBy, relatedUserId: fanId, sortBy });
      const fetchedAssets = (data?.getPublicCreatorAssets ?? []) as CreatorAssetsEntity[];
      setHasMore(fetchedAssets.length === take);
      if (initialLoad) setAssets(fetchedAssets);
      else setAssets([...assets, ...fetchedAssets]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadAssets();
  };

  const handleRefresh = () => {
    setAssets([]);
    loadAssets(true);
  };

  useEffect(() => {
    loadAssets(true);
  }, [username, fanId, sortBy, orderBy, take]); //eslint-disable-line

  return {
    assets,
    loading,
    hasMore,
    handleLoadMore,
    handleRefresh
  };
};
