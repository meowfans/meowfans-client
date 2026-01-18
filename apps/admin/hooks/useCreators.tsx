import { useCreatorsStore } from '@/zustand/creators.store';
import { useCreatorsActions } from '@workspace/gql/actions';
import { GetAllCreatorsOutput, SortBy, UsersEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface CreatorsProps {
  pageNumber: number;
  sortBy: SortBy;
}

export const useCreators = ({ pageNumber, sortBy = SortBy.UserCreatedAt }: CreatorsProps) => {
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
    setLoading(true);
    try {
      const { data } = await getCreatorsByAdminQuery({ pageNumber, sortBy });
      const fetchedCreators = data?.getCreatorsByAdmin.creators as UsersEntity[];

      setHasMore(!!fetchedCreators.length);
      setCreators([...creators, ...fetchedCreators]);

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
  }, [pageNumber, sortBy]); //eslint-disable-line

  return {
    creators,
    loading,
    hasMore,
    ...meta,
    handleRefetch
  };
};
