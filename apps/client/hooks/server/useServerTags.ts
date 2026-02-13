'use client';

import { getTags } from '@/app/server/getTags';
import { useTagsStore } from '@/hooks/store/tags.store';
import { CreatorType, DataFetchType, GetPublicVaultsOutput, PaginationInput, SortBy, SortOrder, TagsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useVaultsStore } from '../store/vaults.store';
import { getPublicVaultsByTags } from '@/app/server/getPublicVaultsByTags';

interface UseServerTagsProps {
  limit?: number;
}

export const useServerTags = ({ limit = 100 }: UseServerTagsProps, initialTags: TagsEntity[]) => {
  const { errorHandler } = useErrorHandler();
  const { tags, setTags } = useTagsStore();
  const [loading, setLoading] = useState<boolean>(initialTags.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialTags.length > 0 ? initialTags.length === limit : true);
  const [offset, setOffset] = useState<number>(initialTags.length);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getTags({
        take: limit,
        skip: offset,
        orderBy: SortOrder.Asc
      });
      const fetchedTags = (fetched ?? []) as TagsEntity[];

      setHasMore(fetchedTags.length === limit);
      setTags((prev) => [...prev, ...fetchedTags]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      errorHandler({ error, msg: 'Error loading tags! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTags?.length > 0 && tags.length === 0) {
      setTags(initialTags);
      setOffset(initialTags.length);
    }
  }, [initialTags, setTags, tags.length]);

  return {
    tags,
    loading,
    hasMore,
    loadMore,
    isEmpty: tags.length === 0
  };
};

export const useServerPublicVaultsByTags = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { vaults, setVaults } = useVaultsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadVaults = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : vaults.length;
    setLoading(vaults.length === 0);
    try {
      const data = await getPublicVaultsByTags({
        ...params,
        skip,
        take: params.take ?? 20,
        searchTerm: params.searchTerm,
        dataFetchType: DataFetchType.InfiniteScroll,
        sortBy: params.sortBy ?? SortBy.VaultViewCount,
        orderBy: params.orderBy ?? SortOrder.Desc,
        username: params.username,
        creatorType: [CreatorType.ImportedOnlyFansUser, CreatorType.ImportedPornStar]
      });

      const fetched = (data ?? []) as GetPublicVaultsOutput[];
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
