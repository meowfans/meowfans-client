import { useCreatorsStore } from '@/hooks/store/creators.store';
import { useCreatorsActions } from '@workspace/gql/actions';
import { DataFetchType, GetAllCreatorsOutput, PaginationInput, UsersEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useCreators = (params: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const { getCreatorsByAdminQuery } = useCreatorsActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [meta, setMeta] = useState<Partial<GetAllCreatorsOutput>>({
    count: 0,
    hasNext: false,
    hasPrev: false,
    totalPages: 0
  });

  const loadAllCreators = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : creators.length;
    setLoading(creators.length === 0);

    try {
      const { data } = await getCreatorsByAdminQuery({ ...params, take: 100, skip, });
      const fetchedCreators = data?.getCreatorsByAdmin.creators as UsersEntity[];

      setHasMore(fetchedCreators.length === 100);

      if (initialLoad) setCreators(fetchedCreators);
      else setCreators([...creators, ...fetchedCreators]);

      setMeta({
        count: data?.getCreatorsByAdmin.count ?? 0,
        hasNext: data?.getCreatorsByAdmin.hasNext ?? false,
        hasPrev: data?.getCreatorsByAdmin.hasPrev ?? false,
        totalPages: data?.getCreatorsByAdmin.totalPages ?? 0
      });
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleRefetch = () => {
    loadAllCreators();
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadAllCreators();
    }
  };

  useEffect(() => {
    loadAllCreators(true);
  }, [params.sortBy, params.orderBy, params.creatorApprovalStatus]); //eslint-disable-line

  return {
    creators,
    loading,
    hasMore,
    meta,
    count: meta.count,
    handleRefetch,
    handleLoadMore,
    hasNext: meta.hasNext,
    hasPrev: meta.hasPrev,
    totalPages: meta.totalPages
  };
};
