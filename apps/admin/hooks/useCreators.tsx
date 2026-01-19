import { useCreatorsStore } from '@/zustand/creators.store';
import { useCreatorsActions } from '@workspace/gql/actions';
import { GetAllCreatorsOutput, PaginationInput, SortBy, UsersEntity } from '@workspace/gql/generated/graphql';
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

  const loadAllCreators = async () => {
    setLoading(creators.length === 0);
    try {
      const { data } = await getCreatorsByAdminQuery({ ...params, sortBy: SortBy.UserCreatedAt });
      const fetchedCreators = data?.getCreatorsByAdmin.creators as UsersEntity[];

      setHasMore(!!fetchedCreators.length);
      setCreators(fetchedCreators);

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

  useEffect(() => {
    loadAllCreators();
  }, []); //eslint-disable-line

  return {
    creators,
    loading,
    hasMore,
    ...meta,
    handleRefetch
  };
};
